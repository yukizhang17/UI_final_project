# Quiz data in the format of 
# {page_num: { contents for quiz including question / answer / relevant tutorial page .. }}
quiz_data = {
    "1": {
        "id": "1",
        "type": "image_mcq",
        "previous": "none",
        "next": "2",
        "learn": "1/1",
        "question": "Which of these is the correct way to hold a wine glass?",
        "answer": "1",
        "choices":{
            "1": "/static/img/quiz_img/quiz1_1.jpg",
            "2": "/static/img/quiz_img/quiz1_2.webp"
        }
    },
    "2": {
        "id": "2",
        "type": "drag",
        "previous": "1",
        "next": "3",
        "learn": "1/4",
        "question": "Please drag and drop to the left the correct sequence to sip wine.",
        "answer": {"1": "2", "2": "5", "3": "1"},
        "choices":{
            "1": "Sip the Wine",
            "2": "Hold the glass correctly from the stem",
            "3": "Down the whole glass",
            "4": "Drink from the bottle",
            "5": "Sniff"
        }
    },
    "3": {
        "id": "3",
        "type": "mcq",
        "previous": "2",
        "next": "4",
        "learn": "2/6",
        "question": "Select the correct option:",
        "answer": "3",
        "choices":{
            "1": "The darkest shade of wine is the best.",
            "2": "The more expensive the wine, the better it is.",
            "3": "Color is a good indicator of the age of a wine."
        }
    },
    "4": {
        "id": "4",
        "type": "mcq_with_side_image",
        "previous": "3",
        "next": "5",
        "learn": "2/1",
        "question": "What are the drops of wine falling down called?",
        "answer": "1",
        "choices":{
            "1": "Legs",
            "2": "Branches",
            "3": "Strands"
        },
        "image": "https://cdn.mos.cms.futurecdn.net/n3n8gJFNes6MQ3gHArXC6X.jpg"
    },
    "5": {
        "id": "5",
        "type": "image_mcq",
        "previous": "4",
        "next": "6",
        "learn": "2/6",
        "question": "Which one of these wines is younger?",
        "answer": "2",
        "choices":{
            "1": "/static/img/quiz_img/quiz5_1.png",
            "2": "/static/img/quiz_img/quiz5_2.png"
        }
    },
    "6": {
        "id": "6",
        "type": "match",
        "previous": "5", 
        "next": "7",
        "learn": "3",
        "question": "Match food and type of wine that goes well together.",
        "choices_left": {
            "1": "Meat",
            "2": "Pizza",
            "3": "Vegetarian"
        },
        "choices_right": {
            "1": "Cabernet Sauvignon (Red)",
            "2": "Sauvignon Blanc (White)",
            "3": "Zinfandel (Red)"
        },
        "answer": {"1": "1", "2": "3", "3": "2"}
    },
    "7": {
        "id": "7",
        "type": "mcq",
        "previous": "6",
        "next": "finish",
        "learn": "3/1",
        "question": "Which one of the following wine is the most popular red wine?",
        "answer": "1",
        "choices":{
            "1": "Cabernet Sauvignon",
            "2": "Pinot Noir",
            "3": "Sauvignon Blanc",
            "4": "Zinfandel"
        }
    },
}
