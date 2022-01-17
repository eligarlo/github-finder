import { BrowserRouter as Router, Route } from 'react-router-dom'
import Navbar from 'components/layout/Navbar'

const App: React.FC = () => {
  return (
    <Router>
      <div className='flex flex-col justify-between h-screen'>
        <Navbar title='Github Finder' />

        <main>Content</main>
      </div>
    </Router>
  )
}

export default App
