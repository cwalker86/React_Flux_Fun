/** @jsx React.DOM */
var React = require('react');

// create simple component called APP
var APP = 
  React.createClass({
    render: function(){
      return <h1>MY REACT FLUX APP</h1>
    }
  });

// Export App
module.exports = APP;