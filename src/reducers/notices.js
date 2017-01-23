import { ADD_NOTICES, DELETE_NOTICES, DELETE } from '../constants/actions'

const initialState = {
  list: [],
  time: 0
};

export default function notice(state = initialState, action) {
  if(action.type === ADD_NOTICES) {
    return {
      list: action.list,
      time: action.time
    }
  }
  else if(action.type === DELETE || action.type === DELETE_NOTICES) {
    return initialState
  }
  return state
}
