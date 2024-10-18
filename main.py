from flask import Flask, request, render_template, send_from_directory
import os

app = Flask(__name__)

# Diretório para downloads
DOWNLOAD_FOLDER = 'downloads'

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/download/<filename>')
def download_file(filename):
    return send_from_directory(DOWNLOAD_FOLDER, filename, as_attachment=True)

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return 'No file part', 400
    file = request.files['file']
    if file.filename == '':
        return 'No selected file', 400
    file.save(os.path.join(DOWNLOAD_FOLDER, file.filename))
    return 'File uploaded successfully', 200

if __name__ == '__main__':
    app.run(debug=True)
