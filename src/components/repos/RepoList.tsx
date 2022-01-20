import { IRepo } from 'utils/SharedUtils'
import RepoItem from './RepoItem'

interface IRepoListProps {
  repos: IRepo[]
}

const RepoList: React.FC<IRepoListProps> = ({ repos }) => {
  return (
    <div className='rounded-lg shadow-lg card bg-base-100'>
      <div className='card-body'>
        <h2 className='text3xl my-4 font-bold card-title'>Latest Repositories</h2>
        {repos.map(repo => (
          <RepoItem repo={repo} key={repo.id} />
        ))}
      </div>
    </div>
  )
}

export default RepoList
