import {useCallback} from 'react'
import { useSnackbar, VariantType } from 'notistack'

    

export const useMessage = () => {
    const { enqueueSnackbar } = useSnackbar()

    return useCallback( (text: string | null, variant: VariantType | undefined) => {
        if (text) {
            enqueueSnackbar(text, { 
                variant: variant,
            })
        }
    }, [])
}