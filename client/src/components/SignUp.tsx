import axios, {AxiosResponse, AxiosError} from 'axios'

import { Form } from './Form'
import {useMessage} from 'hooks/message.hook'
import {setUser} from '../store/slices/userSlice'
import { useAppDispatch } from 'hooks/redux-hooks'

const SignUp = () => {
    const message = useMessage()
    const dispatch = useAppDispatch()
    
    const handleRegister = async (form: {email: string, password: string}) => {
        axios.post('/api/auth/register', form)
        .then((response: AxiosResponse) => {
            dispatch(setUser({
                    id: response.data.userId,
                    token: response.data.token,
                    role: response.data.role,
                    isAuthenticated: true
            }))
            message('Регистрация прошла успешно', 'success')
        })
        .catch((err: Error | AxiosError) => {
            if (axios.isAxiosError(err))  {
                message(`Ошибка ${err}`, 'error')
            } else {
                message(`Ошибка ${err}`, 'error')
            }
        })
      }

    return (
        <Form 
            title="Зарегистрироваться"
            handleClick={handleRegister}
            formLink={{linkTitle: 'Авторизоваться', linkUrl: '/login'}}
        />
    )
}

export { SignUp }