<script setup>
const props = defineProps({
    product: Object
})
const displayCurrency = (price) => {
   return price.toLocaleString('en-US', { style: 'currency', currency: 'INR', minimumFractionDigits: 2 })
}
</script>
<template>
    <div class="w-full bg-white shadow-md rounded-xl "
   >
    <a href="#">
       <div class="product-image duration-500 hover:scale-105 ">
          <img :src="product.image[0]" alt="Product" class=" object-contain rounded-t-xl product-img " />
       </div>

       <div class="px-4 py-3 ">
          <span class="text-gray-400 mr-3 uppercase text-xs">{{ product.brandName }}</span>
          <div class="flex justify-between items-center mb-2">
             <p class="text-sm font-bold lg:text-lg text-black truncate block capitalize">{{ product.productName }}
             </p>
             <p class="md:text-md text-sm text-gray-400 mt-">In Stock</p>
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