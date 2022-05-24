import React, {useState, useEffect, useCallback} from 'react'
import axios, {AxiosResponse, AxiosError} from 'axios'
import { useParams } from 'react-router-dom';

import {useMessage} from 'hooks/message.hook'
import AddOffer from 'components/AddOffer'

import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'
import CssBaseline from '@mui/material/CssBaseline'
import CircularProgress from '@mui/material/CircularProgress'

interface IGame {
  categories: string[] | null,
  imageName: string | null,
  title: string | null,
  _id: string | null,
}

const AddOfferPage = () => {
  return (
    <Container component='main' sx={{pt: 3, pb: 3}}>
        <CssBaseline />
        <AddOffer />
    </Container>
  )
}

export default AddOfferPage