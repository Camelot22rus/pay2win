import React, { FC, useState } from 'react'
import { Link as RouterLink} from 'react-router-dom'

import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'

interface Props {
    title: string,
    handleClick: (form: {email: string, password: string}) => void
    formLink: {linkTitle: string, linkUrl: string}
}

const Form: FC<Props> = ({ title, handleClick, formLink }) => {
    const [form, setForm] = useState({
      email: '', password: ''
    })

    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [(event.target as HTMLInputElement).name]: (event.target as HTMLInputElement).value })
    }

    return (
        <div>
            <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                autoFocus
                value={form.email}
                onChange={changeHandler}
            />
            <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Пароль"
                type="password"
                id="password"
                autoComplete="current-password"
                value={form.password}
                onChange={changeHandler}
            />
            <Grid 
                container
                sx={{ mt: 3, mb: 2, alignItems: 'center'}}
            >
                <Grid item xs>
                    <Button
                        type="submit"
                        variant="contained"
                        onClick={() => handleClick(form)}
                    >
                        {title}
                    </Button>
                </Grid>
                <Grid item>
                    <Link href="#" variant="body2" component={RouterLink} to={formLink.linkUrl}>
                        {formLink.linkTitle}
                    </Link>
                </Grid>
            </Grid>
        </div>
    )
}

export { Form }