const backendDomain = 'http://localhost:3000'
const SummaryApi = {
    signup:{
        url:`${backendDomain}/api/signup`,
    },
    login:{
        url:`${backendDomain}/api/login`,
    },
    forgotPassword:{
        url:`${backendDomain}/api/requestPasswordReset`,
    },
    resetPassword:{
        url:(id,token) => {
            return `${backendDomain}/api/resetPassword/${id}/${token}`
        },
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
    productById:{
        url:(id) => {
            return `${backendDomain}/api/product/${id}`
        },
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
    category:{
        url:`${backendDomain}/api/category/create`,
    },
    getCategory:{
        url:`${backendDomain}/api/category`,
    },
    updateCategory:{
        url:(id) => {
            return `${backendDomain}/api/category/update/${id}`
        },
    },
    deleteCategory:{
        url:(id) => {
            return `${backendDomain}/api/category/delete/${id}`
        },
    },
    productByCategory:{
        url:(id) => {
            return `${backendDomain}/api/products/category/${id}`
        },
    }
}
const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
}
const authHeaders = { 'Authorization': `JWT ${localStorage.getItem('token')}` }
const formDataHeader = {  'Authorization': `JWT ${localStorage.getItem('token')}`}
export default {SummaryApi,headers, authHeaders,formDataHeader}