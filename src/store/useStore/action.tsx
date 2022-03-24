import {Dispatch} from 'redux'
import {UserInfoAction, IUserInfo} from './constant'

const userInfo = (res: IUserInfo) => {
  return {
    type: UserInfoAction.UPDATE,
    payload: res
  }
}

export const UpdateUserInfo = (payload :IUserInfo) => {
  return (dispatch: Dispatch) => {
    //向服务器获取数据 下面的payload需改成服务端的数据
    dispatch(userInfo(payload))
  }
}