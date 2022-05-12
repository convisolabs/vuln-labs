from flask import Flask, render_template, request, redirect, url_for, abort, \
  send_from_directory
from werkzeug.utils import secure_filename
import os
import imghdr

app = Flask(__name__, static_url_path = '/static', static_folder = 'static')
app.config['DEBUG'] = True

# Definindo tamanho máximo do arquivo para 1MB
app.config['MAX_CONTENT_LENGTH'] = 1024 * 1024
# Defininfo arquivos permitidos
app.config['UPLOAD_EXTENSIONS'] = ['.jpg', '.png']
# definindo onde salvar imagens
app.config['UPLOAD_PATH'] = 'uploads'

# valida números mágicos
def validate_image(stream):
    header = stream.read(512)
    stream.seek(0)
    # None passado como primeiro parâmetro para checar dados salvos em memoria
    format = imghdr.what(None, header)
    if not format:
        return None
    return '.' + (format if format != 'jpeg' else 'jpg')

@app.route('/')
def index():
    files = [f for f in os.listdir(app.config['UPLOAD_PATH']) if not f.startswith('.')]
    return render_template('index.html', files=files)

@app.route('/', methods=['POST'])
def upload_file():
    uploaded_file = request.files['file']
    # realiza escape de caracteres especiais, previne LFI
    filename = secure_filename(uploaded_file.filename)
    if uploaded_file.filename != '':
      file_ext = os.path.splitext(filename)[1]
      # checa extensão do arquivo
      if file_ext not in app.config['UPLOAD_EXTENSIONS'] or \
        file_ext != validate_image(uploaded_file.stream):
        abort(400)
      uploaded_file.save(os.path.join(app.config['UPLOAD_PATH'], filename))
    return redirect(url_for('index'))

@app.route('/uploads/<filename>')
def upload(filename):
    return send_from_directory(app.config['UPLOAD_PATH'], filename)

@app.errorhandler(404)
def page_not_found(e):
    return render_template("404.html")

if __name__ == "__main__":
  app.run(host = '0.0.0.0')