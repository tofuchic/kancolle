import { useEffect, useState } from 'react'

export function useLocalStorage<T>(key: string, initialValue: T): any[] {
  const [value, setValue] = useState(() => {
    const keyValue = localStorage.getItem(key)
    return keyValue != null ? JSON.parse(keyValue) : initialValue
  })

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue]
}

export default useLocalStorage
