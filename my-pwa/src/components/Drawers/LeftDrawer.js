import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Drawer from 'material-ui/Drawer';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import AddLocationIcon from 'material-ui-icons/AddLocation';
import ImageIcon from 'material-ui-icons/Image';
import FolderIcon from 'material-ui-icons/Folder';
import MapIcon from 'material-ui-icons/Map';
import MoreVertIcon from 'material-ui-icons/MoreVert';
import TodoListIcon from 'material-ui-icons/Assignment';
import red from 'material-ui/colors/red';
import blue from 'material-ui/colors/blue';
import grey from 'material-ui/colors/grey';
import Card, { CardHeader } from 'material-ui/Card';
import * as globalActions from '../../actions/global';

const styles = {
  list: {
    width: 250,
  },
  listFull: {
    width: 'auto',
  },
  footer: {
    position: 'fixed',
    bottom: 0,
    width: '100%',
  },
  avatar: {
    backgroundColor: red[500],
  },
  todo:{
    backgroundColor: blue[600],
  },
  folder:{
    //backgroundColor: grey[600],
    marginLeft: -12,
    marginRight: 20,
  },
  card: {
    maxWidth: 400,
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

    const header = (
      <div>
        <Card style={styles.card}>
          <CardHeader
            avatar={
              <Avatar aria-label="Recipe" style={styles.avatar}>
                CP
              </Avatar>
            }
            action={
              <IconButton>
                <MoreVertIcon />
              </IconButton>
            }
            title="Carlos Perez"
            subheader="perezca6576@yahoo.com"
          />
        </Card>
      </div>
    );

    const sideList = (
      <div style={styles.list}>
        <List>

          <ListItem button>
            <Avatar aria-label="Recipe" style={styles.todo}>
              <TodoListIcon />
            </Avatar>

            <ListItemText primary="To-Do" secondary="" />
          </ListItem>

          <Divider />

          <ListItem button>
              <FolderIcon color="primary"  />
            <ListItemText primary="Vacation" secondary="" />
          </ListItem>

          <Divider />

          <ListItem button>
              <FolderIcon color="primary"  />
            <ListItemText primary="Church" secondary="" />
          </ListItem>

          <Divider />

          <ListItem button>
              <FolderIcon color="primary"  />
            <ListItemText primary="Publix" secondary="" />
          </ListItem>

          <Divider />

          <ListItem button>
              <FolderIcon color="primary"  />
            <ListItemText primary="Walt Mart" secondary="" />
          </ListItem>

          <Divider />

        </List>
      </div>
    );

    return (
      <div>
        <Drawer open={drawerState} onClose={this.toggleDrawer(false)}>
          <div>
            {header}
          </div>
          <div>
            {sideList}
          </div>

          <div style={styles.footer}>
            <AppBar position="static" color="primary">
              <Toolbar>
                <IconButton color="contrast" aria-label="Menu">
                  <AddLocationIcon />
                </IconButton>
                <Typography type="button" color="inherit">
                  Add Task Location
                </Typography>
              </Toolbar>
            </AppBar>
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
    actions: bindActionCreators(globalActions, dispatch)
  })
)(LeftDrawer)


