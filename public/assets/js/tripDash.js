// function selectTrip(tripId){

//     $.get(`/api/trips/:${tripId}`, function(data) {
//         console.log("Trips", data);
//          const tripId = data.
//          console.log(data)
//          console.log(tripId + 'TRIPS AS DATA')
//         if (!tripId || !tripId.length) {
//             console.log('no trip data here')
//           }
//           else {
//             console.log('this is trip'+ tripId);
          
//           }
        
// })
// }


// selectTrip();



//  // The code below handles the case where we want to get blog posts for a specific author
//   // Looks for a query param in the url for author_id
//   var url = window.location.search;
//   var tripId;
//   if (url.indexOf("?trip_id=") !== -1) {
//     tripId = url.split("=")[1];
//     selectTrip(tripId);
//   }
//   // If there's no authorId we just get all posts as usual
//   else {
//     selectTrip();
//   }


//   // This function grabs posts from the database and updates the view
//   function selectTrip(trip) {
//     tripId = trip[tripId] || "";
//     if (tripId) {
//       tripId = "/?trip_id=" + tripId;
//     }
//     $.get("/api/trips" + tripId, function(data) {
//       console.log("Trips", data);
//       trips = data;
//       if (!trips || !trips.length) {
//         console.log('no trip or trip ID');
//       }
//       else {
//         console.log('grabbed the trip and ${tripId}');
//       }
//     });
//   }





















