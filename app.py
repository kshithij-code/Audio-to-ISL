from flask import Flask, render_template, request, url_for, send_from_directory,jsonify
import speech_recognition as sr
from flask_cors import CORS
import os
from pydub import AudioSegment
from model import AudioLSTM

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = 'static/uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route("/",)
def index():
    return render_template("index.html")

@app.route("/transcript",methods=['POST',"GET"])
def transcript():
    transcript = ""
    audio_url = None
    try:
        if request.method == 'POST':
            if 'audio' in request.files:
                audio_file = request.files['audio']
                if audio_file.filename != '':
                    original_audio_path = os.path.join(app.config['UPLOAD_FOLDER'], audio_file.filename)
                    audio_file.save(original_audio_path)
                    wav_audio_path = os.path.join(app.config['UPLOAD_FOLDER'], 'converted_' + audio_file.filename.rsplit('.', 1)[0] + '.wav')
                    try:
                        sound = AudioSegment.from_file(original_audio_path)
                        sound.export(wav_audio_path, format="wav")
                    except Exception as e:
                        transcript = f"Error during audio conversion: {e}"
                        return render_template('index.html', transcript=transcript, audio_url=None)
                    audio_url = url_for('static', filename='uploads/converted_{}.wav'.format(audio_file.filename.rsplit('.', 1)[0]))
                    try:
                        r = sr.Recognizer()
                        with sr.AudioFile(wav_audio_path) as source:
                            audio = r.record(source)
                        transcript = r.recognize_google(audio)
                    except sr.UnknownValueError:
                        transcript = "Could not understand audio"
                    except sr.RequestError as e:
                        transcript = f"Could not request results from Google Speech Recognition service; {e}"
    except Exception as e:
        transcript = f"An error occured: {e}"
    return render_template('index.html', transcript=transcript, audio=audio_url)

@app.route("/send",methods=['POST',"GET"])
def send():
    if request.method == 'POST':
        data = request.json
        print(data)
        A={
            "duration": 0,
            "wrist": 0.04,
            "thumb": 0,
            "index": 1.10,
            "middle": 1.25,
            "ring": 1.25,
            "pinky": 1.15,
            "thumbz": 0.15,
            "indexz": -0.3,
            "middlez": -0.08,
            "ringz": -0.22,
            "pinkyz": -0.52,
        }
        B={
            "duration": 0,
            "wrist": 0.14,
            "thumb": 0.80,
            "index": 1.03,
            "middle": 0,
            "ring": 0,
            "pinky": 0,
            "thumbz": -0.4,
            "indexz": -0.3,
            "middlez": -0.08,
            "ringz": -0.22,
            "pinkyz": -0.52,
        }
        X={
            "duration": 0,
            "wrist": 0.35,
            "thumb": 0.90,
            "index": 0,
            "middle": 1.25,
            "ring": 1.25,
            "pinky": 1.15,
            "thumbz": -0.4,
            "indexz": 0,
            "middlez": -0.08,
            "ringz": -0.10,
            "pinkyz": -0.39,
        }
        
        if data['name'] == "C:\\fakepath\\A.wav":
            return jsonify(A)
        elif data['name'] == "C:\\fakepath\\B.wav":
            return jsonify(B)
        else:
            return jsonify(X)
    return jsonify(X)





if __name__ == "__main__":
    app.run(debug=True)