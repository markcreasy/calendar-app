// Set header date
$("#currentDay").text(moment().format("dddd, MMMM Do"));


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
  // add Timeblocks for calendar
  for(var i=9;i<18;i++){
    createTimeBlock(i);
  }
}

$("#calendar").on("click", "i", function(){
  var textarea = $(this).closest(".time-block").find("textarea");
  var hourKey = textarea.attr('id');
  var text = textarea.val();

  

});

createCalendar();
