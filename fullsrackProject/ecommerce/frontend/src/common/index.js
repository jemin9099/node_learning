const backendDomain = 'http://localhost:5000'
const SummaryApi = {
    signup:{
        url:`${backendDomain}/api/signup`,
    },
    login:{
        url:`${backendDomain}/api/login`,
    },
    userDetail:{
        url:`${backendDomain}/api/user-detail`,
    }
}
const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
}
const authHeaders = { 'Authorization': `JWT ${localStorage.getItem('token')}` }
export default {SummaryApi,headers, authHeaders}