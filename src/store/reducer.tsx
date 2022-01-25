import {combineReducers} from 'redux'
import { reducer as useInfoReducer } from './useStore/index'
import { reducer as settingReducer } from './settingStore/index'
import {IUserState} from './useStore/reducer'
import { IThemeState } from './settingStore/reducer'
export interface GlobalState {
  user: IUserState,
  setting: IThemeState
}

export default combineReducers<GlobalState>({
  user: useInfoReducer,
  setting: settingReducer
})