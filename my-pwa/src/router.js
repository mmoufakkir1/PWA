import React from 'react';
//-------------Pages--------------------------------
import Home from './components/Pages/Home';
import AboutUs from './components/Pages/AboutUs';
import SearchLocations from './components/Pages/SearchLocations';
import Search from './components/Pages/Search';
import Project from './components/Pages/Project';


export function getPage(selectedPage, options) {
  let page = null;
  try {
    switch (selectedPage) {

      case 'home':
        page = (<Home />);
        break;

      case 'project':
        page = (<Project />);
        break;

      case 'about':
        page = (<AboutUs />);
        break;

      case 'searchlocations':
        page = (<SearchLocations />);
        break;

      case 'search':
        page = (<Search />);
        break;
    }

  } catch (err) {

    console.log(err);
    page = null;

  }
  return page;
}