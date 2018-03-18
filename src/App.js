import React, { Component } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import {Navigation, Routes} from 'components/Navigation'
import {Grid} from 'react-bootstrap'

class App extends Component {
  render () {
    return (
      <Router>
        <Grid>
          <Navigation />
          <Routes />
        </Grid>
      </Router>
    )
  }
}

export default App
