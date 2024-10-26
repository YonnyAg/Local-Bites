import { useRoutes, BrowserRouter } from 'react-router-dom'
import Home from '../Home'
import Premises from '../Premises'
import Contact from '../Contact'
import Login from '../Login'
import Navbar from '../../Components/Navbar'
import Footer from '../../Components/Footer'
import './App.css'

const AppRoutes = () => {
  let routes = useRoutes([
    {path: '/', element: <Home />},
    {path: '/locales', element: <Premises />},
    {path: '/contacto', element: <Contact />},
    {path: '/login', element: <Login />}
  ])

  return routes
}

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <AppRoutes />
      <Footer />
    </BrowserRouter>
  )
}

export default App
