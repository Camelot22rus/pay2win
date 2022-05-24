import axios, {AxiosResponse, AxiosError} from 'axios'
import { Form } from './Form'

import {useMessage} from 'hooks/message.hook'
import {setUser} from '../store/slices/userSlice';
import { useAppDispatch } from 'hooks/redux-hooks';

const Login = () => {
    const message = useMessage()
    const dispatch = useAppDispatch();
    
    const handleLogin = async (form: {email: string, password: string}) => {
        axios.post('/api/auth/login', form)
        .then((response: AxiosResponse) => {
            dispatch(setUser({
                    userId: response.data.userId,
                    token: response.data.token,
                    role: response.data.role,
                    email: response.data.email,
            }))
            message('Вход успешно выполнен', 'success')
        })
        .catch((err: Error | AxiosError) => {
            if (axios.isAxiosError(err))  {
                message(`${(err?.response?.data as {message: string}).message}`, 'error')
            } else {
                message(`Ошибка ${err}`, 'error')
            }
        })
    }

    return (
        <Form 
            title="Авторизоваться"
            handleClick={handleLogin}
            formLink={{linkTitle: 'Зарегистрироваться', linkUrl: '/register'}}
        />
    )
}

export { Login }