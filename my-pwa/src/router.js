import React from 'react';
//-------------Pages--------------------------------
import Home from './components/Pages/Home';
import AboutUs from './components/Pages/AboutUs';
import SearchLocations from './components/Pages/SearchLocations';

export function getPage(selectedPage, options) {
  let page = null;
  try {
    switch (selectedPage) {
      case 'home':
        page = (<Home />);
        break;

      case 'about':
        page = (<AboutUs />);
        break;

      case 'searchlocations':
        page = (<SearchLocations />);
        break;
    }

  } catch (err) {

    console.log(err);
    page = null;
    
  }
  return page;
}