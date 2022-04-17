function onSubmit() {
    // Add Previous / Next / Learn buttons once submit is clicked.
    // This function should be called in submit() function for individual question types
    showActionButtons()
    setClickActions()
}

function setClickActions() {
    // TODO: Set click actions for action buttons (prev / next / learn)
}

function showActionButtons() {
    $("#quizactions").empty()
    if (item['previous'] != 'none') {
        let prevbutton = $("<div class='custom-btn btn-type-2 mx-2' id='previous'></div>").html("Previous")
        $("#quizactions").append(prevbutton)
    }

    let nextbutton = $("<div class='custom-btn btn-type-2 mx-2' id='next'></div>").html("Next")
    $("#quizactions").append(nextbutton)

    let learnbutton = $("<div class='custom-btn btn-type-2 mx-2' id='learn'></div>").html("Learn")
    $("#quizactions").append(learnbutton)
}

function showSubmitButton() {
    $("#quizactions").empty()
    
    let submitbutton = $("<div class='custom-btn btn-type-2 mx-2' id='submit'></div>")
    submitbutton.html("Submit")
    $("#quizactions").append(submitbutton)
}

$(document).ready(function(){
    showSubmitButton()
})