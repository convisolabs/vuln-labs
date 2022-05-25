from flask import Flask, render_template, request, redirect, url_for, abort, \
  send_from_directory
import os

app = Flask(__name__, static_url_path = '/static', static_folder = 'static')
# definindo onde salvar imagens
app.config['UPLOAD_PATH'] = 'uploads'
app.config['DEBUG'] = True

@app.route('/')
def index():
    files = [f for f in os.listdir(app.config['UPLOAD_PATH']) if not f.startswith('.')]
    return render_template('index.html', files=files)

@app.route('/', methods=['POST'])
def upload_file():
    uploaded_file = request.files['file']
    if uploaded_file.filename != '':
        uploaded_file.save(uploaded_file.filename)
    return redirect(url_for('index'))

@app.errorhandler(404)
def page_not_found(e):
    return render_template("404.html")

@app.route('/uploads/<filename>')
def upload(filename):
    return send_from_directory(app.config['UPLOAD_PATH'], filename)

if __name__ == "__main__":
  app.run(host = '0.0.0.0')
