import { createContext, useReducer } from 'react'
import githubReducer from 'context/github/GithubReducer'
import { IContextProps, IRepo, IUser } from 'utils/SharedUtils'

export interface IFeedbackContext {
  users: IUser[]
  user: IUser
  repos: IRepo[]
  loading: boolean
  searchUsers?: (text: string) => void
  clearUsers?: () => void
  getUser?: (login: string | undefined) => void
  getUserRepos?: (login: string | undefined) => void
}

const defaultState: IFeedbackContext = {
  users: [] as IUser[],
  user: {} as IUser,
  repos: [] as IRepo[],
  loading: false,
}

const GithubContext = createContext(defaultState)

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN

export const GithubProvider: React.FC<IContextProps> = ({ children }) => {
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

    items &&
      dispatch({
        type: 'GET_USERS',
        payload: items,
      })
  }

  // Get single user
  const getUser = async (login: string | undefined) => {
    setLoading()

    const response = await fetch(`${GITHUB_URL}/users/${login}`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    })

    if (response.status === 404) {
      window.location.href = '/notfound'
    } else {
      const data = await response.json()

      data &&
        dispatch({
          type: 'GET_USER',
          payload: data,
        })
    }
  }

  // Get user repos
  const getUserRepos = async (login: string | undefined) => {
    setLoading()

    const params = new URLSearchParams({
      sort: 'created',
      per_page: '10',
    })

    const response = await fetch(`${GITHUB_URL}/users/${login}/repos?${params}`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    })

    const data = await response.json()

    data &&
      dispatch({
        type: 'GET_REPOS',
        payload: data,
      })
  }

  // Clear users from state
  const clearUsers = () => dispatch({ type: 'CLEAR_USERS' })

  // Set loading
  const setLoading = () => dispatch({ type: 'SET_LOADING' })

  return (
    <GithubContext.Provider
      value={{
        ...state,
        searchUsers,
        clearUsers,
        getUser,
        getUserRepos,
      }}
    >
      {children}
    </GithubContext.Provider>
  )
}

export default GithubContext
