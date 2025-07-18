<template>
    <div class="container-fluid d-flex flex-column" style="font-family: Inter, 'Noto Sans', sans-serif">
        <div class="container py-5 d-flex justify-content-center">
            <div class="w-100" style="max-width: 512px;">
                <h3 class="fw-bold mb-4 px-2" style="color: #0d141c;">Schedule a new meeting</h3>

                <form @submit.prevent="handleSubmit">
                    <div class="mb-3">
                        <label class="form-label fw-medium">Meeting Title</label>
                        <input v-model="title" type="text" class="form-control form-control-lg"
                            :class="{ 'is-invalid': errors.title }" placeholder="Enter meeting title" />
                        <div class="invalid-feedback">{{ errors.title }}</div>
                    </div>

                    <div class="mb-3">
                        <label class="form-label fw-medium">Description</label>
                        <textarea v-model="description" class="form-control" rows="4"
                            :class="{ 'is-invalid': errors.description }"
                            placeholder="Enter meeting description"></textarea>
                        <div class="invalid-feedback">{{ errors.description }}</div>
                    </div>

                    <div class="mb-3">
                        <label class="form-label fw-medium">Date</label>
                        <input v-model="date" type="date" class="form-control" :class="{ 'is-invalid': errors.date }" />
                        <div class="invalid-feedback">{{ errors.date }}</div>
                    </div>

                    <div class="mb-3">
                        <label class="form-label fw-medium">Time</label>
                        <input v-model="time" type="time" class="form-control" :class="{ 'is-invalid': errors.time }" />
                        <div class="invalid-feedback">{{ errors.time }}</div>
                    </div>

                    <div class="mb-4">
                        <label class="form-label fw-medium">Participants' Emails</label>
                        <input v-model="participants" type="text" class="form-control"
                            :class="{ 'is-invalid': errors.participants }" placeholder="Enter comma-separated emails" />
                        <div class="invalid-feedback">{{ errors.participants }}</div>
                    </div>

                    <div class="d-flex justify-content-end" @click="ScheduleMeeting">
                        <button type="submit" class="btn btn-primary fw-bold px-4" style="letter-spacing: 0.015em;">
                            Schedule Meeting
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import router from '@/router'
import { ref } from 'vue'
import api from '../services/apiService'


const title = ref('')
const description = ref('')
const date = ref('')
const time = ref('')
const participants = ref('')
const errors = ref<{ [key: string]: string }>({})

const validateEmailList = (list: string) =>
    list
        .split(',')
        .map((email) => email.trim())
        .every((email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))

const handleSubmit = () => {
    errors.value = {}

    if (!title.value) errors.value.title = 'Meeting title is required'
    if (!description.value) errors.value.description = 'Description is required'
    if (!date.value) errors.value.date = 'Date is required'
    if (!time.value) errors.value.time = 'Time is required'

    if (!participants.value) {
        errors.value.participants = 'At least one email is required'
    } else if (!validateEmailList(participants.value)) {
        errors.value.participants = 'One or more email addresses are invalid'
    }

    if (Object.keys(errors.value).length === 0) {
        alert('Meeting scheduled successfully!')
    }
}


const ScheduleMeeting = async()=>{
    const res = await api.get('/create-meeting');
    const { roomID } = res.data;
    router.push(`/meeting/${roomID}`);
}
</script>
