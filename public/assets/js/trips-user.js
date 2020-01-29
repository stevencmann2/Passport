///// JQUERY TO DISPLAY THE TRIPS TO THE USER
 
$(document).ready(function() {
  let timeNow = moment().format("YYYY-MM-DD");
///////
notrips = $(".notrips")
tripsContainer = $(".mytrips-container");
tableBody= $("#tablebody")
function getTrips(){

    $.get("/api/trips" , function(data) {
        // console.log("Trips", data);
         const trips = data
        //  console.log(data)
        //  console.log(trips + 'TRIPS AS DATA')
        if (!trips || !trips.length) {
            displayNoTrips();
          }
          else {
            // console.log('THere are trips');
            addTableRows(trips);
          }
        
})

}

function displayNoTrips(){
    // tripsContainer.empty();
    const H2 = $("<h2>");
    H2.css({ "text-align": "center", "margin-top": "50px" });
    H2.html("You dont appear to have any trips, click <a href='/user'>here</a> in order to create a new trip.");
    notrips.append(H2);
}

// constructs rows but doesnt fill in the html
function addTableRows(trips){
  // tripsContainer.empty();
   
    
    
//  <td><a href='/api/trips/${trips[i].id}'>${trips[i].tripname}</a></td> //
// /mytrips/${trips[i].id}'>${trips[i].tripname}</a></td>
  // ROUTING TO THE TRIPNAME = (ROUTE)
  // MOMENT TILL IN THE RETURNING
    // console.log(trips + "TRIPS LATER")
    for (let i = 0; i < trips.length; i++) {
        let now = moment();
       let tripDate = moment(trips[i].departing)
     tableBody.append(`
     <tr>
      <td><a href='/tripDash/${trips[i].id}'>${trips[i].tripname}</a></td>
      <td>${trips[i].destination}</td>
      <td>${tripDate.diff(now, 'days')}</td>
    </tr>
     `)
    }
    
}


 getTrips();

});