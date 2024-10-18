const backendDomain = 'http://localhost:3000'
const SummaryApi = {
    signup:{
        url:`${backendDomain}/api/signup`,
    },
    login:{
        url:`${backendDomain}/api/login`,
    },
    userDetail:{
        url:`${backendDomain}/api/user-detail`,
    },
    allusers:{
        url:`${backendDomain}/api/users`,
    },
    updateUser:{
        url:(id) => {
            return `${backendDomain}/api/update-user/${id}`
        },
    },
    createProduct:{
        url:`${backendDomain}/api/product/create`,
    },
    getAllProduct:{
        url:`${backendDomain}/api/products`,
    },
    updateProduct:{
        url:(id) => {
            return `${backendDomain}/api/product/update/${id}`
        },
    },
    deleteProduct:{
        url:(id) => {
            return `${backendDomain}/api/product/delete/${id}`
        },
    },
}
const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
}
const authHeaders = { 'Authorization': `JWT ${localStorage.getItem('token')}` }
const formDataHeader = {  'Authorization': `JWT ${localStorage.getItem('token')}`}
export default {SummaryApi,headers, authHeaders,formDataHeader}