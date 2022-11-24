import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

function App() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/games').then(response => {
      console.log(response);
      setGames(response.data);
    })
  }, []);

  return (
    <div>
      <header>
        <ul>
          {games.map((game: any) => (
            <li key={game.id}>
                {game.title}
            </li>
          ))}
        </ul>
      </header>
    </div>
  );
}

export default App;
