<script setup>
import { ref , watch } from 'vue';
import moment from 'moment';
import axios from 'axios'
import createOrUpdateCategoryModel from '@/components/createOrUpdateCategoryModel.vue';
import common from '@/common/index'
import { useToast } from '@/common/useToast.js'
const { SummaryApi, authHeaders } = common
const { toastTypeError, toastTypeSuccess } = useToast()
const categories = ref([])
const isOpen = ref(false)
const currentPage = ref(1)
const parPage = ref(10)
const totalPage = ref()
const addAndUpdate = ref()
const search = ref('')
const getAllCategories = async (search) => {
    try {
        const { data, status } = await axios.get(SummaryApi.getCategory.url, { headers: authHeaders, params: { search: search } })
        if (status === 200) {
            categories.value = data.data
            totalPage.value = Math.ceil(data.data.length / parPage.value)
        }
    }
    catch (error) {
        console.log(error);
    }
}
getAllCategories()
watch(() => search.value, () => {
    getAllCategories(search.value)
})

const updateStatus = (category , status) => {
   category.status = status
   updateCategory(category)    
}

const updateCategory = async (category) => {
    try {
        const { data, status } = await axios.put(SummaryApi.updateCategory.url(category._id) , category, { headers: authHeaders })
        if (status === 200) {
            toastTypeSuccess(data.message)
            getAllCategories()
        }
    }
    catch (error) {
        toastTypeError(error.response.data.message)
    }
}
const getTableData = () => {
    const startIndex = (currentPage.value - 1) * parPage.value
    const endIndex = currentPage.value * parPage.value

    return categories.value?.slice(startIndex, endIndex)
}

const deleteCategory = async (category) => {
    try {
        const { data, status } = await axios.delete(SummaryApi.deleteCategory.url(category._id) , { headers: authHeaders })
        if (status === 200) {
            toastTypeSuccess(data.message)
            getAllCategories()
        }
    }
    catch (error) {
        toastTypeError(error.response.data.message)
    }
}
</script>
<template>
    <createOrUpdateCategoryModel ref="addAndUpdate" title="Add Category" :isOpen="isOpen" @close="isOpen = false" @refresh="getAllCategories()"/>
    <h1 class="text-2xl font-medium leading-tight ml-3">Category</h1>
    <div class="bg-white rounded-lg m-3 p-3 shadow-md">
        <div class="inline-block min-w-full  rounded-lg overflow-hidden">
            <div class="mb-4 flex justify-between items-center">
                <div class="flex-1 pr-4">
                    <div class="relative md:w-1/3">
                        <input type="search"
                            class="w-full pl-10 pr-4 py-2 rounded-lg border focus:outline-none focus:shadow-outline text-gray-600 font-medium"
                            placeholder="Search..." v-model="search">
                        <div class="absolute top-0 left-0 inline-flex items-center p-2">
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-gray-400" viewBox="0 0 24 24"
                                stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round"
                                stroke-linejoin="round">
                                <rect x="0" y="0" width="24" height="24" stroke="none"></rect>
                                <circle cx="10" cy="10" r="7" />
                                <line x1="21" y1="21" x2="15" y2="15" />
                            </svg>
                        </div>
                    </div>
                </div>
                <div>
                    <button
                        class="border-2 border-red-600  hover:bg-red-600 text-red-600 hover:text-white font-bold py-2 px-4 rounded flex me-3"
                        @click="isOpen = true">
                        <mdicon name="plus" />
                        <span class="ml-2">Add Category</span>
                    </button>
                </div>
            </div>
            <div class="shadow">
                <table class="min-w-full leading-normal">
                    <thead>
                        <tr>
                            <th
                                class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                NO
                            </th>
                            <th
                                class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Image
                            </th>
                            <th
                                class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Category Name
                            </th>
                            <th
                                class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Status
                            </th>
                            <th
                                class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Created at
                            </th>
                            <th
                                class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(category, index) in getTableData()" :key="index">
                            <td class="px-5 py-5 border-b text-center border-gray-200 bg-white text-sm">
                                {{ index + 1 }}
                            </td>
                            <td class="px-5 py-5 border-b border-gray-200  bg-white text-sm">
                                <div class="flex items-center justify-center">
                                    <div class="flex-shrink-0  h-10">
                                        <img class=" h-[40px]" :src="category.image[0]" alt="" />
                                    </div>
                                </div>
                            </td>
                            <td class="px-5 py-5 border-b border-gray-200  bg-white text-sm">
                                <div class="flex items-center justify-center">
                                    <div class="ml-3">
                                        <p class="text-gray-900 whitespace-no-wrap">
                                            {{ category._doc.name }}
                                        </p>
                                    </div>
                                </div>
                            </td>
                            <td class="px-5 py-5 border-b text-center border-gray-200 bg-white text-sm">
                                <p class="text-gray-900 whitespace-no-wrap">
                                    <label for="toggleB"
                                    class="flex items-center justify-center cursor-pointer uppercase px-3 tracking-wide  text-xs  mb-2">
                                   
                                    <div class="relative">
                                        <input type="checkbox" id="toggleB" class="sr-only" :checked="category._doc.status" @input="updateStatus(category._doc, $event.target.checked)">
                                        <div class="block bg-red-600 w-14 h-8 rounded-full"></div>
                                        <div class="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition"></div>
                                    </div>
                                </label>
                                </p>
                            </td>
                            <td class="px-5 py-5 border-b text-center border-gray-200 bg-white text-sm">
                                <p class="text-gray-900 whitespace-no-wrap">
                                    {{ moment(category._doc.createdAt).format('LL') }} 
                                </p>
                            </td>
                            <td class="px-5 py-5 border-b text-center border-gray-200 bg-white text-sm">
                                <p class="text-gray-900 whitespace-no-wrap justify-center flex gap-3">
                                    <span>      
                                        <mdicon name="pencil-outline" class=" cursor-pointer" @click="isOpen= true , addAndUpdate.open(category._doc)" />
                                    </span>
                                    <span>
                                        <mdicon name="delete-outline" class="text-red-500 cursor-pointer" @click="deleteCategory(category._doc)"/>
                                    </span>
                                </p>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div id="pagination">
                <div class="flex justify-end">
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

                        <li v-for="page in totalPage" class="pagination-item" :key="page.name">
                            <span
                                class="rounded-sm border border-blue-100 px-3 py-2 bg-blue-100 no-underline text-blue-500 cursor-not-allowed mx-2"
                                v-if="currentPage === page">{{ page }}</span>
                            <a class="rounded-sm border border-gray-100 px-3 py-2 hover:bg-gray-100 text-gray-600 no-underline mx-2"
                                href="#" v-else @click.prevent="currentPage = page" role="button">{{ page }}</a>
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
        </div>
    </div>
</template>

<style  scoped>
input:checked~.dot {
    transform: translateX(100%);
    background-color: white;
}
</style>