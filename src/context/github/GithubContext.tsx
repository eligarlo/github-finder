import { createContext, useReducer } from 'react'
import githubReducer from 'context/github/GithubReducer'
import { IUser } from 'utils/SharedUtils'

export interface IFeedbackContext {
  users: IUser[]
  loading: boolean
  searchUsers?: (text: string) => void
}

const defaultState: IFeedbackContext = {
  users: [],
  loading: false,
}

const GithubContext = createContext(defaultState)

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN

export const GithubProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(githubReducer, defaultState)

  // Get search results
  const searchUsers = async (text: string) => {
    setLoading()

    const params = new URLSearchParams({ q: text })

    const response = await fetch(`${GITHUB_URL}/search/users?${params}`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    })

    const data = await response.json()
    const items: IUser[] = data.items

    console.log(items)

    items &&
      dispatch({
        type: 'GET_USERS',
        payload: items,
      })
  }

  const setLoading = () => dispatch({ type: 'SET_LOADING' })

  return (
    <GithubContext.Provider value={{ users: state.users, loading: state.loading, searchUsers }}>
      {children}
    </GithubContext.Provider>
  )
}

export default GithubContext
