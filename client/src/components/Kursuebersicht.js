import ResponsiveDrawer from './MenuAppBar.js';
import {makeStyles} from "@material-ui/core/styles";
import React from "react";
import EnhancedTable from './AppointmentTable';



const useStyles = makeStyles((theme) => ({
    app: {
    'text-align': 'center',
},
    appheader: {
        'min-height': '100vh',
        display: 'flex',
        'flex-direction': 'column',
        'align-items': 'center',
        'justify-content': 'center',
        'font-size': 'calc(10px + 2vmin)',
    },
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        width: '80vw',
        marginLeft: '180px',
        border: '1px solid white',

    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: '60ch',
    },
    text: {
        'font-size': 'calc(5px + 2vmin)',
        marginLeft: '10px',
        marginRight: '50px',
    },
}));

function Kursubersicht() {
    const classes = useStyles();

    return (
    <div className={classes.app}>
      <header className={classes.appheader}>
      <ResponsiveDrawer />
        <p>
          Kursübersicht
        </p>
          <div className={classes.root}>
              <EnhancedTable />
          </div>
      </header>
    </div>
  );
}

export default Kursubersicht;
