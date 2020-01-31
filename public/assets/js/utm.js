//// UTM - USER TRIP MANAGER
$(document).ready(function(){
    console.log('utm.js loaded')


$("#createTrip").show();


$("#viewTrip").on("click", function () {
  event.preventDefault();
  window.location.href="/myTrips"
});

$("#createTrip").on("click", function () {
  event.preventDefault();
  $("#createTrip").hide();
  $("#shiner").append(` <div>
    <div class="row">
        <div class="col-md-12">
            <div class="page-header">
                <h1>Where do you want to go?</h1>
            </div>
        </div>
    </div>
</div>

<br>

<div class="container">
    <form id="user-trip-form">
        <div class="row">
            <div class="col-3"></div>
            <div class="col-6">
                <div class="form-group">
                    <label for="Input1">Trip Name</label>
                    <input name="trip-name" type="text" class="form-control" id="tripname" required>
                </div>
                <div class="col-3"></div>
            </div>
        </div>
        <div class="row">
            <div class="col-3"></div>
            <div class="col-6">
                <div class="form-group">
                    <label for="Input2">Destination</label>
                    <input name="destination" type="text" class="form-control" id="destination" required>
                </div>
                <div class="col-3"></div>
            </div>
        </div>
        <div class="row">
            <div class="col-3"></div>
            <div class="col-6">
                <div class="form-group">
                    <label for="Input3">Departing</label>
                    <input name="departing" type="date" class="form-control" id="departing" value="2020-02-02"required>
                </div>
                <div class="col-3"></div>
            </div>
        </div>
        <div class="row">
            <div class="col-3"></div>
            <div class="col-6">
                <div class="form-group">
                    <label for="Input4">Returning</label>
                    <input name="returning" type="date" class="form-control" id="returning" value="2020-02-02" required>
                </div>
                <div class="col-3"></div>
            </div>
        </div>
        <div class="row">
            <div class="col-3"></div>
            <div class="col-6">
                <div class="form-group">
                    <label for="Input4">Max Budget (dollar amount)</label>
                    <input name="max-budget" type="number" class="form-control" id="totalbudget" required>
                </div>
                <div class="col-3"></div>
            </div>
        </div>
        <div class="row">
            <div class="col-3"></div>
            <div class="col-6">
                <div class="form-group">
                    <input type="submit" id="brandon" class="form-control submit" value="Submit">
                </div>
                <div class="col-3"></div>
            </div>
        </div>
    </form>
</div>`)
});

const userTripForm = $("#user-trip-form");

///////submits to constructors to database
$(document).on("click", "#brandon" , userTripSubmit);
///// HANDLES FORM SUBMIT CLICK
function userTripSubmit(event){
    event.preventDefault();
  const totalBudget = $("#totalbudget");
const returning = $("#returning");
const departing = $("#departing");
const destination =$("#destination");
const tripName = $("#tripname");

// TRIP CONSTRUCTOR POST TO DB
// MAKE SURE PROPERTY NAMES ARE RIGHT
///// FORMATED NOW AS yyyy-MM-dd
let newTrip = {
    tripname: tripName.val().trim(),
    totalbudget: parseInt(totalBudget.val().trim()),
    destination: destination.val().trim(),
    departing: departing.val(),
    returning: returning.val()
}
    console.log(newTrip.totalbudget, typeof newTrip.totalbudget)
    console.log(newTrip.destination, typeof newTrip.destination)
    console.log(newTrip.departing, typeof newTrip.departing)
    console.log(newTrip.returning, typeof newTrip.returning)
    console.log(newTrip.tripname, typeof newTrip.tripname)
    console.log(newTrip, typeof newTrip)

// Send the POST request.
$.ajax("/api/trips", {
  type: "POST",
  data: newTrip
}).then(
  function() {
    console.log("added new trip");
    // Reload the page to get the updated list
    window.location.href = "/mytrips";
  }
);
}


///asdoinasdionsda
//oaisndoisnad


});

