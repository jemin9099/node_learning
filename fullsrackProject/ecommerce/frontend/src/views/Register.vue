<script setup>
import { useRouter } from 'vue-router'
import { imageTOBase64 } from '@/utils/imageTOBase64'
import { useToast } from '@/common/useToast.js'
import { ref } from 'vue'
import axios from 'axios'
import common from '@/common/index'
const { toastTypeError, toastTypeSuccess } = useToast()
const { SummaryApi, headers } = common
const showPassword = ref(false)
const showConfirmPassword = ref(false)
const router = useRouter()
const nameError = ref('');
const emailError = ref('');
const passwordError = ref('');
const confirmPasswordError = ref('');
const registerForm = ref({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    image: null
})

const validateName = () => {
    nameError.value = registerForm.value.name.trim() ? '' : 'Name is required';
};
const validateEmail = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    emailError.value = emailPattern.test(registerForm.value.email) ? '' : 'Invalid email address';
};
const validatePassword = () => {
    passwordError.value = registerForm.value.password.length >= 6 ? '' : 'Password must be at least 6 characters';
};
const validateConfirmPassword = () => {
    confirmPasswordError.value = registerForm.value.confirmPassword === registerForm.value.password
        ? ''
        : 'Passwords do not match';
};
const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    const imagePic = await imageTOBase64(file)
    registerForm.value.image = imagePic
}

const handleLogin = async () => {
    validateEmail();
    validatePassword();
    if (!nameError.value && !emailError.value && !passwordError.value && !confirmPasswordError.value) {
        try {
            console.log(registerForm.value);
            
            const { data, status } = await axios.post(SummaryApi.signup.url, JSON.stringify(registerForm.value), { headers: headers })
            if (status === 201) {
                toastTypeSuccess(data.message)
                registerForm.value = {
                    name: '',
                    email: '',
                    password: '',
                    confirmPassword: '',
                    image: ''
                }
                router.push({ name: 'login' })
            }
        } catch (error) {
            console.log(error);
            toastTypeError(error.response.data.message)
        }
    }

}
</script>
<template>
    <section id="login">
        <div class="mx-auto container p-4">
            <div class="bg-white p-5 py-4 w-full max-w-md mx-auto rounded-md shadow-lg">
                <div class="w-20 h-20 mx-auto relative overflow-hidden rounded-full">
                    <div>
                        <img :src="registerForm.image" v-if="registerForm.image" alt="">
                        <img src="@/assets/signin.gif" alt="" v-else>
                    </div>
                    <form>
                        <label>
                            <div
                                class="text-xs bg-slate-100 pb-2 pt-2 cursor-pointer text-center absolute bottom-0 w-full bg-opacity-80">
                                Upload Photo</div>
                            <input type="file" class="hidden" @change="handleFileUpload">
                        </label>
                    </form>
                </div>
                <form @submit.prevent="handleLogin" class="flex pt-6 flex-col gap-2">
                    <div class="grid">
                        <label for="name" class="pb-2"> Name: </label>
                        <div class="bg-slate-100 p-2 rounded-md" :class="{ 'is-invalid': nameError }">
                            <input type="text" placeholder="Enter your name" @input="validateName"
                                v-model="registerForm.name" class="w-full h-full outline-none bg-transparent">
                        </div>
                        <span v-if="nameError" class="error">{{ nameError }}</span>
                    </div>
                    <div class="grid mt-3">
                        <label for="email" class="pb-2"> Email: </label>
                        <div class="bg-slate-100 p-2 rounded-md" :class="{ 'is-invalid': emailError }">
                            <input type="email" placeholder="Enter your email" @input="validateEmail"
                                v-model="registerForm.email" class="w-full h-full outline-none bg-transparent">
                        </div>
                        <span v-if="emailError" class="error">{{ emailError }}</span>
                    </div>
                    <div class="mt-3 grid">
                        <label for="password" class="pb-2"> Password: </label>
                        <div class="bg-slate-100 p-2 flex rounded-md" :class="{ 'is-invalid': passwordError }">
                            <input :type="showPassword ? 'text' : 'password'" @input="validatePassword"
                                v-model="registerForm.password" placeholder="Enter your password"
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
                    </div>
                    <div class="mt-3 grid">
                        <label for="password" class="pb-2"> Confirm Password: </label>
                        <div class="bg-slate-100 p-2 flex rounded-md" :class="{ 'is-invalid': confirmPasswordError }">
                            <input :type="showConfirmPassword ? 'text' : 'password'" @input="validateConfirmPassword"
                                v-model="registerForm.confirmPassword" placeholder="Enter your confirm password"
                                class="w-full h-full outline-none bg-transparent ">

                            <div class="cursor-pointer" @click="showConfirmPassword = !showConfirmPassword">
                                <span v-if="showConfirmPassword">
                                    <mdicon name="eye-outline" />
                                </span>
                                <span v-else>
                                    <mdicon name="eye-off-outline" />
                                </span>
                            </div>
                        </div>
                        <span v-if="confirmPasswordError" class="error">{{ confirmPasswordError }}</span>
                    </div>
                    <button
                        class="bg-red-600 text-white w-full px-6 py-2 max-w-[150px] rounded-full mt-6 hover:scale-110 transition-all block mx-auto"
                        type="submit">
                        Register
                    </button>
                    <p class="text-center mt-3">you already have an account ? <RouterLink to="/login"
                            class="hover:underline hover:text-red-600">Login</RouterLink>
                    </p>
                </form>
            </div>
        </div>
    </section>
</template>

<style scoped>
.is-invalid {
    border: 1px solid red !important;
}

.error {
    padding-top: 5px;
    color: red;
    font-size: 0.875em;
}
</style>