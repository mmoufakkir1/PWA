import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Drawer from 'material-ui/Drawer';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import FolderIcon from 'material-ui-icons/Folder';
import Divider from 'material-ui/Divider';
import ImageIcon from 'material-ui-icons/Image';
import * as globalActions from '../../actions/global';

const styles = {
  list: {
    width: 250,
  },
  listFull: {
    width: 'auto',
  },
};

class LeftDrawer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    }
  }

  toggleDrawer = (val) => () => {
    this.props.actions.updateDrawer(val);
  };

  render() {
    const { drawerState } = this.props;

    const sideList = (
      <div style={styles.list}>
        <List>
          <ListItem button>
            <Avatar>
              <FolderIcon />
            </Avatar>
            <ListItemText primary="Work" secondary="Jan 28, 2014" />
          </ListItem>
          <Divider inset />
          <ListItem button>
            <Avatar>
              <ImageIcon />
            </Avatar>
            <ListItemText primary="Vacation" secondary="Jan 20, 2014" />
          </ListItem>
        </List>
      </div>
    );

    return (
      <div>
        <Drawer open={drawerState} onClose={this.toggleDrawer(false)}>
          <div>
            {sideList}
          </div>
        </Drawer>
      </div>
    );
  }
}

export default connect(
  (state) => ({
    page: state.global.page,
    options: state.global.options,
    drawerState: state.global.drawer,
  }),
  (dispatch) => ({ 
    actions: bindActionCreators(globalActions, dispatch) })
)(LeftDrawer)


