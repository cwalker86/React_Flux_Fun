var AppConstants = require('../constants/app-constants.js');
var AppDispatcher = require('../dispatchers/app-dispatcher.js');

// AppActions Object
var AppActions = {

  // Add Item action
  addItem:function(item){
    AppDispatcher.handleViewAction({
      actionType:AppConstants.ADD_ITEM,
      item: item
    })
  },
  // Remove Item action
  removeItem:function(index){
    AppDispatcher.handleViewAction({
      actionType:AppConstants.REMOVE_ITEM,
      index: index
    })
  },
  // Decrease Item action
  decreaseItem:function(index){
    AppDispatcher.handleViewAction({
      actionType:AppConstants.DECREASE_ITEM,
      index: index
    })
  },
  // Increase Item action
  increaseItem:function(index){
    AppDispatcher.handleViewAction({
      actionType:AppConstants.INCREASE_ITEM,
      index: index
    })
  }
}

module.exports = AppActions;