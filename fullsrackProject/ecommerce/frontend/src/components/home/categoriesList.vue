<script setup>
import { ref , watch } from 'vue';
import axios from 'axios'
import common from '@/common/index'
const { SummaryApi, authHeaders } = common
const categories = ref([])

const getAllCategories = async () => {
    try {
        const { data, status } = await axios.get(SummaryApi.getCategory.url, { headers: authHeaders })
        if (status === 200) {
            categories.value = data.data
        }
    }
    catch (error) {
        console.log(error);
    }
}
getAllCategories()
</script>
<template>
    <div class="flex items-center justify-between overflow-scroll overflow-none gap-3">
        <div v-for="(category, index) in categories" :key="index" class="cursor-pointer" @click="$router.push(`/category/${category._doc._id}`)"> 
            <div class="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden p-3 bg-white flex items-center justify-center mx-auto">
                <img :src="category.image[0]" alt="" class="h-full object-contain">
            </div>
            <p class="text-center text-sm md:text-base capitalize dark:text-white mt-1">{{category._doc.name}}</p>
        </div>
    </div>
</template>

<style scoped>
.overflow-none::-webkit-scrollbar{
    display: none;
}
</style>