import { computed } from "vue"

export const useUserData = () => {
    const user = computed(() => {
         return  JSON.parse(localStorage.getItem('user')) 
        })
    return { user } 
}