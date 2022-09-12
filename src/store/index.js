import {configureStore} from '@reduxjs/toolkit'
import chatid from './reducers/chatreducer'



const store = configureStore({reducer:{chatidr:chatid}})

export default store