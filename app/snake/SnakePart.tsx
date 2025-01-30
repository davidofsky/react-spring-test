"use client"
import { useEffect, useState, Dispatch, SetStateAction } from 'react'
import { animated } from '@react-spring/web'
import { SnakeSpringValue } from './SnakeSpring'
import { Position } from './SnakeGame'

type Props = {
  x: number
  y: number
  size: number
  hasChild: boolean
  appleEaten: boolean
  setAppleEaten: Dispatch<SetStateAction<boolean>>
  applePosition?: Position
  onCollision?: (_: number) => any
  onPositionUpdate?: (_: Position[]) => any
  isHead?: boolean
}


export default function SnakePart(props: Props) {
  const colors = ['#DDD5D0', '#CFC0BD', '#B8B8AA', '#7F9183', '#586F6B' ]
  const [nextChildX, setNextChildX] = useState<number|null>(null)
  const [nextChildY, setNextChildY] = useState<number|null>(null)
  const [childX, setChildX] = useState<number>(0)
  const [childY, setChildY] = useState<number>(0)
  const [hasGrandChild, setHasGrandChild] = useState(false)
  const [positions, setPositions] = useState<Position[]>([])

  const [myColor, setMyColor] = useState('white');

  const myX = SnakeSpringValue(props.x);  
  const myY = SnakeSpringValue(props.y);  

  useEffect(() => {
    if (nextChildX!=null) setChildX(nextChildX)
    if (nextChildY!=null) setChildY(nextChildY)
    setNextChildX(props.x)
    setNextChildY(props.y)
    myX.start(props.x)
    myY.start(props.y)

    // Update positions array
    const currentPosition = { x: props.x, y: props.y }
    const newPositions = [currentPosition]
    
    if (props.hasChild) {
      newPositions.push({ x: childX, y: childY })
    }
    
    setPositions(newPositions)

    if (props.onPositionUpdate) props.onPositionUpdate(newPositions)

    if (props.isHead) checkCollision();
  }, [props.x, props.y])

  useEffect(() => {
    if (props.appleEaten == true && hasGrandChild == false && props.hasChild == true) {
      props.setAppleEaten(false);
      setHasGrandChild(true);
    }
  }, [props.appleEaten])

  useEffect(()=>{if(!props.isHead)setMyColor(getRandomColor())},[])


  const checkCollision = () => {
    const list = positions.slice(1, -1);
    const colidingPart = list.findIndex(i => i.x == props.x && i.y == props.y);
    if (colidingPart !== -1) { // OH NO !!!
      if (props.onCollision) props.onCollision(colidingPart);
    }
    if (props.applePosition) {
      if (props.x == props.applePosition.x && props.y == props.applePosition.y) {
        props.setAppleEaten(true);
      }
    }

    // check out of bounds
    const container = document.getElementById("snakegame");
    if (!container || !container.parentElement) return;
    if (props.x < 0 ||
        props.y < 0 ||
        props.x > container.clientWidth ||
        props.y > container.clientHeight)  {
      if (props.onCollision) props.onCollision(colidingPart);
    }
  }

  const onPositionUpdate = (childPositions: Position[]) => {
    const updatedPositions = [{ x: props.x, y: props.y }, ...childPositions]
    setPositions(updatedPositions)
    if (props.onPositionUpdate) {
      props.onPositionUpdate(updatedPositions)
    }
  }

  const getRandomColor = () => {
    return colors[Math.floor(Math.random()*colors.length)]
  }

  return (
    <>
      <animated.div id="snakePart"
        style={{ 
          position: 'absolute',
          width:props.size-2, 
          height:props.size-2, 
          background: myColor, 
          zIndex: props.isHead?9:8,
          borderRadius: 8, 
          borderWidth: 1,
          borderColor: 'transparent',
          x: myX,
          y: myY,
        }}
        onClick={()=>{setHasGrandChild(true)}}
      />

      {props.hasChild && 
        <SnakePart 
          x={childX} 
          y={childY} 
          size={props.size} 
          hasChild={hasGrandChild} 
          onPositionUpdate={onPositionUpdate}
          appleEaten={props.appleEaten}
          setAppleEaten={props.setAppleEaten}
        />
      }
    </>
  );
}
