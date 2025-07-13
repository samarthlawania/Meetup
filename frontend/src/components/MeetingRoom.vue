<template>
  <div class="d-flex flex-column min-vh-100 bg-light">
    <!-- Main Content -->
    <main class="container-fluid d-flex flex-grow-1 py-4">
      <!-- Left Column -->
      <div class="flex-fill pe-4">
        <!-- Video Player -->
        <div
          class="ratio  mb-3 rounded overflow-hidden" :style="{ backgroundImage: `url(${videoThumbnail})`, backgroundSize: 'cover', backgroundPosition: 'center' ,height:'50%',width:'100%' }"
        >
        </div>

        <!-- Message Input -->
        <div class="d-flex align-items-center gap-2">
          <div class="rounded-circle overflow-hidden" style="width: 40px; height: 40px;">
            <img :src="userAvatar" alt="Me" class="img-fluid" />
          </div>
          <div class="input-group">
            <input
              v-model="message"
              type="text"
              class="form-control"
              placeholder="Send a message to everyone"
            />
            <button class="btn btn-primary" @click="sendMessage">Send</button>
          </div>
        </div>
      </div>

      <!-- Chat Sidebar -->
      <aside class="border-start ps-4" style="width: 360px;">
        <h5 class="fw-bold mb-3">Chat</h5>
        <div v-for="(chat, index) in chatMessages" :key="index" class="mb-4">
          <div
            class="d-flex"
            :class="chat.isUser ? 'justify-content-end text-end' : 'justify-content-start text-start'"
          >
            <div class="d-flex align-items-end gap-2" :class="chat.isUser ? 'flex-row-reverse' : ''">
              <div
                class="rounded-circle overflow-hidden"
                style="width: 40px; height: 40px;"
              >
                <img :src="chat.avatar" alt="Avatar" class="img-fluid" />
              </div>
              <div>
                <div class="small text-muted">{{ chat.name }}</div>
                <div
                  class="p-2 rounded"
                  :class="chat.isUser ? 'bg-primary text-white' : 'bg-light text-dark'"
                >
                  {{ chat.message }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const message = ref('')
const userAvatar = 'https://lh3.googleusercontent.com/aida-public/AB6AXuD2lFD9unawYRPnvwSSZB2BOgJnJV74gj7DFcqUwLNh6yiCuXG8wEjzQnUCOTe63dCnBdqhQvTX00biFASuhEhmD6_C_plNQ6S2iNqB8VSEr70Ynt5qtXI9-utqWqVgrX8J27pHle4eIXw-8ljjlsOOQn1I-FodxHH1W4iCRUc3qfQS_t4_JJauWzYwEFj4g1ItNGxwrJnC46GkNaXChJy3Y00dAnDSrxsK61vHusMh1SM0E8pPHvjnZ8rUY7BtRfQxgTyWhEyoUcs'
const videoThumbnail = 'https://lh3.googleusercontent.com/aida-public/AB6AXuAzaZeyFRr_RXQs0SY9erR6Psy8Z2U6eV1rKECw2N7kRXL7MnqPpOlMCk76iruN_suspZ2ZAnq-d7UfObtka_FvEMA00yjWDCNe-IkghTJHh4jljOaGgCX3zZMbXLCIV00MP9tSUpijrAFKQe6OTGXA_FK9-nrm40DBOSxAtaTscakFA3FjCBl6S6nz1-fFMUarh6gfZ8uVbeb3gn8yLmDn1qpAenjdz2VwmD7HPGshl-ZDE3xn_kMh4jT-6LYtnA_8yhydjZo5yh8'

const chatMessages = ref([
  { name: 'Sophia', message: 'Hey everyone, just wanted to check in and see how the presentation is going.', avatar: userAvatar, isUser: false },
  { name: 'Ethan', message: "It's going well, Sophia!", avatar: userAvatar, isUser: false },
  { name: 'Sophia', message: "Great to hear, Ethan! I'm here if you need anything.", avatar: userAvatar, isUser: true },
  { name: 'Olivia', message: "Thanks, Sophia! We're feeling confident.", avatar: userAvatar, isUser: false },
  { name: 'Liam', message: 'Agreed, the team is doing great.', avatar: userAvatar, isUser: false },
  { name: 'Sophia', message: "That's wonderful, Liam!", avatar: userAvatar, isUser: true }
])

function sendMessage() {
  if (message.value.trim()) {
    chatMessages.value.push({
      name: 'You',
      message: message.value,
      avatar: userAvatar,
      isUser: true
    })
    message.value = ''
  }
}
</script>

<style scoped>
/* You can add additional styles here if needed */
</style>
