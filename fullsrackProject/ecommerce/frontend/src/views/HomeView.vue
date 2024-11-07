<script setup>
import CategoriesList from '@/components/home/categoriesList.vue';
import banner from '@/components/home/banner.vue';
import categoryWiseProduct from '@/components/home/categoryWiseProduct.vue';
</script>

<template>
<div class="container mx-auto p-4">
  <CategoriesList/>
  <banner/>
  <categoryWiseProduct category="earphones" heading="Top's Earphones"/>
  <categoryWiseProduct category="Watches" heading="New designed watches"/>
  <categoryWiseProduct category="Trimmers" heading="primium trimmers"/>
  <categoryWiseProduct category="Speakers" heading="Top's speakers"/>
  <categoryWiseProduct category="Refrigerator" heading="Populer's Refrigerator"/>
  <categoryWiseProduct category="Processor" heading="Trending's processor"/>
  <categoryWiseProduct category="Printers" heading="Trending's processor"/>
  <categoryWiseProduct category="Mouse" heading="Best Qulity Mouse"/>
  <categoryWiseProduct category="Mobile" heading="Trending's processor"/>
  <categoryWiseProduct category="camera" heading="Trending's processor"/>
  <categoryWiseProduct category="Airdopes" heading="Trending's processor"/>
  <categoryWiseProduct category="TV" heading="Trending's processor"/>
  
</div>
</template>
