import React, { Component } from 'react';
import { connect } from 'react-redux';
//import { bindActionCreators } from 'redux'
//import Reboot from 'material-ui/Reboot';
import { getPage } from './router';
import {store} from './global'
import DetailPage from './components/Pages/Detail'
import ButtonAppBar from './components/Header/ButtonAppBar'
import * as keys from './constants/storageKeys'

class App extends Component {

  constructor(props) {
    super(props);
    this.state = { onboarded: false, loading: true }
    this.goToApp = this.goToApp.bind(this);
  }

  componentWillMount() {
    const onBoarded = store(keys.ONBOARDED);
    if(onBoarded){
      this.setState({loading: false})
    }
    //--todo reconsider this for (if longin already)
    //you can show a screen saver or a tutorial screen
    this.goToApp();

  }
  
  goToApp() {
    store(keys.ONBOARDED, true)
    this.setState({ onboarded: true })
  }

  render() {
    const { onboarded, loading } = this.state
    const { page, options } = this.props;
    const context = () => { return getPage(page, options); };

    if(loading) return null
    //see notes if(!onboarded) return <WelcomeScreen onPress={this.goToApp} />

    return (
      <div>
        <ButtonAppBar />
        <DetailPage context={context()} />
      </div>
    );
  }
}

export default connect(
  (state) => ({ 
    page: state.global.page,
    options: state.global.options,
  })
)(App)
