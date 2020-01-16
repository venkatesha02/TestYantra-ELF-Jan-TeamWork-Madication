import React from 'react';
import Header from './Header'
import { UserProvider } from './context/userAuthentication';
import { Snackbar } from '@material-ui/core';

class App extends React.Component {
  state = {
    login: false,
    user: false,

    setUser: (e) => {
      this.setIsUser(e)
    },
    setLogin: (e) => {
      this.setLogout(e)
    }
  }

  setLogout = (e) => {
    this.setState({
      ...this.state,
      login: e
    })
  }

  setIsUser = (e) => {
    this.setState({
      ...this.state,
      user: e
    })
  }


  render() {
    return (
      <div>
        <UserProvider value={this.state}>
          <Header />
        </UserProvider>
      </div>)
  }
}
export default App;