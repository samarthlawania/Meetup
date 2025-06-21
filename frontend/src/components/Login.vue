<template>
    <div class="container-fluid d-flex flex-column px-4"
        style="font-family: Inter, 'Noto Sans', sans-serif">
        <main class="d-flex justify-content-center align-items-start flex-grow-1 py-5">
            <div class="w-100" style="max-width: 512px;">
                <h2 class="fw-bold text-center pb-3 pt-4"
                    style="font-size: 28px; color: #0d141c; line-height: 1.25; letter-spacing: -0.015em;">
                    Welcome back
                </h2>

                <form @submit.prevent="handleSubmit" class="px-2">
                    <div class="mb-3">
                        <label class="form-label text-dark fw-medium pb-2" for="email">Email</label>
                        <input id="email" type="email" class="form-control form-control-lg bg-body-secondary border"
                            :class="{ 'is-invalid': errors.email }" placeholder="Enter your email" v-model="email" />
                        <div class="invalid-feedback">{{ errors.email }}</div>
                    </div>

                    <div class="mb-4">
                        <label class="form-label text-dark fw-medium pb-2" for="password">Password</label>
                        <input id="password" type="password"
                            class="form-control form-control-lg bg-body-secondary border"
                            :class="{ 'is-invalid': errors.password }" placeholder="Enter your password"
                            v-model="password" />
                        <div class="invalid-feedback">{{ errors.password }}</div>
                    </div>

                    <div class="d-grid mb-3">
                        <button type="submit" class="btn btn-primary btn-sm fw-bold text-white py-2"
                            style="letter-spacing: 0.015em;">
                            Login
                        </button>
                    </div>

                    <div class="d-grid mb-3">
                        <button type="button"
                            class="btn btn-light btn-sm fw-bold d-flex align-items-center justify-content-center gap-2 py-2 text-dark"
                            style="letter-spacing: 0.015em;">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                                viewBox="0 0 256 256">
                                <path
                                    d="M224,128a96,96,0,1,1-21.95-61.09,8,8,0,1,1-12.33,10.18A80,80,0,1,0,207.6,136H128a8,8,0,0,1,0-16h88A8,8,0,0,1,224,128Z">
                                </path>
                            </svg>
                            <span>Sign in with Google</span>
                        </button>
                    </div>
                </form>
                <div class="text-center text-decoration-underline text-secondary mt-3">
                    <a href="/signup" style="font-size: 14px; color: #49709c;">
                        Don't have an account? Sign up
                    </a>
                </div>

            </div>
        </main>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const email = ref('')
const password = ref('')
const errors = ref<{ email?: string; password?: string }>({})

const validateEmail = (val: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)

const handleSubmit = () => {
    errors.value = {}

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

    if (Object.keys(errors.value).length === 0) {
        alert('Login successful!')
        // Add your login API integration here
    }
}
</script>
