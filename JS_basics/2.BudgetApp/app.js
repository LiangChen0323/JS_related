// BUDGET CONTROLLER
var budgetController = (() => {
  class Expense {
    constructor(id, description, value) {
      this.id = id;
      this.description = description;
      this.value = value;
      this.percentage = -1;
    }
    calcPercentage = (totalIncome) => {
      if (totalIncome > 0) {
        this.percentage = Math.round((this.value / totalIncome) * 100);
      } else {
        this.percentage = -1;
      }
    }
    getPercentage = () => {
      return this.percentage
    }
  };

  class Income {
    constructor(id, description, value) {
      this.id = id;
      this.description = description;
      this.value = value;
    }
  }
  var calculateTotal = (type) => {
    var sum = 0;
    data.allItems[type].forEach((element) => {
      sum += element.value;
    })
    data.totals[type] = sum;
  }

  var data = {
    allItems: {
      exp: [],
      inc: [],
    },
    totals: {
      exp: 0,
      inc: 0
    },
    budget: 0,
    percentage: -1
  };

  return {
    addItem: (type, des, val) => {
      var newItem, length, ID;
      // Create new ID
      if (data.allItems[type].length > 0) {
        length = data.allItems[type].length - 1;
        ID = data.allItems[type][length].id + 1;
      } else {
        ID = 0;
      }
      // Create new item based on type
      //     exp => Expense
      // not exp => Income 
      newItem = type === "exp" ? new Expense(ID, des, val) : new Income(ID, des, val);

      // if (type === 'exp') {
      //   newItem = new Expense(ID, des, val);
      // }
      // else if (type === "inc") {
      //   newItem = new Income(ID, des, val);
      // }
      // Push the newItem into data structure
      data.allItems[type].push(newItem);

      // Return the new item
      return newItem;
    },
    deleteItem: (type, id) => {
      var ids, index;
      ids = data.allItems[type].map((element) => {
        return element.id;
      });
      index = ids.indexOf(id);
      if (index !== -1) {
        data.allItems[type].splice(index, 1);
      };
    },

    calculateBudget: () => {
      // Calculate total income and expenses
      calculateTotal("exp");
      calculateTotal("inc");
      // Calculate the budget: income - expenses
      data.budget = data.totals.inc - data.totals.exp;
      // Calculate the percentage of income that we spent
      if (data.totals.inc > 0) {
        data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
      } else {
        data.percentage = -1;
      }
    },

    calculatePercentages: () => {
      data.allItems.exp.forEach((e) => {
        e.calcPercentage(data.totals.inc)
      })
    },

    getPercentage: () => {
      var allPerc = data.allItems.exp.map((e) => {
        return e.getPercentage();
      })
      return allPerc;
    },

    getBudget: () => {
      return {
        budget: data.budget,
        totalInc: data.totals.inc,
        totalExp: data.totals.exp,
        percentage: data.percentage
      }
    },
    testing: () => {
      console.log(data)
    }
  };

})();

// UI CONTROLLER
var UIController = (() => {
  var DOMString = {
    inputType: ".add__type",
    inputDescription: ".add__description",
    inputValue: ".add__value",
    inputBtn: ".add__btn",
    incomeContainer: ".income__list",
    expensesContainer: ".expenses__list",
    budgetLabel: ".budget__value",
    incomeLabel: ".budget__income--value",
    expensesLabel: ".budget__expenses--value",
    percentageLabel: ".budget__expenses--percentage",
    container: ".container",
    expensesPercLabel: ".item__percentage",
    dateLabel: ".budget__title--month",
  };

  var formatNumber = (num, type) => {
    var numSplit, int, dec;
    // + or - before number
    num = Math.abs(num);
    num = num.toFixed(2);
    numSplit = num.split(".")

    int = numSplit[0];
    if (int.length > 3) {
      int = int.substr(0, int.length - 3) + "," + int.substr(int.length - 3, 3)
    }

    dec = numSplit[1];
    type === "exp" ? sign = "-" : sign = "+";
    return sign + " " + int + "." + dec
  };

  var nodeListForEach = (list, callback) => {
    for (var i = 0; i < list.length; i++) {
      callback(list[i], i);
    }
  };

  // Public methods
  return {
    getInput: () => { // return a object contains: type, description and value that user gives
      return {
        type: document.querySelector(DOMString.inputType).value, // return inc or exp
        description: document.querySelector(DOMString.inputDescription).value,
        value: parseFloat(document.querySelector(DOMString.inputValue).value)
      }
    },
    addListItem: (obj, type) => {
      var html, newHTML, element;
      // Create HTML string with placeholder text
      if (type === 'inc') {
        element = DOMString.incomeContainer;

        html = '<div class="item clearfix" id="inc-%id%"> <div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      } else if (type === 'exp') {
        element = DOMString.expensesContainer;

        html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      }
      // Replace the placeholder text with some actual data
      newHTML = html.replace('%id%', obj.id);
      newHTML = newHTML.replace('%description%', obj.description);
      newHTML = newHTML.replace('%value%', formatNumber(obj.value, type));

      // Insert the HTML into the DOM
      document.querySelector(element).insertAdjacentHTML('beforeend', newHTML);

    },
    deleteListItem: (selectorID) => {
      var el = document.getElementById(selectorID);
      el.parentNode.removeChild(el);
    },
    clearField: () => {
      var fields, fieldsArray;
      fields = document.querySelectorAll(DOMString.inputDescription + ", " + DOMString.inputValue);
      fieldsArray = Array.prototype.slice.call(fields);

      fieldsArray.forEach((element, index, array) => {
        element.value = "";
      });

      fieldsArray[0].focus();
    },

    displayBudget: (obj) => {
      var type;
      obj.budget > 0 ? type = "inc" : type = "exp";
      document.querySelector(DOMString.budgetLabel).textContent = formatNumber(obj.budget, type);
      document.querySelector(DOMString.incomeLabel).textContent = formatNumber(obj.totalInc, "inc");
      document.querySelector(DOMString.expensesLabel).textContent = formatNumber(obj.totalExp, "exp");

      if (obj.percentage > 0) {
        document.querySelector(DOMString.percentageLabel).textContent = obj.percentage + "%";
      } else {
        document.querySelector(DOMString.percentageLabel).textContent = "---";
      }
    },

    displayPercentages: (percentages) => {
      var fields = document.querySelectorAll(DOMString.expensesPercLabel);

      nodeListForEach(fields, (e, index) => {
        if (percentages[index] > 0) {
          e.textContent = percentages[index] + "%";
        } else {
          e.textContent = "---";
        }
      })
    },


    displayMonth: () => {
      var now, year, month, months;
      now = new Date();
      year = now.getFullYear();
      month = now.getMonth();
      months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      document.querySelector(DOMString.dateLabel).textContent = months[month] + " " + year;
    },

    changeType: () => {
      var fields = document.querySelectorAll(DOMString.inputType + "," + DOMString.inputDescription + "," + DOMString.inputValue);

      nodeListForEach(fields, (e) => {
        e.classList.toggle("red-focus");
      })
      document.querySelector(DOMString.inputBtn).classList.toggle("red");
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
    document.querySelector(DOM.container).addEventListener("click", ctrlDeleteItem);
    document.querySelector(DOM.inputType).addEventListener("change", UICtrl.changeType);
  };



  var updateBudget = () => {
    // 1. Calculate the budget
    budgetController.calculateBudget();
    // 2. return the budget
    var budget = budgetController.getBudget();
    // 3. Display the budget on the UI
    UICtrl.displayBudget(budget);
  };

  var updatePercentages = () => {
    // 1. Calculate percentages
    budgetController.calculatePercentages();

    // 2. Read percentages from the budget controller
    var percentages = budgetController.getPercentage();

    // 3. Update the UI with the new percentages
    UIController.displayPercentages(percentages);
  };

  var ctrlAddItem = () => {
    var input, newItem;
    // 1. Get the field input data
    input = UICtrl.getInput();
    if (input.description !== "" && !isNaN(input.value) && input.value > 0) {
      // 2. Add the item to the budget controller
      newItem = budgetController.addItem(input.type, input.description, input.value);
      // 3. Add the item to the UI
      UICtrl.addListItem(newItem, input.type);
      // 4. Clear the fields
      UICtrl.clearField();
      // 5. Calculate and update budget
      updateBudget();
      // 6. Calculate and update percentages
      updatePercentages();

    }
  }

  var ctrlDeleteItem = (event) => {
    var itemID, splitID, type, ID;
    itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;
    if (itemID) {
      splitID = itemID.split("-");
      type = splitID[0];
      ID = parseInt(splitID[1]);

      // 1. Delete the item from the data structure
      budgetController.deleteItem(type, ID);
      // 2. Delete the item from the UI
      UIController.deleteListItem(itemID);
      // 3. Update and show the new budget
      updateBudget();
    }
  }

  return {
    init: () => {
      console.log("App has started");
      UICtrl.displayMonth();
      UICtrl.displayBudget({
        budget: 0,
        totalInc: 0,
        totalExp: 0,
        percentage: -1
      });
      setUpEventListeners();
    }
  }

})(budgetController, UIController);

controller.init();