// Data needed for keeping track of matches
let line_started = false;
let start_x = 0;
let start_y = 0;
let start_col = "";
let start_idx = "-1";
let canvas_list = [];
let canvas_idx = 0;
let curr_canvas = null;
let canvas_left = 0;
let canvas_top = 0;
let canvas_used = [];
let user_answer_left = {}
let user_answer_right = {}
let canvas_dict_left = {}
let canvas_dict_right = {}
// Once the user clicks on submit, the answer will no longer be editable.
let submitted = false;

// TODO: Clean up code
// TODO: Handle cases in which user matches the selected choice(A) with another choice(B) that already
// has a match (with C). Replace the match with most recent one (A-B will be matched instead of B-C).
// Current behavior keeps the (B-C) match.

function initialize_data(choices_left, choices_right) {
    $.each(Object.keys(choices_left), function(index, choice_idx){
        user_answer_left[choice_idx] = null
        canvas_dict_left[choice_idx] = null
    })
    $.each(Object.keys(choices_right), function(index, choice_idx){
        user_answer_right[choice_idx] = null
        canvas_dict_right[choice_idx] = null
    })
}

function initialize_choices(choices_left, choices_right) {
    $("#choices_left").empty()
    $("#choices_right").empty()
    $.each(Object.keys(choices_left), function(index, choice_idx){
        let div = $("<div class='match_choice'></div>")
        let choice_label = $("<div class='match_choice_label'></div>")
        choice_label.prop({
            id: "choice_left_" + choice_idx
        })
        let choice = choices_left[choice_idx]
        choice_label.html(choice)
        let dot = $("<div class='match_choice_dot match_choice_dot_hover'></div>")
        dot.prop("id", "choice_left_dot" + choice_idx)
        dot.attr("data-col", "left")
        dot.attr("data-idx", choice_idx)
        div.append(choice_label)
        div.append(dot)
        $("#choices_left").append(div)
    })

    $.each(Object.keys(choices_right), function(index, choice_idx){
        let div = $("<div class='match_choice'></div>")
        let choice_label = $("<div class='match_choice_label'></div>")
        choice_label.prop({
            id: "choice_right_" + choice_idx
        })
        let choice = choices_right[choice_idx]
        choice_label.html(choice)        
        let dot = $("<div class='match_choice_dot match_choice_dot_hover'></div>")
        dot.prop("id", "choice_right_dot" + choice_idx)
        dot.attr("data-col", "right")
        dot.attr("data-idx", choice_idx)
        div.append(dot)
        div.append(choice_label)
        $("#choices_right").append(div)
    })
}

function showFeedback(user_answer_left, answer, correct) {
    console.log(correct)
    $.each(Object.keys(correct), function(index, choice_idx){
        choice_idx_right = user_answer_left[choice_idx]
        let feedback = "correct"
        if (!correct[choice_idx]) {
            feedback = "incorrect"
        }
        $("#choice_left_" + choice_idx).addClass(feedback)
        $("#choice_left_dot" + choice_idx).addClass(feedback)
        $("#choice_right_" + choice_idx_right).addClass(feedback)
        $("#choice_right_dot" + choice_idx_right).addClass(feedback)
    })
}

function setUserAnswers() {
    $.each(Object.keys(user_answer_left), function(index, choice_idx){
        if (user_answer_left[choice_idx]) {
            let right_idx = user_answer_left[choice_idx]
            let c = canvas_list[canvas_idx]
            canvas_dict_left[choice_idx] = c
            canvas_dict_right[right_idx] = c
            canvas_idx += 1
            let left_dot = $("#choice_left_dot" + choice_idx)
            let right_dot = $("#choice_right_dot" + right_idx)

            let rect = left_dot[0].getBoundingClientRect();
            start_y = ((rect.top + rect.bottom) / 2 - canvas_top)
            start_x = ((rect.left + rect.right) / 2 - canvas_left)

            rect = right_dot[0].getBoundingClientRect();
            let right_end_y = ((rect.top + rect.bottom) / 2 - canvas_top)
            let right_end_x = ((rect.left + rect.right) / 2 - canvas_left)

            let ctx = c.getContext("2d");
            ctx.clearRect(0, 0, c.width, c.height);
            drawLine(ctx, right_end_x, right_end_y)
        }
    })
}

function setCanvas(choices_left, choices_right) {
    let top = 9999999
    let left = 99999999
    let bottom = 0
    let right = 0
    canvas_used = []
    canvas_list = []
    canvas_idx = 0
    $.each(Object.keys(choices_left), function(index, choice_idx){
        let dot = $("#choice_left_" + choice_idx)
        let rect = dot[0].getBoundingClientRect();
        if (rect.top < top) {
            top = rect.top
        }
        if (rect.bottom > bottom) {
            bottom = rect.bottom
        }
        if (rect.left < left) {
            left = rect.left
        }
        if (rect.right > right) {
            right = rect.right
        }
    }) 
    $.each(Object.keys(choices_right), function(index, choice_idx){
        let dot = $("#choice_right_" + choice_idx)
        let rect = dot[0].getBoundingClientRect();
        if (rect.top < top) {
            top = rect.top
        }
        if (rect.bottom > bottom) {
            bottom = rect.bottom
        }
        if (rect.left < left) {
            left = rect.left
        }
        if (rect.right > right) {
            right = rect.right
        }
    }) 

    let dpi = window.devicePixelRatio
    console.log('dpi=', dpi)

    let canvas_num = Math.min(Object.keys(choices_left).length, Object.keys(choices_right).length)
    console.log(canvas_num)
    for (let i = 0; i < canvas_num; i++) {
        let canvas = document.createElement('canvas');
        canvas.setAttribute("id", 'canvas' + i.toString());
        document.body.appendChild(canvas)
        canvas = document.getElementById('canvas' + i.toString());
        
        canvas.width = dpi * (right - left)
        canvas.height = dpi * (bottom - top)        
        canvas.style.left=left.toString() + "px";
        canvas.style.right=right.toString() + "px";
        canvas.style.top = top.toString() + "px";
        canvas.style.bottom = bottom.toString() + "px";
        canvas.style.width = (right - left).toString() + "px";
        canvas.style.height = (bottom - top).toString() + "px";
        canvas.style.zIndex = -10;
        canvas.style.position = 'fixed';

        canvas_left = left;
        canvas_top = top;
        
        canvas.getContext('2d').scale(dpi, dpi)
        canvas.getContext('2d').translate(0.5, 0.5)
        canvas_list.push(canvas)
        canvas_used.push(true)
        console.log('create canvas')
    }
}

function disableHover() {
    $.each(Object.keys(item["choices_left"]), function(index, choice_idx){
        let dot = $("#choice_left_dot" + choice_idx)
        dot.removeClass('match_choice_dot_hover')
    }) 
    $.each(Object.keys(item["choices_right"]), function(index, choice_idx){
        let dot = $("#choice_right_dot" + choice_idx)
        dot.removeClass('match_choice_dot_hover')
    }) 
}

function submit() {
    // Invalid answers
    if (Object.keys(user_answer_left).length != Object.keys(item["choices_left"]).length) {
        return false;
    }
    let complete = true
    // User answer not complete
    $.each(Object.keys(user_answer_left), function(index, choice_idx){
        if(!user_answer_left[choice_idx]){
            console.log(choice_idx + "null, return false");
            complete = false;
            return false
        }
    })
    if (!complete) {
        return false
    }

    $.ajax({
        type: "POST",
        url: "/check",                
        dataType : "json",
        contentType: "application/json; charset=utf-8",
        data : JSON.stringify({ "id": item['id'], "user_answer": user_answer_left }),
        success: function(result){
            let correct = result["correct"]
            let answer = result["answer"]
            let user_answer = result["user_answer"]
            submitted = true;
            // User answer should not be modifiable at this point. 
            // Disable hover effect to indicate that it's not clickable anymore.
            disableHover()
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

function drawLine(ctx, x, y) {
    x = Math.max(x, 1.0)
    y = Math.max(y, 1.0)
    ctx.beginPath();
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    ctx.moveTo(start_x, start_y);
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.closePath();
}

function set_curr_canvas(canvas_dict, opp_canvas_dict, prev_user_answer, prev_opp_user_answer, idx) {
    console.log(canvas_used)
    if (canvas_dict[idx]) {
        // There was existing answer for currently selected choice.
        // Reset all previously entered answers for the selected choice.
        curr_canvas = canvas_dict[idx]
        opp_canvas_dict[prev_user_answer[idx]] = null
        prev_opp_user_answer[prev_user_answer[idx]] = null
    } else if (canvas_idx > 0 && !canvas_used[canvas_idx - 1]) {
        curr_canvas = canvas_list[canvas_idx - 1]
        canvas_used[canvas_idx - 1] = true;
    } else {
        curr_canvas = canvas_list[canvas_idx];
        canvas_idx += 1;
    }
    // console.log('current canvas set. canvas_id=', curr_canvas.id, canvas_idx)
}

function set_click_action(dot) {
    dot.mousedown(function(e){
        e.preventDefault();
        if (submitted) {
            return;
        }
        // console.log("mouse down", dot[0].id)
        // console.log("line_started on mousedown=", line_started)
        if (line_started) {
            // Occassionally error seems to be happening in a case in which mouseup is not recognized
            // due to some error with dragging. Adding this check as an workaround.
            // Set to false and exit.
            line_started = false
            return;
        }
        line_started = true;
        start_col = this.dataset.col
        // Set curr_canvas if necessary
        if (!curr_canvas) {
            start_idx = this.dataset.idx
            if (start_col == "left") {
                set_curr_canvas(canvas_dict_left, canvas_dict_right, user_answer_left, user_answer_right, start_idx)
            } else {
                set_curr_canvas(canvas_dict_right, canvas_dict_left, user_answer_right, user_answer_left, start_idx)
            }
        }
        let rect = this.getBoundingClientRect();
        start_y = ((rect.top + rect.bottom) / 2 - canvas_top)
        start_x = ((rect.left + rect.right) / 2 - canvas_left)
    })

    dot.mouseup(function(e){
        e.preventDefault();
        if (submitted) {
            return;
        }
        // console.log("dot: mouse up")
        let end_col = this.dataset.col
        let end_idx = this.dataset.idx
        let prev_answer = null
        if (end_col == "left") {
            prev_answer = user_answer_left
        } else {
            prev_answer = user_answer_right
        }
        // console.log('line_started:', line_started, " start_col=", start_col, ' prev_answer[end_idx]=', prev_answer[end_idx])
        if (line_started && (start_col != end_col) && !prev_answer[end_idx]) {
            // console.log("dot: draw line")
            line_started = false;
            let rect = this.getBoundingClientRect();
            let end_y = ((rect.top + rect.bottom) / 2 - canvas_top)
            let end_x = ((rect.left + rect.right) / 2 - canvas_left)
            let ctx = curr_canvas.getContext("2d");
            ctx.clearRect(0, 0, curr_canvas.width, curr_canvas.height);
            drawLine(ctx, end_x, end_y)
            // Save user's answer
            if (start_col == "left") {
                user_answer_left[start_idx] = end_idx
                user_answer_right[end_idx] = start_idx
                canvas_dict_left[start_idx] = curr_canvas
                canvas_dict_right[end_idx] = curr_canvas
            } else {
                user_answer_right[start_idx] = end_idx
                user_answer_left[end_idx] = start_idx
                canvas_dict_right[start_idx] = curr_canvas
                canvas_dict_left[end_idx] = curr_canvas
            }
            // Initialize
            start_idx = "-1"
            start_col = ""
            start_x = 0
            start_y = 0
            curr_canvas = null
        }
    })
}

function initialize_click_actions(choices_left, choices_right) {
    $.each(Object.keys(choices_left), function(index, choice_idx){
        let dot = $("#choice_left_dot" + choice_idx)
        set_click_action(dot)
    }) 
    $.each(Object.keys(choices_right), function(index, choice_idx){
        let dot = $("#choice_right_dot" + choice_idx)
        set_click_action(dot)
    }) 
}

// If window size changes, set the canvas size again.
$(window).on("resize", function(){
    setCanvas(item["choices_left"], item["choices_right"])
    setUserAnswers()
});

$(window).on("scroll", function(){
    setCanvas(item["choices_left"], item["choices_right"])
    setUserAnswers()
});

$(document).ready(function(){
    initialize_choices(item["choices_left"], item["choices_right"])
    initialize_click_actions(item["choices_left"], item["choices_right"])
    initialize_data(item["choices_left"], item["choices_right"])
    setCanvas(item["choices_left"], item["choices_right"])
    
    $("#submit").click(function(e){
        e.preventDefault();
        let result = submit();
        if (result) {
            // onSubmit() function defined in quiz_template.js 
            // Removes submit button and adds next set of action buttons.
            onSubmit();
        }
    })

    window.addEventListener('mousemove', function(e) {
        e.preventDefault();
        if (submitted) {
            return;
        }
        if (line_started) {
            x = e.pageX;
            y = e.pageY;
            let ctx = curr_canvas.getContext("2d");
            ctx.clearRect(0, 0, curr_canvas.width, curr_canvas.height);
            // console.log(this.scrollY)
            drawLine(ctx, x-canvas_left, y-canvas_top-this.scrollY)
        }
    });

    window.addEventListener('mouseup', function(e) {
        e.preventDefault();
        if (submitted) {
            return;
        }
        // No valid choice made this time.
        // TODO: Need to confirm that element.mouseup() will always be called before window.mouseup()
        console.log("window mouse up")
        if (curr_canvas) {
            console.log("delete line")
            let ctx = curr_canvas.getContext("2d");
            ctx.clearRect(0, 0, curr_canvas.width, curr_canvas.height);
            line_started = false;
            if (start_col == "left" && user_answer_left[start_idx]) {
                // No valid choice made this time, so restore previously entered choice.
                let prev_end_idx = user_answer_left[start_idx]
                user_answer_right[prev_end_idx] = start_idx
                canvas_dict_right[prev_end_idx] = canvas_dict_left[start_idx]
                let dot = $("#choice_right_dot" + prev_end_idx)
                let rect = dot[0].getBoundingClientRect()
                let end_y = ((rect.top + rect.bottom) / 2 - canvas_top)
                let end_x = ((rect.left + rect.right) / 2 - canvas_left)
                drawLine(ctx, end_x, end_y)
            } else if (start_col == "right" && user_answer_right[start_idx]) {
                // Restore data
                let prev_end_idx = user_answer_right[start_idx]
                user_answer_left[prev_end_idx] = start_idx
                canvas_dict_left[prev_end_idx] = canvas_dict_right[start_idx]
                // Redraw line
                let dot = $("#choice_left_dot" + prev_end_idx)
                let rect = dot[0].getBoundingClientRect()
                let end_y = ((rect.top + rect.bottom) / 2 - canvas_top)
                let end_x = ((rect.left + rect.right) / 2 - canvas_left)
                drawLine(ctx, end_x, end_y)
            } else {
                console.log("Reset canvas")
                canvas_used[canvas_idx - 1] = false;
            }
        } 
        console.log(user_answer_left)
        console.log(user_answer_right)
        // Initialize
        start_idx = "-1"
        start_col = ""
        start_x = 0
        start_y = 0
        curr_canvas = null
      });
});
