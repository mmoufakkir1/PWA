import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import Typography from 'material-ui/Typography';
import * as globalActions from '../../actions/global';

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

  render() {
    const {title} = this.props;
    return (
      <div style={styles.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton 
                style={styles.menuButton} 
                color="contrast" 
                onClick={this.handleDrawerOpen}
                aria-label="Menu">
              <MenuIcon />
            </IconButton>

            <Typography type="title" color="inherit" style={styles.flex} >
              {title}
            </Typography>
            <Button color="contrast">Login</Button>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default connect(
  (state) => ({ 
    page: state.global.page,
    options: state.global.options,
    title: state.global.title,
  }),
  (dispatch) => ({ 
    actions: bindActionCreators(globalActions, dispatch) })
)(TitleBar)
