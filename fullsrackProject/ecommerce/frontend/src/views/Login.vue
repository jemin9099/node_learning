<script setup lang="ts">
import { ref } from 'vue'
const showPassword = ref(false)
</script>
<template>
    <section id="login">
        <div class="mx-auto container p-4">
            <div class="bg-white p-2 py-4 w-full max-w-md mx-auto rounded">
                <div class="w-20 h-20 mx-auto">
                    <img src="@/assets/signin.gif" alt="">
                </div>
                <form>
                    <div class="grid">
                        <label for="email"> Email: </label>
                        <div class="bg-slate-100 p-2">
                            <input type="email" placeholder="Enter your email" class="w-full h-full outline-none bg-transparent">
                        </div>
                    </div>
                    <div class="mt-3">
                        <label for="email"> Password: </label>
                        <div class="bg-slate-100 p-2 flex">
                            <input :type="showPassword ? 'text' : 'password'" placeholder="Enter your password" class="w-full h-full outline-none bg-transparent">
                            <div class="cursor-pointer" @click="showPassword = !showPassword">
                                <span v-if="showPassword">
                                    <mdicon name="eye-outline" /> 
                                </span>
                                <span v-else>
                                    <mdicon name="eye-off-outline" /> 
                                </span>
                            </div>
                        </div>
                        <RouterLink to="/forgot" class="block w-fit ml-auto hover:underline hover:text-red-600">Forgot Password</RouterLink>
                    </div>
                    <button class="bg-red-600 text-white w-full px-6 py-2 max-w-[150px] rounded-full mt-6 hover:scale-110 transition-all block mx-auto">
                        Login
                    </button>
                </form>
            </div>
        </div>
    </section>  
</template>

<style scoped>

</style>