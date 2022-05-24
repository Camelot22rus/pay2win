import React, {useState, useEffect, useCallback} from 'react'
import axios, {AxiosResponse, AxiosError} from 'axios'
import { useParams } from 'react-router-dom';

import {useMessage} from 'hooks/message.hook'

import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'
import CssBaseline from '@mui/material/CssBaseline'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import CircularProgress from '@mui/material/CircularProgress'

interface IGame {
  categories: string[] | null,
  imageName: string | null,
  title: string | null,
  _id: string | null,
}

const GamePage = () => {
  const {gameId, tab} = useParams()
  const [loading, setLoading] = useState<boolean>(true)
  const [tabPanel, setTabPanel] = React.useState<number>((tab ? +tab : 0));
  const [game, setGame] = useState<IGame>({
    categories: null,
    imageName: null,
    title: null,
    _id: null})
  const message = useMessage()
  
  const getGames = useCallback(async () => {
    axios.get(`/api/games/${gameId}`)
      .then((response: AxiosResponse) => {
        console.log(response)
        setGame(response.data)
        setLoading(false)
      })
      .catch((err: Error | AxiosError) => {
        if (axios.isAxiosError(err))  {
            message(`${(err?.response?.data as {message: string}).message}`, 'error')
        } else {
            message(`Ошибка ${err}`, 'error')
        }
      })
  }, [message])

  useEffect(() => {
    getGames()
  }, [getGames])

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabPanel(newValue);
  };

  return (
    <Container component='main' sx={{pt: 3, pb: 3}}>
    <CssBaseline />
    {loading ?
        <Grid 
          mb={3}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <CircularProgress color="inherit"/>
        </Grid>
      : 
        <>
          <Grid container mb={3}>
                <Grid item xs={12} sm={4} md={3}>
                  <Box
                    component="img"
                    src={`/${game.imageName}`}
                    sx={{maxWidth: '100%'}}
                  />
                </Grid>
                <Grid item xs={0} md={1}/>
                <Grid item xs={12} sm={8} md={8}>
                  <Typography component='h1' variant='h3'>
                    {game.title}
                  </Typography>
                </Grid>
          </Grid>
          <Grid>
              {game.categories &&
                <>
                  <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                      <Tabs value={+tabPanel} onChange={handleChange} aria-label="basic tabs example">
                        {
                          game.categories.map((item, index) => <Tab key={index} label={item} id={`simple-tab-${index}`} aria-controls={`simple-tabpanel-${index}`} />)
                        }
                      </Tabs>
                  </Box>
                  { game.categories.map((item, index) => 
                      <div
                        key={index}
                        role="tabpanel"
                        hidden={tabPanel !== index}
                        id={`simple-tabpanel-${index}`}
                        aria-labelledby={`simple-tab-${index}`}
                      >
                        {tabPanel === index && (
                          <Box sx={{ p: 3 }}>
                            <Typography>Товары в разработке</Typography>
                          </Box>
                        )}
                      </div>
                    )
                  }
                </>
              }
          </Grid>
        </>
      }
    </Container>
  )
}

export default GamePage