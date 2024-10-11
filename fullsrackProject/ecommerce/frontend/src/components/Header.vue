<script setup lang="ts">
import Logo from './Logo.vue';
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
            <div class="cursor-pointer">
                <mdicon name="account" />   
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
                <RouterLink to="/login" class="px-3 bg-red-600 hover:bg-red-700 text-white rounded-full py-1">Login</RouterLink>
            </div>
        </div>
    </div>
   </header>
</template>
<style scoped>

</style>