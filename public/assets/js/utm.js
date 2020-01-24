//// UTM - USER TRIP MANAGER
$(document).ready(function(){

//from trip creation form
//////////////////////////////////////// MAY WANT TO ADD TO LOWERCASE AND PARSING HERE
const totalBudget = $("#totalbudget");
const returning = $("#returning")
const departing = $("#departing")
const destination =$("#destination")
const tripName = $("#tripname")
const userTripForm = $("#user-trip-form")

// console.log(req.body)
// console.log(req.user)
///////submits to constructors to database
$(userTripForm).on("submit", userTripSubmit);


///// HANDLES FORM SUBMIT CLICK
function userTripSubmit(event){
    event.preventDefault();
    //double checking values are submitted else returns
    if (!totalBudget.val().trim() || !returning.val().trim() 
    || !departing.val().trim() || !destination.val().trim() || !tripName.val().trim()){
        return;
    }
// TRIP CONSTRUCTOR POST TO DB
// MAKE SURE PROPERTY NAMES ARE RIGHT
const newTrip = {
    totalbudget: totalBudget.val().trim(),
    destination: destination.val().trim(),
    departing: departing.val().trim(),
    returning: returning.val().trim()

}
// Send the POST request.

$.ajax("/api/trips", {
  type: "POST",
  data: newTrip
}).then(
  function() {
    console.log("added new trip");
    // Reload the page to get the updated list
    location.reload();
  }
);
}

});

