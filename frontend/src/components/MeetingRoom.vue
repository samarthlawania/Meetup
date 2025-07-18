<template>
  <div class="meeting-container">
    <div class="video-section">
      <video ref="localVideo" autoplay muted playsinline></video>
      <video ref="remoteVideo" autoplay playsinline></video>
    </div>
    <div class="chat-section">
      <div class="chat-box" ref="chatBox">
        <div v-for="(msg, index) in messages" :key="index" class="chat-message">
          <strong>{{ msg.user }}:</strong> {{ msg.text }}
        </div>
      </div>
      <div class="chat-input">
        <input v-model="message" @keyup.enter="sendMessage" placeholder="Type a message..." />
        <button @click="sendMessage">Send</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { io } from 'socket.io-client';

const localVideo = ref(null);
const remoteVideo = ref(null);
const socket = io('http://localhost:5000'); // your backend socket server
const roomID = 'demo-room'; // replace with actual route or param
let localStream;
let peerConnection;
const config = {
  iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
};

onMounted(async () => {
  localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
  localVideo.value.srcObject = localStream;

  socket.emit('join-room', roomID);

  socket.on('user-connected', (userId) => {
    console.log('User connected:', userId);
    createPeerConnection(userId, true); // Initiator
  });

  socket.on('signal', async ({ sender, data }) => {
    console.log('Signal received from', sender, data);
    if (!peerConnection) createPeerConnection(sender, false);

    if (data.sdp) {
      await peerConnection.setRemoteDescription(new RTCSessionDescription(data.sdp));
      if (data.sdp.type === 'offer') {
        const answer = await peerConnection.createAnswer();
        await peerConnection.setLocalDescription(answer);
        socket.emit('signal', {
          target: sender,
          data: { sdp: peerConnection.localDescription }
        });
      }
    }

    if (data.candidate) {
      try {
        await peerConnection.addIceCandidate(new RTCIceCandidate(data.candidate));
      } catch (e) {
        console.error('Error adding ICE candidate:', e);
      }
    }
  });

  socket.on('user-disconnected', (userId) => {
    console.log('User disconnected:', userId);
    if (peerConnection) {
      peerConnection.close();
      peerConnection = null;
    }
  });
});

function createPeerConnection(targetId, isInitiator) {
  peerConnection = new RTCPeerConnection(config);

  localStream.getTracks().forEach(track => {
    peerConnection.addTrack(track, localStream);
  });

  peerConnection.onicecandidate = event => {
    if (event.candidate) {
      socket.emit('signal', {
        target: targetId,
        data: { candidate: event.candidate }
      });
    }
  };

  peerConnection.ontrack = event => {
    remoteVideo.value.srcObject = event.streams[0];
  };

  if (isInitiator) {
    peerConnection.createOffer()
      .then(offer => peerConnection.setLocalDescription(offer))
      .then(() => {
        socket.emit('signal', {
          target: targetId,
          data: { sdp: peerConnection.localDescription }
        });
      });
  }
}

onBeforeUnmount(() => {
  if (peerConnection) peerConnection.close();
  socket.disconnect();
});
</script>

<style scoped>
.meeting-container {
  display: flex;
  height: 100vh;
  background: #f4f4f4;
}

.video-section {
  flex: 3;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  background: black;
  padding: 10px;
}

video {
  width: 90%;
  max-height: 45%;
  background: #222;
  border-radius: 12px;
}

.chat-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  border-left: 2px solid #ddd;
  background: #fff;
}

.chat-box {
  flex: 1;
  overflow-y: auto;
  padding: 10px;
}

.chat-message {
  margin: 6px 0;
  background: #f1f1f1;
  padding: 8px 12px;
  border-radius: 8px;
}

.chat-input {
  display: flex;
  padding: 10px;
  border-top: 1px solid #ccc;
}

.chat-input input {
  flex: 1;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 6px;
}

.chat-input button {
  margin-left: 8px;
  padding: 8px 12px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}
</style>
