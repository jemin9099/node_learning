<script setup lang="ts">
import { RouterView , useRoute } from 'vue-router'
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
import AdminPanel from './views/AdminPanel.vue';
const route = useRoute()

</script>
<template>
  <Header />
  <main class="min-h-[calc(100vh-120px)]">
    <AdminPanel v-if="route.meta.isAdmin" >
        <RouterView />
    </AdminPanel>
    <RouterView v-else/>
  </main>
  <Footer/>
</template>
<style scoped></style>