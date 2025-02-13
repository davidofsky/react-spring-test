"use client"
import { useState, useEffect, useRef } from 'react'
import { useDrag } from '@use-gesture/react'
import SnakePart from './SnakePart'
import Apple from './Apple'

enum Direction {
  up, down, left, right
}

export type Position = {x:number, y:number};

type Props = {
  onRestart: () => any
}

export default function SnakeGame(props: Props) {
  const size = 50; // <- this is static

  const [timer, setTimer] = useState<null|number>();
  const [snakeX, setSnakeX] = useState(0);
  const [snakeY, setSnakeY] = useState(0);
  const [applePosition, setApplePosition] = useState<Position>({x:0,y:0})
  const [appleEaten, setAppleEaten] = useState<boolean>(false);

  const gameOver = useRef(false); // Use ref to persist direction across renders
  const direction = useRef(Direction.right); // Use ref to persist direction across renders
  const prevDirection = useRef(Direction.right)

  const move = () => {
    if (gameOver.current == true ) return;
    if (direction.current >= 2) {
      setSnakeX((prevX) => {
        if (direction.current === 2) return prevX - size; // left
        if (direction.current === 3) return prevX + size; // right
        return prevX; // No change for up or down
      });
    }
    else {
      setSnakeY((prevY) => {
        if (direction.current === 0) return prevY - size; // up
        if (direction.current === 1) return prevY + size; // down
        return prevY; // No change for left or right
      });
    }
    prevDirection.current = direction.current
  };

  const handleKey = (e: KeyboardEvent) => {
    if (e.key === 'ArrowUp'    && allowDirection(Direction.up))     direction.current = Direction.up;
    if (e.key === 'ArrowDown'  && allowDirection(Direction.down))   direction.current = Direction.down;
    if (e.key === 'ArrowLeft'  && allowDirection(Direction.left))   direction.current = Direction.left;
    if (e.key === 'ArrowRight' && allowDirection(Direction.right))  direction.current = Direction.right;
    if (e.key === ' ') setAppleEaten(true);
    if (e.key === 'r') props.onRestart();
  };

  const allowDirection = (newDirection: Direction) => {
    switch (newDirection) {
      case Direction.down: 
        return prevDirection.current !== Direction.up
      case Direction.up: 
        return prevDirection.current !== Direction.down
      case Direction.left: 
        return prevDirection.current !== Direction.right
      case Direction.right: 
        return prevDirection.current !== Direction.left
    } 
  }

  useEffect(() => {
    if (timer == null) {
      setTimeout(() => {
        document.onkeydown = null; // Cleanup keydown listener
        document.onkeydown = handleKey; // Attach the keydown listener
        const interval = setInterval(move, 100); // Start moving the box every second
        setTimer(parseInt(interval.toString()));
      },1000)
    }

    return () => {
      console.log(timer)
      if (timer) clearInterval(timer); // Cleanup interval on unmount
    };
  }, [timer]);

  const bind = useDrag(({offset: [x,y]}) => console.log(x,y))

  return (
    <div id="snakegame" {...bind()} style={{
      width: "100%", 
      height: "100%",
    }}>
      <Apple snakePartSize={size} applePosition={applePosition} setApplePosition={setApplePosition} appleEaten={appleEaten}/>
      <SnakePart x={snakeX} y={snakeY} size={size} hasChild={true} isHead={true} 
        appleEaten={appleEaten} setAppleEaten={setAppleEaten}
        applePosition={applePosition}
        onCollision={_ => {gameOver.current=true;}}
      />
    </div>
  );
}


