import { useState, useEffect } from 'react'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { auth, db } from '@/services/auth/firebase'
import TextField from '@mui/material/TextField'
import Slider from '@mui/material/Slider'
import Box from '@mui/material/Box'
import styled from '@emotion/styled'
import { useDebounce } from '@/hooks/useDebounce'

interface Mikan {
  id: string
  userId?: string
  taste?: number
  texture?: number
  note?: string
}

export const MikanDetail = (props: any) => {
  const { displayName } = props
  const [loaded, setLoaded] = useState<boolean>(false)
  const [mikan, setMikan] = useState<Mikan>({
    id: displayName
  })
  const [mikanNote, setMikanNote] = useState<string | null>(null)

  useEffect(() => {
    console.debug('useEffect')
    void getMyMikanData()
  }, [])

  const getMyMikanData = async (): Promise<void> => {
    console.debug('auth.currentUser?.uid:', auth.currentUser?.uid)
    const mikan = await getDoc(
      doc(db, 'mikan', displayName, 'userId', String(auth.currentUser?.uid))
    )
    const mikanData = mikan.data()
    console.debug('↓myMikan↓')
    console.debug(mikanData)
    console.debug('↑myMikan↑')

    if (mikanData !== undefined) {
      setMikan({
        id: displayName,
        userId: String(auth.currentUser?.displayName),
        taste: mikanData.taste,
        texture: mikanData.texture,
        note: mikanData.note
      })
    } else {
      setMikan({
        id: displayName,
        userId: String(auth.currentUser?.displayName),
        taste: 0,
        texture: 0,
        note: 'メモを入力してください'
      })
    }
    setLoaded(true)
  }

  function mikanTaste(value: number): string {
    return `${value}`
  }

  function mikanTasteChange(
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
  }

  function mikanTexture(value: number): string {
    return `${value}`
  }

  function mikanTextureChange(
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
  }

  function mikanNoteChange(): void {
    const innerText = (document.getElementById(displayName) as HTMLInputElement)
      .value
    setMikan({
      id: mikan.id,
      userId: mikan.userId,
      taste: mikan.taste,
      texture: mikan.texture,
      note: innerText
    })
  }

  const debouncedInputText = useDebounce(mikanNote, 500)
  const handleMikanNoteChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => setMikanNote(event.target.value)

  function patchMikan(
    _event: React.SyntheticEvent | Event,
    _value: number | number[]
  ): void {
    // fire patch to db
    void patchMyMikanData()
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const patchMyMikanData = async (): Promise<void> => {
    console.debug('auth.currentUser?.uid:', auth.currentUser?.uid)
    const mikanRef = doc(
      db,
      'mikan',
      displayName,
      'userId',
      String(auth.currentUser?.uid)
    )

    const updateMikan = {
      taste: mikan.taste,
      texture: mikan.texture,
      note: mikan.note
    }

    await setDoc(mikanRef, updateMikan)
  }

  useEffect(() => {
    console.debug('useEffect with debounce')
    void patchMyMikanData()
  }, [debouncedInputText, patchMyMikanData])

  return (
    <div>
      <h1>{mikan.id}</h1>
      <div>
        <img
          src={`https://github.com/tofuchic/kancolle/raw/main/public/mikan/${displayName}.png`}
        />
      </div>
      {loaded && (
        <>
          <>
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
                    onChange={mikanTasteChange}
                    onChangeCommitted={patchMikan}
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
                    onChange={mikanTextureChange}
                    onChangeCommitted={patchMikan}
                    step={1}
                    marks
                    min={-5}
                    max={5}
                  />
                </Box>
                <Column>とろとろ</Column>
              </Wrapper>
            </TateWrapper>
          </>
          <TextField
            id={displayName}
            label="メモ"
            multiline
            rows={4}
            defaultValue={mikan.note}
            onKeyUp={mikanNoteChange}
            onChange={handleMikanNoteChange}
          />
        </>
      )}
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
