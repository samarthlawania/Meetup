import whisper
import pyaudio
import numpy as np

# Load the Whisper model (use "tiny" for faster results)
model = whisper.load_model("small")

# Audio settings
CHUNK = 1024  # Number of frames per buffer
FORMAT = pyaudio.paInt16  # 16-bit format
CHANNELS = 1  # Mono audio
RATE = 16000  # Whisper expects 16kHz audio

# Initialize PyAudio
p = pyaudio.PyAudio()
stream = p.open(format=FORMAT,
                channels=CHANNELS,
                rate=RATE,
                input=True,
                frames_per_buffer=CHUNK)

print("🎤 Listening... (Press Ctrl+C to stop)")

def transcribe_audio():
    while True:
        try:
            # Read audio data
            audio_data = stream.read(CHUNK, exception_on_overflow=False)
            
            # Convert audio bytes to numpy array (normalize values)
            audio_np = np.frombuffer(audio_data, dtype=np.int16).astype(np.float32) / 32768.0
            
            # Transcribe using Whisper
            result = model.transcribe(audio_np, fp16=False)
            
            # Print recognized text
            print("You said:", result["text"])
        except Exception as e:
            print(f"Error: {e}")

try:
    transcribe_audio()
except KeyboardInterrupt:
    print("\n🛑 Stopping...")
    stream.stop_stream()
    stream.close()
    p.terminate()
