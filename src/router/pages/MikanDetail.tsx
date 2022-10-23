/* eslint-disable react/react-in-jsx-scope */
import { useState, useEffect } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import logo from '@/assets/logo.svg'
import { db } from '@/services/auth/firebase'

interface Mikan {
  id: string
  userId: string
  taste: number
  texture: number
  note: string
}

export const MikanDetail = (): JSX.Element => {
  const [mikan, setMikan] = useState<Mikan>({
    id: 'unshu',
    userId: 'userId',
    taste: -10,
    texture: 10,
    note: 'memoです'
  })

  useEffect(() => {
    // 取得結果をコンソールに出力
    const unshusRef = collection(db, 'unshu')
    const unshusSnapshot = getDocs(unshusRef)
    setMikan({
      id: 'string',
      userId: 'string',
      taste: 10,
      texture: 10,
      note: 'string'
    })
    console.log(unshusSnapshot)
  }, [])

  return (
    <div>
      <h1>{import.meta.env.VITE_ENV_TEMP}</h1>
      <h1>{mikan.id}</h1>
      {/* {users.map((user) => (
        <div key={user.id}>
          {user.name} ({user.height}cm)
        </div>
      ))} */}
      <div>
        <img src={logo} className="App-logo" alt="logo" />
      </div>
      <div>
        <h3>{mikan.userId}さんの評価</h3>
      </div>
      <div>
        <a>酸っぱさ</a>
        {mikan.taste}
        <a>甘さ</a>
      </div>
      <div>
        <a>しゃきしゃき</a>
        {mikan.texture}
        <a>とろとろ</a>
      </div>
      <div>
        <h5>note</h5>
        <textarea>{mikan.note}</textarea>
      </div>
    </div>
  )
}
