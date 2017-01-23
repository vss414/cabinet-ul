import { ADD_DETAIL, DELETE_DETAIL } from '../constants/actions'

export function addPayments(data) {
  return {
    type: ADD_DETAIL,
    data
  }
}

export function deletePayments() {
  return { type: DELETE_DETAIL }
}