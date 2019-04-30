let budgetController = (function() {
  // Some Code
})();

let UIController = (function() {
  // Some Code
})();

let appController = (function(budgetCtrl, UICtrl) {
  const ctrlAddItem = function() {
    //1. Get The input data
    //2. Add the item to the budget controller
    //3. Change the User Interface
    //4. Calculate the budget
    //5 Display teh budget on the UI
  };
  document.querySelector(".add__btn").addEventListener("click", ctrlAddItem);

  document.addEventListener("keypress", event => {
    if (event.keyCode === 13 || event.which === 13) {
      ctrlAddItem();
    }
  });
})(budgetController, UIController);
