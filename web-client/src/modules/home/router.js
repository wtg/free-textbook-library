// Main Containers
import Home from './pages/home'
import About from './pages/about'

const HomeRoute = {
  path: '/',
  component: Home
}

const AboutRoute = {
  path: '/about',
  component: About
}

export default [
  HomeRoute,
  AboutRoute
]
