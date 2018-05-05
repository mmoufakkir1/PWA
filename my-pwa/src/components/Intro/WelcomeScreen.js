import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Grid from 'material-ui/Grid';
import {
  GoogleAPI, GoogleLogin, GoogleLogout, CustomGoogleLogin,
  CustomGoogleLogout
} from 'react-google-oauth';
import * as globalReducers from '../../reducers/global';
import * as globalActions from '../../actions/global';
import * as keys from '../../constants/storageKeys';
import App from '../../App';
import { store } from '../../global';
import axiosService from '../../utils/api';

const styles = {
  root: {
    flexGrow: 1,
    direction: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginTop: 100,
    textAlign: 'center',
  },
  textField: {
    width: '300px',
    paddingTop: 5,
    marginTop: 5,
  },
  lineDivStyle: {
    width: '100%',
    maxWidth: '300px',
    height: '10px',
    borderBottom: '1px solid black',
    textAlign: 'center',
    display: 'inline-block',
  },
  lineSpanStyle: {
    fontSize: '20px',
    backgroundColor: '#fff',
    padding: '0 5px'
  },
  error: {
    borderBottom: '1px solid red',
  }
};

class WelcomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      confirmpassword: '',
      name: '',
      selectedCategory: 0,
      isLoading: false,
      isEmailValid: false,
      isPasswordValid: false,
      isConfirmationValid: false,
      errorText: '',
      errorShow: {
        email: false,
        password: false,
      }
    };
    this.googleSignup = this.googleSignup.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.HandleValidateInput = this.HandleValidateInput.bind(this);
  }

  selectCategory(selectedCategory) {
    this.setState({
      selectedCategory,
      isLoading: false,
    });
  }

  //google sign in
  googleSignup(res, type) {
    let { user } = this.props;

    if (type === 'google' && res.w3.U3) {
      user = {
        userName: res.w3.ig,
        email: res.w3.U3,
        avatar: res.w3.Paa
      };
      this.props.actions.updateUser(user);
      this.props.actions.updateLoginStatus(true);
      store(keys.ONBOARDED, true);
    }
  }

  // login and sign up
  handleLogin(set) {
    let { user } = this.props;
    user = {
      email: this.state.email,
      passwordHash: this.state.password
    }

    if (!this.state.errorShow) {
      if (set) {
        //sign up
        this.selectCategory(set);
        serviceAccessCall("user/Add");
      } else {
        //login
        this.selectCategory(set);
        serviceAccessCall("user/Login");
      }
    } else {
      console.log("error");
    }
  }

  serviceAccessCall(path) {
    axiosService.composerPost(path, user).then(res => {
      if (res.data.status == "ok") {
        this.props.actions.updateUser(user);
        this.props.actions.updateLoginStatus(true);
        store(keys.ONBOARDED, true);
      }
    });
  }

  HandleValidateInput = prop => event => {
    const elm = [prop];
    const value = event.target.value;
    let vCheck = false;

    switch (elm.toString()) {
      case 'email':
        vCheck = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)
          ? true : false;
        break;
      case 'password':
        vCheck = value.length >= 6 ? true : false;
        break;
    }

    if (vCheck) {
      this.setState({ errorShow: { ...this.state.errorShow, [elm]: false } });
    }
    else {
      this.setState({ 'errorText': elm + " is not valid" });
      this.setState({ errorShow: { ...this.state.errorShow, [elm]: true } });
    }
  }

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
    console.log(event.target.value)
  };

  render() {
    const {
      selectedCategory,
      isLoading,
      isEmailValid,
      isPasswordValid,
      isConfirmationValid,
      email,
      password,
      passwordConfirmation,
    } = this.state;

    let { isLogin, user } = this.props;

    const isLoginPage = selectedCategory === 0;
    const isSignUpPage = selectedCategory === 1;
    const isPasswordRecovery = selectedCategory === 2;

    const responseGoogle = (response) => {
      this.googleSignup(response, 'google');
    }

    const responseGoogleSigninStatus = (response) => {
      console.log('responseGoogleSigninStatus ' + response);
    }

    if (isLogin) return <App />;

    return (
      <div style={styles.root}>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <TextField style={styles.textField}
              id="email"
              label="Email"
              value={this.state.email}
              onChange={this.handleChange('email')}
              onBlur={this.HandleValidateInput('email')}
              margin="normal"
              helperText={this.state.errorText}
              error={this.state.errorShow.email}
              required
            />
          </Grid>
          {!isPasswordRecovery ?
            <Grid container spacing={24}>
              <Grid item xs={12}>
                <TextField style={styles.textField}
                  id="password"
                  label="Password"
                  value={this.state.password}
                  type='password'
                  onChange={this.handleChange('password')}
                  onBlur={this.HandleValidateInput('password')}
                  margin="normal"
                  helperText={this.state.errorText}
                  error={this.state.errorShow.password}
                  required
                />
              </Grid>
              {isSignUpPage ?
                <Grid item xs={12}>
                  <TextField style={styles.textField}
                    id="confirmpassword"
                    label="Confirm Password"
                    value={this.state.confirmpassword}
                    type='password'
                    onChange={this.handleChange('confirmpassword')}
                    margin="normal"
                    helperText={this.state.errorText}
                    error={this.state.errorShow.password}
                    required
                  />
                </Grid> : null}
              <Grid item xs={12}>
                <Button
                  variant="raised"
                  color="primary"
                  size="large"
                  style={styles.textField}
                  onClick={() => isLoginPage ? this.handleLogin(0) : this.handleLogin(1)}
                >
                  {isLoginPage ? 'LOGIN' : 'SIGN UP'}
                </Button>
              </Grid>
              {isLoginPage ?
                <Grid item xs={12}>
                  <Button color="primary" onClick={() => this.selectCategory(1)}>
                    Create a free Account
                </Button>
                  <Button color="primary" onClick={() => this.selectCategory(2)}>
                    Forgot password?
                </Button>
                </Grid> :
                <Grid item xs={12}>
                  <Button color="primary" onClick={() => this.selectCategory(0)}>
                    Already have an Account
            </Button>
                </Grid>}
              <Grid item xs={12}>
                <div style={styles.textField}
                  style={styles.lineDivStyle}>
                  <span
                    style={styles.lineSpanStyle}> OR </span>
                </div>
              </Grid>
              <Grid item xs={12}>
                <GoogleAPI clientId="748666747267-sqglnr9ubnfrangqjpjrlcpmn5jv89mi.apps.googleusercontent.com"
                  onUpdateSigninStatus={responseGoogleSigninStatus}
                  onInitFailure={responseGoogle}
                >
                  <div>
                    <div><GoogleLogin
                      onLoginSuccess={responseGoogle}
                    /></div>
                  </div>
                </GoogleAPI>
              </Grid>
            </Grid> :
            <Grid item xs={12}>
              <Button color="primary" onClick={() => this.selectCategory(0)}>
                Send password reset email
              </Button></Grid>}
        </Grid>
      </div>
    );
  }
}
export default connect(
  (state) => ({
    user: state.global.user,
    isLogin: state.global.isLogin,
  }),
  (dispatch) => ({
    actions: bindActionCreators(globalActions, dispatch),
  })
)(WelcomeScreen)