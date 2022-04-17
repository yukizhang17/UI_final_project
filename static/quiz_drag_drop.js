var init_choices = []
var user_choice = []

function initialize_choices(choices) {
    $.each(Object.keys(choices), function(index, choice_idx){
        init_choices.push(choice_idx)
    })
    console.log(init_choices)
}

function make_choices(choices) {
    $("#drag_item").empty()
    $.each(init_choices, function(index, choice_idx){
        let div = $("<div>")
        div.attr('data-name', choice_idx)
        div.addClass('drag_items')
        let choice = choices[choice_idx]
        div.text(choice)
        div.draggable({
            revert:"invalid"
        })
        $("#drag_item").append(div)
    })

    $('.ui-draggable').each(function(){
        $(this).hover(function(){
            $(this).css('background-color','lightyellow')
            $(this).css('cursor','move')
        }, function(){
            $(this).css('background-color', 'white')
            $(this).css('cursor','pointer')
        })
    })
}

function init_user_answer(choices) {
    $("#drop_box").empty()
    $.each(user_choice, function(index, choice_idx){
        let div = $("<div>")
        div.addClass('dropped_items')
        let choice = choices[choice_idx]
        div.text(choice)
        $("#drop_box").append(div)
    })
}

function submit(choices) {
    if (user_choice.length === 0) {
        return false
    }

    let user_answer = {}
    $.each(user_choice, function(index, choice_idx){
        user_answer[(index+1).toString()] = choice_idx
    })

    $.ajax({
        type: "POST",
        url: "/check",                
        dataType : "json",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(user_answer),
        success: function(result){
            let correct = result["correct"]
            let answer = result["answer"]
            let user_answer = result["user_answer"]
            // User answer should not be modifiable at this point. 
            lockRadioButtons()
            // Disable hover effect to indicate that it's not clickable anymore.
            
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
    initialize_choices(item["choices"])

    make_choices(item["choices"])
    init_user_answer(item["choices"])

    $("#drop_box").droppable({
        drop: function(event, ui) {
            let drop_name = $(ui.draggable).attr('data-name')
            init_choices = $.grep(init_choices, function(value) {
                return value != drop_name;
            })

            // update list1 array
            if (jQuery.inArray(drop_name, user_choice) === -1) {
                user_choice.push(drop_name)
            }

            // update the interface to display the new lists
            make_choices(item["choices"])
            init_user_answer(item["choices"])

        }
    })

    $("#revert").click(function(e) {
        init_choices = []
        user_choice = []
        initialize_choices(item["choices"])
        make_choices(item["choices"])
        init_user_answer(item["choices"])
    })

    $("#submit").click(function(e){
        e.preventDefault();
        
        let result = submit(item["choices"]);
        if (result) {
            // onSubmit() function defined in quiz_template.js 
            // Removes submit button and adds next set of action buttons.
            onSubmit();
        }
    })
})