<template>
    <div class="container d-flex flex-column justify-content-center align-items-center"
        style="font-family: Inter, 'Noto Sans', sans-serif;">
        <div class="w-100" style="max-width: 512px;">
            <div class="text-center px-4 pb-3 pt-5">
                <h2 class="fw-bold"
                    style="font-size: 28px; line-height: 1.25; letter-spacing: -0.015em; color: #0d141c;">
                    Create your account
                </h2>
            </div>

            <form @submit.prevent="handleSubmit" class="px-4">
                <div class="mb-3">
                    <input type="text" v-model="name" class="form-control form-control-lg bg-body-secondary border-0"
                        :class="{ 'is-invalid': errors.name }" placeholder="Full name" />
                    <div class="invalid-feedback">{{ errors.name }}</div>
                </div>

                <div class="mb-3">
                    <input type="email" v-model="email" class="form-control form-control-lg bg-body-secondary border-0"
                        :class="{ 'is-invalid': errors.email }" placeholder="Email" />
                    <div class="invalid-feedback">{{ errors.email }}</div>
                </div>

                <div class="mb-4">
                    <input type="password" v-model="password"
                        class="form-control form-control-lg bg-body-secondary border-0"
                        :class="{ 'is-invalid': errors.password }" placeholder="Password" />
                    <div class="invalid-feedback">{{ errors.password }}</div>
                </div>

                <div class="d-grid mb-3" @click="signupEmailPassword">
                    <button type="submit" class="btn btn-primary btn-lg fw-bold text-white"
                        style="letter-spacing: 0.015em;">
                        Sign up
                    </button>
                </div>

                <div class="d-grid mb-3" @click="signupWithGoogle">
                    <button type="button"
                        class="btn btn-light btn-lg fw-bold d-flex align-items-center justify-content-center gap-2 text-dark"
                        style="letter-spacing: 0.015em;">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                            viewBox="0 0 256 256">
                            <path
                                d="M224,128a96,96,0,1,1-21.95-61.09,8,8,0,1,1-12.33,10.18A80,80,0,1,0,207.6,136H128a8,8,0,0,1,0-16h88A8,8,0,0,1,224,128Z">
                            </path>
                        </svg>
                        <span>Sign up with Google</span>
                    </button>
                </div>
            </form>

            <div class="text-center text-decoration-underline text-secondary mt-3">
                <a href="/login" style="font-size: 14px; color: #49709c;">
                Already have an account? Sign in
                </a>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import api from '../services/apiService'


const name = ref('')
const email = ref('')
const password = ref('')
const errors = ref<{ name?: string; email?: string; password?: string }>({})

const validateEmail = (val: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)

const handleSubmit = () => {
    errors.value = {}

    if (!name.value.trim()) {
        errors.value.name = 'Full name is required'
    }

    if (!email.value.trim()) {
        errors.value.email = 'Email is required'
    } else if (!validateEmail(email.value)) {
        errors.value.email = 'Enter a valid email'
    }

    if (!password.value.trim()) {
        errors.value.password = 'Password is required'
    } else if (password.value.length < 6) {
        errors.value.password = 'Password must be at least 6 characters'
    }
}

const signupEmailPassword = async() => {
    try {
        const res = await api.post('/auth/signup', {
          email: email.value,
          password: password.value,
          name:name.value,
        });
        console.log('Signup Success:', res.data);
      } catch (err) {
        console.error('Signup Failed:', err);
      }
}
const signupWithGoogle = ()=> {
    window.location.href = `${import.meta.env.VITE_HOST_URL}/auth/google`;
}
</script>
