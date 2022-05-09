function update_hrefs() {
    if ($("#start")[0]) {
        $("#start").attr("href", "/quiz/" + quiz_id + $("#start").attr("href"))
    }
    $("#previous").attr("href", "/quiz/" + quiz_id + $("#previous").attr("href"))
    $("#next").attr("href", "/quiz/" + quiz_id + $("#next").attr("href"))
    $(".page-card").click(function(e){
        window.location.replace("/quiz/" + quiz_id + this.dataset.link)
    })
    let icons = document.getElementsByClassName('links__link')
    $.each(icons, function(index, icon){
        // console.log(icon.getAttribute("href"))
        icon.setAttribute("href", "/quiz/" + quiz_id + icon.getAttribute("href"))
    })
}

function back() {
    $.ajax({
        type: "POST",
        url: "/quiz/back/" + quiz_id,                
        dataType : "json",
        contentType: "application/json; charset=utf-8",
        data : JSON.stringify({ "id": quiz_id }),
        success: function(result){
            window.location.replace("/quiz/" + quiz_id)
        },
        error: function(request, status, error){
            console.log("Error");
            console.log(request)
            console.log(status)
            console.log(error)
        }
    });
}

$(document).ready(function(){
    update_hrefs()
    $("#back").click(function(e){
        back()
    })
})
