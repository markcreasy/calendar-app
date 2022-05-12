
var createTimeBlock = function(hour){

  // Create Time variables
  var currentTime = moment();
  var calendarTime = moment(hour, 'h');

  // Create row container
  var rowDiv = $("<div>").addClass("row time-block container-lg");

  // create hour div
  var hourDiv = $("<div>").addClass("hour col-1 pt-3");
  hourDiv.text(calendarTime.format('h a'));

  // create toDoDiv
  var toDoDiv = $("<div>").addClass("col-10 to-do-item text-left p-0");
  var toDoP = $("<textarea>")
    .addClass("to-do-text")
    .attr('id', ('hour-' + hour));

  toDoP.text(schedulerData[(hour-9)]);

  toDoDiv.append(toDoP);

  // Set css according to past/present/future time
  if(currentTime.hour() > calendarTime.hour()){
    toDoDiv.addClass("past");
  }else if(currentTime.hour() == calendarTime.hour()){
    toDoDiv.addClass("present");
  }else if(currentTime.hour() < calendarTime.hour()){
    toDoDiv.addClass("future");
  }

  // create save div
  var saveDiv = $("<div>").addClass("saveBtn col-1 d-flex justify-content-center align-items-center");
  var saveIcon = $("<i>").addClass("p-4 fa fa-save");
  saveDiv.append(saveIcon);

  // add hourDiv, toDoDiv, and saveDiv to rowDiv
  rowDiv.append(hourDiv, toDoDiv, saveDiv);

  // add rowDiv to #calendar
  $("#calendar").append(rowDiv);

}

var createCalendar = function(){

  // get localStorage data
  storedDate = localStorage.getItem("today");
  storedCalendarData = localStorage.getItem("calendarData");

  if(storedDate == moment().format("MDYYYY") && storedCalendarData != null){

    // get calendar data from localStorage
    schedulerData = JSON.parse(storedCalendarData);

  }else if(storedDate != moment().format("MDYYYY") && storedCalendarData != null){

    // check if user wants to keep old data
    var keepData = confirm("We found calendar data from a previous day. Would you like to keep that data?");

    // if user does not want to keep old data, clear localStorage
    if(keepData){
      schedulerData = JSON.parse(storedCalendarData);
    }else{
      // create new calendar data array
      schedulerData = ["","","","","","","","",""];
    }

  }else{
    // storedCalendarData is empty
    schedulerData = ["","","","","","","","",""];
  }

  // set current day in localStorage
  localStorage.setItem("today", moment().format("MDYYYY"));
  // set schedulerData
  localStorage.setItem("calendarData",JSON.stringify(schedulerData));

  // add Timeblocks for calendar
  for(var i=9;i<18;i++){
    createTimeBlock(i);
  }
}

// storage variable
var schedulerData = [];
// Set header date
var currentDay = moment();
$("#currentDay").text(currentDay.format("dddd, MMMM Do"));
// create calendar
createCalendar();

// setup listeners
$("#calendar").on("click", "i", function(){
  var textarea = $(this).closest(".time-block").find("textarea");
  // get hour index based on id
  var hourKey = parseInt(textarea.attr('id').replace("hour-",""));
  // adjust hourkey for index
  hourKey -= 9;
  var text = textarea.val();

  schedulerData[hourKey] = text;
  localStorage.setItem("calendarData",JSON.stringify(schedulerData));

});
