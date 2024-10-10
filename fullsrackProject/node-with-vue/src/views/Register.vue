<template>
    <h1 class="title">Register</h1>
    <div class="login-card">
        <form>
            <input type="text" v-model="inputData.name" placeholder="Username">
            <input type="text" v-model="inputData.email" placeholder="Email">
            <input type="text" v-model="inputData.password" placeholder="Password">
            <div class="button-container">
                <button class="login-btn" @click.prevent="login">Login</button>
                <button class="register-btn" @click.prevent="register">Register</button>
            </div>
        </form>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
const router = useRouter()
const inputData = ref({
    name: '',
    email: '',
    password: ''
})

const register = async() => {    
   await  axios.post('http://localhost:3000/user/register', JSON.stringify(inputData.value) , { headers: { 'Content-Type': 'application/json' } }).then((res) => {
        console.log(res)
    })
}
const login = () => {
    router.push({name: 'login'})
}
</script>

<style scoped>
.title{
    text-align: center;
    
}
</style>