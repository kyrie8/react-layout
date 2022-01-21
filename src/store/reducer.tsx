import {combineReducers} from 'redux'
import { reducer as useInfoReducer } from './useStore/index'
import {IUserState} from './useStore/reducer'

export interface GlobalState {
  user: IUserState
}

export default combineReducers<GlobalState>({
  user: useInfoReducer
})