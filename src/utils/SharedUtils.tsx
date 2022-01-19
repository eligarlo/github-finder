export interface IUser {
  id: number
  login: string
  avatar_url: string
  name: string
  type: string
  location: string | null
  bio: string | null
  blog: string
  twitter_username: string
  html_url: string
  followers: number
  following: number
  public_repos: number
  public_gists: number
  hireable: boolean | null
}

export interface IRepo {
  id: number
  name: string
  description: string
  html_url: string
  forks: number
  open_issues: number
  watchers_count: number
  stargazers_count: number
}

export interface IContextProps {
  children: React.ReactNode
}
