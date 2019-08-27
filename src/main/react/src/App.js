import React, { Component } from 'react'

import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import ErrorPage from './components/ErrorPage'
import OpenInNewIcon from '@material-ui/icons/OpenInNew'
import Slide from '@material-ui/core/Slide'
import TermSelector from './components/TermSelector'
import { get_current, get_financial_info } from './api/api.js'
import { withStyles } from '@material-ui/core/styles'

import Awards from './components/Awards'
import Holds from './components/Holds'
import Messages from './components/Messages'
import Status from './components/Status'

const styles = () => ({
  btn: {
    float: 'right',
    fontWeight: 'bolder',
    marginBottom: '10px 0px 10px 0px',
    padding: '5px 10px'
  },
  cards: {
    display: 'flex',
    flexDirection: 'row'
  },
  container: {
    display: 'flex',
    flexDirection: 'column'
  },
  iconButton: {
    margin: 0,
    padding: '0px 0px 0px 3px'
  },
  loading: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '0.5em',
    marginTop: '4em' 
  },
  root: {
    fontFamily: 'arimo'
  }
})

function Transition(props) {
  return <Slide direction="down" {...props} />
}

class App extends Component {
  state = {
    awards: null,
    currentTerm: null,
    error: false,
    holds: null,
    loading: true,
    messages: null,
    open: false,
    progress: null,
    selectedTerm: '',
    terms: null,
    width: window.innerWidth
  }

  handleClickOpen = () => {
    this.setState({ open: true })
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  handleChange = event => {
    const selectedTerm = event.target.value

    // call this method with selectedTerm, true to use demo data
    get_current(selectedTerm, true).then(finaid => {
      this.setState({
        awards: finaid.awards,
        holds: finaid.holds,
        messages: finaid.messages,
        progress: finaid.progress,
        selectedTerm: selectedTerm
      })
    })
  }

  handleResize = e => {
    this.setState({ width: window.innerWidth})
  }

  componentDidMount() {
    // call this method with true to use demo data
    get_financial_info(true).then(finaid => {
      if (
        finaid.terms === null ||
        finaid.terms === undefined ||
        finaid.terms.length === 0
      ) {
        this.setState({ error: true })
        return
      }

      let currentTerm = finaid.terms[0]
      let selectedTerm = finaid.terms[0].code
  
      for (let i = 0; i < finaid.terms.length; i++) {
        const t = finaid.terms[i]
        if (t.current === true) {
          currentTerm = t
          selectedTerm = t.code
        }
      }

      window.addEventListener('resize', this.handleResize)
  
      this.setState({
        awards: finaid.awards,
        currentTerm: currentTerm,
        holds: finaid.holds,
        loading: false,
        messages: finaid.messages,
        progress: finaid.progress,
        selectedTerm: selectedTerm,
        terms: finaid.terms
      })
    })
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize)
  }

  getCurrentTerm() {
    if (this.state.currentTerm === null) {
      return ''
    }
    return this.state.currentTerm
  }

  render() {
    const { classes } = this.props
    const {
      awards,
      error,
      holds,
      loading,
      messages,
      open,
      progress,
      selectedTerm,
      terms,
      width
    } = this.state

    const mobile = (width < 720 ? true : false)

    if (error === true) {
      return <ErrorPage />
    } else if (loading === true) {
      return (
        <div className={classes.loading}>
          <CircularProgress 
            color="secondary" 
            size={50} 
          />
        </div>
      )
    }
    
    return (      
      <div 
        className={classes.root}
        role="heading"
        aria-level="1"
      >
        <TermSelector
          handleChange={this.handleChange}
          selectedTerm={selectedTerm}
          terms={terms}
        />
        <div className={mobile ? classes.container : classes.cards}>
          <Status
            mobile={mobile}
            progress={progress}
          />
          {!Object.is(holds, undefined) && holds.length !== 0 && (
            <Holds
              handleClickOpen={this.handleClickOpen}
              handleClose={this.handleClose}
              holds={holds}
              mobile={mobile}
              open={open}
              Transition={Transition}
            />
          )}
        </div> 
        <div>
          {!Object.is(messages, undefined) && messages.length !== 0 &&
          this.state.selectedTerm === this.state.currentTerm.code && (
            <Messages
              messages={messages} 
            />
          )}
        </div>
        <div>
          <Awards
            awards={awards}
          />
        </div>
        <Button
          aria-label="Open Financial Information in new tab"
          className={classes.btn}
          color="secondary"
          href="https://jsoneditoronline.org"
          target="_blank"
          variant="outlined"
        >
          Financial Aid
          <OpenInNewIcon
            aria-hidden="true"
            color="secondary"
            className={classes.iconButton}
          />
        </Button>
      </div>
    )
  }
}

export default withStyles(styles)(App)
