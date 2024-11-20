<script setup >
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import { ref ,onMounted} from 'vue'
import axios from 'axios'
import product from './product.vue';
import common from '@/common/index'
const props = defineProps({
    category: String,
    heading: String
})
const { SummaryApi, authHeaders } = common
const categoryList = ref()
const allProducts = ref([])
const categoryID = ref()
const getCategory = async () => {
    try {
        let { data, status } = await axios.get(SummaryApi.getCategory.url, { headers: authHeaders })
        if (status === 200) {
            console.log(props.category);
            categoryList.value = data.data
            categoryID.value = categoryList.value.filter((item) => item._doc.name === props.category)[0]._doc._id;
            getAllCategoryProducts()
        }
    }
    catch (error) {
        console.log(error);
    }
}
const getAllCategoryProducts = async () => {        
   const { data, status } = await axios.get(SummaryApi.productByCategory.url(categoryID.value), { headers: authHeaders })
   if (status === 200) {
      const allData = data.data.map((product) => ({
         ...product,
         image: product.image.map(
            (image) => `${import.meta.env.VITE_BACKEND_URL}/${image}`
         ),
      }))
      allProducts.value = allData
   }
}
onMounted(() => {
    setTimeout(() => {
      getCategory()
    }, 1000);
})
</script>
<template>
    <div class="w-full p-2 mt-5">
        <p class="text-lg font-bold mb-3 dark:text-white">{{heading}}</p>
        <swiper :slidesPerView="4" :spaceBetween="30"  :breakpoints="{
            '320': {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            '640': {
              slidesPerView: 2,
              spaceBetween: 25,
            },
            '768': {
              slidesPerView: 3,
              spaceBetween: 30,
            },
            '1536': {
              slidesPerView: 4,
              spaceBetween: 30,
            },
          }">
            <swiper-slide  v-for="product in allProducts" :key="product._id" >
                <product :product="product"/>
            </swiper-slide>
        </swiper>
        
    </div>
</template>
<style scoped>

</style>