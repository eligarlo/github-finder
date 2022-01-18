import spinner from 'components/layout/assets/spinner.gif'

const Spinner: React.FC = () => {
  return (
    <div className='w-100 mt-20'>
      <img src={spinner} alt='Loading...' width={180} className='text-center mx-auto' />
    </div>
  )
}

export default Spinner
