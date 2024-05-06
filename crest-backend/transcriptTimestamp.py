import assemblyai as aai

# Set your AssemblyAI API key
aai.settings.api_key = "7560a6e22bce49dd894e33484c468c58"

# Create a transcriber object
transcriber = aai.Transcriber()

# Define the path to your audio file
audio_path = "video1.mp4"  # Replace with the path to your audio file

# Transcribe the audio file
transcript = transcriber.transcribe(audio_path)

# Initialize variables to track sentences
current_sentence = ""
start_time = None
end_time = None

# Iterate through words in the transcript
for word in transcript.words:
    # If it's the first word in a sentence, record its start time
    if not current_sentence:
        start_time = word.start / 1000.0
    
    # Add the word to the current sentence
    current_sentence += word.text + " "
    
    # If the word ends with a punctuation indicating the end of a sentence
    if word.text.endswith((".", "!", "?")):
        # Record the end time for the sentence
        end_time = word.end / 1000.0
        
        # Print the sentence with timestamps
        print(f"{start_time:.3f} - {end_time:.3f}: {current_sentence}")
        
        # Reset variables for the next sentence
        current_sentence = ""
        start_time = None
        end_time = None  # Corrected indentation here
