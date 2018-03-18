import React, { Component } from 'react'

import styled from 'styled-components'
const SiteTitle = styled.h1`
  font-size: 4vh;
  margin-top: 40vh;
  text-align: center;
  text-transform: uppercase;
  font-weight: bold;
  font-family: monospace;
  span {
    &::after {
      content: "•";
    }
  }
`

class Home extends Component {
  render () {
    return (
      <div>
        <SiteTitle>Colo<span></span>phon<span></span>emes</SiteTitle>
      </div>
    )
  }
}

export default Home
