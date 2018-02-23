import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import SearchIcon from 'material-ui-icons/Search';
import ArrowBackIcon from 'material-ui-icons/ArrowBack';
import MenuIcon from 'material-ui-icons/Menu';
import Typography from 'material-ui/Typography';
import * as globalActions from '../../actions/global';

import {
  isEmpty
} from '../../global';

const styles = {
  root: {
    width: '100%',
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

class TitleBar extends Component {
  constructor(props) {
    super(props);
  }

  handleDrawerOpen = () => {
    this.props.actions.updateDrawer(true);
  };

  handleGotoSearch = () => {
    this.props.actions.updateSelectedPage('search');

  }

  handleBack = () => {
    const { prevPage } = this.props;
    if (!isEmpty(prevPage)) {
      this.props.actions.updateSelectedPage(prevPage);
    }
  }

  render() {
    const { title, showSearchIcon, showBackButton, showDrawer } = this.props;
    return (
      <div style={styles.root}>
        {/*position="static"*/}
        <AppBar position="fixed">
          <Toolbar>

            {
              (showBackButton) ? (
                <IconButton
                  style={styles.menuButton}
                  color="inherit"
                  onClick={this.handleBack}
                  aria-label="Menu">
                  <ArrowBackIcon />
                </IconButton>
              ) : null
            }

            {
              (showDrawer) ? (
                <IconButton
                  style={styles.menuButton}
                  color="inherit"
                  onClick={this.handleDrawerOpen}
                  aria-label="Menu">
                  <MenuIcon />
                </IconButton>
              ) : null
            }


            <Typography variant="headline" color="inherit" style={styles.flex} >
              {title}
            </Typography>

            {
              /*Search Icon Button*/
              (showSearchIcon) ? (
                <IconButton
                  color="inherit"
                  onClick={this.handleGotoSearch}
                >
                  <SearchIcon />
                </IconButton>
              ) : null
            }

          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default connect(
  (state) => ({
    page: state.global.page,
    prevPage: state.global.prevPage,
    options: state.global.options,
    title: state.global.title,
    showSearchIcon: state.global.showSearchIcon,
    showDrawer: state.global.showDrawer,
    showBackButton: state.global.showBackButton,
  }),
  (dispatch) => ({
    actions: bindActionCreators(globalActions, dispatch)
  })
)(TitleBar)
