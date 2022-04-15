function initialize_choices(choices) {
    $("#mcq_choices").empty()
    $.each(Object.keys(choices), function(index, choice_idx){
        let div = $("<div class='mcq_choice'></div>")
        let choice = choices[choice_idx]
        let button = $("<input type='radio' name='choice'></div>")
        button.prop({
            id: choice_idx,
            value: choice_idx
        })        
        let label = $("<label for='${choice_idx}' class='mcq_choice_label'></label><br>'")
        label.html(choice)

        div.append(button).append(label)
        $("#mcq_choices").append(div)
    })
}

$(document).ready(function(){
    initialize_choices(item["choices"])
})