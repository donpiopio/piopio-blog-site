-- Create visitors table for tracking unique visitors
CREATE TABLE IF NOT EXISTS visitors (
  id BIGSERIAL PRIMARY KEY,
  fingerprint TEXT UNIQUE NOT NULL,
  last_visit TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on fingerprint for faster lookups
CREATE INDEX IF NOT EXISTS idx_visitors_fingerprint ON visitors(fingerprint);

-- Enable Row Level Security
ALTER TABLE visitors ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert/update their own visit
DROP POLICY IF EXISTS "Allow public to track visits" ON visitors;
CREATE POLICY "Allow public to track visits" ON visitors
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- Create policy to allow anyone to count visitors
DROP POLICY IF EXISTS "Allow public to count visitors" ON visitors;
CREATE POLICY "Allow public to count visitors" ON visitors
  FOR SELECT
  USING (true);

-- Create updates table for homepage
CREATE TABLE IF NOT EXISTS updates (
  id BIGSERIAL PRIMARY KEY,
  post_date DATE NOT NULL DEFAULT CURRENT_DATE,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE updates ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public to read updates
DROP POLICY IF EXISTS "Allow public to read updates" ON updates;
CREATE POLICY "Allow public to read updates" ON updates
  FOR SELECT
  USING (true);

-- Create policy to allow authenticated users to manage updates
DROP POLICY IF EXISTS "Allow authenticated to manage updates" ON updates;
CREATE POLICY "Allow authenticated to manage updates" ON updates
  FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- Insert initial existing updates
INSERT INTO updates (post_date, content) VALUES
('2025-10-27', 'Working on big plans to add more pages (Voices?/3D Modeling Projects/More interactive pages).'),
('2025-10-20', 'Added content to facts, projects, and OCs.'),
('2025-10-15', 'Fixed some small bugs on mobile view, so its more responsive to small screen size.'),
('2025-10-12', 'Finally finished working on the base website! V1.0 ready for people to explore ^_^'),
('2025-10-05', 'DEV Version of website is currently being worked on, soon to release V1.0');

-- Create tracks table for the music player
CREATE TABLE IF NOT EXISTS tracks (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  artist TEXT NOT NULL,
  video_id TEXT NOT NULL,
  image_url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE tracks ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public to read tracks
DROP POLICY IF EXISTS "Allow public to read tracks" ON tracks;
CREATE POLICY "Allow public to read tracks" ON tracks
  FOR SELECT
  USING (true);

-- Create policy to allow authenticated users to manage tracks
DROP POLICY IF EXISTS "Allow authenticated to manage tracks" ON tracks;
CREATE POLICY "Allow authenticated to manage tracks" ON tracks
  FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- Insert initial tracks
INSERT INTO tracks (title, artist, video_id, image_url) VALUES
('Yokai Disco', 'Telan Devik', 'xgOeKgGKuP0', 'images/songs/yokai_disco.jpg'),
('Machine Love (Instrumental)', 'JamieP', 'eXtOI1tMnnE', 'images/songs/machine_love.jpg'),
('Sanasational (Instrumental)', 'T"zalt', 'GpIWpV09O40', 'images/songs/sans.jpeg'),
('DesktopBuddy', 'NANORAY', '6b_c_99GGcw', 'images/songs/desktopbuddy.jpeg'),
('GIGASOFT INDUSTRIES', 'HOTEL PARALLAX', 'o4jkYTJAUS8', 'images/songs/gigasoft.jpg'),
('Stay Funky (Instrumental)', 'Kawai Sprite · Isaac J Garcia', '3fgUp5B2LUA', 'images/songs/funky.jpg'),
('my room is upside down', 'Deathbrain', 'Oq1UZDDnhrY', 'images/songs/upsidedown.jpg'),
('The Sky is Purple', 'strxwberrymilk', 'gzogMQPt9AU', 'images/songs/sky_is_purple.jpg'),
('Gloss', 'Kaizo Slumber', 'ctqLGsUEk20', 'images/songs/gloss.jpg'),
('Dude move', 'Baba', 'dHmQulnA3to', 'images/songs/dude_move.png'),
('mañana', 'Tainy · Young Miko · The Marias', 'Wmel6COmPIg', 'images/songs/manana.png'),
('Be Yourself Or Die Dreaming', 'Nouvelle Story', 'dXZYOqqg6Kk', 'images/songs/be_yourself.jpeg');

-- ==========================================
-- RATE LIMITER FOR VISITOR COUNTER
-- ==========================================

-- 1. Add an IP column to track where requests come from
ALTER TABLE visitors ADD COLUMN IF NOT EXISTS ip_address TEXT;

-- 2. Create the security function
CREATE OR REPLACE FUNCTION check_visitor_rate_limit()
RETURNS TRIGGER AS $$
DECLARE
  client_ip TEXT;
  recent_visits INT;
BEGIN
  -- Extract the real IP address from Supabase's request headers
  client_ip := split_part(current_setting('request.headers', true)::json->>'x-forwarded-for', ',', 1);
  
  -- Save the IP to the new row
  NEW.ip_address := client_ip;
  
  -- If IP is somehow missing (like in local testing), let it pass
  IF client_ip IS NULL THEN
    RETURN NEW;
  END IF;

  -- Count how many DIFFERENT fingerprints this IP has created in the last 24 hours
  SELECT count(*) INTO recent_visits
  FROM visitors
  WHERE ip_address = client_ip
  AND created_at > NOW() - INTERVAL '1 day';

  -- If one IP tries to pretend to be more than 5 different people in a day, block it!
  IF recent_visits > 5 THEN
    RAISE EXCEPTION 'Rate limit exceeded: Too many unique visits from this IP.';
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 3. Attach the security function to the table
DROP TRIGGER IF EXISTS rate_limit_trigger ON visitors;
CREATE TRIGGER rate_limit_trigger
  BEFORE INSERT ON visitors
  FOR EACH ROW
  EXECUTE FUNCTION check_visitor_rate_limit();
