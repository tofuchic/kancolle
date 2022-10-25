/* eslint-disable react/react-in-jsx-scope */
import { useState, useEffect } from 'react'
import { doc, getDoc } from 'firebase/firestore'
import logo from '@/assets/logo.svg'
import { auth, db } from '@/services/auth/firebase'
import TextField from '@mui/material/TextField'
import Slider from '@mui/material/Slider'
import Box from '@mui/material/Box'
import styled from '@emotion/styled'

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
  const [mikanNote, setMikanNote] = useState<string>()

  function mikanTaste(value: number): string {
    return `${value}`
  }

  function mikanTasteChangeCommitted(
    _event: React.SyntheticEvent | Event,
    value: number | number[]
  ): void {
    setMikan({
      id: mikan.id,
      userId: mikan.userId,
      taste: Number(value),
      texture: mikan.texture,
      note: mikan.note
    })
    // fire patch to db
  }

  function mikanTexture(value: number): string {
    return `${value}`
  }

  function mikanTextureChangeCommitted(
    _event: React.SyntheticEvent | Event,
    value: number | number[]
  ): void {
    setMikan({
      id: mikan.id,
      userId: mikan.userId,
      taste: mikan.taste,
      texture: Number(value),
      note: mikan.note
    })
    // fire patch to db
  }

  useEffect(() => {
    void getMyMikanData()
  }, [])

  const getMyMikanData = async (): Promise<void> => {
    console.debug('auth.currentUser?.uid:', auth.currentUser?.uid)
    const mikan = await getDoc(
      doc(db, 'mikan', 'unshu', 'userId', String(auth.currentUser?.uid))
    )
    const mikanData = mikan.data()
    console.debug('↓myMikan↓')
    console.debug(mikanData)
    console.debug('↑myMikan↑')

    if (mikanData !== undefined) {
      setMikan({
        id: 'unshu',
        userId: String(auth.currentUser?.displayName),
        taste: mikanData.taste,
        texture: mikanData.texture,
        note: mikanData.note
      })
      setMikanNote(mikanData.note)
    }
  }

  // TODO: 皆のデータを取得してグラフにするよ
  const getAllMikanData = async (): Promise<void> => {
    // const myMikanQuery = query(
    //   collection(db, 'mikan'),
    //   where('userId', '==', auth.currentUser?.uid)
    // )
    // const myMikanDocument = await getDocs(myMikanQuery)
    // const myMikan = myMikanDocument.docs.map((doc) => doc.data())
    // // console.log('↓myMikan↓')
    // // console.log(myMikan)
    // // console.log('↑myMikan↑')
    // const mikan = await getDoc(
    //   doc(db, 'mikan', 'unshu', 'userId', String(auth.currentUser?.uid))
    // )
    // const mikanData = mikan.data()
    // console.log('↓myMikan↓')
    // console.log(mikanData)
    // console.log('↑myMikan↑')
    // if (mikanData !== undefined) {
    //   const myMikan: Mikan = {
    //     id: 'unshu',
    //     userId: String(auth.currentUser?.displayName),
    //     taste: mikanData.taste,
    //     texture: mikanData.texture,
    //     note: mikanData.note
    //   }
    //   console.log(myMikan)
    //   setMikan(myMikan)
    // }
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
      <TateWrapper>
        <Wrapper>
          <Column>酸っぱい</Column>
          <Box sx={{ width: 300 }}>
            <Slider
              aria-label="Taste"
              defaultValue={mikan.taste}
              getAriaValueText={mikanTaste}
              onChangeCommitted={mikanTasteChangeCommitted}
              step={1}
              marks
              min={-5}
              max={5}
            />
          </Box>
          <Column>甘い</Column>
        </Wrapper>
        <Wrapper>
          <Column>しゃきしゃき</Column>
          <Box sx={{ width: 300 }}>
            <Slider
              aria-label="Texture"
              defaultValue={mikan.texture}
              getAriaValueText={mikanTexture}
              onChangeCommitted={mikanTextureChangeCommitted}
              step={1}
              marks
              min={-5}
              max={5}
            />
          </Box>
          <Column>とろとろ</Column>
        </Wrapper>
      </TateWrapper>
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
      <TextField
        id="outlined-multiline-static"
        label="メモ"
        multiline
        rows={4}
        defaultValue="メモを入力してください"
        value={mikanNote}
      />
    </div>
  )
}

const TateWrapper = styled.section`
  align-items: center;
`

const Wrapper = styled.section`
  display: flex;
  align-items: center;
`

const Column = styled.span`
  margin-left: 24px;
  margin-right: 24px;
  width: 100px;
  display: block;
  text-align: center;
`
