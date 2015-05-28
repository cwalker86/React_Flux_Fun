var AppDispatcher = require('../dispatchers/app-dispatcher');
var AppConstants = require('../constants/app-constants');
var assign = require('object-assign');
var EventEmitter = require('events').EventEmitter;

// Event that we broadcast, when things changes.
// This is the event that stores will be listening for
var CHANGE_EVENT = "change";

// List of items to play with
// doesn't really belong in the store
var _catalog = [
	{id:1, title: 'Macbook Pro', cost: 1000},
	{id:2, title: 'Macbook Air', cost: 900},
	{id:3, title: 'Macbook', cost: 500}
];

// Cart
var _cartItems = [];

function _removeItem(index){
	//set inCart key to false
	_cartItems[index].inCart = false;
	//splice cartItems array, removing the item
	_cartItems.splice(index, 1);
}

function _increaseItem(index){
	//finds item based on index, and increases qty key
	_cartItems[index].qty++;
}

function _decreaseItem(index){
	//if cartItems quantity is greater than 1
	if(_cartItems[index].qty>1){
		// decrement the quantity key
		_cartItems[index].qty--;
	}
}

function _addItem(item){
	//if item is not in the Cart
	if(!item.inCart){
		//set the quantity key to 1
		item['qty'] = 1;
		//set the inCart key to true
		item['inCart'] = true;
		//push item to cartItems
		_cartItems.push(item);
	}
	else {
		//cycle through cartItems
		_cartItems.forEach(function(cartItem, i){
			//find the correct item
			if(cartItem.id === item.id){
				//increase item's quantity
				_increaseItem(i);
			}
		});
	}
}


//App store object
var AppStore = assign(EventEmitter.prototype, {

	//call emit method on Change event
	emitChange:function(){
		this.emit(CHANGE_EVENT)
	},

	//referecing the string 'change'
	//allows the components to register with the store
	//then store, listens to change event, if it happens, execute callback
	addChangeListener:function(callback){
		this.on(CHANGE_EVENT, callback)
	},

	//remove change event for callback
	removeChangeListener:function(callback){
		this.removeListener(CHANGE_EVENT, callback)
	},

	//deliver cart items
	getCart:function(){
		return _cartItems
	},

	//deliver catalog
	getCatalog:function(){
		return _catalog
	},

	//given a key, provides an easy way for a store to wait for another store
	//provides way to see what is being registered by the store
	//handleViewAction from dispatcher delivers payload
  	dispatcherIndex:AppDispatcher.register(function(payload){

  		// this is our action from handleViewAction
	    var action = payload.action; 

	    // depending on actionType, call private method
	    switch(action.actionType){
	      case AppConstants.ADD_ITEM:
	        _addItem(payload.action.item);
	        break;

	      case AppConstants.REMOVE_ITEM:
	        _removeItem(payload.action.index);
	        break;

	      case AppConstants.INCREASE_ITEM:
	        _increaseItem(payload.action.index);
	        break;

	      case AppConstants.DECREASE_ITEM:
	        _decreaseItem(payload.action.index);
	        break;
	    }
	    AppStore.emitChange();

	    //because this is going into a queue of promises
	    //in order for it to resolve we have to return true
	    return true;
  	})
})

module.exports = AppStore;