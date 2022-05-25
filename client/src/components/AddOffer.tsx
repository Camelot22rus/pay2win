import React, {useState, useEffect, useCallback, FC} from 'react'
import { useNavigate } from "react-router-dom"
import axios, {AxiosResponse, AxiosError} from 'axios'
import { useAuth } from 'hooks/use-auth'
import {useMessage} from 'hooks/message.hook'
import { useAppDispatch } from 'hooks/redux-hooks'

import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import CircularProgress from '@mui/material/CircularProgress'
import MenuItem from '@mui/material/MenuItem'

interface Game {
  categories: string[] | null,
  imageName: string | null,
  title: string | null,
  _id: string | null,
}
// приставка I не используется и так поонятно, что это интерфейс.Также нарушается принцип инкапсуляции.

const AddOffer: FC = () => {
    const [loading, setLoading] = useState<boolean>(true)
    const [games, setGames] = useState<Array<Game>>([])
    const [gameCategories, setGameCategories] = useState<Array<string>>([])

    const [offerTitle, setOfferTitle] = useState<string>('')
    const [offerQuantity, setOfferQuantity] = useState<number>(0)
    const [offerPrice, setOfferPrice] = useState<number>(0)
    const [offerGame, setOfferGame] = useState<string>('')
    const [offerCategory, setOfferCategory] = useState<string>('')

    const message = useMessage()
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const {token} = useAuth()

    const getGames = useCallback(async () => {
      axios.get('/api/games/')
        .then((response: AxiosResponse) => {
            setGames(response.data)
            setOfferGame(response.data[0]._id)
            setGameCategories(response.data[0].categories)
            setOfferCategory(response.data[0].categories[0])
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

    const submitHandler = async () => {
        if(!!offerTitle && offerQuantity && offerPrice && offerGame && offerCategory) {
            axios.post('/api/goods/add', {
                title: offerTitle, 
                quantity: offerQuantity, 
                price: offerPrice, 
                game: offerGame, 
                category: offerCategory
            }, { headers: {Authorization: `Bearer ${token}`}})
            .then((response: AxiosResponse) => {
                message('Оффер успешно добавлен', 'success')
                navigate(`/games/${offerGame}/${gameCategories.indexOf(offerCategory)}`)
            })
            .catch((err) => {
                if (axios.isAxiosError(err))  {
                    message(`${(err?.response?.data as {message: string}).message}`, 'error')
                } else {
                    message(`Ошибка ${err}`, 'error')
                }
            })
        } else {
            message('Заполните все поля', 'error')
        }
    }
    
    const titleHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setOfferTitle((event.target as HTMLInputElement).value )
    }
    
    const priceHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setOfferPrice(+(event.target as HTMLInputElement).value )
    }

    const quantityHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setOfferQuantity(+(event.target as HTMLInputElement).value )
    }

    const handleGameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setOfferGame(event.target.value);
        setGameCategories(games.find((obj) => obj._id === event.target.value)?.categories!)
    };

    const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setOfferCategory(event.target.value);
    };
      
        // categoryChangeHandler выше не прапвильно. Нарушает принципы чистого кода.
    
    useEffect(() => {
        getGames()
    }, [])

    return (
            <>
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
                        <Grid container mb={3} columnSpacing={3} rowSpacing={3}>
                            <Grid item xs={12}>
                                <TextField
                                    margin='normal'
                                    required
                                    fullWidth
                                    id='offerTitle'
                                    label='Название товара'
                                    name='offerTitle'
                                    autoFocus
                                    value={offerTitle}
                                    onChange={titleHandler}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    id="outlined-select-currency"
                                    select
                                    fullWidth
                                    label="Выберите игру"
                                    value={offerGame}
                                    onChange={handleGameChange}
                                >
                                {games.map((obj) => (
                                    <MenuItem key={obj._id} value={obj._id?.toString()}>
                                        {obj.title}
                                    </MenuItem>
                                ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    id="outlined-select-currency"
                                    select
                                    fullWidth
                                    label="Выберите категорию"
                                    value={offerCategory}
                                    onChange={handleCategoryChange}
                                >
                                {gameCategories.map((item) => (
                                    <MenuItem key={item} value={item}>
                                        {item}
                                    </MenuItem>
                                ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    margin='normal'
                                    required
                                    fullWidth
                                    id='offerPrice'
                                    label='Цена'
                                    name='offerPrice'
                                    type='number'
                                    value={offerPrice}
                                    onChange={priceHandler}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    margin='normal'
                                    required
                                    fullWidth
                                    id='offerQuantity'
                                    label='Количество'
                                    name='offerQuantity'
                                    type='number'
                                    inputProps={{min: '0'}}
                                    value={offerQuantity}
                                    onChange={quantityHandler}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type='submit'
                            variant='contained'
                            onClick={submitHandler}
                            sx={{mt: 2}}
                        >
                            Добавить оффер
                        </Button>
                    </>
                }
            </>
    )
}

export default AddOffer
