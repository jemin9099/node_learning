<script setup>
import { useUserData } from '@/composable/useUserData';
const { user } =  useUserData();
</script>
<template>
    <div class="min-h-[calc(100vh-120px)] flex">
        <aside class="bg-white w-full max-w-60 
        custom-shdow m-2 rounded-md">
            <div class="h-40   flex items-center justify-center flex-col">
                <div class="cursor-pointer ">
                    <div class="w-[80px] h-[80px] overflow-hidden relative rounded-full" v-if="user?.image">
                        <img :src="user.image" alt="" >
                    </div>
                    <mdicon name="account" v-else />   
                </div> 
                <p class="mt-1 capitalize text-lg font-semibold">{{user?.name}}</p>
                <p class="text-sm">{{user?.role}}</p>
            </div>
            <hr>
            <div>
                <nav class="grid p-4 gap-2">
                    <RouterLink :to="{name:'users'}" class="whitespace-nowrap hover:bg-slate-100 p-2 flex" :class="{ 'bg-slate-100': $route.name === 'users' }"><mdicon name="account-multiple" class="me-2"></mdicon> Users</RouterLink> 
                    <RouterLink :to="{name:'products'}" class="whitespace-nowrap  hover:bg-slate-100 p-2 flex" :class="{ 'bg-slate-200': $route.name === 'products' }"><mdicon name="store" class="me-2"></mdicon> Products</RouterLink>
                    <RouterLink :to="{name:'category'}" class="whitespace-nowrap  hover:bg-slate-100 p-2 flex" :class="{ 'bg-slate-200': $route.name === 'category' }"><mdicon name="shape" class="me-2"></mdicon> Category</RouterLink>
                </nav>
            </div>
        </aside>
        <div class="m-2 w-full">
           <slot/>   
        </div>
    </div>
</template>
<style scoped>
.custom-shdow{
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
}
</style>