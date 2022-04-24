function update_hrefs() {
    if ($("#start")[0]) {
        $("#start").attr("href", "/quiz/" + quiz_id + $("#start").attr("href"))
    }
    $("#previous").attr("href", "/quiz/" + quiz_id + $("#previous").attr("href"))
    $("#next").attr("href", "/quiz/" + quiz_id + $("#next").attr("href"))
    $(".page-card").click(function(e){
        window.location.replace("/quiz/" + quiz_id + this.dataset.link)
    })
}

$(document).ready(function(){
    update_hrefs()
    $("#back").click(function(e){
        window.location.replace("/quiz/" + quiz_id)
    })
})
