import UserResults from 'components/users/UserResults'
import UserSearch from 'components/users/UserSearch'

interface IHomeProps {}

const Home: React.FC<IHomeProps> = () => {
  return (
    <>
      <UserSearch />
      <UserResults />
    </>
  )
}

export default Home
