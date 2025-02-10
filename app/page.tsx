"use client"
import { useState, useEffect } from 'react' 
import SnakeGame from './snake/SnakeGame'

export default function Home() {

  const [showGame, setShowGame] = useState(true);

  useEffect(() => {setShowGame(true)}, [showGame])

  const onRestart = () => {
    setShowGame(false);
  }

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
    }}>
      <div style={{
        left:0, right: 0,
        width: '100vw',
        height: '100vh',
        borderRadius: 8,
      }}>
        {showGame &&
          <SnakeGame onRestart={onRestart}/>
        }
      </div>
    </div>
  );
}
