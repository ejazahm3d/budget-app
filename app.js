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
    inputButton: ".add__btn",
    incomeContainer: ".income__list",
    expensesContainer: ".expenses__list"
  };
  return {
    getInput: function() {
      return {
        type: document.querySelector(DOMstrings.inputType).value,
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: parseFloat(document.querySelector(DOMstrings.inputValue).value)
      };
    },
    addListItem: function(obj, type) {
      let html, element;

      // Create HTml string with place holder text
      if (type === "inc") {
        element = DOMstrings.incomeContainer;
        html = `<div class="item clearfix" id="income-${obj.id}">
        <div class="item__description">${obj.description}</div>
        <div class="right clearfix">
            <div class="item__value">${obj.value}</div>
            <div class="item__delete">
                <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
            </div>
        </div>
    </div>`;
      } else if (type === "exp") {
        element = DOMstrings.expensesContainer;

        html = `<div class="item clearfix" id="income-${obj.id}">
      <div class="item__description">${obj.description}</div>
         <div class="right clearfix">
            <div class="item__value">${obj.value}</div>
                <div class="item__delete">
              <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
             </div>
          </div>
         </div>`;
      }
      // replace it with actual data
      // insert the HTML into DOM
      console.log(document.querySelector(element));
      document.querySelector(element).insertAdjacentHTML("beforeend", html);
    },
    clearFields: function() {
      let fields = [
        ...document.querySelectorAll(
          DOMstrings.inputDescription + ", " + DOMstrings.inputValue
        )
      ];
      fields.forEach(field => (field.value = ""));
      fields[0].focus();
    },
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
  const updateBudget = {
    //1. Calculate the budget
    //2. Return the budget
    //3. Display teh budget on the UI
  };
  const ctrlAddItem = function() {
    let input, newItem;
    //1. Get The input dataa
    input = UICtrl.getInput();
    if (input.description !== "" && !isNaN(input.value) && input.value > 0) {
      //2. Add the item to the budget controller
      newItem = budgetCtrl.getItem(input.type, input.description, input.value);
      //3. Add the item to UI
      UICtrl.addListItem(newItem, input.type);
      //4 Clear the fields
      UICtrl.clearFields();
      //5. calculate and update budget
      updateBudget();
    }
  };
  return {
    init: function() {
      console.log("App has started");
      setUpEventListeners();
    }
  };
})(budgetController, UIController);

appController.init();
