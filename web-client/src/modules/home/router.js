// Main Containers
import Home from './pages/home'
import About from './pages/about'
import Faq from './pages/faq'

const HomeRoute = {
  path: '/',
  component: Home
}

const AboutRoute = {
  path: '/about',
  component: About
}

const FaqRoute = {
  path: '/faq',
  component: Faq
}

export default [
  HomeRoute,
  AboutRoute,
  FaqRoute
]
