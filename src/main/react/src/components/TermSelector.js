import React, { Component } from 'react'

import AppBar from '@material-ui/core/AppBar'
import FormControl from '@material-ui/core/FormControl'
import Input from '@material-ui/core/Input'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import { withStyles } from '@material-ui/core/styles'

const styles = () => ({
  field: {
    display: 'flex',
    margin: 10,
  },
  form: {
    float: 'left'
  },
  icon: {
    color: 'white'
  },
  input: {
    color: 'white',
    underline: {
      '&before': {
        borderBottomColor: 'white'
      }
    }
  },
  select: {
    '&:focus': {
      color: 'white'
    }
  },
  underline: {
    '&:before': {
      borderBottomColor: 'white'
    },
    '&:after': {
      borderBottomColor: 'white'
    }
  }
})

class TermSelector extends Component {
  render () {
    const { 
      classes, 
      handleChange, 
      selectedTerm, 
      terms
    } = this.props

    return (
      <div>
        <AppBar position="static">
          <form autoComplete="off">
            <FormControl className={classes.form}>
              <Select
                autoWidth={true}
                classes={{
                  select: classes.select,
                  icon: classes.icon
                }}
                className={classes.field}
                input={
                  <Input
                    id="term-selector"
                    classes={{
                      root: classes.input,
                      underline: classes.underline
                    }}
                  />
                }
                onChange={handleChange}
                value={selectedTerm}
              >
                {!Object.is(terms, null) && 
                  terms.map(t => (
                    <MenuItem key={t.code} value={t.code}>
                      {t.description}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </form>
        </AppBar>
      </div>
    )
  }    
}

export default withStyles(styles)(TermSelector)