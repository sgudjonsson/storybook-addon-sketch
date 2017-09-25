import React from 'react'
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live'
import styled, { css } from 'styled-components'
import * as polished from 'polished'

const initialCode = `<div>
  <strong>Hello World!</strong>
</div>
`

const StyledProvider = styled(LiveProvider)`width: 100%;`

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-content: stretch;
  align-items: stretch;
`

const row = css`
  order: 0;
  flex: 0 1 auto;
  align-self: auto;
`

const StyledEditor = styled(LiveEditor)`
  font-family: 'Source Code Pro', monospace;
  font-size: ${polished.rem(14)};
  max-height: scroll;
  ${row};
`

const StyledPreview = styled(LivePreview)`
  position: relative;
  padding: 0.5rem;
  background: white;
  color: black;
  height: auto;
  overflow: hidden;
  ${row};
`

const StyledError = styled(LiveError)`
  font-family: 'Source Code Pro', monospace;
  font-size: ${polished.rem(14)};

  display: block;
  padding: ${polished.rem(8)};
  background: #ff5555;
  color: #f8f8f2;
`

class Sketch extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      code: this.props.code || initialCode,
    }

    this.handleOnChange = this.handleOnChange.bind(this)
  }

  handleOnChange(code) {
    // do something clever with the new code
  }

  render() {
    return (
      <StyledProvider scope={this.props.scope} code={this.state.code}>
        <StyledWrapper>
          <StyledEditor onChange={this.handleOnChange} />
          <StyledError />
          <StyledPreview />
        </StyledWrapper>
      </StyledProvider>
    )
  }
}

export default Sketch
