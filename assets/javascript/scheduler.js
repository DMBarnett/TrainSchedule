$(document).ready(function () {

    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyCHmihXSgmrAzNoWnScSX-DWMGkszy13eE",
        authDomain: "trainscheduler-b9c65.firebaseapp.com",
        databaseURL: "https://trainscheduler-b9c65.firebaseio.com",
        projectId: "trainscheduler-b9c65",
        storageBucket: "",
        messagingSenderId: "15662044060"
    };

    firebase.initializeApp(config);

    var database = firebase.database();


    var newName = "";
    var newDestination = "";
    var newStartTime;
    var newFrequency = 0;

    $("#submit").click(function (event) {
        event.preventDefault();
        //Grabs data from form
        newName = $("#trainName").val().trim();
        newDestination = $("#trainDestination").val().trim();
        newStartTime = $("#startTime").val().trim();
        console.log(newStartTime);
        newFrequency = $("#trainFrequency").val().trim();
        //Clears form for next input
        $("#trainName").val("");
        $("#trainDestination").val("");
        $("#startTime").val("");
        $("#trainFrequency").val("");
        //Pushes data to database
        database.ref().push({
            name:newName,
            destination:newDestination,
            startTime:newStartTime,
            frequency:newFrequency
        });
        
    })

    database.ref().on("child_added", function(childSnapshot){
        var trainName = childSnapshot.val().name;
        var trainDestination = childSnapshot.val().destination;
        var trainFrequency =childSnapshot.val().frequency;
        var workingtime = 0;
    })
})