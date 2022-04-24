from flask import Flask
import datetime
from flask import render_template
from flask import Response, request, jsonify
# Import data from data folder.
from data.tutorial_data import tutorial_data
from data.quiz_data import quiz_data
app = Flask(__name__)

# ROUTES

# Stores quiz result (correct or incorrect) for each quiz id.
# Updated in check_answer() function. Can be used later for calculating quiz score.
#Takes the data from the tutorial_data.py and from quiz_data.py
quiz_result = {}
quiz_user_answer = {}

@app.route('/')
def home():
  return render_template('home.html')

@app.route('/learn')
def learn_section_page():
  return render_template('learn/sections.html', item=tutorial_data)

@app.route('/learn/section/<id>')
def learn_section(id='1'):
  print("Section Page Served. ID:", id, "Timestamp:", datetime.datetime.now().isoformat())
  return render_template('learn/section_home.html', item=tutorial_data[id])

@app.route('/learn/section/<section_id>/<id>')
def learn(section_id='1', id='1'):
  # Add more types of page if needed.
  item = tutorial_data[section_id]['pages'][id]
  print("Tutorial Page Served. ID:", id, "Timestamp:", datetime.datetime.now().isoformat())
  if item['type'] == 'content-two-column':
    return render_template('/learn/tutorial_page.html', item=item)
  elif item['type'] == 'content-one-column':
    return render_template('/learn/tutorial_page_one_column.html', item=item)
  elif item['type'] == 'summary':
    return render_template('/learn/section_summary.html', item=item)
  elif item['type'] == 'end':
    return render_template('/learn/tutorial_end.html', item=item)
  return render_template('/learn/tutorial_page.html')

@app.route('/quiz/<id>')
def quiz(id='1'):
  # Add more types of page if needed.
  if id == 'start':
    # Reset previously stored quiz data.
    global quiz_result 
    quiz_result = {}
    global quiz_user_answer
    quiz_user_answer = {}
    return render_template('quiz/quiz_start.html', quiz_num=len(quiz_data))
  elif quiz_data[id]['type'] == 'mcq':
    return render_template('quiz/quiz_mcq.html', item=quiz_data[id])
  elif quiz_data[id]['type'] == 'image_mcq':
    return render_template('quiz/quiz_mcq_img.html', item=quiz_data[id])
  elif quiz_data[id]['type'] == 'mcq_with_side_image':
    return render_template('quiz/quiz_mcq_with_side_image.html', item=quiz_data[id])
  elif quiz_data[id]['type'] == 'match':
    return render_template('quiz/quiz_match.html', item=quiz_data[id])
  elif quiz_data[id]['type'] == 'drag':
    return render_template('quiz/quiz_drag_drop.html', item=quiz_data[id])

@app.route('/quiz/<quiz_id>/learn/section/<id>')
def quiz_learn_section(quiz_id='1', id='1'):
  return render_template('learn/section_home.html', item=tutorial_data[id], quiz_id=quiz_id)

@app.route('/quiz/<quiz_id>/learn/section/<section_id>/<id>')
def quiz_learn(quiz_id='1', section_id='1', id='1'):
  # Add more types of page if needed.
  item = tutorial_data[section_id]['pages'][id]
  if item['type'] == 'content-two-column':
    return render_template('learn/tutorial_page.html', item=item, quiz_id=quiz_id)
  elif item['type'] == 'content-one-column':
    return render_template('learn/tutorial_page_one_column.html', item=item, quiz_id=quiz_id)
  elif item['type'] == 'summary':
    return render_template('learn/section_summary.html', item=item, quiz_id=quiz_id)
  elif item['type'] == 'end':
    return render_template('quiz/learn/tutorial_end.html', item=item, quiz_id=quiz_id)
  
  return quiz(quiz_id)

# Quiz complete page with score
@app.route('/finish')
def finish():
  total_quiz_num = 0 # Total number of questions shown
  total_correct_num = 0 # Total number of correct questions
  for id in quiz_result.keys():
    if quiz_result[id]:
      total_correct_num += 1
    total_quiz_num += 1
  
  print(total_quiz_num, total_correct_num)
  
  return render_template('quiz/quiz_end.html', total_quiz_num=str(total_quiz_num), total_correct_num=str(total_correct_num))

# ajax calls
# Check answer of the quiz and save the score for each question.
@app.route('/check', methods=['POST'])
def check_answer():
  json_data = request.get_json()   
  quiz_id = json_data["id"]
  quiz_type = quiz_data[quiz_id]["type"]
  user_answer = json_data["user_answer"]

  if (quiz_type == "mcq" or quiz_type == "mcq_with_side_image" or quiz_type == "image_mcq"):
    answer = quiz_data[quiz_id]["answer"]
    isCorrect = (user_answer == answer)
    isCorrectAll = isCorrect
  elif quiz_type == "match":
    answer = quiz_data[quiz_id]["answer"]
    isCorrect = {}
    for k in answer.keys():
      if answer[k] != user_answer[k]:
        isCorrect[k] = False
      else:
        isCorrect[k] = True
    isCorrectAll = all(c for c in isCorrect.values())
  
  elif quiz_type == "drag":
    answer = quiz_data[quiz_id]["answer"]
    isCorrect = {}
    for k in user_answer.keys():
      if k not in answer:
        isCorrect[k] = False
        continue
      if answer[k] != user_answer[k]:
        isCorrect[k] = False
      else:
        isCorrect[k] = True
    for k in answer.keys():
      if k not in user_answer.keys():
        isCorrect[k] = False
    isCorrectAll = all(c for c in isCorrect.values())
  # Add question types for different types of checking the answer.
  # Always have the fields [isCorrect], [answer], [user_answer] for response.
  # Compute isCorrectAll to record if the user got whole part of that question right.

  # Store the result for each question.
  quiz_result[quiz_id] = isCorrectAll
  quiz_user_answer[quiz_id] = user_answer
  print(isCorrect)
  return jsonify(correct = isCorrect, answer = answer, user_answer = user_answer)


if __name__ == '__main__':
  app.run(debug = True)
