import { useSpringValue } from '@react-spring/web'



export const SnakeSpringValue = (value: number) => {
  return useSpringValue(value, {
    config: {
      mass: .2,
      friction: 3,
      tension: 50,
    }, 
  })
}
