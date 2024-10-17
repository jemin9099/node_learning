<template>
    <div class="max-w-2xl mx-auto">

        <mdicon name="pencil-outline" class=" cursor-pointer" @click="openModal = !openModal" />
        <!-- Main modal -->
        <div class="fixed z-10 overflow-y-auto top-0 w-full left-0 " :class="openModal ? 'block' : 'hidden'" id="modal">
            <div class="flex items-center justify-center min-height-100vh pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div class="fixed inset-0 transition-opacity">
                    <div class="absolute inset-0 bg-gray-900 opacity-75" />
                </div>
                <span class="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
                <div class="inline-block align-center bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                    role="dialog" aria-modal="true" aria-labelledby="modal-headline">
                    <h2 class="text-2xl font-normal text-center p-2">Update User Role</h2>
                    <div class="flex justify-center p-3">
                        <div class="relative w-16 h-16  md:w-28 md:h-28 ">
                            <img :src="user.image"
                                class="cat rounded-full w-full h-full  border-2 border-blue-500">
                            <div
                                class="absolute w-4 h-4 right-0 md:right-2 bottom-1 md:bottom-2 rounded-full bg-green-600 text-white text-xs text-center leading-4">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <title>This account is verified</title>
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z">
                                    </path>
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <label class="font-medium text-gray-800">Name</label>
                        <input type="text" class="w-full outline-none rounded bg-gray-100 p-2 mt-2 mb-3" readonly
                            :value="user.name" />
                        <label class="font-medium text-gray-800">Email</label>
                        <input type="text" class="w-full outline-none rounded bg-gray-100 p-2 mt-2 mb-3" readonly
                          :value="user.email" />
                        <div class="">
                            <label class="font-medium text-gray-800">Role</label>
                           <div class="">
                            <select name="role" id="" class="w-full outline-none rounded bg-gray-100 p-2 mt-2 mb-3" v-model="role"  > 
                                <option value="ADMIN">Admin</option>
                                <option value="GENERAL">General</option>
                               </select>
                           </div>
                        </div>
                    </div>
                    <div class="bg-gray-200 px-4 py-3 text-right">
                        <button type="button" class="py-2 px-4 bg-gray-500 text-white rounded hover:bg-gray-700 mr-2"
                            @click="openModal = false"><i class="fas fa-times"></i> Cancel</button>
                        <button type="button" @click="handleUpdateUser"
                            class="py-2 px-4 bg-blue-500 text-white rounded font-medium hover:bg-blue-700 mr-2 transition duration-500"><i
                                class="fas fa-plus"></i> Update</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref , defineProps , defineEmits } from 'vue'
import common from '@/common/index'
import axios from 'axios';
import { useToast } from '@/common/useToast.js'
const { SummaryApi, authHeaders } = common
const { toastTypeError, toastTypeSuccess } = useToast()
const openModal = ref(false)
const props = defineProps({
    user:Object
})
const emit = defineEmits(['updateUser'])
const role = ref(props.user.role)

const handleUpdateUser = async () => {    
    await axios.put(SummaryApi.updateUser.url(props.user._id), {
        role: role.value
    }, {
        headers: authHeaders
    }).then((res) => {
        if (res.status === 200) {
            openModal.value = false
            emit('updateUser')
            toastTypeSuccess('User updated successfully')
        }
    }).catch((err) => {
        if (err.response) {
            toastTypeError(err.response.data.message)
        }
    })
}
</script>

<style lang="scss" scoped></style>