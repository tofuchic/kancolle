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

interface Mikans extends Array<Mikan> {}

export const MikanDetail = (): JSX.Element => {
  const [mikan, setMikan] = useState<Mikan>({
    id: 'unshu',
    userId: 'userId',
    taste: -10,
    texture: 10,
    note: 'memoです'
  })

  useEffect(() => {
    void getMikanItems()
  }, [])

  const getMikanItems = async (): Promise<void> => {
    // 取得結果をコンソールに出力
    const unshusRef = collection(db, 'unshu')
    const unshusSnapshot = await getDocs(unshusRef)
    const unshuList = unshusSnapshot.docs.map((doc) => doc.data())
    console.log('↓unshuList↓')
    console.log(unshuList)
    console.log('↑unshuList↑')
    const allMikans: Mikans = [
      {
        id: 'unshu',
        userId: 'userId',
        taste: -10,
        texture: 10,
        note: 'memoです'
      }
    ]
    console.log(allMikans)
    setMikan(allMikans[0])
  }

  return (
    <div>
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
