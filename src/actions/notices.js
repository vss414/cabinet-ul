import { ADD_NOTICES, DELETE_NOTICES } from '../constants/actions'

export function addNotices(list, time) {
  return {
    type: ADD_NOTICES,
    list,
    time
  }
}

export function deleteNotices() {
  return { type: DELETE_NOTICES }
}