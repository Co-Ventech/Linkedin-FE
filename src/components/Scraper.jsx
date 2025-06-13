import React, { useState } from 'react';
import './Scraper.css';

const Scraper = () => {
  const [loading, setLoading] = useState(false);

  const handleScrape = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        'http://localhost:8000/api/v1/jobs?posted_from=past%20week&is_remote=true'
      );

      if (!response.ok) {
        throw new Error('Scrape failed');
      }

      const result = await response.json();
      console.log('Scrape result:', result);
      alert('Scraping completed and saved to Google Sheets!');
    } catch (error) {
      console.error('Error scraping:', error.message);
      alert('Failed to scrape jobs.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="scraper-container">
      {loading ? (
        <p className="loader-text">Scraping...</p>
      ) : (
        <button onClick={handleScrape} className="scrape-button">
          Scrape
        </button>
      )}
    </div>
  );
};

export default Scraper;
