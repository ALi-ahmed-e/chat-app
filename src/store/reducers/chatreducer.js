import {createSlice} from '@reduxjs/toolkit'


const initstate = {chatid:''}

const chatslice = createSlice({
    name:"editpost",
    initialState:initstate,
    reducers:{
        chatid:(state,action)=>{
            state.chatid = action.payload
        },
        remove:(state,action)=>{
            state.chatid = ''
        }
    }
})


export default chatslice.reducer
export const chataction = chatslice.actions