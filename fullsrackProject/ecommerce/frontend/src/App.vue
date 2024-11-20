<script setup >
import { RouterView , useRoute } from 'vue-router'
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
import AdminPanel from './views/AdminPanel.vue';
const route = useRoute()
const authRouteName = ['login' , 'forgot-password' ,'register' , 'reset-password']

</script>
<template>
  <Header v-if="!authRouteName.includes(route.name)"/>
  <main class=" dark:bg-gray-800" :class="!authRouteName.includes(route.name)?'min-h-[calc(100vh-120px)]':'h-[100vh]'">
    <AdminPanel v-if="route.meta.isAdmin" >
        <RouterView />
    </AdminPanel>
    <RouterView v-else/>
  </main>
  <Footer v-if="!authRouteName.includes(route.name)"/>
</template>
<style scoped></style>