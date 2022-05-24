import { useAppSelector } from './redux-hooks'

export function useAuth() {
    
    const {role, token, userId, email} = useAppSelector(state => state.user)

    return {
        isAuth: !!userId,
        role,
        token,
        userId,
        email,
    }
}