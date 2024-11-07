<script setup>
import { onMounted , ref } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css/navigation';
import 'swiper/css';
import img1 from '@/assets/banner/img1.webp'
import img2 from '@/assets/banner/img2.webp'
import img3 from '@/assets/banner/img3.jpg'
import img4 from '@/assets/banner/img4.jpg'
import img5 from '@/assets/banner/img5.webp'
import img1_mobile from '@/assets/banner/img1_mobile.jpg'
import img2_mobile from '@/assets/banner/img2_mobile.webp'
import img3_mobile from '@/assets/banner/img3_mobile.jpg'
import img4_mobile from '@/assets/banner/img4_mobile.jpg'
import img5_mobile from '@/assets/banner/img5_mobile.png'
const modules = [Navigation, Autoplay]
let imgHeight = ref()
let bannerImg = [img1, img2, img3, img4, img5]
let mobileImg = [img1_mobile, img2_mobile, img3_mobile, img4_mobile, img5_mobile]
const handleBanner = () => {
    if (window.innerWidth < 450) {
        imgHeight.value = 'h-52'
        return mobileImg
    } else {
        imgHeight.value = 'h-80'
        return bannerImg
    }
}
onMounted(() => {
    handleBanner()
    window.addEventListener('resize', handleBanner)
})
</script>
<template>
    <div class="w-full p-2 mt-5 banner">
        <swiper :navigation="true" :modules="modules" :autoplay="{
            delay: 2500,
            disableOnInteraction: false,
        }" :loop="true">
            <swiper-slide v-for="(img, index) in handleBanner()" :key="index">
                <img :src="img" alt="" class="w-full" :class="imgHeight">
            </swiper-slide>
        </swiper>
    </div>
</template>
<style scoped>

</style>