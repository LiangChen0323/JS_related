// BUDGET CONTROLLER
var budgetController = (() => {
  class Expense {
    constructor(id, description, value) {
      this.id = id;
      this.description = description;
      this.value = value;
    }
  };

  class Income {
    constructor(id, description, value) {
      this.id = id;
      this.description = description;
      this.value = value;
    }
  }

  var data = {
    allItems: {
      exp: [],
      inc: [],
    },
    totals: {
      exp: 0,
      inc: 0
    }
  }

  return {
    addItem: (type, des, val) => {
      var newItem;
      ID = 0;
      newItem = new Expense(ID, des, val) ? type === "exp" : new Income(ID.des, val)

      // if (type === 'exp') {
      //   newItem = new Expense(ID, des, val);
      // }
      // else if (type === "inc") {
      //   newItem = new Income(ID, des, val);
      // }


      data.allItems[type].push(newItem);
    }
  }

})();

// UI CONTROLLER
var UIController = (() => {
  var DOMString = {
    inputType: ".add__type",
    inputDescription: ".add__description",
    inputValue: ".add__value",
    inputBtn: ".add__btn",


  };

  return { // Public methods
    getInput: () => { // return a object contains: type, description and value that user gives
      return {
        type: document.querySelector(DOMString.inputType).value, // return inc or exp
        description: document.querySelector(DOMString.inputDescription).value,
        value: document.querySelector(DOMString.inputValue).value
      }
    },

    getDOString: () => {
      return DOMString;
    }
  };
})();

// GLOBAL APP CONTROLLER
var controller = (function (budgetCtrl, UICtrl) {
  var setUpEventListeners = () => {
    var DOM = UICtrl.getDOString();
    document.querySelector(DOM.inputBtn).addEventListener("click", ctrlAddItem);
    document.addEventListener("keypress", (event) => {
      if (event.keyCode === 13 || event.which === 13) {
        ctrlAddItem();
      }

    });
  }

  var ctrlAddItem = () => {
    // 1. Get the field input data
    var input = UICtrl.getInput();
    // 2. Add the item to the budget controller

    // 3. Add the item to the UI

    // 4. Calculate the budget

    // 5. Display the budget on UI
  }

  return {
    init: () => {
      console.log("App has started");
      setUpEventListeners();
    }
  }

})(budgetController, UIController);

controller.init();

