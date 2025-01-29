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
      <h1 style={{fontSize: '2em'}} >SNAKE</h1>
      <div style={{
        width: '50rem',
        height: '50rem',
        border: '2px dotted gray',
        borderRadius: 8,
      }}>
         <SnakeGame/>
      </div>
    </div>
  );
}
