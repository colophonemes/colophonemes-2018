import React from 'react'
import { Route, Link, NavLink } from 'react-router-dom'
import { Navbar, Nav } from 'react-bootstrap'
// import FontAwesome from 'react-fontawesome'
import Logo from 'components/Logo'
import {Home, Pendula} from 'containers'
// Router
const Routes = () => (
  <div>
    <Route exact path='/' component={Home} />
    <Route path='/pendula' component={Pendula} />
  </div>
)

// Navigation
const Navigation = () => (
  <Navbar fixedTop>
    <Navbar.Header>
      <Navbar.Brand>
        <Link to='/'><Logo width={16} /> Colophonemes</Link>
      </Navbar.Brand>
    </Navbar.Header>
    <Nav>
      <LinkNavItem to='/pendula'>
        Pendula
      </LinkNavItem>
    </Nav>
  </Navbar>
)

const LinkNavItem = ({to, children}) => <li role='presentation'>
  <NavLink to={to} activeClassName='active'>{children}</NavLink>
</li>

export {Navigation, Routes}
