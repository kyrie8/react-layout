import {UserInfoAction, UpdateAction, IUserInfo} from './constant'

export interface IUserState {
  userInfo: IUserInfo
}

const defaultState: IUserState = {
  userInfo: {
    userName: 'admin',
    userId: 123,
    age: 18,
    sex: 'male',
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg'
  }
}

const reducer = (state = defaultState, action: UpdateAction) => {
  switch(action.type) {
    case UserInfoAction.UPDATE:
      const {userId, userName} = action.payload
      return {
        ...state,
        userId,
        userName
      }
    default: 
      return state
  }
}
export default reducer