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
        var trainName = $("<td>")
        trainName.text(childSnapshot.val().name);
        trainName.attr("class", "trainName");

        var trainDestination =  $("<td>")
        trainDestination.text(childSnapshot.val().destination);
        trainDestination.attr("class", "destination");

        var tFrequency = $("<td>")
        tFrequency.text(childSnapshot.val().frequency);
        tFrequency.attr("class", "frequency");

        var frequency = childSnapshot.val().frequency;
        var firstTime = childSnapshot.val().startTime;
        
        var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
        var diffTime = moment().diff(moment(firstTimeConverted), "minutes");

        var tRemainder = diffTime % frequency;
        
        var tMinutesTillTrain = frequency - tRemainder;
        
        var nextTrain = moment().add(tMinutesTillTrain, "minutes");
        var working = "<td>"+moment(nextTrain).format("hh:mm")+"</td>";

        var minutesAway = "<td>"+tMinutesTillTrain+"</td>";

        
        var edit = $("<button>");
        edit.attr("class", "btn btn-info editTime");
        edit.text("Edit");
        edit.attr("data-name", childSnapshot.val().name);
        edit.attr("data-key", childSnapshot.key);
        var editButton = $("<td>").append(edit);

        var remove = $("<button>");
        remove.attr("class", `btn btn-info removeTrain`);
        remove.attr("data-name", childSnapshot.val().name);
        remove.attr("data-key", childSnapshot.key);
        remove.text("Remove");
        var removeButton = $("<td>").append(remove);

        var fillInRow = $("<tr>");
        fillInRow.attr("id", childSnapshot.val().name);
        fillInRow.append(trainName,trainDestination, tFrequency, working, minutesAway, editButton, removeButton);
        $("#trainScheduleTable").append(fillInRow);
    })

    $(document).on("click", ".removeTrain", function(){
        var working = '"#'+$(this).attr("data-name")+'"';
        console.log(working);
        $("#David").remove();
        var key = $(this).attr("data-key");
        database.ref().child(key).remove();
    })

    $(document).on("click", ".editTime", function(){
        var workingKey = $(this).attr("data-key");
        var workingID = '"#'+$(this).attr("data-name")+'"';


        var newName = prompt("Enter new train name:");
        var newTrainDestination = prompt("Enter the new destination:");
        var newStartingTime = prompt("Enter the new starting time:", "hh:mm AM format");
        var newTrainFrequency = prompt("Enter the new train frequency:", "Must be a number.");

        database.ref().child(workingKey).update({
            name:newName,
            destination:newTrainDestination,
            startTime:newStartingTime,
            frequency:newTrainFrequency
        });
    })
})