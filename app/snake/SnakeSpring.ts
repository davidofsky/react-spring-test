import { useSpringValue } from '@react-spring/web'



export const SnakeSpringValue = (value: number) => {
  return useSpringValue(value, {
    config: {
      mass: 0.1,
      friction: 5,
      tension: 40,
    }, 
  })
}
