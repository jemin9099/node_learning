<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import axios from 'axios';
import { useToast } from '@/common/useToast.js'
import common from '@/common/index'
const { toastTypeError, toastTypeSuccess } = useToast()
const { SummaryApi, headers, authHeaders } = common
const router = useRouter()
const showPassword = ref(false)
const emailError = ref('');
const passwordError = ref('');
const loginForm = ref({
    email: '',
    password: ''
})
const validateEmail = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    emailError.value = emailPattern.test(loginForm.value.email) ? '' : 'Invalid email address';
};
const validatePassword = () => {
    passwordError.value = loginForm.value.password.length >= 6 ? '' : 'Password must be at least 6 characters';
};
const userDetail = async () => {
    const { data: userFetchData } = await axios.get(SummaryApi.userDetail.url, { headers: authHeaders })
    localStorage.setItem('user', JSON.stringify(userFetchData.data))
    router.push({ name: 'home' })
}
const handleLogin = async () => {
    validateEmail();
    validatePassword();
    if (!emailError.value && !passwordError.value) {
        try {
            const { data, status } = await axios.post(SummaryApi.login.url, loginForm.value, { headers: headers })
            if (status === 200) {
                if (data.success) {
                    localStorage.removeItem('token')
                    localStorage.setItem('token', data.data)
                    toastTypeSuccess(data.message)
                    await userDetail()
                }
            }
        }
        catch (error) {
            toastTypeError(error.response.data.message)
        }
    }

}
</script>
<template>
    <section id="login">
        <div class="mx-auto container p-4">
            <div class="bg-white p-5 py-4 w-full max-w-md mx-auto rounded-md shadow-lg">
                <div class="w-20 h-20 mx-auto">
                    <img src="@/assets/signin.gif" alt="">
                </div>
                <form @submit.prevent="handleLogin">
                    <div class="grid">
                        <label for="email" class="pb-2"> Email: </label>
                        <div class="bg-slate-100 p-2 rounded-md" :class="{ 'is-invalid': emailError }">
                            <input type="email" placeholder="Enter your email" @input="validateEmail"
                                v-model="loginForm.email" class="w-full h-full outline-none bg-transparent">
                        </div>
                        <span v-if="emailError" class="error">{{ emailError }}</span>
                    </div>
                    <div class="mt-3 grid">
                        <label for="password" class="pb-2"> Password: </label>
                        <div class="bg-slate-100 p-2 flex rounded-md" :class="{ 'is-invalid': passwordError }">
                            <input :type="showPassword ? 'text' : 'password'" @input="validatePassword"
                                v-model="loginForm.password" placeholder="Enter your password"
                                class="w-full h-full outline-none bg-transparent ">

                            <div class="cursor-pointer" @click="showPassword = !showPassword">
                                <span v-if="showPassword">
                                    <mdicon name="eye-outline" />
                                </span>
                                <span v-else>
                                    <mdicon name="eye-off-outline" />
                                </span>
                            </div>
                        </div>
                        <span v-if="passwordError" class="error">{{ passwordError }}</span>
                        <RouterLink to="/forgot-password"
                            class="block w-fit ml-auto hover:underline hover:text-red-600">Forgot Password ?
                        </RouterLink>
                    </div>
                    <button
                        class="bg-red-600 text-white w-full px-6 py-2 max-w-[150px] rounded-full mt-6 hover:scale-110 transition-all block mx-auto"
                        type="submit">
                        Login
                    </button>
                    <p class="text-center mt-3">you don't have an account ? <RouterLink to="/register"
                            class="hover:underline hover:text-red-600">Register</RouterLink>
                    </p>
                </form>
            </div>
        </div>
    </section>
</template>

<style scoped>
.is-invalid {
    border: 1px solid red;
}

.error {
    color: red;
    font-size: 0.875em;
}
</style>