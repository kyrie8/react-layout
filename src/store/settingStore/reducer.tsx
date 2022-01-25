import {ThemeInfo, ThemeAction, Action} from './constant'

export interface IThemeState {
  themeInfo: ThemeInfo
}

const defaultState: IThemeState = {
  themeInfo: {
    color: JSON.parse(localStorage.getItem('color')) || ''
  }
}

const reducer = (state = defaultState, action: Action<ThemeAction, ThemeInfo>) => {
  switch (action.type) {
    case ThemeAction.UPDATE:
      const {color} = action.payload
      console.log('color',color)
      localStorage.setItem('color', JSON.stringify(color))
      return {
        ...state,
        themeInfo: {
          color
        }
      }
    default:
      return state
  }
}

export default reducer