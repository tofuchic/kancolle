import React, { useState, useEffect } from 'react'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { auth, db } from '@/services/auth/firebase'
import {
  Grid,
  TextField,
  Slider,
  Box,
  Skeleton,
  CircularProgress
} from '@mui/material'
import styled from '@emotion/styled'
import { useDebounce } from '@/hooks/useDebounce'
import useLocalStorage from '@/hooks/useLocalStorage'

interface Mikan {
  id: string
  userId?: string
  taste?: number
  texture?: number
  note?: string
}

interface Props {
  displayName: string
  canUpdate: boolean
}

export const MikanDetail = (props: Props): React.ReactElement => {
  const { displayName, canUpdate } = props
  const [loaded, setLoaded] = useState<boolean>(false)
  const [mikan, setMikan] = useLocalStorage<Mikan>(displayName, {
    id: displayName
  })
  const [mikanNote, setMikanNote] = useState<string | null>(null)

  useEffect(() => {
    console.debug('useEffect')
    if (mikan.userId == null) {
      void getMyMikanData()
    } else {
      setLoaded(true)
    }
  }, [mikan])

  const getMyMikanData = async (): Promise<void> => {
    console.debug(MikanDetail.name + ': getDoc from firestore')
    const mikan = await getDoc(
      doc(db, 'mikan', displayName, 'userId', String(auth.currentUser?.uid))
    )
    const mikanData = mikan.data()

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
        note: ''
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

  const debouncedInputMikan = useDebounce(mikan, 500)
  const debouncedInputText = useDebounce(mikanNote, 500)
  const handleMikanNoteChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => setMikanNote(event.target.value)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const patchMyMikanData = async (): Promise<void> => {
    console.debug(MikanDetail.name + ': setDoc to firestore')
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
    if (canUpdate) {
      void patchMyMikanData()
    }
  }, [debouncedInputText, debouncedInputMikan])

  return (
    <div>
      <h1>{mikan.id}</h1>
      <div style={{ textAlign: 'center' }}>
        <img
          className="image-mikan"
          src={`https://github.com/tofuchic/kancolle/raw/main/public/mikan/${displayName}.png`}
        />
      </div>
      {loaded && (
        <>
          <h3>{mikan.userId}さんの評価</h3>
          <div style={{ padding: '8px' }}></div>
          <Grid container>
            <Grid item xs={3}>
              <Column>酸っぱい</Column>
            </Grid>
            <Grid item xs={6}>
              <Box>
                {canUpdate ? (
                  <Slider
                    aria-label="Taste"
                    defaultValue={mikan.taste}
                    getAriaValueText={mikanTaste}
                    onChangeCommitted={mikanTasteChange}
                    step={1}
                    marks
                    min={-5}
                    max={5}
                  />
                ) : (
                  <Slider
                    disabled={true}
                    aria-label="Taste"
                    defaultValue={mikan.taste}
                    getAriaValueText={mikanTaste}
                    onChangeCommitted={mikanTasteChange}
                    step={1}
                    marks
                    min={-5}
                    max={5}
                  />
                )}
              </Box>
            </Grid>
            <Grid item xs={3}>
              <Column>甘い</Column>
            </Grid>
          </Grid>

          <Grid container>
            <Grid item xs={3}>
              <Column>しゃきしゃき</Column>
            </Grid>
            <Grid item xs={6}>
              {canUpdate ? (
                <Slider
                  aria-label="Texture"
                  defaultValue={mikan.texture}
                  getAriaValueText={mikanTexture}
                  onChangeCommitted={mikanTextureChange}
                  step={1}
                  marks
                  min={-5}
                  max={5}
                />
              ) : (
                <Slider
                  disabled={true}
                  aria-label="Texture"
                  defaultValue={mikan.texture}
                  getAriaValueText={mikanTexture}
                  onChangeCommitted={mikanTextureChange}
                  step={1}
                  marks
                  min={-5}
                  max={5}
                />
              )}
            </Grid>
            <Grid item xs={3}>
              <Column>とろとろ</Column>
            </Grid>
          </Grid>
          <div style={{ padding: '8px', marginTop: '10px' }}>
            {canUpdate ? (
              <TextField
                id={displayName}
                label="メモ"
                multiline
                fullWidth
                rows={4}
                defaultValue={mikan.note}
                placeholder="メモを入力してください"
                onKeyUp={mikanNoteChange}
                onChange={handleMikanNoteChange}
              />
            ) : (
              <TextField
                disabled={true}
                id={displayName}
                label="メモ"
                multiline
                fullWidth
                rows={4}
                defaultValue={mikan.note}
                placeholder="メモを入力してください"
                onKeyUp={mikanNoteChange}
                onChange={handleMikanNoteChange}
              />
            )}
          </div>
        </>
      )}
      {loaded || (
        <>
          <div style={{ margin: '16px 0px 16px 40px' }}>
            <CircularProgress size="32px"/>
          </div>
          <div style={{ padding: '16px 64px 8px 64px' }}>
            <Skeleton animation="wave" />
          </div>
          <div style={{ padding: '16px 64px 8px 64px' }}>
            <Skeleton animation="wave" />
          </div>
          <div style={{ padding: '16px' }}>
            <Skeleton animation="wave" variant="rectangular" height={140} />
          </div>
        </>
      )}
    </div>
  )
}

const Column = styled.span`
  display: block;
  text-align: center;
`
