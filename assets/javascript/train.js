var config = {
    apiKey: "AIzaSyBqjvp1hP-t0lySnMmIF4IJIq3130ROoZA",
    authDomain: "train-scheduler-cecf8.firebaseapp.com",
    databaseURL: "https://train-scheduler-cecf8.firebaseio.com",
    projectId: "train-scheduler-cecf8",
    storageBucket: "",
    messagingSenderId: "366144906387"
};
firebase.initializeApp(config);

var database = firebase.database();

//Adding Trains
$('#add-train-button').on('click', function(event) {
    //Prevents input from refreshing HTML
    event.preventDefault();

    //values from input forms that user enters saved as variables
    var trainName = $('#trainName').val().trim();
    var destination = $('#destination').val().trim();
    var departTime = $('#departTime').val().trim();
    var frequency = $('#frequency').val().trim();

    var newTrain = {
        name: trainName,
        city: destination,
        departure: departTime,
        leaving: frequency
    };

    //Uploads temp object to database
    database.ref().push(newTrain);

    console.log(newTrain.name);
    console.log(newTrain.city);
    console.log(newTrain.departure);
    console.log(newTrain.leaving);


    $('#trainName').val("");
    $('#destination').val("");
    $('#departTime').val("");
    $('#frequency').val("");

});

//Uploads user input variables to database and adds them to table something wonky here...
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

    console.log(childSnapshot.val());

    var trainName = childSnapshot.val().name;
    var destination = childSnapshot.val().city;
    var departTime = childSnapshot.val().departure;
    var frequency = childSnapshot.val().leaving;

    console.log(trainName);
    console.log(destination);
    console.log(departTime);
    console.log(frequency);

    //Converting depart time to a miltary time
    var departTimeFormat = moment.unix(departTime).format("HH:mm");

    //
    var minutes = moment().diff(moment.unix(departTime, "X"), "m");
    console.log(minutes, "yo!");

    var minutesAway = moment(moment(frequency, "HH:mm").diff(moment(), "minutes"));
    console.log(minutesAway, "haha");

    $("#trainTable > tbody").append(
        "<tr><td>" + trainName + 
        "</td><td>" + destination + 
        "</td><td>" + departTime + 
        "</td><td>" + frequency + 
        "</td><td>" + minutesAway + "</td></tr>");

});