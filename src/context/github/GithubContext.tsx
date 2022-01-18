import { createContext, useReducer } from 'react'
import githubReducer from 'context/github/GithubReducer'
import { IUser } from 'utils/SharedUtils'

export interface IFeedbackContext {
  users: IUser[]
  loading: boolean
  fetchUsers?: () => void
}

const defaultState: IFeedbackContext = {
  users: [],
  loading: true,
}

const GithubContext = createContext(defaultState)

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN

export const GithubProvider: React.FC = ({ children }) => {
  // const [users, setUsers] = useState<IUser[]>(defaultState.users)
  // const [loading, setLoading] = useState<boolean>(defaultState.loading)
  const [state, dispatch] = useReducer(githubReducer, defaultState)

  const fetchUsers = async () => {
    const response = await fetch(`${GITHUB_URL}/users`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    })

    const data: IUser[] = await response.json()

    console.log(data)

    dispatch({
      type: 'GET_USERS',
      payload: data,
    })
    // setUsers(data)
    // setLoading(false)
  }

  return (
    <GithubContext.Provider value={{ users: state.users, loading: state.loading, fetchUsers }}>
      {children}
    </GithubContext.Provider>
  )
}

export default GithubContext
