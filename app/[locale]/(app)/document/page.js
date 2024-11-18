'use client';

import { useState } from 'react';

export default function HomePage() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [language, setLanguage] = useState('ro');
  const [loading, setLoading] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    console.log(startDate, endDate);

    try {
      const response = await fetch('/api/documents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          startDate,
          endDate,
          language,
          index: 'articles', // Modifică cu numele indexului tău
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setDownloadUrl(data.downloadUrl);
      } else {
        alert('A apărut o eroare: ' + data.error);
      }
    } catch (error) {
      console.error('Eroare:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
      <div>
        <h1>Document Downloader</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Start Date:</label>
            <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
            />
          </div>
          <div>
            <label>End Date:</label>
            <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                required
            />
          </div>
          <div>
            <label>Language:</label>
            <input
                type="text"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                required
            />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? 'Generating...' : 'Generate Document'}
          </button>
        </form>

        {downloadUrl && (
            <div>
              <p>Download your file:</p>
              <a href={downloadUrl} download={`${startDate}-${endDate}.docx`}>
                Click here to download
              </a>
            </div>
        )}
      </div>
  );
}