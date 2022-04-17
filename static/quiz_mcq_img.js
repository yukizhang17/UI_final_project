function initialize_choices(choices) {
    $("#mcq_img_choices").empty()

    let space = $("<div class='col-md-2'></div>")
    $("#mcq_img_choices").append(space)

    $.each(Object.keys(choices), function(index, choice_idx){
        let div = $("<div class='col-md-4 col-sm-6 image_button'></div>")
        div.prop({
            id: "choice" + choice_idx
        })
        let choice = choices[choice_idx]

        let choice_img = $("<img>")
        choice_img.attr('src', choice)
        choice_img.width('50%')
        choice_img.height("auto")
        let button = $("<input type='radio' name='choice' class='image_button'></div>")
        button.prop({
            id: choice_idx,
            value: choice_idx
        })        
        div.append(choice_img)
        div.append($("<br><br>"))
        div.append(button)
        $("#mcq_img_choices").append(div)
    })
}

$(document).ready(function(){
    initialize_choices(item["choices"])
})