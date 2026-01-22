import {
  useReducedMotion,
  FadeInUp,
  FadeOutUp,
  FadeInRight,
  FadeOutRight,
  FadeOutDown,
} from 'react-native-reanimated'

export const useAnimationConfig = () => {
  const reduceMotion = useReducedMotion()

  const entering = (duration = 400, delay = 0) => {
    if (reduceMotion) return undefined
    return FadeInUp.duration(duration).delay(delay)
  }

  const exiting = (duration = 200) => {
    if (reduceMotion) return undefined
    return FadeOutDown.duration(duration)
  }

  const enteringRight = (duration = 200) => {
    if (reduceMotion) return undefined
    return FadeInRight.duration(duration)
  }

  const exitingRight = (duration = 150) => {
    if (reduceMotion) return undefined
    return FadeOutRight.duration(duration)
  }

  const exitingUp = (duration = 150) => {
    if (reduceMotion) return undefined
    return FadeOutUp.duration(duration)
  }

  return {
    reduceMotion,
    entering,
    exiting,
    enteringRight,
    exitingRight,
    exitingUp,
  }
}
