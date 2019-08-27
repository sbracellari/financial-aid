import React, { Component } from 'react'

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  card: {
    margin: 10,
    width: '100%'
  },
  cards: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%'
  },
  container: {
    display: 'flex',
    flexDirection: 'column'
  },
  content: {
    fontSize: 14,
    padding: '10px !important'
  },
  header: {
    backgroundColor: theme.palette.primary.light,
    color: 'black',
    fontSize: 16
  },
  tableCard: {
    margin:10
  }
})

class Status extends Component {
  render() {
    const { 
      classes, 
      mobile,
      progress 
    } = this.props

    return (
      <Card className={mobile ? classes.tableCard : classes.card}>
        <CardHeader
          className={classes.header}
          classes={{title: classes.header}}
          title="Financial Aid Status"
        />
        <CardContent
          className={classes.content}
          style={{marginTop: 11}}
        >
            {progress}
        </CardContent>
      </Card>  
    )
  }
}

export default withStyles(styles)(Status)