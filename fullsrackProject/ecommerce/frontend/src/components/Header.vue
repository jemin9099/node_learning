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
        <div class="hidden lg:flex items-center justify-between max-w-sm border rounded-full focus-within:shadow-md pl-2">
            <input type="text" placeholder="Search Product here.." class="w-full outline-none ">
            <div class="min-w-[50px] h-8 flex items-center justify-center bg-red-600 rounded-r-full text-white">
                <mdicon name="magnify" />
            </div>
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
                <button class="px-3 bg-red-600 hover:bg-red-700 text-white rounded-full py-1" v-if="!user?.name"><RouterLink to="/login" >Login</RouterLink></button>
                <button class="px-3 bg-red-600 hover:bg-red-700 text-white rounded-full py-1" v-else  @click="logout">Logout</button>
            </div>
        </div>
    </div>
   </header>
</template>
<style scoped>

</style>