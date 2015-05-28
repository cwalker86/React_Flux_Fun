/** @jsx React.DOM */

// Create Single Component called App
var APP = require('./components/app');
// Require React
var React = require('react');

// Render APP component
React.render(
  <APP />,
  // Render to 'main' div
  document.getElementById('main'));