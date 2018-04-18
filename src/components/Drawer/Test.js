import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import List, { ListItem, ListItemText } from 'material-ui/List';
import { createMuiTheme } from 'material-ui/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#0089ff',
      main: '#3f50b5',
      dark: '#002884',
      contrastText: '#ffffff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
});

const styles = ({
  list: {
    width: 450
  },

  title: {
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.light,
  }

});


const Test = () => {
  
    const { classes } = this.props;

    const header = (
      <div>
        <Typography variant="headline" color="inherit" gutterBottom>
          TRAFFIC BEAM
      </Typography>
        <Typography variant="subheading" color="inherit" gutterBottom>
          TESTING TOOLKIT
      </Typography>
      </div>
    );

    const sideList = (
      <div className={classes.list}>
        <List >
          <ListItem className={classes.title} divider>
            {header}
          </ListItem>

          <ListItem button component="a" href="#spot-management" divider>
            <ListItemText primary="SPOT MANAGEMENT" />
          </ListItem>

          <ListItem button component="a" href="#preview-tracking" divider>
            <ListItemText primary="PREVIEW TRACKING" />
          </ListItem>

        </List>
      </div>
    );

    return (
      <div>
        <Button onClick={this.toggleDrawer(true)}>Open</Button>
        <Drawer
          anchor={'left'}
          open={this.state.open}
          onClick={this.toggleDrawer(false)}
          variant={'temporary'}
        >
          {sideList}
        </Drawer>
      </div>
    );
  
}

Test.propTypes = {
  classes: PropTypes.object.isRequired,
};



export default withStyles(styles)(Test);