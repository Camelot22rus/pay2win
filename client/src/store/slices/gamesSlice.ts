import {createSlice, PayloadAction} from '@reduxjs/toolkit'

const initialState = {
    games: [] as {title: string, _id: string, categories: string[], imageName: string}[],
}

const gamesSlice = createSlice({
    name: 'games',
    initialState,
    reducers: {
        setGames(state, action) {
            state.games = action.payload.games
        },
        addGame(state, action: PayloadAction<{title: string, _id: string, categories: string[], imageName: string}>) {
            const newGame = action.payload
            const existingGames = JSON.parse(JSON.stringify(state.games))
            if(existingGames.find((item: {title: string, _id: string, categories: string[], imageName: string}) => item.title === newGame.title)) {
                state.games = existingGames.map((item: {title: string, _id: string, categories: string[], imageName: string}) => {
                    if (item.title === newGame.title) {
                        return newGame;
                    }
                    return item;
                })
            }
            else {
                const newGames = [...existingGames, newGame]
                state.games = newGames
            }
        },
        removeGame(state, action) {
            state.games = state.games.filter((game) => game._id !== action.payload )
            console.log(state.games)
        }
    },
})

export const {setGames, addGame, removeGame} = gamesSlice.actions

export default gamesSlice.reducer