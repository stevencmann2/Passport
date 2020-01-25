//// UTM - USER TRIP MANAGER
$(document).ready(function(){

//from trip creation form
//////////////////////////////////////// MAY WANT TO ADD TO LOWERCASE AND PARSING HERE
const totalBudget = $("#totalbudget");
const returning = $("#returning");
const departing = $("#departing");
const destination =$("#destination");
const tripName = $("#tripname");
const userTripForm = $("#user-trip-form");



// console.log(req.body)
// console.log(req.user)
///////submits to constructors to database
$(userTripForm).on("submit", userTripSubmit);


///// HANDLES FORM SUBMIT CLICK
function userTripSubmit(event){
    event.preventDefault();
// TRIP CONSTRUCTOR POST TO DB
// MAKE SURE PROPERTY NAMES ARE RIGHT

///// FORMATED NOW AS yyyy-MM-dd
console.log(`departing ${departing.val()}`)
console.log(`returning ${returning.val()}` )

let newTrip = {
    tripname: tripName.val().trim(),
    totalbudget: totalBudget.val().trim(),
    destination: destination.val().trim(),
    departing: departing.val(),
    returning: returning.val()

}

console.log(newTrip.totalbudget)
console.log(newTrip.destination)
console.log(newTrip.departing)
console.log(newTrip.returning)
console.log(newTrip)

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

