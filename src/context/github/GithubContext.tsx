import { createContext, useReducer } from 'react'
import githubReducer from 'context/github/GithubReducer'
import { IContextProps, IRepo, IUser } from 'utils/SharedUtils'

export interface IFeedbackContext {
  users: IUser[]
  user: IUser
  repos: IRepo[]
  loading: boolean
  dispatch?: (value: any) => void
}

const defaultState: IFeedbackContext = {
  users: [] as IUser[],
  user: {} as IUser,
  repos: [] as IRepo[],
  loading: false,
}

const GithubContext = createContext(defaultState)

export const GithubProvider: React.FC<IContextProps> = ({ children }) => {
  const [state, dispatch] = useReducer(githubReducer, defaultState)

  return (
    <GithubContext.Provider
      value={{
        ...state,
        dispatch,
      }}
    >
      {children}
    </GithubContext.Provider>
  )
}

export default GithubContext
