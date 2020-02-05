import React from 'react';
import classes from './NavigationItems.module.css';
import NavigationItem from '../NavigationItem/NavigationItem';
const navigationItems = props => {
  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem link='/' exact>
        Main Page
      </NavigationItem>
      <NavigationItem link='/teams' exact>
        Teams
      </NavigationItem>
      <NavigationItem link='/students' exact>
        Students
      </NavigationItem>
    </ul>
  );
};
export default navigationItems;
