import { useState } from 'react'

export function useFormHelps() {
  const [repeat, setRepeat] = useState(false)
  return {
    repeat,
    setRepeat,
  }
}
