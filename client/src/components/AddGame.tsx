import React, {useState, useEffect, useCallback, FC} from 'react'
import axios, {AxiosResponse, AxiosError} from 'axios'
import { useAuth } from 'hooks/use-auth'
import {useMessage} from 'hooks/message.hook'
import {addGame} from '../store/slices/gamesSlice'
import { useAppDispatch } from 'hooks/redux-hooks'

import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import PhotoCamera from '@mui/icons-material/PhotoCamera'

const AddGame: FC = () => {
    const [categories, setCategories] = useState<Array<string>>([])
    const [checkedCategories, setCheckedCategories] = useState<Array<string | Blob>>([])
    const [gameTitle, setGameTitle] = useState<string>('')
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const message = useMessage()
    const dispatch = useAppDispatch()
    const {token} = useAuth()

    const getGameCategories = useCallback(async () => {
        axios.get('/api/games/categories')
        .then((response: AxiosResponse) => {
            setCategories(response.data)
        })
        .catch((err: Error | AxiosError) => {
            if (axios.isAxiosError(err))  {
                message(`Ошибка ${err}`, 'error')
            } else {
                message(`Ошибка ${err}`, 'error')
            }
        })
    }, [])
    
    const titleHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
      setGameTitle((event.target as HTMLInputElement).value )
    }

    const checkboxHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = (e.target as HTMLInputElement)
        if (checked && !checkedCategories.includes(value)) {
            setCheckedCategories([...checkedCategories, value])
        }
        else {
            setCheckedCategories(checkedCategories.filter((e) => e !== value))
        }
    }

    const submitHandler = async () => {
        if(!!selectedFile && !!gameTitle && !!checkedCategories) {
            const formData = new FormData()
            formData.append('file', selectedFile)
            formData.append('title', gameTitle)
            for (const category of checkedCategories) {
                formData.append('categories', category)
            }
            axios.post('/api/games/add', formData, { headers: {Authorization: `Bearer ${token}`}})
            .then((response: AxiosResponse) => {
                message('Игра успешно добавлена', 'success')
                dispatch(addGame(response.data.games))
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

    const handleCapture = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedFile((event.target as HTMLInputElement).files![0])
    }
    
    useEffect(() => {
        getGameCategories()
    }, [])

    return (
            <>
                <FormGroup>
                    <TextField
                        margin='normal'
                        required
                        fullWidth
                        id='gameTitle'
                        label='Название игры'
                        name='gameTitle'
                        autoFocus
                        value={gameTitle}
                        onChange={titleHandler}
                    />
                </FormGroup>
                <FormGroup row>
                    {categories ? categories.map((item, index) => (
                        <FormControlLabel key={index} control={<Checkbox onChange={(e) => checkboxHandler(e)} value={item}/>} label={item} />
                    ))
                    : <div>Список пуст</div>}
                </FormGroup>
                <FormGroup>
                        <label>
                            <input
                                accept='image/jpeg'
                                type='file'
                                style={{display: 'none'}}
                                onChange={handleCapture}
                            />
                        <IconButton
                            color='primary'
                            aria-label='upload picture'
                            component='span'
                        >
                            <Tooltip title='Выберите картинку'>
                                <PhotoCamera fontSize='large' />
                            </Tooltip>
                        </IconButton>
                        {selectedFile ? selectedFile.name : 'Выберите картинку'}
                        </label>
                </FormGroup>
                <Button
                    type='submit'
                    variant='contained'
                    onClick={submitHandler}
                    sx={{mt: 2}}
                >
                    Добавить игру
                </Button>
            </>
    )
}

export default AddGame