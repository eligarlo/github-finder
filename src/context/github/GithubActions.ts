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
