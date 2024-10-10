<template>
    <h1 class="title">Login</h1>
    <div class="login-card">
        <form>
            <input type="text" v-model="inputData.email" placeholder="Email">
            <input type="password" v-model="inputData.password"  placeholder="Password">
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
    email: '',
    password: ''
})

const login = async() => {    
   await  axios.post('http://localhost:3000/user/login', JSON.stringify(inputData.value) , { headers: { 'Content-Type': 'application/json' } }).then((res) => {
        console.log(res)
    })
}
const register = () => {
    router.push({name: 'register'})
}
</script>

<style scoped>
.title{
    text-align: center;

}
</style>