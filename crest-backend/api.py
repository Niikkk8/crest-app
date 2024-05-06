from flask import Flask, request, jsonify
import assemblyai as aai

app = Flask(_name_)

# Configure AssemblyAI
aai.settings.api_key = "7560a6e22bce49dd894e33484c468c58"
transcriber = aai.Transcriber()

@app.route('/transcribe', methods=['POST'])
def transcribe_video():
    
    
    video_file = request.files['video']
    if 'video' not in request.files:
        return jsonify({'error': 'No video file provided'}), 400
    try:
        # Transcribe video
        transcript = transcriber.transcribe(video_file)
        
        return jsonify({'text': transcript.text}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if _name_ == '_main_':
    app.run(debug=True)