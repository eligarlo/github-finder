import { IFeedbackContext } from './GithubContext'

const githubReducer = (state: IFeedbackContext, action: any) => {
  switch (action.type) {
    case 'GET_USERS':
      return {
        ...state,
        users: action.payload,
        loading: false,
      }
    default:
      return state
  }
}

export default githubReducer
