import React from 'react'
import styled from 'styled-components'

const Square = styled.div`
  width: ${props => props.width ? `${props.width}px` : `100%`};
  position: relative;
  display: inline-block;
  background-color: #000;
`

const Logo = ({width, className}) => <Square width={width} className={className}>
.
</Square>

export default Logo
