<script setup lang="ts">

</script>

<template>
    <div class="d-flex justify-content-between align-items-center ms-3 me-3">
        <div class="d-flex flex-row align-items-center">
            <img width="80px" src="../assets/logo.png" alt="LOGO">
            <h6>Meetup</h6>
        </div>
        <div class="d-flex nav-point">
            <li><a href="/home">Home</a></li>
            <li><a href="/chat">Chat</a></li>
            <li><a href="/spaces">Spaces</a></li>
            <li><a href="/meetings">Meetings</a></li>
            <li><a href="/contacts">Contacts</a></li>
        </div>
    </div>
</template>


<style>
.nav-point li {
    list-style: none;
    padding: 10px;
    margin: 0;
  }

  .nav-point   li a {
    text-decoration: none;
    color: black;
  }
</style>
