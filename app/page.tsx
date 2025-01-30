"use client"
import SnakeGame from './snake/SnakeGame'

export default function Home() {

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
         <SnakeGame/>
      </div>
    </div>
  );
}
