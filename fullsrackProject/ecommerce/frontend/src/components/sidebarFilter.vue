<script setup>
import { ref , defineProps , computed , onMounted} from 'vue'
import common from '@/common/index'
import axios from 'axios'
const { SummaryApi, authHeaders } = common
const categoryList = ref()
const props = defineProps({
    filterData: Array
})

const Brand = computed(() => {
    let brand = []
    props.filterData.forEach(item => {
        if(!brand.includes(item.brandName)){
            brand.push(item.brandName)
        }
    })
    return brand
})
const getCategory = async () => {
  try {
    let { data, status } = await axios.get(SummaryApi.getCategory.url ,{ headers: authHeaders })
    if (status === 200) {
      categoryList.value = data.data      
    }
  }
  catch (error) {
    console.log(error);
  }
}
const getCategoryName = (id) => {
  const category = categoryList.value?.find((category) => category._doc._id === id)
  if (category) {
    return category._doc.name
  }
}
const Category = computed(() => {
    let category = []
    props.filterData.forEach(item => {
        console.log(category.includes(item.category))
        if(!category.includes(item.category)){
            category.push(item.category)
        }
    })
    return category
})

onMounted(() => {
    getCategory()
})
</script>
<template>
    <div class="sidebar bg-white shadow-md rounded-lg p-4">
        <h1 class="border-b filter-header flex md:hidden p-3 mb-0 items-center">
            <span class="mr-2 filter-close-btn">
                X
            </span>
            Filters
            <span class="ml-auto uppercase">Reset Filters</span>
        </h1>
        <div class="sidebar__inner ">
            <div class="filter-body">
                <div>
                    <h2 class="border-b filter-title">Brand Options</h2>
                    <div class="mb-30 filter-options">
                        <div class="relative flex gap-x-3 mb-3" v-for="(brand , index) in Brand" :key="index">
                            <div class="flex h-6 items-center">
                                <input id="offers" name="offers" type="checkbox" :value="brand"
                                    class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" />
                            </div>
                            <div class="text-sm leading-6">
                                <label for="offers" class="font-medium text-gray-900">{{brand}}</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <h2 class="border-b filter-title">Category Options</h2>
                    <div class="mb-30 filter-options">
                        <div class="relative flex gap-x-3 mb-3" v-for="(category , index) in Category" :key="index">
                            <div class="flex h-6 items-center">
                                <input id="offers" name="offers" type="checkbox" :value="category"
                                    class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" />
                            </div>
                            <div class="text-sm leading-6">
                                <label for="offers" class="font-medium text-gray-900">{{getCategoryName(category)}}</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.search-section {
    padding: 50px 0;
}

.filter-header {
    font-weight: bold;
    font-size: 30px;
}

.filter-title {
    font-weight: bold;
    font-size: 20px;
    padding-bottom: 14px;
    margin-bottom: 15px;
}

.title {
    font-weight: bold;
    font-size: 20px;
    padding-bottom: 0;
    margin-bottom: 15px;
}

.mb-30 {
    margin-bottom: 30px;
}

.row-grid img {
    margin-bottom: 30px;
    max-width: 100%
}

@media (max-width: 767.98px) {
    .filters-actions {
        position: fixed;
        background: #fff;
        display: flex;
        justify-content: center;
        border: 0;
        bottom: 0;
        z-index: 1031;
        left: 0;
        right: 0;
        bottom: 0;
        box-shadow: 0px -2px 3px rgb(0 0 0 / 21%);
        -webkit-box-shadow: 0px -2px 3px rgb(0 0 0 / 21%);
        -moz-box-shadow: 0px -2px 3px rgb(0 0 0 / 21%);
        height: 50px;
    }

    .filters-actions>div {
        flex: 1;
        text-align: center;

    }

    .filters-actions>div:first-of-type {
        border-right: 1px solid #d6d1ce;
    }

    .filters-actions>div>* {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
    }

    /*.no-border-select.sort-select + .select2-container--default .select2-selection--single{
         background-image: none;
         padding:10px;
       }*/
    .filter-btn,
    .filter-btn:hover,
    .filter-btn:focus,
    .filter-btn:active {
        padding: 14px 20px;
        height: 50px;
        border: 0;
        position: relative;
        z-index: 1;
        background: #fff;
        border-radius: 0;
    }

    .sort-drop .dropdown-menu {
        width: 100%;
        left: 0;
        position: fixed !important;
        transform: translateY(100%) !important;
        bottom: 50px !important;
        top: auto !important;
        text-align: center;
        border-radius: 6px 6px 0 0 !important;
        box-shadow: none !important;
        transition: .3s;
        display: block;
        /* border: 0;*/
        z-index: -11;
    }

    .sort-drop .dropdown-menu .dropdown-item {
        padding: 15px 20px !important;
    }

    .sort-drop .dropdown-menu .dropdown-item:first-child {
        border-radius: 6px 6px 0 0 !important;
    }

    .sort-drop.show .dropdown-menu {
        transform: translateY(0) !important;
    }

    .btn.sort-toggle {
        background-image: none;
        padding: 10px !important;
        width: 100%;
        border: 0;
        height: 50px;
        position: relative;
        z-index: 1;
        background: #fff;
        border-radius: 0;
        font-size: 16px;
        line-height: 22px;
    }

    .sidebar {
        position: fixed;
        transform: translateY(100%);
        -webkit-transform: translateY(100%);
        -moz-transform: translateY(100%);
        -o-transform: translateY(100%);
        transition: .3s;
        -webkit-transition: .3s;
        -moz-transition: .3s;
        -o-transition: .3s;
        left: 0;
        right: 0;
        bottom: 0;
        top: 0;

        background: #fff;

    }

    .sidebar.open {
        z-index: 1032;
        transform: translateY(0);
        -webkit-transform: translateY(0);
        -moz-transform: translateY(0);
        -o-transform: translateY(0);
    }

    .sidebar__inner {
        padding: 15px;
        height: calc(100% - 58px);
        overflow-y: auto;
    }

    .filter-header {
        height: 58px;
    }

    .filter-body {
        padding-right: 0;
    }
}
</style>