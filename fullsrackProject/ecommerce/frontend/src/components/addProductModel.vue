<script setup>
import { ref, defineProps, computed } from 'vue'
import productCategory from '@/common/productCategory.js'
import dropzone from '@/components/dropzone.vue'
import common from '@/common/index'
import { useToast } from '@/common/useToast.js'
import axios from 'axios'
const props = defineProps({
  isOpen: Boolean,
  title: String
})
const { SummaryApi, formDataHeader } = common
const { toastTypeError, toastTypeSuccess } = useToast()
const dropzoneRef = ref()
// const formData = ref(new FormData())
const inputData = ref({
  productName: '',
  description: '',
  brandName: '',
  category: '',
  price: '',
  sellingPrice: ''
})
const productNameError = computed(() => {
  return inputData.value.productName.length < 1 ? 'Product name is required' : ''
})
const descriptionError = computed(() => {
  return inputData.value.description.length < 1 ? 'Description is required' : ''
})
const brandNameError = computed(() => {
  return inputData.value.brandName.length < 1 ? 'Brand name is required' : ''
})
const categoryError = computed(() => {
  return inputData.value.category.length < 1 ? 'Category is required' : ''
})
const priceError = computed(() => {
  return inputData.value.price.length < 1 ? 'Price is required' : ''
})
const sellingPriceError = computed(() => {
  return inputData.value.price.length < 1 ? 'Selling price is required' : ''
})
const isFormValid = computed(() => {
  return !productNameError.value && !descriptionError.value && !brandNameError.value && !categoryError.value && !priceError.value && !sellingPriceError.value
})
const handleSubmit = async() => {
  const formData = new FormData()
  if (isFormValid.value) {
    formData.append('productName', inputData.value.productName)
    formData.append('description', inputData.value.description)
    formData.append('brandName', inputData.value.brandName)
    formData.append('category', inputData.value.category)
    formData.append('price', inputData.value.price)
    formData.append('sellingPrice', inputData.value.sellingPrice)
    if (dropzoneRef.value.getFilesData() && dropzoneRef.value.getFilesData().length > 0) {
      for (const file of dropzoneRef.value.getFilesData()) {
        // let formdata1 = new FormData()
        formData.append('image', file)
      }
      let {data} = await axios.post(SummaryApi.createProduct.url, formData, {headers: formDataHeader})
    }
  }
}
</script>
<template>
  <div v-if="isOpen" class="fixed inset-0 z-10 bg-black bg-opacity-50 flex items-center justify-center">
    <div class="bg-white rounded-lg shadow-lg p-6 max-w-6xl w-full">
      <h2 class="text-xl font-midium mb-4 text-center">{{ title }}</h2>
      <hr>
      <div class="mt-3">
        <div class="-mx-3 md:flex mb-6">
          <div class="md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="uppercase tracking-wide text-black text-xs font-bold mb-2" for="company">
              Product Name*
            </label>
            <input class="w-full bg-gray-200 text-black border border-gray-200 rounded py-2 px-4 mb-3" id="company"
              v-model="inputData.productName" type="text" placeholder="product name">
            <div v-if="productNameError">
              <span class="text-red-500 text-xs italic">
                {{ productNameError }}
              </span>
            </div>
          </div>
          <div class="md:w-1/2 px-3">
            <label class="uppercase tracking-wide text-black text-xs font-bold mb-2" for="title">
              Brand Name*
            </label>
            <input class="w-full bg-gray-200 text-black border border-gray-200 rounded py-2 px-4 mb-3" id="title"
              v-model="inputData.brandName" type="text" placeholder="Brand name">
            <div v-if="brandNameError">
              <span class="text-red-500 text-xs italic">
                {{ brandNameError }}
              </span>
            </div>
          </div>
        </div>
        <div class="-mx-3 md:flex mb-6">
          <div class="md:w-full px-3">
            <label class="uppercase tracking-wide text-black text-xs font-bold mb-2" for="application-link">
              Description*
            </label>
            <textarea class="w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3"
              id="application-link" type="text" placeholder="description here..."
              v-model="inputData.description"></textarea>
            <div v-if="descriptionError">
              <span class="text-red-500 text-xs italic">
                {{ descriptionError }}
              </span>
            </div>
          </div>
        </div>
        <div class="-mx-3 md:flex mb-2">
          <div class="md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="uppercase tracking-wide text-black text-xs font-bold mb-2" for="location">
              Category*
            </label>
            <div>
              <select class="w-full bg-gray-200 border border-gray-200 text-black text-xs py-3 px-4 pr-8 mb-3 rounded"
                v-model="inputData.category" id="location">
                <option v-for="category in productCategory" :key="category.id" :value="category.value">{{ category.label
                  }}</option>
              </select>
              <div v-if="categoryError">
                <span class="text-red-500 text-xs italic">
                  {{ categoryError }}
                </span>
              </div>
            </div>
          </div>
          <div class="md:w-1/2 px-3">
            <label class="uppercase tracking-wide text-black text-xs font-bold mb-2" for="title">
              Price*
            </label>
            <input class="w-full bg-gray-200 text-black border border-gray-200 rounded py-2 px-4 mb-3" id="title"
              v-model="inputData.price" type="number" placeholder="price">
            <div v-if="priceError">
              <span class="text-red-500 text-xs italic">
                {{ priceError }}
              </span>
            </div>
          </div>
          <div class="md:w-1/2 px-3">
            <label class="uppercase tracking-wide text-black text-xs font-bold mb-2" for="title">
              Selling Price*
            </label>
            <input class="w-full bg-gray-200 text-black border border-gray-200 rounded py-2 px-4 mb-3"
              v-model="inputData.sellingPrice" id="title" type="number" placeholder="selling price">
            <div v-if="sellingPriceError">
              <span class="text-red-500 text-xs italic">
                {{ sellingPriceError }}
              </span>
            </div>
          </div>
        </div>
        <dropzone ref="dropzoneRef" />
      </div>
      <div class="mt-4 flex justify-end">
        <button @click="$emit('close')" class="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 me-2">
          Close
        </button>
        <button @click="handleSubmit()" class="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
          Save
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>