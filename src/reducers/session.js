import { SUCCESS_AUTH, FAIL_AUTH, DELETE, SELECT_ACCOUNT } from '../constants/actions'

const initialState = {
  account: {
    id:0,
    accountNumber: 0,
    baseCompanyId: 0,
    manager: {
      id: 0,
      name: '',
      email: '',
      phone: ''
    }
  },
  city: '',
  companyId: 0,
  login: '',
  list: []
};

export default function auth(state = initialState, action) {
  if(action.type === SUCCESS_AUTH) {
    return {
      account: action.account,
      city: action.city,
      companyId: action.companyId,
      login: action.login,
      list: action.list
    }
  }
  else if(action.type === SELECT_ACCOUNT) {
    return action.state
  }
  else if(action.type === FAIL_AUTH) {
    return initialState
  }
  else if(action.type === DELETE) {
    return initialState
  }
  return state
}