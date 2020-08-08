import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from 'redux-thunk'
import photobooth from './reducers/photobooth';

const configureStore = () =>{
    return createStore(
        photobooth,
        composeWithDevTools(applyMiddleware(thunk))
    )
}

export const store = configureStore()