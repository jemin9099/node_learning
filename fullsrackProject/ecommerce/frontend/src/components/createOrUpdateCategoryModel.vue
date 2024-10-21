<script setup>
import { ref, defineProps, computed, defineEmits, defineExpose } from 'vue'
import common from '@/common/index'
import dropzone from '@/components/dropzone.vue'
import axios from 'axios';
import { useToast } from '@/common/useToast.js'
const { SummaryApi, formDataHeader } = common
const { toastTypeError, toastTypeSuccess } = useToast()
const props = defineProps({
    isOpen: Boolean,
    title: String
})
const isUpdate = ref(false)
const emit = defineEmits(['close', 'refresh'])
const dropzoneRef = ref()
const inputData = ref({
    name: '',
    status: false
})
const errors = ref({
    name: '',
})
const nameError = () => {
    errors.value.name = inputData.value.name.length < 1 ? 'Name is required' : ''
}
const handleSubmit = async () => {
    nameError();
    if (!errors.value.name) {
        if (!isUpdate.value) {
            if (dropzoneRef.value.getFilesData() && dropzoneRef.value.getFilesData().length > 0) {
                const formData = new FormData()
                formData.append('name', inputData.value.name)
                formData.append('status', inputData.value.status)
                formData.append('image', dropzoneRef.value.getFilesData()[0])
                try {
                    const { data, status } = await axios.post(SummaryApi.category.url, formData, { headers: formDataHeader })
                    if (status === 201) {
                        emit('refresh')
                        emit('close')
                        toastTypeSuccess(data.message)
                        inputData.value = {
                            name: '',
                            status: false
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
                const { data, status } = await axios.put(SummaryApi.updateCategory.url(inputData.value._id) , inputData.value, { headers: formDataHeader })
                if (status === 200) {
                    emit('refresh')
                    emit('close')
                    toastTypeSuccess(data.message)
                    inputData.value = {
                        name: '',
                        status: false
                    }
                }
            }
            catch (error) {
                toastTypeError(error.response.data.message)
            }   
        }
    }
}

const open = (category) => {
    console.log(category);

    isUpdate.value = category ? true : false
    if (category) {
        Object.keys(category).forEach(key => {
            inputData.value[key] = category[key]
        })
    }
}
defineExpose({ open })
</script>
<template>
    <div v-if="isOpen" class="fixed inset-0 z-10 bg-black bg-opacity-50 flex items-center justify-center overflow-auto">
        <div class="bg-white rounded-lg shadow-lg p-6 max-w-6xl w-full h-100 overflow-auto">
            <h2 class="text-xl font-midium mb-4 text-center">{{ title }}</h2>
            <hr>
            <div class="mt-3">
                <div class="-mx-3  mb-6">
                    <div class="md:w-full px-3 mb-6 md:mb-0">
                        <label class="uppercase tracking-wide text-black text-xs font-bold mb-2" for="company">
                            Name*
                        </label>
                        <input class="w-full  text-black border border-gray-200 rounded py-2 px-4 mb-1" id="company"
                            type="text" placeholder="category name" v-model="inputData.name" @input="nameError">
                        <div v-if="errors.name">
                            <span class="text-red-500 text-xs italic">
                                {{ errors.name }}
                            </span>
                        </div>
                    </div>
                    <div class="px-3 mb-6">
                        <dropzone ref="dropzoneRef" v-if="!isUpdate" />
                    </div>
                    <label for="toggleB"
                        class="flex items-center cursor-pointer uppercase px-3 tracking-wide  text-xs  mb-2">
                        <div class="me-3 text-black font-bold">
                            Status*
                        </div>
                        <div class="relative">
                            <input type="checkbox" id="toggleB" class="sr-only" v-model="inputData.status">
                            <div class="block bg-red-600 w-14 h-8 rounded-full"></div>
                            <div class="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition"></div>
                        </div>
                    </label>
                </div>
            </div>
            <div class="mt-4 flex justify-end">
                <button @click="$emit('close')" class="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 me-2">
                    Close
                </button>
                <button class="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700" @click="handleSubmit()">
                    Save
                </button>
            </div>
        </div>
    </div>
</template>
<style scoped>
input:checked~.dot {
    transform: translateX(100%);
    background-color: white;
}
</style>