import { ADD_DETAIL, DELETE_DETAIL, DELETE } from '../constants/actions'

const initialState = {
  'payments': {
    'sum': 0,
    'list': []
   },
  'charges': {
    'sum': 0,
    'list': []
  },
  'balance': 0
};

export default function detail(state = initialState, action) {
  if(action.type === ADD_DETAIL) {
    return action.data
  }
  else if(action.type === DELETE || action.type === DELETE_DETAIL) {
    return initialState
  }
  return state
}
