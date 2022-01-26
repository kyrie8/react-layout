export enum UserInfoAction {
  UPDATE = 'UPDATE',
  ADD = 'ADD',
  DELETE = 'DELETE',
  EDIT = 'EDIT'
}

// TODO 定义获取到的路由属性
export type Action<T, P> = {
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

//export type UpdateAction = Action<UserInfoAction.UPDATE, IUserInfo>