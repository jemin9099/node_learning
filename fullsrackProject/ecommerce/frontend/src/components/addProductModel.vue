<script setup>
import { ref, defineProps, computed, defineEmits, defineExpose, onMounted } from 'vue'
import productCategory from '@/common/productCategory.js'
import dropzone from '@/components/dropzone.vue'
import common from '@/common/index'
import { useToast } from '@/common/useToast.js'
import axios from 'axios'
const props = defineProps({
  isOpen: Boolean,
  title: String
})
const { SummaryApi, formDataHeader, authHeaders } = common
const { toastTypeError, toastTypeSuccess } = useToast()
const emit = defineEmits(['close', 'refresh'])
const dropzoneRef = ref()
const categoryDropdown = ref(false)
const categoryList = ref()
const isUpdate = ref(false)
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
const handleSubmit = async () => {
  const formData = new FormData()
  if (isFormValid.value) {
    formData.append('productName', inputData.value.productName)
    formData.append('description', inputData.value.description)
    formData.append('brandName', inputData.value.brandName)
    formData.append('category', inputData.value.category._doc._id)
    formData.append('price', inputData.value.price)
    formData.append('sellingPrice', inputData.value.sellingPrice)
    if (!isUpdate.value) {
      if (dropzoneRef.value.getFilesData() && dropzoneRef.value.getFilesData().length > 0) {
        for (const file of dropzoneRef.value.getFilesData()) {
          // let formdata1 = new FormData()
          formData.append('image', file)
        }
        try {
          let { data, status } = await axios.post(SummaryApi.createProduct.url, formData, { headers: formDataHeader })
          if (status === 201) {
            emit('refresh')
            emit('close')
            toastTypeSuccess(data.message)
            inputData.value = {
              productName: '',
              description: '',
              brandName: '',
              category: '',
              price: '',
              sellingPrice: ''
            }
            dropzoneRef.value.removeAllFiles()
          }
        }
        catch (error) {
          toastTypeError(error.response.data.message)
        }
      }
    } else {
      try {
        let { data, status } = await axios.put(SummaryApi.updateProduct.url(inputData.value._id), formData, { headers: formDataHeader })
        if (status === 200) {
          emit('refresh')
          emit('close')
          toastTypeSuccess(data.message)
          inputData.value = {
            productName: '',
            description: '',
            brandName: '',
            category: '',
            price: '',
            sellingPrice: ''
          }

        }
      }
      catch (error) {
        toastTypeError(error.response.data.message)
      }
    }
  }
}

const getCategory = async () => {
  try {
    let { data, status } = await axios.get(SummaryApi.getCategory.url, { headers: authHeaders })
    if (status === 200) {
      categoryList.value = data.data
    }
  }
  catch (error) {
    toastTypeError(error.response.data.message)
  }
}
const open = (product) => {
  isUpdate.value = product ? true : false
  if (product) {
    Object.keys(product).forEach(key => {
      inputData.value[key] = product[key]
    })
    let category = categoryList.value?.find((category) => category._doc._id === inputData.value.category)
    if (category) {
      inputData.value.category = category
    }
  }
}
defineExpose({ open })
onMounted(() => {
  getCategory()
})
</script>
<template>
  <div v-if="isOpen" class="fixed inset-0 z-10 bg-black bg-opacity-50 flex items-center justify-center overflow-auto ">
    <div class="bg-white rounded-lg shadow-lg p-6 max-w-6xl w-full h-100 overflow-auto">
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
            <div class="relative">
              <span class="inline-block w-full rounded-md shadow-sm">
                <button x-ref="button" @click="categoryDropdown = !categoryDropdown" type="button"
                  class="cursor-default relative w-full rounded-md border border-gray-200 bg-gray-200 pl-3 pr-10 py-2 text-left focus:outline-none focus:shadow-outline-blue  transition ease-in-out duration-150 sm:text-sm sm:leading-5">
                  <div class="flex items-center space-x-3">
                    <img :src="inputData.category?.image[0]" alt="" class="flex-shrink-0 h-6 w-6 rounded-full"
                      v-if="inputData.category">
                    <span class="block truncate">{{ inputData.category._doc?.name ? inputData.category._doc.name : 'Select                      Category'}}</span>
                  </div>
                  <span class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <mdicon name="unfold-more-horizontal" class="text-gray-500" />
                  </span>
                </button>
              </span>
              <div class="absolute mt-1 w-full rounded-md bg-white shadow-lg" v-if="categoryDropdown">
                <ul
                  class="max-h-56 rounded-md py-1 text-base leading-6 shadow-xs overflow-auto focus:outline-none sm:text-sm sm:leading-5">
                  <template v-for="(category, index) in categoryList" :key="index">
                    <li class="text-gray-900 cursor-default select-none relative py-3 pl-4 pr-4 hover:bg-red-300"
                      @click="inputData.category = category">
                      <div class="flex flex-row items-center space-x-3">
                        <div class="basis-1/4 flex justify-center">
                          <img :src="category.image[0]" alt="" class="flex-shrink-0 h-[40px] ">
                        </div>
                        <span
                          :class="{ 'font-semibold': inputData.category === category, 'font-normal': !(inputData.category === category) }"
                          class="font-normal block truncate basis-1/2">
                          {{ category._doc.name }}
                        </span>
                      </div>
                      <span class="absolute inset-y-0 right-0 flex items-center pr-4 text-red-600"
                        v-if="inputData.category === category">
                        <mdicon name="check" />
                      </span>
                    </li>
                    <hr>
                  </template>
                </ul>
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
        <dropzone ref="dropzoneRef" v-if="!isUpdate" />
      </div>
      <div class="mt-4 flex justify-end">
        <button @click="$emit('close'), isUpdate = false"
          class="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 me-2">
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