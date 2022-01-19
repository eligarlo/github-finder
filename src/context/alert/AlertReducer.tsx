import { IAlertContext } from 'context/alert/AlertContext'

const alertReducer = (state: IAlertContext, action: any) => {
  switch (action.type) {
    case 'SET_ALERT':
      return action.payload
    case 'REMOVE_ALERT':
      return null
    default:
      return state
  }
}

export default alertReducer
