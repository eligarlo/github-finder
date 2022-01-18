import React from 'react'
import { useContext } from 'react'
import GithubContext from 'context/github/GithubContext'
import Spinner from 'components/layout/Spinner'
import UserItem from 'components/users/UserItem'

const UserResults: React.FC = () => {
  const { users, loading } = useContext(GithubContext)

  if (loading) {
    return <Spinner />
  } else {
    return (
      <div className='grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2'>
        {users && users.map(user => <UserItem key={user.id} user={user} />)}
      </div>
    )
  }
}

export default React.memo(UserResults)
