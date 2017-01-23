import { SUCCESS_AUTH, DELETE, SELECT_ACCOUNT } from '../constants/actions'

export function Auth(account, city, companyId, login, list) {
  return {
    type: SUCCESS_AUTH,
    account,
    city,
    companyId,
    login,
    list
  }
}

export function selectAccount(state) {
  return {
    type: SELECT_ACCOUNT,
    state
  }
}

export function Logout() {
  return { type: DELETE }
}