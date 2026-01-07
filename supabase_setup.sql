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
CREATE POLICY "Allow public to track visits" ON visitors
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- Create policy to allow anyone to count visitors
CREATE POLICY "Allow public to count visitors" ON visitors
  FOR SELECT
  USING (true);
