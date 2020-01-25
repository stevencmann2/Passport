///// JQUERY TO DISPLAY THE TRIPS TO THE USER
$(document).ready(function() {
function getTrips(trips){

    $.get("/api/trips" , function(data) {
        console.log("Trips", data);
        

})

}

});