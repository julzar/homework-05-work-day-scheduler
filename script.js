$(document).ready(function() {

    let day = {
        dayStart: 9,
        dayEnd: 18,
    };

    let hour = day.dayStart;

    let hours = [];
    
    let currentTime = moment().hour();

    let eventObj = {}

    let scheduledEvent = JSON.parse(localStorage.getItem("savedEvents"));


    // Sets #currentDay html to the current day in "day, month date" format
    $("#currentDay").html(`<p>${moment().format("dddd, MMMM Do")}</p>`)

    // Checks local storage for saved events. Returns an empty string for null and undefined values, else returns the event.
    function getEventValue() {

        if (scheduledEvent == null || scheduledEvent[`eventKey-${hour}`] == undefined) {
            return "";
        }
        else {
            return scheduledEvent[`eventKey-${hour}`];
        }
    }

    // Generates hour values for hours[] based on the values of dayStart and dayEnd. Calls getEventValue()
    function generateHours() {
        
        for (i = day.dayStart; i < day.dayEnd; i++) {
            hours.push({
                time: hour,
                event: getEventValue()
            });
            hour++;
        }
    }

    generateHours();

    // Renders a row for each hour with values from hours[]. Calls setTimeClass()
    function renderTimeBlocks(hoursData) {

        for (i = 0; i < hoursData.length; i++) {
            let timeblock = 
            `
                <div class="row p-2 ${setTimeClass(hoursData[i].time)}">
                    <div id="hour-col" class="col-1">
                        <span>${moment(hoursData[i].time, ["HH"]).format("h A")}</span>
                    </div>
                    <div class="col">
                        <input id="${`input-${hoursData[i].time}`}" class="form-control form-control-lg" type="text" placeholder="No Event Yet" value="${hoursData[i].event}">
                    </div>
                    <div class="col-1">
                        <button type="button" id="${hoursData[i].time}" class="btn btn-outline-primary btn-lg">Save</button>
                    </div>
                </div>
            `
            $(".container").append(timeblock)
        }
    }

    renderTimeBlocks(hours);

    // !BROKEN! this is supposed to set class to past, present, or future based on relationship to current time
    function setTimeClass(validationTime) {
        //let timeTense = moment([validationTime, "hours"])
        //let timeDiff = validationTime.diff(currentTime)
        let timeDiff = moment().diff(validationTime, currentTime);
        
        console.log(timeDiff)
        if(timeDiff > 0) {
            return "future";
        } else if( timeDiff == 0) {
            return "present"
        }
        return "past";
    }

    // Adds onclick events to each "save" button
    $("button").on('click', function(ev) {

        let eventId = ev.target.id
        let eventInput = {
            [`eventKey-${eventId}`]: $(`#input-${eventId}`).val()
        }
        // Updates eventObj{} with values from input elements and local storage.
        $.extend(eventObj, scheduledEvent) // Prevents existing events from being overwritten with empty strings
        $.extend(eventObj, eventInput)
        // Updates local storage item "savedEvents" with eventObj{} values
        localStorage.setItem("savedEvents", JSON.stringify(eventObj))
    })
    

// End of script   
})
