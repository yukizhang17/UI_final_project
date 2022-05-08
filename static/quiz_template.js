// TODO: Add a way to check progress (e.g. currently at 3rd question out of 7 ..)

function onSubmit() {
    $("#feedback-container").css("z-index", "-1")
    $("#submit_feedback").empty()
    // Add Previous / Next / Learn buttons once submit is clicked.
    // This function should be called in submit() function for individual question types
    showActionButtons()
    setClickActions()
}

function onSubmitFail() {
    // $("#submit_feedback").html("Invalid / Incomplete answer.")
    $("#feedback-container").css("z-index", "10")
    $(".toast").toast('show')
}

function setClickActions() {
    // TODO: Confirm "Learn" button works as expected.
    $("#previous").click(function(e){
        window.location.replace("/quiz/" + item["previous"])
    })
    $("#next").click(function(e){
        if (item["next"] == "finish") {
            window.location.replace("/finish")
        } else {
            window.location.replace("/quiz/" + item["next"])
        }
    })
    $("#learn").click(function(e){
        window.location.replace("/quiz/" + item["id"] + "/learn/section/" + item["learn"])
    })
}

function showActionButtons() {
    $("#quizactions").empty()
    if (item['previous'] != 'none') {
        let prevbutton = $("<div class='custom-btn btn-type-2 mx-2' id='previous'></div>").html("Previous")
        $("#quizactions").append(prevbutton)
    }

    let nextbutton = $("<div class='custom-btn btn-type-2 mx-2' id='next'></div>").html("Next")
    $("#quizactions").append(nextbutton)

    let learnbutton = $("<button class='custom-btn btn-type-2 mx-2 py-2' id='learn'></button>").html("Learn")
    $("#question").append(learnbutton)
}

function showSubmitButton() {
    $("#quizactions").empty()
    $("#submit_feedback").empty()
    
    let submitbutton = $("<div class='custom-btn btn-type-2 mx-2' id='submit'></div>")
    submitbutton.html("Submit")
    $("#quizactions").append(submitbutton)
}

$(document).ready(function(){
    showSubmitButton()
})
