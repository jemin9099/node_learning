<script setup lang="ts">
import { ref } from 'vue';
import Logo from './Logo.vue';
import { useUserData } from '@/composable/useUserData';
import { useRouter } from 'vue-router';
import role from '@/common/role';
const router = useRouter();
const { user:detail } =  useUserData();
const user = ref()
setTimeout(() => {
    user.value = detail.value    
},500)
const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    router.push({name: 'login'})
}
</script>
<template>
   <header class="h-16 shadow-md bg-white">
    <div class="h-full flex items-center container mx-auto px-4 justify-between">
        <RouterLink to="/">
            <Logo/>
        </RouterLink>
        <div class="border rounded overflow-hidden flex">
            <input type="text" class="px-4 py-2" placeholder="Search...">
            <button class="flex items-center justify-center px-4 border-l">
              <svg class="h-4 w-4 text-grey-dark" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z"/></svg>
            </button>
          </div>
        <div class="flex items-center gap-7">
            <div class="releative group flex justify-center">
                <div class="cursor-pointer ">
                    <div class="w-[30px] h-[30px] overflow-hidden relative rounded-full" v-if="user?.image">
                        <img :src="user.image" alt="" >
                    </div>
                    <mdicon name="account" v-else />   
                </div> 
                <div class="absolute bg-white bottom-0 top-11 h-fit p-2 shadow-lg rounded hidden group-hover:block">
                    <nav>
                        <RouterLink to="/admin-panel" class="whitespace-nowrap hover:bg-slate-100 p-2 hidden md:block" v-if="user?.role === role.ADMIN">Admin Panel</RouterLink>
                    </nav>
                </div>
            </div>
            <div class="cursor-pointer relative">
               <span>
                    <mdicon name="cart" />   
               </span>
               <div class="bg-red-600  w-5 flex items-center justify-center rounded-full h-5 absolute -top-2 -right-3">
                <p class="text-xs text-white">0</p>
               </div>
            </div>
            <div>
                <button class="border-2 border-red-600  hover:bg-red-600 text-red-600 hover:text-white font-bold py-1 px-4 rounded flex me-3" v-if="!user?.name"><RouterLink to="/login" >Login</RouterLink></button>
                <button class="border-2 border-red-600  hover:bg-red-600 text-red-600 hover:text-white font-bold py-1 px-4 rounded flex me-3" v-else  @click="logout">Logout</button>
            </div>
        </div>
    </div>
   </header>
</template>
<style scoped>

</style>