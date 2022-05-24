import React, {FC} from 'react'
import { Link as RouterLink } from 'react-router-dom'

import { useAuth } from 'hooks/use-auth'

import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardActionArea from '@mui/material/CardActionArea'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import CloseIcon from '@mui/icons-material/Close'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'

interface ICard {
    index: number,
    categories: string[],
    title: string,
    _id: string,
    imageName: string,
    handleOpen: (id: string) => void
}

const GameCard: FC<ICard> = ({index, categories, title, _id, imageName, handleOpen}) => {
    const {role} = useAuth()

    return (
        <Grid item key={index} xs={12} sm={6} md={4}>
        <Card 
            sx={{position: 'relative'}}>
            {role === 'ADMIN' && 
            <IconButton
                aria-label='close'
                onClick={() => handleOpen(_id)}
                sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                zIndex: 2,
                }}
            >
                <CloseIcon />
            </IconButton>
            }
            <CardActionArea component={RouterLink} to={`/games/${_id}`}>
            <CardMedia
                component='img'
                height='140'
                image={`/${imageName}`}
            />
            <CardContent>
                <Typography gutterBottom variant='h5' component='div'>
                {title}
                </Typography>
            </CardContent>
            </CardActionArea>
            <CardActions>
            {categories.map((cat: string, index: number) => 
                <Button size='small' color='primary' key={index} component={RouterLink} to={`/games/${_id}/${index}`}>
                {cat}
                </Button>
            )}
            </CardActions>
        </Card>
        </Grid>
    )
}

export default GameCard