import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
// Context
import { GithubProvider } from 'context/github/GithubContext'
import { AlertProvider } from 'context/alert/AlertContext'
// Pages
import Home from 'pages/Home'
import About from 'pages/About'
import NotFound from 'pages/NotFound'
// Components
import Navbar from 'components/layout/Navbar'
import Footer from 'components/layout/Footer'
import Alert from 'components/layout/Alert'

const App: React.FC = () => {
  return (
    <GithubProvider>
      <AlertProvider>
        <Router>
          <div className='flex flex-col justify-between h-screen'>
            <Navbar title='Github Finder' />

            <main className='container mx-auto px-3 pb-12'>
              <Alert />
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/about' element={<About />} />
                <Route path='/notfound' element={<NotFound />} />
                <Route path='/*' element={<NotFound />} />
              </Routes>
            </main>

            <Footer />
          </div>
        </Router>
      </AlertProvider>
    </GithubProvider>
  )
}

export default App
