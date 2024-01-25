import React, { useEffect, useState } from 'react';
import './watchlist.css';
import Card from '../components/Card';

function Watchlist() {
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    // Fetch watchlist data from your backend API
    // Example: fetch('/watchlist').then(response => response.json()).then(data => setWatchlist(data.watchlist));
  }, []);

  return (
    <div>
      <h2>Watchlist</h2>
      {/* Display watchlist data here */}
    </div>
  );
}

export default Watchlist;

