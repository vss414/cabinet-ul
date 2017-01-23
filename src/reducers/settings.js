import { UPDATE_SETTINGS, DELETE_SETTINGS, DELETE } from '../constants/actions'

const initialState = {
  phone: undefined,
  phone_notification: undefined,
  balance_threshold: undefined,
  email: undefined
};

export default function settings(state = initialState, action) {
  if(action.type === UPDATE_SETTINGS) {
    return {
      phone: action.phone,
      phone_notification: action.phone_notification,
      balance_threshold: action.balance_threshold,
      email: action.email
    }
  }
  else if(action.type === DELETE || action.type === DELETE_SETTINGS) {
    return initialState
  }
  return state
}
