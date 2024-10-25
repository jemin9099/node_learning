<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import sidebarFilter from '@/components/sidebarFilter.vue'
import common from '@/common/index'
import Pagination from '@/components/pagination.vue';
const { SummaryApi, authHeaders } = common
const route = useRoute()
const allProducts = ref([])
const currentPage = ref(1)
const parPage = ref(6)
const totalPage = ref()
const getAllCategoryProducts = async () => {
   const { data, status } = await axios.get(SummaryApi.productByCategory.url(route.params.id), { headers: authHeaders })
   if (status === 200) {
      const allData = data.data.map((product) => ({
         ...product,
         image: product.image.map(
            (image) => `${import.meta.env.VITE_BACKEND_URL}/${image}`
         ),
      }))
      allProducts.value = allData
      totalPage.value = Math.ceil(allData.length / parPage.value)
   }
}
const displayCurrency = (price) => {
   return price.toLocaleString('en-US', { style: 'currency', currency: 'INR', minimumFractionDigits: 2 })
}
const getTableData = () => {
    const startIndex = (currentPage.value - 1) * parPage.value
    const endIndex = currentPage.value * parPage.value

    return allProducts.value?.slice(startIndex, endIndex)
}
getAllCategoryProducts()
</script>
<template>
   <div class="container mx-auto p-3">
      <h1 class="text-2xl font-medium leading-tight ml-3">Category Product</h1>
      <div class="flex">
         <div class="w-3/12 p-4">
            <sidebarFilter :filterData="allProducts" />
         </div>

         <div class="w-9/12 p-4">
            <section
               class=" grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14  mb-5">
               <div class="w-full bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl"
                  v-for="(product, index) in getTableData()" :key="index">
                  <a href="#">
                     <div class="product-image">
                        <img :src="product.image[0]" alt="Product" class=" object-contain rounded-t-xl product-img" />
                     </div>

                     <div class="px-4 py-3 ">
                        <span class="text-gray-400 mr-3 uppercase text-xs">{{ product.brandName }}</span>
                        <div class="flex justify-between mb-2">
                           <p class="text-lg font-bold text-black truncate block capitalize">{{ product.productName }}
                           </p>
                           <p class="text-md text-gray-400 mt-1">In Stock</p>
                        </div>
                        <p class="text-sm text-gray-600">{{ product.description }}</p>
                        <div class="flex items-center">
                           <p class="text-lg font-semibold text-black cursor-auto my-3">{{
                              displayCurrency(product.sellingPrice) }}</p>
                           <del>
                              <p class="text-sm text-gray-600 cursor-auto ml-2">{{ displayCurrency(product.price) }}</p>
                           </del>
                        </div>

                        <div class="w-full flex justify-center">
                           <button
                              class="w-full border-2 border-indigo-600 flex items-center justify-center text-indigo-600 font-bold px-3 py-2 rounded-md text-sm mt-4 hover:bg-indigo-600 hover:text-white duration-300 mr-3">
                              Buy Now
                           </button>
                           <button
                              class="w-full border-2 border-red-600 flex items-center justify-center text-red-600 font-bold px-3 py-2 rounded-md text-sm mt-4 hover:bg-red-600 hover:text-white duration-300">
                              <mdicon name="cart-minus" class="mr-1" /> Add
                              To Cart
                           </button>
                        </div>
                     </div>
                  </a>
               </div>
            </section>
            <Pagination :currentPage="currentPage" :totalPage="totalPage" @changePage="(val) => currentPage = val" />
         </div>
      </div>
   </div>
</template>
<style scoped>
.product-image {
   text-align: center;
   padding: 20px;
   position: relative;
}

.product-img {
   width: 100%;
   height: calc(100px + .025*(100vw - 320px));
   object-fit: contain;
   transition: opacity .5s, transform 1.25s cubic-bezier(0, 0, .44, 1.18);
}
</style>