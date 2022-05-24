import {useState, useEffect, useCallback} from 'react'
import axios, {AxiosResponse, AxiosError} from 'axios'

import { useAuth } from 'hooks/use-auth'
import {useMessage} from 'hooks/message.hook'
import { useAppDispatch, useAppSelector } from 'hooks/redux-hooks'
import {setGames, removeGame} from '../store/slices/gamesSlice'
import GameCard from 'components/GameCard'

import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'
import CssBaseline from '@mui/material/CssBaseline'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import AddGame from 'components/AddGame'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogTitle from '@mui/material/DialogTitle'
import CircularProgress from '@mui/material/CircularProgress'

const Home = () => {
  const [loading, setLoading] = useState<boolean>(true)
  const [deleteDialog, setDeleteDialog] = useState<string | null>(null)
  const {role, token} = useAuth()
  const dispatch = useAppDispatch()
  const message = useMessage()
  const {games} = useAppSelector(state => state.games)
  
  const getGames = useCallback(async () => {
    axios.get('/api/games/')
      .then((response: AxiosResponse) => {
        console.log(response.data)
        dispatch(setGames({
                games: response.data,
        }))
        setLoading(false)
      })
      .catch((err: Error | AxiosError) => {
        if (axios.isAxiosError(err))  {
            message(`${(err?.response?.data as {message: string}).message}`, 'error')
        } else {
            message(`Ошибка ${err}`, 'error')
        }
      })
  }, [dispatch, message])

  const handleDelete = (id: string | null) => {
    axios.post('/api/games/remove', {id: id},{ headers: {Authorization: `Bearer ${token}`}})
      .then((response: AxiosResponse) => {
        console.log(response.data.id)
        dispatch(removeGame(response.data.id))
        setDeleteDialog(null)
        message('Игра удалена', 'info')
      })
      .catch((err: Error | AxiosError) => {
        if (axios.isAxiosError(err))  {
            message(`${(err?.response?.data as {message: string}).message}`, 'error')
        } else {
            message(`Ошибка ${err}`, 'error')
        }
      })
  }

  const handleOpen = (id: string) => {
    setDeleteDialog(id)
  }

  const handleClose = () => {
    setDeleteDialog(null)
  }
  
  useEffect(() => {
    getGames()
  }, [getGames])

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
          {role === 'ADMIN' &&
            <Grid mb={4}>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls='panel1a-content'
                  id='panel1a-header'
                >
                  <Typography>Добавить игру</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <AddGame />
                </AccordionDetails>
              </Accordion>
            </Grid>
          }
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls='panel2a-content'
              id='panel2a-header'
            >
              <Typography>Описание проекта</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Здравствуйте, меня зовут Вадим Севериков, я начинающий Frontend-разработчик и это мой пет-проект.<br/><br/>
                Проект Pay2win - это p2p платформа для торговли игровыми ценностями. Можно создавать предложения о продаже любой игровой ценности (в разработке) или найти нужный предмет и купить его.<br/><br/>

                Добавление или удаление новых игр осуществляется только с аккаунта администратора (Логин: test@test.ru, Пароль: 123456test).<br/>С него же происходит модерация предложений о продаже.<br/><br/>

                Стек технологий Pay2win:<br/>
                - ReactJS 18<br/>
                - TypeScript<br/>
                - Redux Toolkit (хранение данных)<br/>
                - React Router v6 (навигация)<br/>
                - Axios (отправка запроса на бэкенд)<br/>
                - React Hooks (хуки)<br/>
                - Material UI (стилизация)<br/>
                -----------------------------------<br/>
                - MongoDb, Mongoose, Express, NodeJS (Backend)
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Typography component='h1' mb={2} variant='subtitle2'>
          </Typography>
        <Typography component='h1' mb={2} variant='h4'>
          Выберите игру
        </Typography>
        <Grid container spacing={4}>
          {games.length > 0 ? games.map((obj: {categories: string[], title: string, _id: string, imageName: string}, index: number) => (
            <GameCard key={index} index={index} {...obj} handleOpen={handleOpen} />
          )) :
            <Typography component='h2' variant='h3'>
              Список игр пуст
            </Typography>
          }
        </Grid>
        </>
      }
      <Dialog
        open={!!deleteDialog}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>
          {'Действительно хотите удалить игру?'}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>Нет</Button>
          <Button 
            disabled={!deleteDialog}
            onClick={() => handleDelete(deleteDialog)
          } autoFocus>
            Да
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  )
}

export default Home