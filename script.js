$(document).ready(function() {

    // let currentDay = `<p>${moment().format("dddd, MMMM Do")}</p>`

    let day = {
        currentDay: `<p>${moment().format("dddd, MMMM Do")}</p>`,
        dayStart: 9,
        dayEnd: 18,
    }

    let hour = day.dayStart

    


    $("#currentDay").html(day.currentDay)

    

    function renderTimeblock() {
        for (i = day.dayStart; i < day.dayEnd; i++) {
            let timeblock = `
            <div class="row p-2">
                <div id="hour-col" class="col-1">
                    <span>${moment(hour, ["HH"]).format("h A")}</span>
                </div>
                <div class="col">
                    <input id="eventInput" class="form-control form-control-lg" type="text" placeholder="Add an Event">
                </div>
                <div class="col-1">
                    <button type="button" class="btn btn-outline-primary btn-lg">Save</button>
                </div>
            </div>
        `
            $(".container").append(timeblock)
            hour++
        }
    }
    renderTimeblock()



    //console.log(moment("17", ["HH"]).format("h A"))

    //console.log(timeblock.dayStart)


// End of script   
})



    // var timeblock = {
    //     blockHTML: `
    //         <div class="row p-2">
    //             <div id="hour-col" class="col-1">
    //                 <span>${moment(hour, ["HH"]).format("h A")}</span>
    //             </div>
    //             <div class="col">
    //                 <input id="eventInput" class="form-control form-control-lg" type="text" placeholder="Add an Event">
    //             </div>
    //             <div class="col-1">
    //                 <button type="button" class="btn btn-outline-primary btn-lg">Save</button>
    //             </div>
    //         </div>
    //     `,
    //      render() {
    //          $(".container").append(this.blockHTML) 
    //      }      
    // }   