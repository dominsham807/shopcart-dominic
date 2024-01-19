import { Outlet } from 'react-router-dom'
import './App.css'
import NavItems from './components/NavItems'
import Footer from './components/Footer'
import { Toaster } from 'react-hot-toast'

function App() {

  return (
    <>
      <NavItems />
      <div className="min-vh-100">
        <Outlet />
      </div>
      <Toaster position='bottom-center' />
      <Footer />
    </>
  )
}

export default App
