# Quiz data in the format of 
# {page_num: { contents for quiz including question / answer / relevant tutorial page .. }}
quiz_data = {
    "1": {"type": "image_mcq"},
    "3": {
        "id": "3",
        "type": "mcq",
        "previous": "2",
        "next": "4",
        "learn": "10",
        "question": "Select the correct option:",
        "answer": "3",
        "choices":{
            "1": "The darkest shade of wine is the best.",
            "2": "The more expensive the wine, the better it is.",
            "3": "Color is a good indicator of the age of a wine."
        }
    },
    "7": {
        "id": "7",
        "type": "mcq",
        "previous": "6",
        "next": "none",
        "learn": "13",
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