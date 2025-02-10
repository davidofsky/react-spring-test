"use client"
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { animated } from '@react-spring/web'
import { Position } from './SnakeGame'
import { SnakeSpringValue } from './SnakeSpring'

type Props = {
  snakePartSize: number
  applePosition: Position|null
  setApplePosition: Dispatch<SetStateAction<Position>>
  appleEaten: boolean
}

export default function Apple(props: Props) {
  const myX = SnakeSpringValue(0)
  const myY = SnakeSpringValue(0)

  const setNewPosition = () => {
    const container = document.getElementById("snakegame");
    if (!container || !container.parentElement) return;

    const size = props.snakePartSize
    const width = container.parentElement.clientWidth-size;
    const height = container.parentElement.clientHeight-size;
    const positionsX = width/(size);
    const positionsY = height/(size);

    const x = (width/positionsX)*(Math.floor(Math.random()*positionsX))
    const y = (height/positionsY)*(Math.floor(Math.random()*positionsY))

    props.setApplePosition({ x, y })
    myX.start(x)
    myY.start(y)
  }

  useEffect(() => {if(props.appleEaten)setNewPosition()}, [props.appleEaten])


  return (
    <animated.div style={{
      position: 'absolute',
      background: 'transparent',
      width: props.snakePartSize-2,
      height: props.snakePartSize-2,
      border: '2px solid white',
      borderRadius: 8,
      x: myX,
      y: myY
    }}></animated.div>
  );
}

