<script setup lang="ts">
import { RouterView } from 'vue-router'
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
</script>
<template>
  <Header />
  <main class="min-h-[calc(100vh-120px)]">
    <RouterView />
  </main>
  <Footer/>
</template>
<style scoped></style>