import {Dispatch} from 'redux'
import {UserInfoAction, IUserInfo} from './constant'

const userInfo = (res: IUserInfo) => {
  return {
    type: UserInfoAction.UPDATE,
    payload: res
  }
}

export const UpdateUserInfo = (payload :IUserInfo) => {
  return (dispath: Dispatch) => {
    //向服务器获取数据 下面的payload需改成服务端的数据
    dispath(userInfo(payload))
  }
}