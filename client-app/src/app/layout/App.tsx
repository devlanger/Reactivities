import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Header, List } from 'semantic-ui-react';
import { IGame } from '../models/game'

function App() {
  const [games, setGames] = useState<IGame[]>([]);

  useEffect(() => {
    axios.get<IGame[]>('http://localhost:5000/api/games').then(response => {
      console.log(response);
      setGames(response.data);
    })
  }, []);

  return (
    <div>
          <Header as='h2' icon='users' content='Reactivities'></Header>
          <List>
          {games.map((game) => (
            <List.Item key={game.id}>
                {game.category}
            </List.Item>
          ))}
          </List>
    </div>
  );
}

export default App;
