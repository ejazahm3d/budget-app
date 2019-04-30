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

  const calculateTotal = type => {
    var sum = 0;
    data.allItems[type].forEach(element => (sum += element.value));
    data.totals[type] = sum;
  };

  const data = {
    allItems: {
      exp: [],
      inc: []
    },
    totals: {
      exp: 0,
      inc: 0
    },
    budget: 0,
    percentage: -1
  };

  return {
    getItem(type, des, val) {
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
    },
    deleteItem(type, id) {
      let ids, index;
      ids = data.allItems[type].map(item => item.id);
      index = ids.indexOf(id);
      if (index !== -1) {
        data.allItems[type].splice(index, 1);
      }
    },
    calculateBudget() {
      // calculate total income and expenses
      calculateTotal("exp");
      calculateTotal("inc");
      // Calculate the budget : income - expenses
      data.budget = data.totals.inc - data.totals.exp;
      // calculate the percentage
      if (data.totals.inc > 0)
        data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
      else data.percentage = -1;
    },
    getBudget() {
      return {
        budget: data.budget,
        totalIncome: data.totals.inc,
        totalExp: data.totals.exp,
        percentage: data.percentage
      };
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
    expensesContainer: ".expenses__list",
    budgetLabel: ".budget__value",
    incomeLabel: ".budget__income--value",
    expensesLabel: ".budget__expenses--value",
    percentageLabel: ".budget__expenses--percentage",
    container: ".container"
  };
  return {
    getInput() {
      return {
        type: document.querySelector(DOMstrings.inputType).value,
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: parseFloat(document.querySelector(DOMstrings.inputValue).value)
      };
    },
    addListItem(obj, type) {
      let html, element;

      // Create HTml string with place holder text
      if (type === "inc") {
        element = DOMstrings.incomeContainer;
        html = `<div class="item clearfix" id="inc-${obj.id}">
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

        html = ` <div class="item clearfix" id="exp-${obj.id}">
        <div class="item__description">${obj.description}</div>
        <div class="right clearfix">
            <div class="item__value">${obj.value}</div>
            <div class="item__percentage">21%</div>
            <div class="item__delete">
                <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
            </div>
        </div>
    </div>`;
      }

      // insert the HTML into DOM
      console.log(document.querySelector(element));
      document.querySelector(element).insertAdjacentHTML("beforeend", html);
    },
    deleteListItem(selectorID) {
      let el = document.getElementById(selectorID);
      el.parentNode.removeChild(el);
    },
    clearFields() {
      let fields = [
        ...document.querySelectorAll(
          DOMstrings.inputDescription + ", " + DOMstrings.inputValue
        )
      ];
      fields.forEach(field => (field.value = ""));
      fields[0].focus();
    },
    displayBudget(obj) {
      document.querySelector(DOMstrings.budgetLabel).textContent = obj.budget;
      document.querySelector(DOMstrings.incomeLabel).textContent =
        obj.totalIncome;
      document.querySelector(DOMstrings.expensesLabel).textContent =
        obj.totalExp;

      if (obj.percentage > 0)
        document.querySelector(DOMstrings.percentageLabel).textContent =
          obj.percentage + "%";
      else
        document.querySelector(DOMstrings.percentageLabel).textContent = "---";
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
    document
      .querySelector(DOM.container)
      .addEventListener("click", ctrlDeleteItem);
  };
  const updateBudget = () => {
    //1. Calculate the budget
    budgetCtrl.calculateBudget();
    //2. Return the budget
    let budget = budgetCtrl.getBudget();

    //3. Display the budget on the UI
    UICtrl.displayBudget(budget);
  };
  const ctrlAddItem = () => {
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
  const ctrlDeleteItem = event => {
    let itemID, splitID, type;
    itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;
    if (itemID) {
      // inc-1
      splitID = itemID.split("-");
      type = splitID[0];
      ID = parseInt(splitID[1]);
      //1. Delete the item from data structure
      budgetCtrl.deleteItem(type, ID);
      //2. Delete from User Interfaces
      UICtrl.deleteListItem(itemID);
      //3 Update and show the new budget
      updateBudget();
    }
  };
  return {
    init() {
      console.log("App has started");
      setUpEventListeners();
      UICtrl.displayBudget({
        budget: 0,
        totalIncome: 0,
        totalExp: 0,
        percentage: -1
      });
    }
  };
})(budgetController, UIController);

appController.init();
