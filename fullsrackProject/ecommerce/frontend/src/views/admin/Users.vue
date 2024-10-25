<script setup>
import moment from 'moment';
import axios from 'axios'
import updateUserRole from '@/components/updateUserRole.vue'
import { ref ,watch} from 'vue'
import common from '@/common/index'
import Pagination from '@/components/pagination.vue';
const { SummaryApi, authHeaders } = common

const users = ref([])
const currentPage = ref(1)
const parPage = ref(10)
const totalPage = ref()
const search = ref('')
const getAllUsers = async (search) => {
   try {
      const { data, status } = await axios.get(SummaryApi.allusers.url ,{headers: authHeaders , params: {name:search}})
      if (status === 200) {
         users.value = data.data
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

   return users.value?.slice(startIndex, endIndex)
}
</script>
<template>
   <h1 class="text-2xl font-medium leading-tight ml-3">Users</h1>

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
         </div>

         <div class="shadow">
            <table class="min-w-full leading-normal">
               <thead>
                  <tr>
                     <th
                        class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        NO
                     </th>
                     <th
                        class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Name
                     </th>
                     <th
                        class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Email
                     </th>
                     <th
                        class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Role
                     </th>
                     <th
                        class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Created at
                     </th>
                     <th
                        class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Actions
                     </th>
                  </tr>
               </thead>
               <tbody>
                  <tr v-for="(user, index) in getTableData()" :key="index">
                     <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        {{ index + 1 }}
                     </td>
                     <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <div class="flex items-center">
                           <div class="flex-shrink-0 w-10 h-10">
                              <img class="w-full h-full rounded-full" :src="user.image" alt="" />
                           </div>
                           <div class="ml-3">
                              <p class="text-gray-900 whitespace-no-wrap">
                                 {{ user.name }}
                              </p>
                           </div>
                        </div>
                     </td>
                     <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p class="text-gray-900 whitespace-no-wrap">
                           {{ user.email }}
                        </p>
                     </td>
                     <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p class="text-gray-900 whitespace-no-wrap">
                           {{ user.role }}
                        </p>
                     </td>
                     <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p class="text-gray-900 whitespace-no-wrap">
                           {{ moment(user.createdAt).format('LL') }}
                        </p>
                     </td>
                     <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p class="text-gray-900 whitespace-no-wrap flex gap-3">
                           <span>
                              <updateUserRole :user="user" @update-user="getAllUsers()"/>
                           </span>
                           <span>
                              <mdicon name="delete-outline" class="text-red-500 cursor-pointer" />
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