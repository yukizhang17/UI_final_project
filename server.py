from flask import Flask
from flask import render_template
from flask import Response, request, jsonify
# Import data from data folder.
from data.tutorial_data import tutorial_data
from data.quiz_data import quiz_data
app = Flask(__name__)

# ROUTES

# Stores quiz result (correct or incorrect) for each quiz id.
# Updated in check_answer() function. Can be used later for calculating quiz score.
quiz_result = {}

@app.route('/')
def home():
  return render_template('home.html')

@app.route('/learn/<id>')
def learn(id='1'):
  # Add more types of page if needed.
    if tutorial_data[id]['type'] == 'content':
      return render_template('tutorial_page.html', item=tutorial_data[id])
    elif tutorial_data[id]['type'] == 'summary':
      return render_template('tutorial_summary.html', item=tutorial_data[id])

@app.route('/quiz/<id>')
def quiz(id='1'):
  # Add more types of page if needed.
    if quiz_data[id]['type'] == 'mcq':
      return render_template('quiz_mcq.html', item=quiz_data[id])
    elif quiz_data[id]['type'] == 'mcq_with_side_image':
      return render_template('quiz_mcq_with_side_image.html', item=quiz_data[id])
    elif quiz_data[id]['type'] == 'match':
      return render_template('quiz_match.html', item=quiz_data[id])

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
  
  return render_template('complete.html', total_quiz_num, total_correct_num)

# ajax calls
# Check answer of the quiz and save the score for each question.
@app.route('/check', methods=['GET', 'POST'])
def check_answer():
    json_data = request.get_json()   
    quiz_id = json_data["id"]
    quiz_type = quiz_data[quiz_id]["type"]
    user_answer = json_data["user_answer"]
    
    if (quiz_type == "mcq" or quiz_type == "mcq_with_side_image"):
      answer = quiz_data[quiz_id]["answer"]
      isCorrect = (user_answer == answer)
      
    # Add question types for different types of checking the answer.
    # Always have the fields [isCorrect], [answer], [user_answer]

    # Store the result for each question.
    quiz_result[quiz_id] = isCorrect
    return jsonify(correct = isCorrect, answer = answer, user_answer = user_answer)


if __name__ == '__main__':
   app.run(debug = True)




