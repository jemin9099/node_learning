<script setup>
import axios from 'axios';
import common from '@/common';
const { SummaryApi, authHeaders } = common
const {data} = await axios.get(SummaryApi.userDetail.url, {headers: authHeaders})
console.log(data)
</script>

<template>
<div class="text-red-600">
  This is a home page
</div> 
</template>
