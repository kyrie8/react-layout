import { ThemeInfo,  ThemeAction} from "./constant";

const updateTheme = (res: ThemeInfo) => {
  console.log('ThemeInfo', res)
  return {
    type: ThemeAction.UPDATE,
    payload: res
  }
}

export {
  updateTheme
}