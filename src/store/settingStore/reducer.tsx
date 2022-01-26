import {ThemeAction, Action} from './constant'
export interface IThemeState {
  color: string
}

const defaultState: IThemeState = {
  color: ''
}

const reducer = (state = defaultState, action: Action<ThemeAction, IThemeState>) => {
  switch (action.type) {
    case ThemeAction.UPDATE:
      const {color} = action.payload
      return {
        ...state,
          color
      }
    default:
      return state
  }
}

export default reducer