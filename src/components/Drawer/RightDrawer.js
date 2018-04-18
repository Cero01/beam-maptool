import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import { createMuiTheme } from 'material-ui/styles';
import IconButton from 'material-ui/IconButton';
import Close from 'material-ui-icons/Close';
import { MenuItem } from 'material-ui/Menu';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#0089ff',
      hover: '#1976d2',
      contrastText: '#ffffff',
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
  },

  button: {
    width: '90%',
    height: '60px',
    marginTop: '30px',
    marginLeft: '25px',
    marginBottom: '20px',
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.light,
    "&:hover": {
      backgroundColor: theme.palette.primary.hover,
    }
  },

  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    margin: theme.spacing.unit,

  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },


});


class RightDrawer extends React.Component {

  state = {
    open: false,
    container: {
      latitude: '21.01800700',
      longtitude: '105.82409700',
      address: 'Ô Chợ Dừa, Đống Đa, Hà Nội',
      clicktype: 'confirm',
      os: 'Android',
      udid: 'KhoaHA',
    },
  };
  handleChange = name => event => {
    this.setState({
      container:{
        [name]: event.target.value,
      }
    });
  };

  toggleDrawer = (toggle) => () => {
    this.setState({
      open: toggle,
    });
  };

  render() {
    const { classes } = this.props;

    const closeButton = (
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={this.toggleDrawer(false)}
      >
        <Close />
      </IconButton>
    );

    const containerList = (
      <div className={classes.container}>
        <TextField
          label="LATITUDE"
          defaultValue={this.state.container.latitude}
          disabled
          className={classes.textField}
        />
        <TextField
          label="LONGTITUDE"
          defaultValue={this.state.container.longtitude}
          disabled
          className={classes.textField}
        />
        <TextField
          label="ADDRESS"
          defaultValue={this.state.container.address}
          fullWidth
          disabled
          className={classes.textField}
        />

          <TextField
          select
          label="CLICK TYPE"
          fullWidth
          margin="normal"
          className={classes.textField}
          value={this.state.container.clicktype}
          onChange={this.handleChange('clicktype')}
          SelectProps={{
            MenuProps: {
              className: classes.menu,
            },
          }}

        >
            <MenuItem key="1" value="confirm">Confirm </MenuItem>
            <MenuItem key="2" value="deny">Deny </MenuItem>
         
        </TextField>

        <TextField
          label="OS"
          defaultValue={this.state.container.os}
          fullWidth
          disabled
          className={classes.textField}
        />

        <TextField
          label="UDID"
          defaultValue={this.state.container.udid}
          fullWidth
          disabled
          className={classes.textField}
        />

      </div>
    );

    const sideList = (
      <div className={classes.list}>
        {closeButton}
        <Button className={classes.button}>
          CREATE
        </Button>
        {containerList}
      </div>
    );

    return (
      <div>
        <Button onClick={this.toggleDrawer(true)}>Open</Button>

        <Drawer
          anchor={'right'}
          open={this.state.open}
          variant={'temporary'}
        >
          {sideList}
        </Drawer>
      </div>
    );
  }
}

RightDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
};



export default withStyles(styles)(RightDrawer);