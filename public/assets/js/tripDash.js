$(document).ready(function () {
  const breakdownForm = $("#breakdownform");
  const expenseForm = $("#expenseForm");
  expenseBody = $("#expenseBody")
  let totalBudgetValue;

  ////////// get trip data for modal 
  function getTrip() {
    const url = window.location.pathname;
    let tripId;
    if (url.indexOf("/") !== -1) {
      tripId = url.split("/")[2];
    }

    $.get(`/api/trips/${tripId}`, function (data) {
      const trip = data
      if (trip) {
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

  /// HANDLES MODAL SUBMIT FOR BUDGET BREAKDOWN
  $("#budgetManageSave").on("click", function budgetBreakdownSubmit(event) {
    event.preventDefault();
    const resultsTotal = parseInt($('#result').text())

    if (resultsTotal == totalBudgetValue) {
      // grabbing the tripId from the URL
      const url = window.location.pathname;
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

      const initialZeroArray = [airfareBudget, transportationBudget, lodgingBudget, foodBudget,
        activitiesBudget, emergencyBudget, miscBudget
      ]
      let breakdownArray = []
      for (i = 0; i < initialZeroArray.length; i++) {
        if (!initialZeroArray[i]) {
          initialZeroArray[i] = 0
        }
        breakdownArray.push(initialZeroArray[i])
      }

      let dataArray = []
      for (let i = 0; i < breakdownArray.length; i++) {

        let BBdata = {
          description: null,
          amountDesired: parseInt(breakdownArray[i]),
          BudgetCategoryId: parseInt(i + 1),
          TripId: parseInt(tripId)
        }
        dataArray.push(BBdata)
      }

      // Send the POST request.
      $.ajax("/api/budgetbreakdown", {

        type: "POST",
        data: {
          budget: dataArray
        }

      }).then(
        function () {
          // Reload the page to get the updated list
          window.location.reload();
        }
      );

    } else {
      alert('Oops! Your Total Budget does not equal your Desired Budget Cateogries Total, please adjust your calculcations');
    }
  });

  /// ADDING AN EXPENSE
  ///THIS IS FOR POSTING TO THE BUDGET BREAKDOWN 
  $(expenseForm).on("submit", expensetoDb);

  function expensetoDb(event) {

    event.preventDefault();
    //EXPENSE MODAL 
    const expenseAmount = $("#expenseamount");
    const expenseDescription = $("#expensedescription");
    const BBid = $("input[name='categorybutton']:checked").val().trim();
    const Amountvalue = parseInt(expenseAmount.val())

    if (expenseDescription.val().trim() === "") {
      alert("Please fill out the Expense form completley to add an expense")
    } else {

      const url = window.location.pathname;
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

      $.ajax("/api/expenses", {

        type: "POST",
        data: newExpense

      }).then(
        function () {
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

      const expenses = data

      if (!expenses || !expenses.length) {
        displayNoExpenses()
      } else {
        chartExpenses(expenses)
      }

    })
  };
  getExpenses();

  function chartExpenses(expenses) {
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

      const BBreakdown = data

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
      }
    })
  }

  budgetbreakdownGet();

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

    let updatedDataArray = []
    for (let i = 0; i < breakdownArray.length; i++) {

      let updatedBBdata = {
        description: null,
        amountDesired: parseInt(breakdownArray[i]),
        BudgetCategoryId: parseInt(i + 1),
        TripId: parseInt(tripId)
      }
      updatedDataArray.push(updatedBBdata)
    }
    // Send the POST request.
    $.ajax(`/api/budgetbreakdown/trips/${tripId}`, {

      type: "PUT",
      data: {
        budget: updatedDataArray
      }

    }).then(
      function () {
        window.location.reload();
      }
    );
  })
});