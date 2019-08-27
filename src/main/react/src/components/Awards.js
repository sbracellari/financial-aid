import React, { Component } from 'react'

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  body: {
    fontSize: 14,
    margin: 0,
    padding: 0
  },
  header: {
    backgroundColor: theme.palette.primary.light,
    color: 'black',
    fontSize: 16
  },
  table: {
    overflow: 'auto',
    padding: '0 !important'
  },
  tableCard: {
    margin:10
  },
  tableHeader: {
    color: '#000000 !important',
    fontWeight: 'bolder'
  },
  text: {
    marginTop: 11,
    padding: 10
  }
})

const Award = ({ awards }) => {
  return awards.map((a, i) => {
    return (
      <TableRow key={i}>
        <TableCell style={{color: 'black'}}> {a.fund} </TableCell>
        <TableCell style={{color: 'black'}}> {a.status} </TableCell>
        <TableCell style={{color: 'black'}}> ${a.offer} </TableCell>
        <TableCell style={{color: 'black'}}> ${a.paid} </TableCell>
      </TableRow>
    )
  })
}

class Awards extends Component {
  render () {
    const { 
      awards, 
      classes
    } = this.props
  
    return (
      <div>
        <Card className={classes.tableCard}>
          <CardHeader
            className={classes.header}
            classes={{title: classes.header}}
            id="table-title"
            title="Awards"
          />
          <CardContent className={classes.table}>
            <Table>
              {!Object.is(awards, undefined) && awards.length !== 0 ? (
                <TableBody>
                  <TableRow>
                    <TableCell className={classes.tableHeader}>FUND</TableCell>
                    <TableCell className={classes.tableHeader}>STATUS</TableCell>
                    <TableCell className={classes.tableHeader}>OFFERED</TableCell>
                    <TableCell className={classes.tableHeader}>PAID</TableCell>
                  </TableRow>
                    <Award awards={awards} />
                </TableBody>
              ) : (
                <TableBody className={classes.body}>
                  <div className={classes.text}>
                    You do not have any awards at this time
                  </div>
                </TableBody>
              )}
            </Table>
          </CardContent>
        </Card>
      </div>
    )
  }
}

export default withStyles(styles)(Awards)