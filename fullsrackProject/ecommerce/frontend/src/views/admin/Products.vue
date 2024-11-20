<script setup>
import moment from 'moment';
import axios from 'axios'
import addProductModel from '@/components/addProductModel.vue';
import { ref, watch , onMounted } from 'vue'
import common from '@/common/index'
import { useToast } from '@/common/useToast.js'
import Pagination from '@/components/pagination.vue';
const { SummaryApi, authHeaders } = common
const { toastTypeError, toastTypeSuccess } = useToast()
const Products = ref([])
const isOpen = ref(false)
const currentPage = ref(1)
const parPage = ref(10)
const totalPage = ref()
const addAndUpdate = ref()
const search = ref('')
const getAllUsers = async (search) => {
    try {
        const { data, status } = await axios.get(SummaryApi.getAllProduct.url, { headers: authHeaders, params: { search: search } })
        if (status === 200) {
            Products.value = data.data
            totalPage.value = Math.ceil(data.data.length / parPage.value)
        }
    }
    catch (error) {
        console.log(error);
    }
}
getAllUsers()
watch(() => search.value, () => {
    getAllUsers(search.value)
})
const getTableData = () => {
    const startIndex = (currentPage.value - 1) * parPage.value
    const endIndex = currentPage.value * parPage.value

    return Products.value?.slice(startIndex, endIndex)
}

const deleteProduct = async (product) => {
    try {
        const { status } = await axios.delete(SummaryApi.deleteProduct.url(product._id), { headers: authHeaders })
        if (status === 200) {
            getAllUsers()
            toastTypeSuccess('Product deleted successfully')
        }
    }
    catch (error) {
        toastTypeError(error.response.data.message)
    }
}

const displayCurrency = (price) => {
    return price.toLocaleString('en-US', { style: 'currency', currency: 'INR' , minimumFractionDigits: 2})
}
onMounted(() => {
})
</script>
<template>
    <addProductModel ref="addAndUpdate" title="Add Product" :isOpen="isOpen" @close="isOpen = false"   @refresh="getAllUsers()"/>
    <h1 class="text-2xl font-medium leading-tight ml-3">Products</h1>
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
                        <span class="ml-2">Add Product</span>
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
                                Product Name
                            </th>
                            <th
                                class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Brand Name
                            </th>
                            <th
                                class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Category
                            </th>
                            <th
                                class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Price
                            </th>
                            <th
                                class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Selling Price
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
                        <tr v-for="(product, index) in getTableData()" :key="index">
                            <td class="px-5 py-5 border-b text-center border-gray-200 bg-white text-sm">
                                {{ index + 1 }}
                            </td>
                            <td class="px-5 py-5 border-b border-gray-200  bg-white text-sm">
                                <div class="flex items-center justify-center">
                                    <div class="flex-shrink-0  h-10">
                                        <img class=" h-[40px]" :src="product.image[0]" alt="" />
                                    </div>
                                </div>
                            </td>
                            <td class="px-5 py-5 border-b border-gray-200  bg-white text-sm">
                                <div class="flex items-center justify-center">
                                    <div class="ml-3">
                                        <p class="text-gray-900 whitespace-no-wrap">
                                            {{ product._doc.productName }}
                                        </p>
                                    </div>
                                </div>
                            </td>
                            <td class="px-5 py-5 border-b text-center border-gray-200 bg-white text-sm">
                                <p class="text-gray-900 whitespace-no-wrap">
                                    {{ product._doc.brandName }}
                                </p>
                            </td>
                            <td class="px-5 py-5 border-b text-center border-gray-200 bg-white text-sm">
                                <p class="text-gray-900 whitespace-no-wrap">
                                    {{  product._doc.category.name }}
                                </p>
                            </td>
                            <td class="px-5 py-5 border-b text-center border-gray-200 bg-white text-sm">
                                <p class="text-gray-900 whitespace-no-wrap">
                                    {{ displayCurrency(product._doc.price) }}
                                </p>
                            </td>
                            <td class="px-5 py-5 border-b text-center border-gray-200 bg-white text-sm">
                                <p class="text-gray-900 whitespace-no-wrap">
                                    {{ displayCurrency(product._doc.sellingPrice) }}
                                </p>
                            </td>
                            <td class="px-5 py-5 border-b text-center border-gray-200 bg-white text-sm">
                                <p class="text-gray-900 whitespace-no-wrap">
                                    {{ moment(product._doc.createdAt).format('LL') }} 
                                </p>
                            </td>
                            <td class="px-5 py-5 border-b text-center border-gray-200 bg-white text-sm">
                                <p class="text-gray-900 whitespace-no-wrap justify-center flex gap-3">
                                    <span>      
                                        <mdicon name="pencil-outline" class=" cursor-pointer" @click="isOpen= true , addAndUpdate.open(product._doc)" />
                                    </span>
                                    <span>
                                        <mdicon name="delete-outline" class="text-red-500 cursor-pointer" @click="deleteProduct(product._doc)"/>
                                    </span>

                                </p>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <Pagination :currentPage="currentPage" :totalPage="totalPage" @changePage="(val) => currentPage = val" />
        </div>
    </div>
</template>
<style scoped></style>