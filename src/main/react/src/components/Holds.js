import React, { Component } from 'react'

import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import OpenInNewIcon from '@material-ui/icons/OpenInNew'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'
import Warning from '@material-ui/icons/Warning'
import { withStyles } from '@material-ui/core/styles'


const styles = theme => ({
  btn: {
    float: 'right',
    fontWeight: 'bolder',
    marginBottom: 10,
    marginTop: 10,
    padding: '5px 10px'
  },
  card: {
    borderLeft: '10px solid #FFCA28',
    margin: 10,
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
  dialogContent: {
    borderLeft: '10px solid #FFCA28'
  },
  dialogTitle: {
    padding: '15px 0px 0px 2px'
  },
  display: {
    borderBottom: '1px solid #D3D3D3',
    display: 'flex'
  },
  icon: {
    color: '#FFCA28',
    fontSize: 50,
    marginTop: 3,
    padding: '8px'
  },
  list: {
    padding: '0px 0px 0px 5px'
  },
  mobileCard: {
    borderLeft: '10px solid #FFCA28',
    margin:10
  },
  warningHeader: {
    color: 'black',
    fontSize: 16,
    padding: '0px !important'
  }
})

const Requirements = ({req}) => {
  return req.map((r, i) => {
    return (
      <ListItem key={i} style={{padding: 0, minHeight: 40}}>
        <ListItemText
          disableTypography
          style={{fontSize: 14, maxWidth: '85%'}}
        >
          {r.requirement}
        </ListItemText>
          {!Object.is(r.url, null) && (
            <ListItemIcon>
              <Tooltip title="More Information" placement="bottom">
                <IconButton
                  aria-labelledby="new-window-2"
                  href={r.url}
                  rel="noopener noreferrer"
                  style={{float: 'right', paddingTop: 12, marginLeft: 75}}
                  target="_blank"
                > 
                  <OpenInNewIcon />
                </IconButton>
              </Tooltip>
            </ListItemIcon>
          )}
      </ListItem>
    )
  })
}

class Holds extends Component {
  render() {
    const { 
      classes,
      handleClickOpen,
      handleClose,
      holds, 
      mobile, 
      open, 
      Transition
    } = this.props

    return (
      <Card className={mobile ? classes.mobileCard : classes.card}>
        <div className={classes.display}>
          <Warning className={classes.icon} aria-hidden="true"/>
          <CardHeader
            classes={{
              title: classes.warningHeader
            }}
            className={classes.list}
            title="Unsatisfied Requirements"
          />
        </div>
        <CardContent className={classes.content}>
          <List className={classes.list}>
            <Requirements req={holds.slice(0,3)} />
          </List>
            {holds.length > 3 && 
              <div>
                <Button
                  className={classes.btn}
                  color="secondary"
                  aria-label="Opens all Unsatisfied Requirements in a dialog"
                  onClick={handleClickOpen}
                >
                  View All
                </Button>
                <Dialog
                  classes={{
                    paper: classes.dialogContent
                  }}
                  keepMounted
                  onClose={handleClose}
                  open={open}
                  TransitionComponent={Transition}
                >
                <div className={classes.display}>
                  <Warning className={classes.icon} />
                  <DialogTitle 
                    className={classes.dialogTitle}
                  >
                    Unsatisfied Requirements
                  </DialogTitle>
                </div>
                <DialogContent 
                  className={classes.content}>
                  <Typography className={classes.container}>
                    <Requirements req={holds} /> 
                  </Typography>
                </DialogContent>
                <DialogActions>
                  <Button 
                    className={classes.btn}
                    color="secondary"
                    onClick={handleClose} 
                  >
                    Close
                 </Button>
                </DialogActions>
              </Dialog>
            </div> 
          }
        </CardContent>
      </Card> 
    )
  }
}

export default withStyles(styles)(Holds)