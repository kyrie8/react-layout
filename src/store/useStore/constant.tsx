export enum UserInfoAction {
  UPDATE = 'UPDATE',
  ADD = 'ADD',
  DELETE = 'DELETE',
  EDIT = 'EDIT'
}


export interface Action<T, P> {
  type: T,
  payload: P
}

export interface IUserInfo {
  userName?: string,
  userId: number,
  age?: number,
  sex?: string,
  avatar?: string
}

export type UpdateAction = Action<UserInfoAction.UPDATE, IUserInfo>