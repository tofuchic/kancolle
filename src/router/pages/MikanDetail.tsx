import React, { useState, useEffect } from 'react'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { auth, db } from '@/services/auth/firebase'
import { ReactComponent as AmaiIcon } from '@/assets/amai_icon.svg'
import { ReactComponent as SuppaiIcon } from '@/assets/suppai_icon.svg'
import { ReactComponent as TorotoroIcon } from '@/assets/torotoro_icon.svg'
import { ReactComponent as ShakishakiIcon } from '@/assets/shakishaki_icon.svg'
import {
  Grid,
  TextField,
  Slider,
  Box,
  Skeleton,
  CircularProgress,
  Typography,
} from '@mui/material'
import styled from '@emotion/styled'
import { useDebounce } from '@/hooks/useDebounce'
import useLocalStorage from '@/hooks/useLocalStorage'

interface MikanProfile {
  id: string
  type: string
  name?: string
  imageUrl?: string
}

interface PublicMikanReview {
  type: string
  taste?: number
  texture?: number
}

interface PrivateMikanReview {
  type: string
  note?: string
}

interface Props {
  displayName: string
  canUpdate: boolean
}

export const MikanDetail = (props: Props): React.ReactElement => {
  const { displayName, canUpdate } = props
  const [loaded, setLoaded] = useState<boolean>(false)

  const [mikanProfile, setMikanProfile] = useLocalStorage<MikanProfile>(
    displayName + '_profile',
    {
      id: displayName,
      type: 'profile',
    }
  )

  const [publicMikanReview, setPublicMikanReview] =
    useLocalStorage<PublicMikanReview>(displayName + '_public', {
      type: 'public_review',
    })

  const [privateMikanReview, setPrivateMikanReview] =
    useLocalStorage<PrivateMikanReview>(displayName + '_private', {
      type: 'private_review',
    })

  const [
    comparisonTargetPublicMikanReview,
    setComparisonTargetPublicMikanReview,
  ] = useState<PublicMikanReview>(publicMikanReview)

  const [
    comparisonTargetPrivateMikanReview,
    setComparisonTargetPrivateMikanReview,
  ] = useState<PrivateMikanReview>(privateMikanReview)

  useEffect(() => {
    async function fetchData() {
      // You can await here
      if (mikanProfile.name == null) {
        void getMikanProfile()
      } else if (
        publicMikanReview.taste == null ||
        publicMikanReview.texture == null
      ) {
        setComparisonTargetPublicMikanReview(await getMyMikanPublicReview())
      } else if (privateMikanReview.note == null) {
        setComparisonTargetPrivateMikanReview(await getMyMikanPrivateReview())
      } else {
        setLoaded(true)
      }
    }
    console.debug(MikanDetail.name + ': useEffect')
    fetchData()
  }, [mikanProfile, publicMikanReview, privateMikanReview])

  const getMikanProfile = async (): Promise<void> => {
    if (auth.currentUser != null) {
      console.debug(MikanDetail.name + ': getMikanProfile from firestore')
      const mikanRef = await getDoc(doc(db, 'mikans', displayName))
      const mikanProfile = mikanRef.data()

      if (mikanProfile !== undefined) {
        setMikanProfile({
          id: displayName,
          type: 'profile',
          name: mikanProfile.name,
          imageUrl: mikanProfile.imageUrl,
        })
      }
    }
  }

  const getMyMikanPublicReview = async (): Promise<PublicMikanReview> => {
    if (auth.currentUser != null) {
      console.debug(
        MikanDetail.name + ': getMyMikanPublicReview from firestore'
      )
      const mikan = await getDoc(
        doc(
          db,
          'mikans',
          displayName,
          'public_reviews',
          String(auth.currentUser?.uid)
        )
      )
      const mikanData = mikan.data()

      if (mikanData !== undefined) {
        setPublicMikanReview({
          type: 'public_review',
          taste: mikanData.taste,
          texture: mikanData.texture,
        })
      } else {
        setPublicMikanReview({
          type: 'public_review',
          taste: 0,
          texture: 0,
        })
      }
    }
    return publicMikanReview
  }

  const getMyMikanPrivateReview = async (): Promise<PrivateMikanReview> => {
    if (auth.currentUser != null) {
      console.debug(
        MikanDetail.name + ': getMyMikanPrivateReview from firestore'
      )
      const mikan = await getDoc(
        doc(
          db,
          'mikans',
          displayName,
          'private_reviews',
          String(auth.currentUser?.uid)
        )
      )
      const mikanData = mikan.data()

      if (mikanData !== undefined) {
        setPrivateMikanReview({
          type: 'private_review',
          note: mikanData.note,
        })
      } else {
        setPrivateMikanReview({
          type: 'private_review',
          note: '',
        })
      }
    }
    return privateMikanReview
  }

  function mikanTaste(value: number): string {
    return `${value}`
  }

  function mikanTasteChange(
    _event: React.SyntheticEvent | Event,
    value: number | number[]
  ): void {
    setPublicMikanReview({
      type: publicMikanReview.type,
      taste: Number(value),
      texture: publicMikanReview.texture,
    })
  }

  function mikanTexture(value: number): string {
    return `${value}`
  }

  function mikanTextureChange(
    _event: React.SyntheticEvent | Event,
    value: number | number[]
  ): void {
    setPublicMikanReview({
      type: publicMikanReview.type,
      taste: publicMikanReview.taste,
      texture: Number(value),
    })
  }

  const mikanNoteChanged = (): void => {
    const innerText = (document.getElementById(displayName) as HTMLInputElement)
      .value
    setPrivateMikanReview({
      type: privateMikanReview.type,
      note: innerText,
    })
  }

  const debouncedPublicMikanReview = useDebounce(publicMikanReview, 500)
  const debouncedPrivateMikanReview = useDebounce(privateMikanReview, 500)

  const patchMyMikanPublicReview = async (): Promise<void> => {
    console.debug(MikanDetail.name + ': patchMyMikanPublicReview to firestore')
    if (auth.currentUser != null) {
      const mikanRef = doc(
        db,
        'mikans',
        displayName,
        'public_reviews',
        String(auth.currentUser?.uid)
      )

      const updateMikan: PublicMikanReview = {
        type: publicMikanReview.type,
        taste: publicMikanReview.taste,
        texture: publicMikanReview.texture,
      }

      await setDoc(mikanRef, updateMikan)
      setComparisonTargetPublicMikanReview(updateMikan)
    }
  }

  const patchMyMikanPrivateReview = async (): Promise<void> => {
    console.debug(MikanDetail.name + ': patchMyMikanPrivateReview to firestore')
    if (auth.currentUser != null) {
      const mikanRef = doc(
        db,
        'mikans',
        displayName,
        'private_reviews',
        String(auth.currentUser?.uid)
      )

      const updateMikan: PrivateMikanReview = {
        type: privateMikanReview.type,
        note: privateMikanReview.note,
      }

      await setDoc(mikanRef, updateMikan)
      setComparisonTargetPrivateMikanReview(updateMikan)
    }
  }

  useEffect(() => {
    console.debug('debouncedPublicMikanReview useEffect')
    if (canUpdate) {
      if (
        publicMikanReview.taste != comparisonTargetPublicMikanReview.taste ||
        publicMikanReview.texture != comparisonTargetPublicMikanReview.texture
      ) {
        void patchMyMikanPublicReview()
      } else {
        console.debug('skip db write access')
      }
    }
  }, [debouncedPublicMikanReview])

  useEffect(() => {
    console.debug('debouncedPrivateMikanReview useEffect')
    if (canUpdate) {
      if (privateMikanReview.note != comparisonTargetPrivateMikanReview.note) {
        void patchMyMikanPrivateReview()
      } else {
        console.debug('skip db write access')
      }
    }
  }, [debouncedPrivateMikanReview])

  return (
    <div>
      <Typography sx={{ my: 3 }} variant={'h1'} fontSize="2em">
        {mikanProfile.name}
      </Typography>
      <div style={{ textAlign: 'center' }}>
        {mikanProfile.imageUrl == null && (
          <img
            className="image-mikan"
            src={`https://github.com/tofuchic/kancolle/raw/main/public/mikan/${displayName}.png`}
          />
        )}
        {mikanProfile.imageUrl != null && (
          <img className="image-mikan" src={mikanProfile.imageUrl} />
        )}
      </div>
      {loaded && (
        <>
          <Typography sx={{ my: 3 }} variant={'h2'} fontSize="1.5em">
            {auth.currentUser?.displayName}さん の評価
          </Typography>
          <Grid container sx={{ my: 1 }}>
            <Grid item xs={3}>
              <Column>
                <SuppaiIcon />
                <Typography variant={'body1'}>酸っぱい</Typography>
              </Column>
            </Grid>
            <Grid item xs={6}>
              <Box>
                {canUpdate ? (
                  <Slider
                    aria-label="Taste"
                    defaultValue={publicMikanReview.taste}
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
                    defaultValue={publicMikanReview.taste}
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
              <Column>
                <AmaiIcon />
                <Typography variant={'body1'}>甘い</Typography>
              </Column>
            </Grid>
          </Grid>

          <Grid container sx={{ my: 1 }}>
            <Grid item xs={3}>
              <Column>
                <ShakishakiIcon />
                <Typography variant={'body1'}>しゃきしゃき</Typography>
              </Column>
            </Grid>
            <Grid item xs={6}>
              {canUpdate ? (
                <Slider
                  aria-label="Texture"
                  defaultValue={publicMikanReview.texture}
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
                  defaultValue={publicMikanReview.texture}
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
              <Column>
                <TorotoroIcon />
                <Typography variant={'body1'}>とろとろ</Typography>
              </Column>
            </Grid>
          </Grid>
          <Grid container sx={{ my: 1 }}>
            <Grid item xs={12}>
              {canUpdate ? (
                <TextField
                  id={displayName}
                  label="メモ"
                  multiline
                  fullWidth
                  rows={4}
                  defaultValue={privateMikanReview.note}
                  placeholder="メモを入力してください"
                  onChange={mikanNoteChanged}
                  sx={{ my: 1 }}
                />
              ) : (
                <TextField
                  disabled={true}
                  id={displayName}
                  label="メモ"
                  multiline
                  fullWidth
                  rows={4}
                  defaultValue={privateMikanReview.note}
                  placeholder="メモを入力してください"
                  onChange={mikanNoteChanged}
                  sx={{ my: 1 }}
                />
              )}
            </Grid>
          </Grid>
        </>
      )}
      {auth.currentUser == null || loaded || (
        <>
          <CircularProgress size="32px" sx={{ mx: 5 }} />
          <Skeleton animation="wave" sx={{ mx: 8, my: 3 }} />
          <Skeleton animation="wave" sx={{ mx: 8, my: 3 }} />
          <Skeleton
            animation="wave"
            variant="rectangular"
            height={140}
            sx={{ m: 2 }}
          />
        </>
      )}
    </div>
  )
}

const Column = styled.span`
  display: block;
  text-align: center;
`
