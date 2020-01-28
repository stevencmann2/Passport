$(document).ready(function() {

const breakdownForm = $('#breakdownform');
 const expenseForm = $("#expenseForm");


 ///// FORM THE BUDGET MANAGER 'BREAKDOWN' MODAL
 let airfareBudget = $("#airfare");
 let transportationBudget = $("#transportation");
 let lodgingBudget = $("#lodging");
 let foodBudget = $("#food");
 let activitiesBudget = $("#activities");
 let emergencyBudget = $("#emergency");
 let miscBudget = $("#misc");
///// FORM THE BUDGET MANAGER 'BREAKDOWN' MODAL
airfareBudget = airfareBudget.val().trim();
transportationBudget = transportationBudget.val().trim();
lodgingBudget =lodgingBudget.val().trim();
foodBudget = foodBudget.val().trim();
activitiesBudget = activitiesBudget.val().trim();
emergencyBudget = emergencyBudget.val().trim();
miscBudget = miscBudget.val().trim();




 //EXPENSE MODAL 
 const expenseAmount = $("#expenseamount")
 const expenseDescription = $("#expensedescription")



var url = window.location.pathname;
console.log(url)
  var tripId;
  if (url.indexOf("/") !== -1) {
    tripId = url.split("/")[2];
    console.log(tripId+ "this is the trip Id with my javascript")
    // getBudgetBreakdown(tripId);
  }
//   // If there's no authorId we just get all posts as usual
//   else {
//     getBudgetBreakdown();
//   }


//   // This function grabs posts from the BB database and updates the view
//   // function getBudgetBreakdown(trip) {
//   //   tripId = trip || "";
//   //   console.log(tripId+" inside the get BudgetBrakdownFunction")
//   //   if (tripId) {
//   //     tripId = "/?trip_id=" + tripId;
//   //   }
//   //   $.get("/api/budgetbreakdown" + tripId, function(data) {
//   //     console.log("Budget", data);
//   //    budgetbreakdown = data;
//   //     if (!budgetbreakdown || !budgetbreakdown.length) {
//   //       // displayEmpty(trip);
//   //       console.log('no set budget constraints')
//   //     }
//   //     else {
//   //       // initializeRows();
//   //       console.log('budget constraints exist')
//   //     }
//   //   });
//   // }

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

///// breakdownArray
const breakdownArray=[airfareBudget, transportationBudget, lodgingBudget, 
  foodBudget, activitiesBudget, emergencyBudget, miscBudget];

  console.log(`breakdownArray is this ${breakdownArray}`)
  let dataArray = []
 for (let i=0; i<breakdownArray.length; i++){
   
  

  let BBdata = {
    description: null,
    amountDesired: parseInt(breakdownArray[i]),
    BudgetCategoryId: parseInt(i+1), 
    tripId: parseInt(tripId)   
}
console.log(BBdata);
dataArray.push.BBdata
 }


console.log(dataArray)

// Send the POST request.

$.ajax("/api/budgetbreakdown", {
  
  type: "POST",
  data: dataArray
  
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
$(expenseForm).on("submit", addExpense);

function addExpense(event){
  event.preventDefault();
  const categorybtn = $("input[name='categorybutton']:checked").val().trim();

 let newExpense = {
   amount: parseInt(expenseAmount.val().trim()),
   description: expenseDescription.val().trim(),
  categoryType: categorybtn
 }
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
});
