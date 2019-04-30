let budgetController = (function() {
  // Some Code
  class Expense {
    constructor(id, description, value) {
      this.id = id;
      this.description = description;
      this.value = value;
    }
  }
  class Income {
    constructor(id, description, value) {
      this.id = id;
      this.description = description;
      this.value = value;
    }
  }

  const data = {
    allItems: {
      exp: [],
      inc: []
    },
    totals: {
      exp: 0,
      inc: 0
    }
  };

  return {
    getItem: function(type, des, val) {
      let newItem, ID;
      // create new id
      if (data.allItems[type].length > 0)
        ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
      else ID = 0;
      // create new item on inc and exp type
      if (type === "exp") {
        newItem = new Expense(ID, des, val);
      } else if (type === "inc") {
        newItem = new Income(ID, des, val);
      }
      // push the input our data structure
      data.allItems[type].push(newItem);

      // return the new element
      return newItem;
    }
  };
})();

let UIController = (function() {
  let DOMstrings = {
    inputType: ".add__type",
    inputDescription: ".add__description",
    inputValue: ".add__value",
    inputButton: ".add__btn"
  };
  return {
    getInput: function() {
      return {
        type: document.querySelector(DOMstrings.inputType).value,
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: document.querySelector(DOMstrings.inputValue).value
      };
    },
    addListItem: function(obj, type) {},
    getDOMstrings: function() {
      return DOMstrings;
    }
  };
})();

let appController = (function(budgetCtrl, UICtrl) {
  let setUpEventListeners = function() {
    let DOM = UIController.getDOMstrings();
    document
      .querySelector(DOM.inputButton)
      .addEventListener("click", ctrlAddItem);

    document.addEventListener("keypress", event => {
      if (event.keyCode === 13 || event.which === 13) {
        ctrlAddItem();
      }
    });
  };

  const ctrlAddItem = function() {
    let input, newItem;
    //1. Get The input data
    input = UICtrl.getInput();
    console.log(input);
    //2. Add the item to the budget controller
    newItem = budgetCtrl.getItem(input.type, input.description, input.value);
    //3. Change the User Interface
    //4. Calculate the budget
    //5 Display teh budget on the UI
  };
  return {
    init: function() {
      console.log("App has started");
      setUpEventListeners();
    }
  };
})(budgetController, UIController);

appController.init();
