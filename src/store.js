// import {configureStore} from '@reduxjs/toolkit'

// export default configureStore({
//     reducer: {}
// })

import { configureStore } from '@reduxjs/toolkit'
import toDoReducer from './Reducers/toDoSlider';
export default configureStore({
 reducer: {// allows you create n number of sliders
     toDo: toDoReducer
     ,
 }
})
