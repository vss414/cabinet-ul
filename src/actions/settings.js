import { UPDATE_SETTINGS, DELETE_SETTINGS } from '../constants/actions';

export function updateSettings(phone, phone_notification, balance_threshold, email) {
  return {
    type: UPDATE_SETTINGS,
    phone,
    phone_notification,
    balance_threshold,
    email
  }
}

export function deleteSettings() {
  return { type: DELETE_SETTINGS }
}