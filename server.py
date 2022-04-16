from flask import Flask
from flask import render_template
from flask import Response, request, jsonify
# Import data from data folder.
from data.tutorial_data import tutorial_data
from data.quiz_data import quiz_data
app = Flask(__name__)

# ROUTES

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
      return render_template('quiz_mcq_with_image.html', item=quiz_data[id])

@app.route('/finish')
def finish():
  # Quiz complete page with score
  return render_template('complete.html')

if __name__ == '__main__':
   app.run(debug = True)




