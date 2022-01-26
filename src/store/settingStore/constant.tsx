//import { Action } from '../useStore/constant'
export type {Action} from '../useStore/constant'

export enum ThemeAction {
  UPDATE = 'THEMEUPDATE',
}

export interface ThemeInfo {
  color: string
}
