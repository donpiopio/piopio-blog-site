import '../css/components/VisitorCounter.css';
import React, { useState, useEffect } from 'react';
import { getSupabase, isSupabaseConfigured } from '../lib/supabaseClient';

const VisitorCounter = () => {
  const [visitorCount, setVisitorCount] = useState(0);
  const [loading, setLoading] = useState(true);

  // Generate a simple browser fingerprint
  const getBrowserFingerprint = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    ctx.textBaseline = 'top';
    ctx.font = '14px Arial';
    ctx.fillText('fingerprint', 2, 2);
    const canvasData = canvas.toDataURL();
    
    const fingerprint = {
      userAgent: navigator.userAgent,
      language: navigator.language,
      platform: navigator.platform,
      screenResolution: `${window.screen.width}x${window.screen.height}`,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      canvas: canvasData.substring(0, 100)
    };
    
    // Create a simple hash from the fingerprint
    const fingerprintString = JSON.stringify(fingerprint);
    let hash = 0;
    for (let i = 0; i < fingerprintString.length; i++) {
      const char = fingerprintString.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return `fp_${Math.abs(hash)}`;
  };

  useEffect(() => {
    const trackVisitor = async () => {
      try {
        const supabase = getSupabase();
        
        // Check if Supabase is configured
        if (!isSupabaseConfigured()) {
          console.log('Supabase not configured, using localStorage fallback');
          const stored = localStorage.getItem('visitorCount') || '48';
          setVisitorCount(parseInt(stored));
          setLoading(false);
          return;
        }
        
        const fingerprint = getBrowserFingerprint();
        const lastVisit = localStorage.getItem('lastVisit');
        const now = new Date().getTime();
        
        // Only count as new visit if more than 7 days since last visit
        const shouldCount = !lastVisit || (now - parseInt(lastVisit)) > 7 * 24 * 60 * 60 * 1000;
        
        if (shouldCount) {
          // Record visit in Supabase
          const { error: insertError } = await supabase
            .from('visitors')
            .upsert({
              fingerprint: fingerprint,
              last_visit: new Date().toISOString()
            }, {
              onConflict: 'fingerprint'
            });
          
          if (insertError) {
            console.error('Error recording visit:', insertError);
          }
          
          localStorage.setItem('lastVisit', now.toString());
        }
        
        // Get total unique visitors
        const { count, error: countError } = await supabase
          .from('visitors')
          .select('*', { count: 'exact', head: true });
        
        if (countError) {
          console.error('Error fetching count:', countError);
          // Fallback to localStorage
          const stored = localStorage.getItem('visitorCount') || '48';
          setVisitorCount(parseInt(stored));
        } else {
          setVisitorCount(count || 0);
        }
      } catch (error) {
        console.error('Error in visitor tracking:', error);
        // Fallback to localStorage
        const stored = localStorage.getItem('visitorCount') || '48';
        setVisitorCount(parseInt(stored));
      } finally {
        setLoading(false);
      }
    };

    trackVisitor();
  }, []);

  if (loading) {
    return (
      <div className="boxy-window p-0">
        <div className="boxy-window-title p-4 w-full">
          <h2 className="text-rose-900 font-bold text-xl">Visitor Counter</h2>
        </div>
        <div className="p-4 text-center text-rose-800">
          <div className="visitor-counter-display">
            <span className="counter-text">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="boxy-window p-0">
      <div className="boxy-window-title p-4 w-full">
        <h2 className="text-rose-900 font-bold text-xl">Visitor Counter</h2>
      </div>
      <div className="p-4 text-center text-rose-800">
        <div className="visitor-counter-display">
          <div className="counter-label">Total Unique Visitors</div>
          <div className="counter-number">{visitorCount.toLocaleString()}</div>
          <div className="counter-subtitle">Stats collected from our database!</div>
        </div>
      </div>
    </div>
  );
};

export default VisitorCounter;