import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import Input, { InputLabel, InputAdornment } from 'material-ui/Input';
import Visibility from 'material-ui-icons/Visibility';
import VisibilityOff from 'material-ui-icons/VisibilityOff';
import EventNote from 'material-ui-icons/EventNote';
import { FormControl, FormHelperText } from 'material-ui/Form';
import EmailIcon from 'material-ui-icons/Email';
import Grid from 'material-ui/Grid';
import { GoogleAPI, GoogleLogin, GoogleLogout, CustomGoogleLogin, CustomGoogleLogout } from 'react-google-oauth';
import { createMuiTheme } from 'material-ui/styles';
import * as globalReducers from '../../reducers/global';
import * as globalActions from '../../actions/global';
import * as keys from '../../constants/storageKeys';
import App from '../../App';
import { store } from '../../global'
//import { GoogleLogin  } from 'react-google-login';
//import { GoogleLogin } from 'react-google-login-component';


const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#8e99f3',
      main: '#5c6bc0',
      dark: '#26418f',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
});

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
  logoField: {
    height: '150px',
    textAlign: 'center',
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main,
  },
  textField: {
    width: '300px',
    paddingTop: 5,
    marginTop: 5,
  },
  buttonStyle: {
    backgroundColor: '#1d72c6',
    color: 'white',
  },
  itemLength: {
    direction: 'row',
    maxWidth: '300px',
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
  }
};

const responseGoogleSigninStatus = (response) => {
  console.log('responseGoogleSigninStatus ' + response);
}

class WelcomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      name: '',
      selectedCategory: 0,
      isLoading: false,
      isEmailValid: false,
      isPasswordValid: false,
      isConfirmationValid: false,
    };
    this.signup = this.signup.bind(this);
  }

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  handleMouseDownPassword = event => {
    event.preventDefault();
  };

  handleClickShowPasssword = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };

  selectCategory(selectedCategory) {
    this.setState({
      selectedCategory,
      isLoading: false,
    });
  }

  signup(res, type) {
    let { user } = this.props;

    if (type === 'google' && res.w3.U3) {
      user = {
        name: res.w3.ig,
        provider: type,
        email: res.w3.U3,
        provider_id: res.El,
        token: res.Zi.access_token,
        provider_pic: res.w3.Paa
      };
      this.props.actions.updateUser(user);
      this.props.actions.updateLoginStatus(true);
      console.log(user);
    }
  }

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

    console.log('isPasswordRecovery ' + isPasswordRecovery);
    const responseGoogle = (response) => {
      console.log("google console");
      console.log(response);
      this.signup(response, 'google');
    }

    if (isLogin) return <App />;

    if (!isPasswordRecovery) {
      return (
        <div style={styles.root}>
          <Grid container spacing={24}>
            <Grid item xs={12}>
              <TextField style={styles.textField}
                id="email"
                label="Email"
                value={this.state.email}
                onChange={this.handleChange('email')}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField style={styles.textField}
                id="password"
                label="Password"
                value={this.state.password}
                type={this.state.showPassword ? 'text' : 'password'}
                onChange={this.handleChange('password')}
                margin="normal"
              />
            </Grid>
            {isSignUpPage ?
              <Grid item xs={12}>
                <TextField style={styles.textField}
                  id="confirmpassword"
                  label="Confirm Password"
                  value={this.state.confirmpassword}
                  type={this.state.showPassword ? 'text' : 'password'}
                  onChange={this.handleChange('password')}
                  margin="normal"
                />
              </Grid> : null}
            <Grid item xs={12}>
              <Button
                variant="raised"
                color="primary"
                size="large"
                style={styles.textField}
                onClick={() => isLoginPage ? null : this.selectCategory(0)}
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
          </Grid>
        </div>
      );
    }
    
    if (isPasswordRecovery) {
      return (
        <div style={styles.root}>
          <Grid container spacing={24}>
            <Grid item xs={12}>
              <TextField style={styles.textField}
                id="email"
                label="Email"
                value={this.state.email}
                onChange={this.handleChange('email')}
                margin="normal"
              />            
              <Button color="primary" onClick={() => this.selectCategory(0)}>
                    Send password reset email
              </Button>
              </Grid>
          </Grid>
        </div>
      );
    }
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