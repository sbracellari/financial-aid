import React, { Component } from 'react'

import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import Error from '@material-ui/icons/Error'
import IconButton from '@material-ui/core/IconButton'
import OpenInNewIcon from '@material-ui/icons/OpenInNew'
import Tooltip from '@material-ui/core/Tooltip'
import { withStyles } from '@material-ui/core/styles'

const styles = () => ({
  button: {
    color: '#000000',
    opacity: 0.8
  },
  card: {
    borderLeft: '10px solid #D32F2F',
    margin:10
  },
  header: {
    borderBottom: '1px solid #d3d3d3',
    borderRadius: 0
  },
  icon: {
    color: '#D32F2F',
    fontSize: 50
  },
  iconButton: {
    alignSelf: 'center',
    paddingTop: 5
  },
  link: {
    marginLeft: 5
  },
  root: {
    color: 'black',
    position: 'relative',
    width: '100%'
  },
  title: {
    fontSize: 20
  }
})

class ErrorMessages extends Component {
  render() {
    const { classes } = this.props
    
    return (
      <div className={classes.root}>
        <Card className={classes.card}>
          <CardHeader
            className={classes.header}
            classes={{
              action: classes.iconButton,
              title: classes.title
            }}
            avatar={
              <Error className={classes.icon} />
            }
            title="You currently have no financial information to display"
            subheader={
              <div>
                If you believe this is an error, please contact 
                  <a 
                    aria-label="Oakland University Technology Services. Opens an email application."
                    className={classes.link}
                    href="mailto:uts@oakland.edu"                 
                    rel="noopener noreferrer"
                  >
                    Oakland University Technology Services
                  </a>
              </div>             
            }
            action={
              <Tooltip title="More Information" placement="bottom">
                <IconButton
                  aria-labelledby="new-window-2"
                  className={classes.button}
                  href="https://sail.oakland.edu/PROD/twbkwbis.P_GenMenu?name=bmenu.P_FinAidMainMnu"
                  rel="noopener noreferrer"
                  target="_blank"
                > 
                  <OpenInNewIcon />
                </IconButton>
              </Tooltip>
            }
          >
          </CardHeader>
        </Card>
      </div>
    )
  }
}

export default withStyles(styles)(ErrorMessages)
