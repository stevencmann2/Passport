$(document).ready(function() {

  
const breakdownForm = $("#breakdownform");
 const expenseForm = $("#expenseForm");
 expenseBody = $("#expenseBody")
 

console.log('these are the values')
// console.log(airfareBudget);

 //EXPENSE MODAL 
 const expenseAmount = $("#expenseamount");
 const expenseDescription = $("#expensedescription");



// var url = window.location.pathname;
// console.log(url)
//   var tripId;
//   if (url.indexOf("/") !== -1) {
//     tripId = url.split("/")[2];
//     // console.log(tripId+ "this is the trip Id with my javascript")
//     // getBudgetBreakdown(tripId);
//   }
//   // If there's no authorId we just get all posts as usual
//   else {
//     // console.log(`there is no ${tripId}`);
//   }


  // This function grabs posts from the BB database and updates the view
  // function getBudgetBreakdown(trip) {
  //   tripId = trip || "";
  //   // console.log(tripId+" inside the get BudgetBrakdownFunction")
  //   if (tripId) {
  //     tripId = "/?trip_id=" + tripId;
  //   }
  //   $.get("/api/budgetbreakdown" + tripId, function(data) {
  //     console.log("Budget", data);
  //    budgetbreakdown = data;
  //     if (!budgetbreakdown || !budgetbreakdown.length) {
  //       // displayEmpty(trip);
  //       console.log(`no set budget constraints  for trip#${tripId}`)
        
  //     }
  //     else {
  //       // initializeRows();
  //       console.log(`budget constraints exist for trip #${tripId}`)
  //     }
  //   });
  // }

 ///// BUDGET MANAGER MODAL SHOW
 
 $("#budgetManager").click(function () {
    event.preventDefault();
$("#budgetManagerModal").modal('show');
 });


///// BUDGET tracker MODAL SHOW
 $("#budgetTracker").click(function () {
    event.preventDefault();
$("#budgetTrackerModal").modal('show');
 });

///// BUDGET expenses MODAL SHOW
 $("#addExpense").click(function () {
    event.preventDefault();
$("#ExpensesModal").modal('show');
 });

// THIS IS FOR THE SELF ADDING FORM FUNCTION CREDIT TO @CODETUBE
 $(".form-group").on('input', '.prc', function(){
    var totalSum=0;
    $(".form-group .prc").each(function(){
      var inputVal=$(this).val();
      if ($.isNumeric(inputVal)){
          totalSum += parseFloat(inputVal);
      }
      });
      $('#result').val(totalSum)
    });

// THIS IS FOR POSTING TO THE BUDGET BREAKDOWN 
$(breakdownForm).on("submit", budgetBreakdownSubmit);

/// HANDLES MODAL SUBMIT FOR BUDGET BREAKDOWN
function budgetBreakdownSubmit(event){
    event.preventDefault();

    // grabbing the tripId from the URL
    const url = window.location.pathname;
console.log(url)
  var tripId;
  if (url.indexOf("/") !== -1) {
    tripId = url.split("/")[2];
  }

///// FORM THE BUDGET MANAGER 'BREAKDOWN' MODAL
 const airfareBudget = $("#airfare").val().trim();
 const transportationBudget = $("#transportation").val().trim();
 const lodgingBudget = $("#lodging").val().trim();
 const foodBudget = $("#food").val().trim();
 const activitiesBudget = $("#activities").val().trim();
 const emergencyBudget = $("#emergency").val().trim();
 const miscBudget = $("#misc").val().trim();
/// FORM THE BUDGET MANAGER 'BREAKDOWN' MODAL
console.log(airfareBudget)
console.log(transportationBudget)
console.log(lodgingBudget)
console.log(foodBudget)
console.log(activitiesBudget)
console.log(emergencyBudget)
console.log(miscBudget)

///// breakdownArray
const breakdownArray=[airfareBudget, transportationBudget, lodgingBudget, 
  foodBudget, activitiesBudget, emergencyBudget, miscBudget];

  // console.log(`breakdownArray is this ${breakdownArray}`)
  let dataArray = []
 for (let i=0; i<breakdownArray.length; i++){
   
  let BBdata = {
    description: null,
    amountDesired: parseInt(breakdownArray[i]),
    BudgetCategoryId: parseInt(i+1), 
    TripId: parseInt(tripId)   
}
// console.log(BBdata);
dataArray.push(BBdata)
 }
console.log(dataArray)
// Send the POST request.
$.ajax("/api/budgetbreakdown", {
  
  type: "POST",
  data: {budget: dataArray}
  
}).then(
  function() {
    console.log("added new budgetdata");
    // Reload the page to get the updated list
    window.location.reload();
  }
);
};



/// ADDING AN EXPENSE
// THIS IS FOR POSTING TO THE BUDGET BREAKDOWN 
$(expenseForm).on("submit", expensetoDb);

function expensetoDb(event){
  event.preventDefault();
  const categoryArray =["Airfare", "Transportation", "Lodging", "Food and Drink", "Activities", "Emergency", "Miscellaneous"]
  const BBid = $("input[name='categorybutton']:checked").val().trim();
  let categoryname=[];

  for (i=0; i<categoryArray.length; i++){
    if(i == BBid-1){
      categoryname.push(categoryArray[i])
    } 
  }
  console.log(categoryname)
  


  console.log(`${BBid} this is the category button`)
    

 let newExpense = {
   amount: parseInt(expenseAmount.val().trim()),
   description: expenseDescription.val().trim(),
  categoryType: categoryname.toString(),
  BudgetBreakdownId: parseInt(BBid)
 }
 console.log(newExpense.amount, typeof newExpense.amount)
 console.log(newExpense.description, typeof newExpense.description)
 console.log(newExpense.categoryType, typeof newExpense.categoryType)
 console.log(newExpense.BudgetBreakdownId, typeof newExpense.BudgetBreakdownId)

 console.log(newExpense);

 

//  console.log(typeof newExpense.categorybtn)
//  console.log(newExpense);
 $.ajax("/api/expenses", {
  
  type: "POST",
  data: newExpense
  
}).then(
  function() {
    console.log("added new expense");
    // Reload the page to get the updated list
    // window.location.href = `/tripDash/${tripId}`
    window.location.reload();
  }
);

}


function getExpenses(){
  
  $.get("/api/expenses" , function(data) {
      console.log("Expense", data);
       const expenses = data
      //  console.log(data)
      //  console.log(trips + 'TRIPS AS DATA')
      if (!expenses || !expenses.length) {
        console.log('there are no expenses currently')
        }
        else {
          // console.log('THere are trips');
          // displayNoExpenses()
          console.log('there are expenses')
        }
      
})
};
getExpenses();
// uncomment when switch case developed 
// displayNoExpenses();


function displayNoExpenses(){
  // tripsContainer.empty();
  let H2 = $("<h2>");
  H2.css({ "text-align": "center", "margin-top": "50px" });
  H2.html("You dont appear to have any expenses at the moment, click the button below in order to add an expense to your planned trip.");
  expenseBody.append(H2);
}
displayNoExpenses()

// function displayExpenses(){
//   // THIS SHOULD SHOW WITHER THE CHART OR THE EXPENSES
// }
function noBudgetBreakdown(){
  $("#budgetManager").show()
  $("#updatebudgetManager").hide()
  breakdownBody = $("#breakdownBody")
  let H2 = $("<h2>");
  H2.css({ "text-align": "center", "margin-top": "50px" });
  H2.html("You dont appear to have any expenses at the moment, click the button below in order to add an expense to your planned trip.");
  breakdownBody.append(H2);
};

function budgetbreakdownGet(){
  const url = window.location.pathname;
console.log(url)
  var tripId;
  if (url.indexOf("/") !== -1) {
    tripId = url.split("/")[2];
  }
    $.get(`/api/budgetbreakdown/trips/${tripId}` , function(data) {
      
        // console.log("Trips", data);
         const BBreakdown = data

         console.log(data)
        
        if (!BBreakdown || !BBreakdown.length) {
          $("#expenseCard").hide();
          noBudgetBreakdown();
          }
          else {
            
            $("#expenseCard").show();
            $("#budgetManager").hide()
            $("#updatebudgetManager").show()

          }
        
})

}

budgetbreakdownGet()


});
