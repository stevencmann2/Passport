var url = window.location.search;
  var tripId;
  if (url.indexOf("?author_id=") !== -1) {
    tripId = url.split("=")[1];
    getBudgetBreakdown(tripId);
  }
  // If there's no authorId we just get all posts as usual
  else {
    getBudgetBreakdown();
  }


  // This function grabs posts from the database and updates the view
  function getBudgetBreakdown(trip) {
    tripId = trip || "";
    if (tripId) {
      tripId = "/?trip_id=" + tripId;
    }
    $.get("/api/budgetbreakdown" + tripId, function(data) {
      console.log("Budget", data);
     budgetbreakdown = data;
      if (!budgetbreakdown || !budgetbreakdown.length) {
        // displayEmpty(trip);
        console.log('no set budget constraints')
      }
      else {
        // initializeRows();
        console.log('budget constraints exist')
      }
    });
  }
 





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
// function selectTrip(tripId){



















