import React from 'react';
import classes from './NavigationItems.module.css';
import NavigationItem from '../NavigationItem/NavigationItem';
const navigationItems = props => {
  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem link='/' exact>
        Ana Sayfa
      </NavigationItem>
      <NavigationItem link='/teams' exact>
        Takımlar
      </NavigationItem>
      <NavigationItem link='/students' exact>
        Öğrenciler
      </NavigationItem>
    </ul>
  );
};
export default navigationItems;
