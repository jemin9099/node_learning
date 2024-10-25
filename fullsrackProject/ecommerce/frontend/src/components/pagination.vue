<script setup>
import { ref , watch , onMounted , defineProps ,defineEmits} from 'vue'
const props = defineProps({
    currentPage:Number,
    totalPage:Number
})
const emit = defineEmits(['changePage'])
const currentPage = ref(props.currentPage)

watch(() => currentPage.value, () => {
    emit('changePage', currentPage.value)
})
</script>
<template>
    <div id="pagination" class="mt-4">
        <div class="flex justify-center">
           <ul class="pagination bg-white p-2 shadow-sm rounded flex items-center">
               <li class="pagination-item">
                   <span v-if="currentPage === 1"
                       class="rounded-l rounded-sm border border-gray-100 px-3 py-2 cursor-not-allowed no-underline text-gray-600 h-10">&laquo;</span>
                   <a @click.prevent="currentPage = 1"
                       class="rounded-l rounded-sm border-t border-b border-l border-gray-100 px-3 py-2 text-gray-600 hover:bg-gray-100 no-underline"
                       href="#" role="button" rel="prev" v-else>
                       &laquo;
                   </a>
               </li>

               <li class="pagination-item">
                   <button type="button" @click="currentPage--" :disabled="currentPage === 1"
                       aria-label="Go to previous page"
                       class="rounded-sm border border-gray-100 px-3 py-2 hover:bg-gray-100 text-gray-600 no-underline mx-2 text-sm"
                       :class="{ 'cursor-not-allowed': currentPage === 1 }">Previous</button>
               </li>
               <li v-if="currentPage > 1" class="pagination-item" @click="currentPage = (currentPage -1)" >
                   <span
                       class="rounded-sm border border-gray-100 px-3 py-2 hover:bg-gray-100 text-gray-600 no-underline mx-2 cursor-pointer"
                       >{{ currentPage -1 }}</span>
               </li>
               <li class="pagination-item"  >
                   <span
                       class="rounded-sm border border-blue-100 px-3 py-2 bg-blue-100 no-underline text-blue-500 cursor-not-allowed mx-2"
                       >{{ currentPage  }}</span>
               </li>
               <li  v-if="currentPage < totalPage" class="pagination-item" @click="currentPage = (currentPage + 1)" >
                   <span
                       class="rounded-sm border border-gray-100 px-3 py-2 hover:bg-gray-100 text-gray-600 no-underline mx-2 cursor-pointer"
                       >{{ currentPage +1 }}</span>
               </li>
               <li class="pagination-item">
                   <button type="button" @click="currentPage++" :disabled="currentPage === totalPage"
                       aria-label="Go to next page"
                       class="rounded-sm border border-gray-100 px-3 py-2 hover:bg-gray-100 text-gray-600 no-underline mx-2 text-sm"
                       :class="{ 'cursor-not-allowed': currentPage === totalPage }">Next</button>
               </li>

               <li class="pagination-item">
                   <a class="rounded-r rounded-sm border border-gray-100 px-3 py-2 hover:bg-gray-100 text-gray-600 no-underline"
                       href="#" @click.prevent="currentPage = totalPage" rel="next" role="button"
                       v-if="currentPage !== totalPage">&raquo;</a>
                   <span
                       class="rounded-r rounded-sm border border-gray-100 px-3 py-2 hover:bg-gray-100 text-gray-600 no-underline cursor-not-allowed"
                       v-else>&raquo;</span>
               </li>
           </ul>
       </div>
     </div>
</template>
<style   scoped>

</style>