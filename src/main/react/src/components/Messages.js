import React, { Component } from 'react'

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  card: {
    margin: '10px 10px 20px 10px'
  },
  content: {
    fontSize: 14,
    margin: '0px !important',
    padding: '5px 0px 0px 10px !important'
  },
  header: {
    backgroundColor: theme.palette.primary.light,
    color: 'black',
    fontSize: 16
  },
  list: {
    padding: 0
  }
})

const Message = ({msg}) => {
  return msg.map((m, i) => {
    return (<div key={i}>
      <ListItem style={{padding: 0, minHeight: 40}}>
        <ListItemText
          disableTypography
          style={{fontSize: 14}}
        >
          {m.message}
        </ListItemText>
      </ListItem>
    </div>
  )})
}

class Messages extends Component {
  render () {
    const {
      classes,
      messages
    } = this.props

    return (
      <Card className={classes.card}>
        <CardHeader
          className={classes.header}
          classes={{title: classes.header}}
          title="Urgent Messages Pertaining to Your Account"
        />
        <CardContent
          className={classes.content}
          style={{marginTop: 11}}
        >
          <List className={classes.list}>
            <Message msg={messages} />
          </List>
        </CardContent>
      </Card>  
    )
  }
}

export default withStyles(styles)(Messages)
