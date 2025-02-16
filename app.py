from flask import Flask, render_template, request, url_for, send_from_directory,jsonify
import speech_recognition as sr
from flask_cors import CORS
import os
from pydub import AudioSegment

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

@app.route("/send")
def send():
    raisedFinger={
        "duration": 0,
        "wrist": 0,
        "thumb": 0.9, "index": 0, "middle": 1.25, "ring": 1.25, "pinky": 1.15,
        "thumbz": -0.15, "indexz": -0.30, "middlez": -0.08, "ringz": -0.22, "pinkyz": -0.52,
    }
    raisedHand={
        "duration": 0,
        "wrist": 0,
        "thumb": 0.9, "index": 0, "middle": 1.25, "ring": 1.25, "pinky": 1.15,
        "thumbz": -0.15, "indexz": -0.30, "middlez": -0.08, "ringz": -0.22, "pinkyz": -0.52,
    }
    rockOn={
        "duration": 0,
        # "bg": 0x4b46b2, "hand": 0xe7a183, "shirt": 0x303030, vest: 0xe7d55c,
        "wrist": 0.1,
        "thumb": 0.25, "index": 0.25, "middle": 1.1, "ring": 1.1, "pinky": 0.25,
        "thumbz": -0.15, "indexz": -0.30, "middlez": -0.08, "ringz": -0.22, "pinkyz": -0.52,
      }
    return jsonify(rockOn)





if __name__ == "__main__":
    app.run(debug=True)