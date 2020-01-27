var url = window.location.pathname;
console.log(url)
  var tripId;
  if (url.indexOf("/") !== -1) {
    tripId = url.split("/")[2];
    console.log(tripId+ "this is the trip Id with my javascript")
    getBudgetBreakdown(tripId);
  }
  // If there's no authorId we just get all posts as usual
  else {
    getBudgetBreakdown();
  }


  // This function grabs posts from the database and updates the view
  function getBudgetBreakdown(trip) {
    tripId = trip || "";
    console.log(tripId+" inside the get BudgetBrakdownFunction")
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


///////// get route for trip budget??????????????
function showOverallBudgetModal() {
    $.get(`/api/trips/${tripId}`, function(data) {
        console.log(tripId+ ' inside the show overall')
    //   var rowsToAdd = [];
    //   for (var i = 0; i < data.length; i++) {
    //     rowsToAdd.push(createAuthorRow(data[i]));
    //   }
    //   renderAuthorList(rowsToAdd);
    //   nameInput.val("");
    });
  }



 });

 showOverallBudgetModal();

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
// function selectTrip(tripId){



















