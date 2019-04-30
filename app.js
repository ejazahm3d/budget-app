let budgetController = (function() {
  // Some Code
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
    getDOMstrings: function() {
      return DOMstrings;
    }
  };
})();

let appController = (function(budgetCtrl, UICtrl) {
  let DOM = UIController.getDOMstrings();
  const ctrlAddItem = function() {
    //1. Get The input data
    let input = UICtrl.getInput();
    console.log(input);
    //2. Add the item to the budget controller
    //3. Change the User Interface
    //4. Calculate the budget
    //5 Display teh budget on the UI
  };
  document
    .querySelector(DOM.inputButton)
    .addEventListener("click", ctrlAddItem);

  document.addEventListener("keypress", event => {
    if (event.keyCode === 13 || event.which === 13) {
      ctrlAddItem();
    }
  });
})(budgetController, UIController);
