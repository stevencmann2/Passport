$(document).ready(function () {
  const breakdownForm = $("#breakdownform");
  const expenseForm = $("#expenseForm");
  expenseBody = $("#expenseBody")

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

    console.log(`${BBid} this is the category button`)


    let newExpense = {
      amount: parseInt(expenseAmount.val().trim()),
      description: expenseDescription.val().trim(),
      BudgetBreakdownId: parseInt(BBid)
    }
    console.log(newExpense.amount, typeof newExpense.amount)
    console.log(newExpense.description, typeof newExpense.description)

    console.log(newExpense.BudgetBreakdownId, typeof newExpense.BudgetBreakdownId)

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


  function getExpenses() {

    $.get("/api/expenses", function (data) {
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
  };
  getExpenses();
  // uncomment when switch case developed 
  // displayNoExpenses();
function chartExpenses(expenses){
  console.log(expenses)
  $('#expenseBody').prepend("<canvas id='expensesChart' class='mb-2'></canvas>")
  let echart = $('#expensesChart');
  let expensesChart = new Chart(echart, {
    // The type of chart we want to create
    type: 'doughnut',

    // The data for our dataset
    data: {
      labels: ['these', 'are', 'expenses'
      ],
      datasets: [{
        label: 'My First dataset',
        //sets the colors of the individual segments of the chart
        backgroundColor: ['rgb(255, 99, 132)','rgb(246, 13, 13)',
        'rgb(13, 246, 13)','rgb(13, 13, 246)', 'rgb(13, 246, 246)',
        'rgb(246, 13, 195)','rgb(71, 246, 13)'],
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
          backgroundColor: ['rgb(255, 99, 132)','rgb(246, 13, 13)',
          'rgb(13, 246, 13)','rgb(13, 13, 246)', 'rgb(13, 246, 246)',
          'rgb(246, 13, 195)','rgb(71, 246, 13)'],
          //if you want to add a border between the segments
          // borderColor: 'rgb(255, 99, 200)',
          data: [BBreakdown[0].amountDesired, BBreakdown[1].amountDesired, BBreakdown[2].amountDesired, 
          BBreakdown[3].amountDesired, BBreakdown[4].amountDesired, BBreakdown[5].amountDesired, 
          BBreakdown[6].amountDesired]
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