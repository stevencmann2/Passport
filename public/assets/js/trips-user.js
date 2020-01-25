///// JQUERY TO DISPLAY THE TRIPS TO THE USER
$(document).ready(function() {
notrips = $(".notrips")
tripsContainer = $(".mytrips-container");
tableBody= $("#tablebody")
var trips;
function getTrips(trips){

    $.get("/api/trips" , function(data) {
        console.log("Trips", data);
         trips = data
         console.log(data)
         console.log(trips + 'TRIPS AS DATA')
        if (!trips || !trips.length) {
            displayNoTrips();
          }
          else {
            console.log('THere are trips');
            addTableRows();
          }
        
})

}

function displayNoTrips(){
    // tripsContainer.empty();
    const H2 = $("<h2>");
    H2.css({ "text-align": "center", "margin-top": "50px" });
    H2.html("You dont appear to have any trips, click <a href='/user'>here</a> in order to create a new trip.");
    notrips.append(messageH2);
}

// constructs rows but doesnt fill in the html
function addTableRows(){
  // tripsContainer.empty();
    var tripsToAdd = [];
    console.log(trips + "TRIPS LATER")
    for (let i = 0; i < trips.length; i++) {
      tripsToAdd.push(createNewTrip(trips[i]));
    }
    tripsContainer.append(tripToAdd);

}

function createNewTrip(){
  tableBody.append(
    
  )
}
 getTrips();

});