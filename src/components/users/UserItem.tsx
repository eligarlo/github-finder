import React from 'react'
import { Link } from 'react-router-dom'
import { IUser } from 'utils/SharedUtils'

interface IUserItemProps {
  user: IUser
}

const UserItem: React.FC<IUserItemProps> = ({ user: { login, avatar_url } }) => {
  return (
    <div className='card shadow-md compact side bg-base-100'>
      <div className='flex-row items-center space-x-4 card-body'>
        <div>
          <div className='avatar'>
            <div className='rounded-full shadow w-14 h14'>
              <img src={avatar_url} alt='Profile' />
            </div>
          </div>
        </div>
        <div>
          <h2 className='card-title'>{login}</h2>
          <Link className='text-base-content text-opacity-40' to={`/users/${login}`}>
            Visit profile
          </Link>
        </div>
      </div>
    </div>
  )
}

export default React.memo(UserItem)
