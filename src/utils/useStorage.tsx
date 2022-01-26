import { useState } from 'react';

function useStorage(key: string, value?: string): [string, (v: string) => void, () => void] {
  const [storageValue, setStorageValue] = useState(
    JSON.parse(localStorage.getItem(key)) || undefined
  )
  const _setStorageValue = (value: string) => {
    console.log('tokeee')
    localStorage.setItem(key, JSON.stringify(value))
    if (value !== storageValue) {
      setStorageValue(JSON.stringify(value))
    }
  }
  const removeStorage = () => {
    localStorage.removeItem(key)
  }
  return [storageValue, _setStorageValue, removeStorage]
}

export default useStorage