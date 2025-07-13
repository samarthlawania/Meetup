<template>
    <div class="relative flex min-h-screen flex-col bg-slate-50 overflow-x-hidden"
        style="font-family: Inter, 'Noto Sans', sans-serif;">
        <div class="layout-container flex flex-col grow h-full">
            <!-- Main content -->
            <div class="px-40 py-2 flex justify-center flex-1">
                <div class="flex flex-col max-w-[960px] w-full">
                    <div class="flex justify-between items-center p-4">
                        <p class="text-[32px] font-bold">Meetings</p>
                        <!-- This is the clickable button -->
                        <button @click="goToCreateMeeting" class="h-8 px-4 rounded-lg bg-[#e7edf4] text-sm font-medium">
                            Create a New Meeting
                        </button>
                    </div>

                    <!-- Upcoming Section -->
                    <h3 class="text-lg font-bold px-4 pt-4 pb-2">Upcoming</h3>
                    <div class="d-flex align-items-center justify-content-center flex-column px-4 py-6 items-center gap-6">
                         <div
                  class="bg-center bg-no-repeat aspect-video bg-cover rounded-lg w-full max-w-[360px]"
                >  <img src="../assets/upcoming.svg" alt="">    </div>
                        <p class="text-lg font-bold text-center">No upcoming meetings</p>
                        <p class="text-sm text-center">Schedule a meeting to get started</p>
                    </div>

                    <!-- Past Section -->
                    <h3 class="text-lg font-bold px-4 pt-4 pb-2">Past</h3>
                    <div class="flex flex-col px-4 py-6 items-center gap-6">
                        <div class="d-flex align-items-center justify-content-center flex-column w-full max-w-[360px] aspect-video bg-cover bg-center rounded-lg">\
                            <img src="../assets/nopastmeeting.svg" alt="">
                        </div>
                        <p class="text-lg font-bold text-center">No past meetings</p>
                        <p class="text-sm text-center">Once you've had a meeting, it will show up here</p>
                    </div>

                    <!-- Join button -->
                    <div class="flex px-4 py-3">
                        <button class="h-10 px-4 rounded-lg bg-[#e7edf4] text-sm font-bold">
                            Join with Meeting ID or Link
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

function goToCreateMeeting() {
    router.push({ name: 'CreateNewMeeting' }); // Must match the name in router/index.js
}
</script>
