import React from 'react';
//-------------Pages--------------------------------
import Home from './components/Pages/Home';
import AboutUs from './components/Pages/AboutUs';
import SearchLocations from './components/Pages/SearchLocations';
import Search from './components/Pages/Search';
import Project from './components/Pages/Project';


export function getPage(selectedPage, options, actions) {
  let page = null;
  try {
    switch (selectedPage) {

      case 'home':
        actions.updateTitle("FindMyList");
        actions.updateShowDrawer(true);
        actions.updateShowBackButton(false);
        actions.updateSearchIcon(true);
        page = (<Home />);
        break;

      case 'project':
        actions.updateTitleBarVisibility(true);
        actions.updateDrawer(false);
        actions.updateSearchIcon(true);
        actions.updateShowDrawer(true);
        actions.updateShowBackButton(false);
        page = (<Project />);
        break;

      case 'about':
        page = (<AboutUs />);
        break;

      case 'searchlocations':
        actions.updateTitleBarVisibility(false);
        page = (<SearchLocations />);
        break;

      case 'search':
        actions.updateTitle("Search...");
        actions.updateSearchIcon(false);
        actions.updateShowDrawer(false);
        actions.updateShowBackButton(true);
        page = (<Search />);
        break;
    }

  } catch (err) {

    console.log(err);
    page = null;

  }
  return page;
}