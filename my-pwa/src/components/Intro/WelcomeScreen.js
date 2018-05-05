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
    this._signup = this._signup.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.HandleValidateInput = this.HandleValidateInput.bind(this);
  }



  selectCategory(selectedCategory) {
    this.setState({
      selectedCategory,
      isLoading: false,
    });
  }

  _signup(res, type) {
    let { user } = this.props;

    if (type === 'google' && res.w3.U3) {

      // // debug model
      // E1: "116491177335490318015"
      // Zi:
      //   access_token: "ya29.Gl2sBYtJqttytYHUiWEyXp0kmBQfa6Xd6E-icmiygGAZlMvhfn-XUriZQiY6YDHFQAaQjaAlYRg7uCeGgYafRfpJ4SIfSM6BiohWJ67dD-1m0xowA3B3EV13cRrIs7c"
      //   expires_at: 1525006243119
      //   expires_in: 3600
      //   first_issued_at: 1525002643119
      //   id_token: "eyJhbGciOiJSUzI1NiIsImtpZCI6ImFmZmM2MjkwN2E0NDYxODJhZGMxZmE0ZTgxZmRiYTYzMTBkY2U2M2YifQ.eyJhenAiOiI3NDg2NjY3NDcyNjctc3FnbG5yOXVibmZyYW5ncWpwanJsY3BtbjVqdjg5bWkuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI3NDg2NjY3NDcyNjctc3FnbG5yOXVibmZyYW5ncWpwanJsY3BtbjVqdjg5bWkuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMTY0OTExNzczMzU0OTAzMTgwMTUiLCJlbWFpbCI6Im1tb3VmYWtraXIyQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdF9oYXNoIjoidU5KTUgtdFJYWVV6aU1TdHZIcjR1ZyIsImV4cCI6MTUyNTAwNjI0MywiaXNzIjoiYWNjb3VudHMuZ29vZ2xlLmNvbSIsImp0aSI6IjIyYWQyZWViZWVlNWUwYmRlMmE2YjJhZTg4ZjlmYWM3NTMzMTIyYmYiLCJpYXQiOjE1MjUwMDI2NDMsIm5hbWUiOiJtbyBtbyIsInBpY3R1cmUiOiJodHRwczovL2xoNC5nb29nbGV1c2VyY29udGVudC5jb20vLWxpeUZMTXhva3p3L0FBQUFBQUFBQUFJL0FBQUFBQUFBQU00L0VhaDNYdjhmdC00L3M5Ni1jL3Bob3RvLmpwZyIsImdpdmVuX25hbWUiOiJtbyIsImZhbWlseV9uYW1lIjoibW8iLCJsb2NhbGUiOiJlbiJ9.L7GqI-wXn5c1ntBBU5eclZvciSPSfzp0CmNwHDk6RP-_rG9x5tlIPPM80sBtgryA9lho4Iy9cqcu-fspToUNLlnZUSd5bKQ700rDd_Tooqmw0QFy5gzIaGpKRXwk9MetD4DEP-Ya27ASWn1lAqyyZVN0Y11R9N8PAP5lBGRFP10R3w0sjiOWmIPb31QuPKv2n3AtJ32ovcGH1oVe3vcF_nbRpAvOYu2zboS-f94K3Kj7U42luJcJtFgyCDvkU1bjGB9gCm_BD3wfWEzNj8WLj7yt8TCUtLKSJlQV08rxI0WLZFEOsLzNmuXRux1bWoAIAWlpNVnHIrL-SoWH5h4V2w"
      //   idpId: "google"
      //   login_hint: "AJDLj6JUa8yxXrhHdWRHIV0S13cAqvyTleWrgTtSBHQJr4eF4bCRrinjpS8wYt6RJEdq4ORC-BojAuGwgVsYzL2pJd2mdvarfA"
      //   scope: "https://www.googleapis.com/auth/plus.me https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email openid email profile"
      //   session_state:  { extraQueryParams: { … } }
      //   token_type: "Bearer"
      // w3: PG
      //   Eea: "116491177335490318015"
      //   Paa: "https://lh4.googleusercontent.com/-liyFLMxokzw/AAAAAAAAAAI/AAAAAAAAAM4/Eah3Xv8ft-4/s96-c/photo.jpg"
      //   U3: "mmoufakkir2@gmail.com"
      //   ig: "mo mo"
      //   ofa: "mo"
      //   wea: "mo"

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

  handleLogin(set) {

    let { user } = this.props;

    if (set) {
      this.selectCategory(set);
      console.log("Singup");
      user = {
        email: this.state.email,
        passwordHash: this.state.password
      }

      axiosService.composerPost("user/Add", user).then(res => {
        if (res.data.status == "ok") {
          this.props.actions.updateUser(user);
          this.props.actions.updateLoginStatus(true);
          store(keys.ONBOARDED, true);
        }

      });
    } else {
      this.selectCategory(set)
      console.log("login");
      user = {
        email: this.state.email,
        passwordHash: this.state.password
      }
      axiosService.composerPost("user/Login", user).then(res => {
        if (res.data.status == "ok") {
          this.props.actions.updateUser(user);
          this.props.actions.updateLoginStatus(true);
          store(keys.ONBOARDED, true);
        }
      });
    }
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
      this._signup(response, 'google');
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