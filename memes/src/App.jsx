import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [memes, setMemes] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://api.imgflip.com/get_memes')
      .then((res) => res.json())
      .then((data) => {
        setMemes(data.data.memes);
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to fetch memes.');
        setLoading(false);
      });
  }, []);

  const handleToggle = () => {
    if (memes.length > 0) {
      let nextIndex = Math.floor(Math.random() * memes.length);
      // Avoid showing the same meme twice in a row
      while (nextIndex === currentIndex && memes.length > 1) {
        nextIndex = Math.floor(Math.random() * memes.length);
      }
      setCurrentIndex(nextIndex);
    }
  };

  return (
    <div className="meme-app-container">
      <h1>Meme Generator</h1>
      {loading && <p>Loading memes...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && memes.length > 0 && (
        <div className="meme-card">
          <img
            src={memes[currentIndex].url}
            alt={memes[currentIndex].name}
            className="meme-img"
          />
          <h2 className="meme-title">{memes[currentIndex].name}</h2>
          <button className="toggle-btn" onClick={handleToggle}>
            Show Another Meme
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
