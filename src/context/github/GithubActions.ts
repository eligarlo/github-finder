import { IUser } from 'utils/SharedUtils'

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN

// Get search results
export const searchUsers = async (text: string) => {
  const params = new URLSearchParams({ q: text })

  const response = await fetch(`${GITHUB_URL}/search/users?${params}`, {
    headers: {
      Authorization: `token ${GITHUB_TOKEN}`,
    },
  })

  const data = await response.json()
  const items: IUser[] = data.items

  return items && items
}

// Get single user
export const getUser = async (login: string | undefined) => {
  const response = await fetch(`${GITHUB_URL}/users/${login}`, {
    headers: {
      Authorization: `token ${GITHUB_TOKEN}`,
    },
  })

  if (response.status === 404) {
    window.location.href = '/notfound'
  } else {
    const data = await response.json()

    return data && data
  }
}

// Get user repos
export const getUserRepos = async (login: string | undefined) => {
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

  return data && data
}
