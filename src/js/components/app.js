/** @jsx React.DOM */
var React = require('react');
var AppActions = require('../actions/app-actions.js');

// create simple component called APP
var APP = 
  React.createClass({
  	handleClick:function(){
  		AppActions.addItem('this is the item your looking for');
  	},
    render: function(){
      return <h1 onClick={this.handleClick}>MY REACT FLUX APP</h1>
    }
  });

// Export App
module.exports = APP;