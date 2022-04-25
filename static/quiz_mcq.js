function initialize_choices(choices) {
    $("#mcq_choices").empty()
    $.each(Object.keys(choices), function(index, choice_idx){
        let div = $("<div class='form-check mcq_choice my-4'></div>")
        div.prop({
            id: "choice" + choice_idx
        })
        let choice = choices[choice_idx]
        let button = $("<input type='radio' class='form-check-input custom-radio-button-small' name='choice'></div>")
        button.prop({
            id: choice_idx,
            value: choice_idx
        })        
        let label = $("<label class='form-check-label quiz-radio-label' for=" + choice_idx + " class='mcq_choice_label'></label><br>")
        label.prop({
            id: choice_idx + "-label"
        })
        label.html(choice)

        div.append(button).append(label)

        $("#mcq_choices").append(div)
    })
}

function initialize_choices_with_img(choices) {
    $("#mcq_img_choices").empty()

    // let space = $("<div class='col-md-2'></div>")
    // $("#mcq_img_choices").append(space)

    $.each(Object.keys(choices), function(index, choice_idx){
        let col = $("<div class='col-md-5 col-sm-6 image_button text-center'></div>")
        let div = $("<div class='image_choice_container'></div>")
        div.prop({
            id: "choice" + choice_idx
        })
        let choice = choices[choice_idx]

        let choice_img = $("<img class='image_choice'>")
        choice_img.attr('src', choice)
        choice_img.attr('class', 'quiz-image')
        choice_img.attr('data-radio-id', choice_idx)
        // choice_img.width('50%')
        // choice_img.height("auto")
        let button = $("<input type='radio' name='choice' id='" + choice_idx + "' class='center_item custom-radio-button'></div>")
        button.prop({
            id: choice_idx,
            value: choice_idx
        })
        let label = $("<label>")
        label.append(choice_img)
        label.append("<br><br>")
        label.append(button)
        label.prop({
            id:choice_idx + "_label"
        })        
        div.append(label)
        col.append(div)
        $("#mcq_img_choices").append(col)
    })
}

function radioButtonSelector() {
    let radio_id = $(this).data('radio-id')
    if(!$('#'+radio_id).prop('disabled')) $('#'+radio_id).prop('checked', true)
}

function showFeedback(user_answer, answer, correct) {
    if (correct) {
        let choice_id = "#choice" + user_answer
        $(choice_id).addClass("correct")
    } else {
        let choice_id = "#choice" + user_answer
        $(choice_id).addClass("incorrect")
        let answer_id = "#choice" + answer
        $(answer_id).addClass("correct")
    }
}

function lockRadioButtons() {
    $.each(Object.keys(item["choices"]), function(index, choice_idx){
        let button = $("#"+ choice_idx)
        button.attr('disabled', true)
        let label = $("#"+ choice_idx + "-label")
        label.attr('disabled', true)
    }) 
}

function submit() {
    let user_answer = null
    $.each(Object.keys(item["choices"]), function(index, choice_idx){
        let button = $("#"+ choice_idx)
        if (button.prop("checked")) {
            user_answer = button.prop("id")
            console.log(user_answer)
        }
    }) 
    if (!user_answer) {
        return false
    }

    $.ajax({
        type: "POST",
        url: "/check",                
        dataType : "json",
        contentType: "application/json; charset=utf-8",
        data : JSON.stringify({ "id": item['id'], "user_answer": user_answer }),
        success: function(result){
            let correct = result["correct"]
            let answer = result["answer"]
            user_answer = result["user_answer"]
            
            // User answer should not be modifiable at this point.
            lockRadioButtons()
            // Show feedback for correct / incorrect answer.
            showFeedback(user_answer, answer, correct)
        },
        error: function(request, status, error){
            console.log("Error");
            console.log(request)
            console.log(status)
            console.log(error)
        }
    });
    return true;
}

$(document).ready(function(){
    let type = item["type"]
    console.log(type)
    if (type == "mcq" || type == "mcq_with_side_image") {
        initialize_choices(item["choices"])
    }
    else if (type == "image_mcq") {
        console.log("here")
        initialize_choices_with_img(item["choices"])
    }
    
    $("#submit").click(function(e){
        e.preventDefault();
        let result = submit();
        if (result) {
            // onSubmit() function defined in quiz_template.js 
            // Removes submit button and adds next set of action buttons.
            onSubmit();
        } else {
            onSubmitFail();
        }
    })
})