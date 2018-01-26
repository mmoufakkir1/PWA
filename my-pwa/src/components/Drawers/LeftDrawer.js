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
import Button from 'material-ui/Button';
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
import * as projectActions from '../../actions/projects';

import {
  defaultDialog,
  newLocationFormDialog,
} from '../Dialogs/dialogTypes';

import {
  showSnackBarMsg,
} from '../Snackbars/snackbarTypes';

import {
  findByIdFirst,
  isEmpty,
} from '../../global';

const styles = {
  list: {
    width: '100%',
    maxHeight: '500px',
    overflowY: 'auto',
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
  todo: {
    backgroundColor: blue[600],
  },
  folder: {
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

    this.saveNewLocation = this.saveNewLocation.bind(this);
    this.closeLocationForm = this.closeLocationForm.bind(this);
    this.addNewLocation = this.addNewLocation.bind(this);
    this.handleListItemClick = this.handleListItemClick.bind(this);

  }

  toggleDrawer = (val) => () => {
    this.props.actions.updateDrawer(val);
  };

  addNewLocation() {
    this.props.actions.updateTitleBarVisibility(false);
    this.props.actions.updateSelectedPage('searchlocations');
  }

  closeLocationForm() {
    this.props.actions.updateSelectedPage('home');
    this.props.actions.updateDialog(defaultDialog);
  };

  saveNewLocation() {
    this.props.actions.updateDialog(defaultDialog);
    this.props.actions.updateSelectedPage('home');
    this.props.actions.updateSnackBar(showSnackBarMsg("New Location Added"));

  };

  handleListItemClick(e, val) {
    const id = e.currentTarget.id;
    const { projectItems } = this.props;
    const project = findByIdFirst(projectItems, id);
    if (project) {
      this.props.actions.updateSelectedProjectId(id);
      this.props.actions.updateSelectedOptions(project);
      this.props.actions.updateTitle(project.name);
      this.props.actions.updateTitleBarVisibility(true);
      this.props.actions.updateDrawer(false);
      this.props.actions.updateSelectedPage('project');
    }
  }

  render() {

    const {
      drawerState,
      projectItems,
     } = this.props;

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

          {projectItems.map((item, index) => {
            return (
             <div key={item.id}>
              <ListItem
                id={item.id}
                button 
                onClick={this.handleListItemClick}  >
                <FolderIcon color="primary" />
                <ListItemText primary={item.name} secondary="" />
              </ListItem>
              <Divider />
            </div>
            )

          })}

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
                <IconButton color="contrast" onClick={this.addNewLocation}>
                  <AddLocationIcon />
                </IconButton>
                <Button
                  color="inherit"
                  onClick={this.addNewLocation}
                >
                  <Typography type="button" color="inherit">
                    Add Task Location
                </Typography>
                </Button>
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
    projectItems: state.projects,
  }),
  (dispatch) => ({
    actions: bindActionCreators(globalActions, dispatch),
    projects: bindActionCreators(projectActions, dispatch),
  })
)(LeftDrawer)


