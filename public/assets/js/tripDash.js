$(document).ready(function () {
      const breakdownForm = $("#breakdownform");
      const expenseForm = $("#expenseForm");
      expenseBody = $("#expenseBody")
      let totalBudgetValue;
      ////////// get trip data for modal 
      function getTrip() {
        const url = window.location.pathname;
        console.log(url)
        let tripId;
        if (url.indexOf("/") !== -1) {
          tripId = url.split("/")[2];
        }

        $.get(`/api/trips/${tripId}`, function (data) {

          console.log("Trips data", data);
          const trip = data
          console.log("Trips data" + trip)
          if (trip) {
            console.log('there is a trip currently')
            // displayTotalBudget(trips)
            console.log(trip)
            // appending the total budget to the modal
            $("#totalBudget").append(`Total Budget: $ ${trip.totalbudget}`)
            $("#totalBudget").attr("value", trip.totalbudget)
            totalBudgetValue = trip.totalbudget
          }

        })

      };
      getTrip();






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
      $(".form-group").on('input', '.prc', function () {
        var totalSum = 0;
        $(".form-group .prc").each(function () {
          var inputVal = $(this).val();
          if ($.isNumeric(inputVal)) {
            totalSum += parseFloat(inputVal);
          }
        });
        $('#result').val(totalSum)
      });

      // THIS IS FOR POSTING TO THE BUDGET BREAKDOWN 
      // $(breakdownForm).on("submit", budgetBreakdownSubmit);

      /// HANDLES MODAL SUBMIT FOR BUDGET BREAKDOWN
      $("#budgetManageSave").on("click", function budgetBreakdownSubmit(event) {
          event.preventDefault();
          const resultsTotal = parseInt($('#result').text())
          
      
          if (resultsTotal == totalBudgetValue) {
              // grabbing the tripId from the URL
              const url = window.location.pathname;
              console.log(url)
              var tripId;
              if (url.indexOf("/") !== -1) {
                tripId = url.split("/")[2];
              }

              ///// FORM THE BUDGET MANAGER 'BREAKDOWN' MODAL
              let airfareBudget = $("#airfare").val().trim();
              let transportationBudget = $("#transportation").val().trim();
              let lodgingBudget = $("#lodging").val().trim();
              let foodBudget = $("#food").val().trim();
              let activitiesBudget = $("#activities").val().trim();
              let emergencyBudget = $("#emergency").val().trim();
              let miscBudget = $("#misc").val().trim();

              const initialZeroArray=[airfareBudget, transportationBudget, lodgingBudget, foodBudget,
              activitiesBudget, emergencyBudget, miscBudget]
              let breakdownArray=[]
              for(i=0; i < initialZeroArray.length; i++){
                if(!initialZeroArray[i]){
                  initialZeroArray[i]= 0
                  console.log("this is the zero value hopefully" + initialZeroArray[i])
                  
                }
                breakdownArray.push(initialZeroArray[i])
              }
              console.log(breakdownArray)
              
              ///// breakdownArray
              // const breakdownArray = [airfareBudget, transportationBudget, lodgingBudget,
              //   foodBudget, activitiesBudget, emergencyBudget, miscBudget
              // ];

              // console.log(`breakdownArray is this ${breakdownArray}`)
              let dataArray = []
              for (let i = 0; i < breakdownArray.length; i++) {

                let BBdata = {
                  description: null,
                  amountDesired: parseInt(breakdownArray[i]),
                  BudgetCategoryId: parseInt(i + 1),
                  TripId: parseInt(tripId)
                }
                // console.log(BBdata);
                dataArray.push(BBdata)
              }

              console.log(dataArray)
              // Send the POST request.
              $.ajax("/api/budgetbreakdown", {

                type: "POST",
                data: {
                  budget: dataArray
                }

              }).then(
                function () {
                  console.log("added new budgetdata");
                  // Reload the page to get the updated list
                  window.location.reload();
                }
              );

            } else {
              alert('Oops! Your Total Budget does not equal your Desired Budget Cateogries Total, please adjust your calculcations');

            }


          });



        /// ADDING AN EXPENSE
        // THIS IS FOR POSTING TO THE BUDGET BREAKDOWN 
        $(expenseForm).on("submit", expensetoDb);

        function expensetoDb(event) {


          event.preventDefault();
          //EXPENSE MODAL 
          const expenseAmount = $("#expenseamount");
          const expenseDescription = $("#expensedescription");
          const BBid = $("input[name='categorybutton']:checked").val().trim();
          const Amountvalue = parseInt(expenseAmount.val())

          if(expenseDescription.val().trim() === ""){
            alert("Please fill out the Expense form completley to add an expense")
          }else{

          console.log(`${BBid} this is the category button`)
          const url = window.location.pathname;
          console.log(url)
          var tripId;
          if (url.indexOf("/") !== -1) {
            tripId = url.split("/")[2];
          }

          let newExpense = {
            amount: parseInt(expenseAmount.val().trim()),
            description: expenseDescription.val().trim(),
            BudgetCategoryId: parseInt(BBid),
            TripId: parseInt(tripId)
          }
          console.log(newExpense.amount, typeof newExpense.amount)
          console.log(newExpense.description, typeof newExpense.description)

          console.log(newExpense.BudgetCategoryId, typeof newExpense.BudgetCategoryId)

          console.log(newExpense);



          //  console.log(typeof newExpense.categorybtn)
          //  console.log(newExpense);
          $.ajax("/api/expenses", {

            type: "POST",
            data: newExpense

          }).then(
            function () {
              console.log("added new expense");
              // Reload the page to get the updated list
              // window.location.href = `/tripDash/${tripId}`
              window.location.reload();
            }
          );
          }
        }


        function getExpenses() {

          const url = window.location.pathname;
            let tripId;
            if (url.indexOf("/") !== -1) {
              tripId = url.split("/")[2];
            }

          $.get(`/api/expenses/trips/${tripId}`, function (data) {
            
            console.log("Expense", data);
            const expenses = data
            console.log(data)
            console.log(expenses + 'EXP AS DATA')
            if (!expenses || !expenses.length) {
              console.log('there are no expenses currently')
              displayNoExpenses()
            } else {
              // console.log('THere are trips');
              chartExpenses(expenses)
              console.log('there are expenses')
            }

          })
        }; getExpenses();
        // uncomment when switch case developed 
        // displayNoExpenses();
        function chartExpenses(expenses) {
          console.log(expenses)
          $('#expenseBody').prepend("<canvas id='expensesChart' class='mb-2'></canvas>")
          let echart = $('#expensesChart');
          let expensesChart = new Chart(echart, {
            // The type of chart we want to create
            type: 'doughnut',

            // The data for our dataset
            data: {
              labels: ['these', 'are', 'expenses'],
              datasets: [{
                label: 'My First dataset',
                //sets the colors of the individual segments of the chart
                backgroundColor: ['rgb(255, 99, 132)', 'rgb(246, 13, 13)',
                  'rgb(13, 246, 13)', 'rgb(13, 13, 246)', 'rgb(13, 246, 246)',
                  'rgb(246, 13, 195)', 'rgb(71, 246, 13)'
                ],
                //if you want to add a border between the segments
                // borderColor: 'rgb(255, 99, 200)',
                data: [12321, 12312321, 12312321]
              }]
            },

            // Configuration options go here
            options: {}
          });

        }

        function displayNoExpenses() {
          // tripsContainer.empty();
          let H2 = $("<h2>");
          H2.css({
            "text-align": "center",
            "margin-top": "50px"
          });
          H2.html("You dont appear to have any expenses at the moment, click the button below in order to add an expense to your planned trip.");
          expenseBody.append(H2);
        }


        // function displayExpenses(){
        //   // THIS SHOULD SHOW WITHER THE CHART OR THE EXPENSES
        // }
        function noBudgetBreakdown() {


          breakdownBody = $("#breakdownBody")
          let H2 = $("<h2>");
          H2.css({
            "text-align": "center",
            "margin-top": "50px"
          });
          H2.html("To begin using Passport, click the button below and enter your desired budget constraints");
          breakdownBody.append(H2);
        };

        function budgetbreakdownGet() {
          const url = window.location.pathname;
          var tripId;
          if (url.indexOf("/") !== -1) {
            tripId = url.split("/")[2];
          }
          $.get(`/api/budgetbreakdown/trips/${tripId}`, function (data) {

            // console.log("Trips", data);
            const BBreakdown = data

            // console.log("this is the BB data for the chart")
            // console.log(BBreakdown)



            if (!BBreakdown || !BBreakdown.length) {
              $("#expenseCard").hide();
              $("#updatebudgetManager").hide();
              noBudgetBreakdown();

            } else {
              $("#expenseCard").show();
              $("#budgetManageSave").hide();
              $("#updatebudgetManager").show();
              $("#budgetManager").text('Adjust Budget')
              $("#budgetManager").attr('class', 'btn btn-warning btn-block btn-lg mb-4')
              chartBudget(BBreakdown);
              // apend statement to the form for BB --- budget total


            }

          })

        }
        budgetbreakdownGet();
        //class="mb-2" id="budgetChart"
        function chartBudget(BBreakdown) {

          $('#breakdownBody').prepend("<canvas id='budgetChart' class='mb-2'></canvas>")
          let chart = $('#budgetChart');
          let budgetChart = new Chart(chart, {
            // The type of chart we want to create
            type: 'doughnut',

            // The data for our dataset
            data: {
              labels: ['Airfare', 'Transportation', 'Lodging',
                'Food and Drink', 'Activities', 'Emergency', 'Miscellanesous'
              ],
              datasets: [{
                label: 'My First dataset',
                //sets the colors of the individual segments of the chart
                backgroundColor: ['rgb(255, 99, 132)', 'rgb(246, 13, 13)',
                  'rgb(13, 246, 13)', 'rgb(13, 13, 246)', 'rgb(13, 246, 246)',
                  'rgb(246, 13, 195)', 'rgb(71, 246, 13)'
                ],
                //if you want to add a border between the segments
                // borderColor: 'rgb(255, 99, 200)',
                data: [BBreakdown[0].amountDesired, BBreakdown[1].amountDesired, BBreakdown[2].amountDesired,
                  BBreakdown[3].amountDesired, BBreakdown[4].amountDesired, BBreakdown[5].amountDesired,
                  BBreakdown[6].amountDesired
                ]
              }]
            },

            // Configuration options go here
            options: {}
          });
        }



        $("#updatebudgetManager").on("click", function BudgetUpdate() {
          event.preventDefault();


          // grabbing the tripId from the URL
          const url = window.location.pathname;
          console.log(url)
          var tripId;
          if (url.indexOf("/") !== -1) {
            tripId = url.split("/")[2];
          }

          ///// FORM THE BUDGET MANAGER 'BREAKDOWN' MODAL
          const airfareBudget = $("#airfare").val().trim();
          const transportationBudget = $("#transportation").val().trim();
          const lodgingBudget = $("#lodging").val().trim();
          const foodBudget = $("#food").val().trim();
          const activitiesBudget = $("#activities").val().trim();
          const emergencyBudget = $("#emergency").val().trim();
          const miscBudget = $("#misc").val().trim();

          ///// breakdownArray
          const breakdownArray = [airfareBudget, transportationBudget, lodgingBudget,
            foodBudget, activitiesBudget, emergencyBudget, miscBudget
          ];

          // console.log(`breakdownArray is this ${breakdownArray}`)
          let updatedDataArray = []
          for (let i = 0; i < breakdownArray.length; i++) {

            let updatedBBdata = {
              description: null,
              amountDesired: parseInt(breakdownArray[i]),
              BudgetCategoryId: parseInt(i + 1),
              TripId: parseInt(tripId)
            }
            // console.log(BBdata);
            updatedDataArray.push(updatedBBdata)
          }
          console.log(updatedDataArray[0])
          // Send the POST request.
          $.ajax(`/api/budgetbreakdown/trips/${tripId}`, {

            type: "PUT",
            data: {
              budget: updatedDataArray
            }

          }).then(
            function () {
              console.log("updated budget data");
              // Reload the page to get the updated list
              window.location.reload();
            }
          );
        })

      });