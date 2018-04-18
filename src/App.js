import React, { Component } from 'react';
import 'typeface-roboto';
// import Test from './components/Drawer/Test';
// import RightDrawer from './components/Drawer/RightDrawer';
import DemoApp from './components/Maps/DemoApp';

class App extends Component {
  // constructor() {
  //   super();
  //   this.state = {
  //     leftDrawer: {
  //       open: false,
  //     },
  //     open: false,
  //     container: {
  //       latitude: '21.01800700',
  //       longtitude: '105.82409700',
  //       address: 'Ô Chợ Dừa, Đống Đa, Hà Nội',
  //       clicktype: 'confirm',
  //       os: 'Android',
  //       udid: 'KhoaHA',
  //     },
  //   }
  // }
  
  // toggleDrawer = (toggle) => () => {
  //   this.setState({
  //     open: toggle,
  //   });
  // };

  render() {
    return (
      <div>
        <DemoApp />
        {/* <Test />
        <RightDrawer /> */}
      </div>
    );
  }
}

export default App;
