import { createContext, useReducer } from 'react'
import alertReducer from 'context/alert/AlertReducer'
import { IContextProps } from 'utils/SharedUtils'

interface IAlert {
  msg: string
  type: string
}

export interface IAlertContext {
  alert: IAlert | null
  setAlert?: (msg: string, type: string) => void
}

const defaultState: IAlertContext = {
  alert: null,
}

const AlertContext = createContext(defaultState)

export const AlertProvider: React.FC<IContextProps> = ({ children }) => {
  const [state, dispatch] = useReducer(alertReducer, defaultState)

  // Set an alert
  const setAlert = (msg: string, type: string) => {
    dispatch({
      type: 'SET_ALERT',
      payload: { msg, type },
    })

    setTimeout(() => dispatch({ type: 'REMOVE_ALERT' }), 3000)
  }

  return (
    <AlertContext.Provider value={{ alert: state, setAlert }}>{children}</AlertContext.Provider>
  )
}

export default AlertContext
