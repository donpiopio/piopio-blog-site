import sys

with open('src/pages/home.js', 'r', encoding='utf-8') as f:
    code = f.read()

code = code.replace("import React, { useState } from 'react';", "import React, { useState, useEffect } from 'react';\nimport { getSupabase, isSupabaseConfigured } from '../lib/supabaseClient';")

old_aside = """<aside className="boxy-window y2k-widget">
            <div className="boxy-window-title p-3">
              <span className="y2k-pill-title">Updates</span>
            </div>
            <div className="widget-body">
              <div className="max-h-64 overflow-y-auto pr-2" style={{ scrollbarWidth: 'thin', scrollbarColor: '#D62828 #F3F4F6' }}>
                <ul className="text-rose-900 text-sm space-y-3">
                  <li><strong>[10/27/25]</strong> Working on big plans to add more pages (Voices?/3D Modeling Projects/More interactive pages).</li>
                  <li><strong>[10/20/25]</strong> Added content to facts, projects, and OCs.</li>
                  <li><strong>[10/15/25]</strong> Fixed some small bugs on mobile view, so its more responsive to small screen size.</li>
                  <li><strong>[10/12/25]</strong> Finally finished working on the base website! V1.0 ready for people to explore ^_^</li>
                  <li><strong>[10/05/25]</strong> DEV Version of website is currently being worked on, soon to release V1.0</li>
                </ul>
              </div>
            </div>
          </aside>"""

new_aside = "<UpdatesWidget />"

widget_def = """
const UpdatesWidget = () => {
  const [updates, setUpdates] = useState([
    { date: "10/27/25", content: "Working on big plans to add more pages (Voices?/3D Modeling Projects/More interactive pages)." },
    { date: "10/20/25", content: "Added content to facts, projects, and OCs." },
    { date: "10/15/25", content: "Fixed some small bugs on mobile view, so its more responsive to small screen size." },
    { date: "10/12/25", content: "Finally finished working on the base website! V1.0 ready for people to explore ^_^" },
    { date: "10/05/25", content: "DEV Version of website is currently being worked on, soon to release V1.0" }
  ]);

  useEffect(() => {
    const fetchUpdates = async () => {
      if (!isSupabaseConfigured()) return;
      try {
        const supabase = getSupabase();
        const { data, error } = await supabase
          .from('updates')
          .select('*')
          .order('post_date', { ascending: false })
          .limit(10);

        if (!error && data && data.length > 0) {
          setUpdates(data.map(u => {
            const dateObj = new Date(u.post_date);
            const mm = String(dateObj.getUTCMonth() + 1).padStart(2, '0');
            const dd = String(dateObj.getUTCDate()).padStart(2, '0');
            const yy = String(dateObj.getUTCFullYear()).slice(-2);
            return { date: `${mm}/${dd}/${yy}`, content: u.content };
          }));
        }
      } catch (err) {
        console.error('Failed to fetch updates', err);
      }
    };
    fetchUpdates();
  }, []);

  return (
    <aside className="boxy-window y2k-widget">
      <div className="boxy-window-title p-3">
        <span className="y2k-pill-title">Updates</span>
      </div>
      <div className="widget-body">
        <div className="max-h-64 overflow-y-auto pr-2" style={{ scrollbarWidth: 'thin', scrollbarColor: '#D62828 #F3F4F6' }}>
          <ul className="text-rose-900 text-sm space-y-3">
            {updates.map((update, idx) => (
              <li key={idx}><strong>[{update.date}]</strong> {update.content}</li>
            ))}
          </ul>
        </div>
      </div>
    </aside>
  );
};
"""

code = code.replace(old_aside, new_aside)
code = code.replace("const Home = () => {", widget_def + "\nconst Home = () => {")

with open('src/pages/home.js', 'w', encoding='utf-8') as f:
    f.write(code)

