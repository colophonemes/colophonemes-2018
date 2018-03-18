import React, { Component } from 'react'
import P5Wrapper from 'react-p5-wrapper'
import pendula from 'sketches/pendula'
import {List} from 'immutable'

import {Button} from 'react-bootstrap'
import FontAwesome from 'react-fontawesome'
import styled from 'styled-components'

const SketchWrapper = styled.div`
  position: relative;
  width: 100%;
  margin-top: -120px;
  height: 100vh;
  visibility: ${props => props.ready ? 'visible' : 'hidden'}
`

const PendulaControlsWrapper = styled.div`
  position: absolute;
  top: 100px;
`

const PendulaControls = styled.div`
    // height: ${props => props.showControls ? 300 : 0}px;
    overflow: hidden;
    transition: height 0.5s
`

class Pendula extends Component {
  constructor (props) {
    super(props)
    this.state = {
      bounds: List([300, 300]),
      showControls: false
    }
  }

  getBounds = () => {
    const parent = this.refs.sketchContainer.parentNode
    this.setState({ bounds: List([parent.clientWidth, parent.clientHeight]) })
  }

  getReady = () => {
    this.getBounds()
    this.getArms()
    this.setState({ready: true})
  }

  getArms = () => {
    const arms = 4
    this.setState({arms})
  }

  reset = () => {
    this.setState({bounds: List([0, 0])}, this.getBounds) // TODO: very hacky, change this!
  }

  toggleControls = () => this.setState({showControls: !this.state.showControls})

  componentDidMount () {
    // wait for the dom to render, so that there's no flash of tiny canvas
    setTimeout(this.getReady, 1000)
  }

  render () {
    const {bounds, ready, showControls} = this.state
    return (
      <div ref='sketchContainer'>
        <SketchWrapper ready={ready}>
          {<PendulaControlsWrapper>
            {/* <a onClick={this.toggleControls}>Controls <FontAwesome name='plus' /></a> */}
            <PendulaControls className='controls' showControls={showControls}>
              <Button bsStyle='sm' onClick={this.reset}>Reset <FontAwesome name='refresh' /></Button>
            </PendulaControls>
          </PendulaControlsWrapper>}
          <P5Wrapper sketch={pendula} bounds={bounds} />
        </SketchWrapper>
      </div>
    )
  }
}

export default Pendula
