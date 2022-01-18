import { useEffect, useState } from 'react'
import { IUser } from 'utils/SharedUtils'
import Spinner from 'components/layout/Spinner'

interface IUserResultsProps {}

const UserResults: React.FC<IUserResultsProps> = ({}) => {
  const [users, setUsers] = useState<IUser[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    const response = await fetch(`${process.env.REACT_APP_GITHUB_URL}/users`, {
      headers: {
        Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`,
      },
    })

    const data = await response.json()

    console.log(data)

    setUsers(data)
    setLoading(false)
  }

  if (loading) {
    return <Spinner />
  } else {
    return (
      <div className='grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2'>
        {users && users.map(user => <h3 key={user.id}>{user.login}</h3>)}
      </div>
    )
  }
}

export default UserResults
