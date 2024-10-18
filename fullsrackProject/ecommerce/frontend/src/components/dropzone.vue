<template>
    <label class="uppercase tracking-wide text-black text-xs font-bold mb-2" for="title">
        Upload Image*
    </label>
    <div class="border p-5 rounded-lg cursor-pointer" :class="filesData.length > 0 && 'h-[200px] overflow-auto'" ref="dropZoneRef" @click="open()">
        <div class="flex items-center justify-center gap-3" v-if="filesData.length === 0">
            <mdicon name="tray-arrow-up" class="text-red-700 bg-red-200 p-2 rounded-md" />
            <div>
                <h6 class="text-md font-medium">
                    Drop files here or click to upload.
                </h6>
                <span class="text-sm text-gray-500">Upload any files</span>
            </div>
        </div>
        <div v-else>
            <div class="flex items-center justify-between gap-3 py-4 px-5 border rounded-lg mb-3"
                v-for="(file, index) in filesData" :key="index">
                <div class="flex items-center gap-3">
                    <img :src="file.url" width="50" height="50" class="rounded-full" alt="">
                    <div>
                        <h6 class="text-md font-medium">
                            {{ file.file.name }}
                        </h6>
                        <span class="text-sm text-gray-500">{{ file.file.size / 1000 + ' kb' }}</span>
                    </div>
                </div>
                <div>
                    <button class="flex" @click.stop="filesData.splice(index, 1)">
                        <mdicon name="trash-can-outline" class="text-red-600 bg-red-100 p-2 rounded-full" />
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import {
    useDropZone,
    useFileDialog,
    useObjectUrl,
} from '@vueuse/core'
const { open, onChange } = useFileDialog()
const filesData = ref([])
const dropZoneRef = ref()

const onDrop = DroppedFiles => {
    DroppedFiles?.forEach(file => {
        filesData.value.push({
            file,
            url: useObjectUrl(file).value ?? '',
        })
    },
    )
}

onChange(selectedFiles => {
    if (!selectedFiles)
        return

    for (const file of selectedFiles) {
        filesData.value.push({
            file,
            url: useObjectUrl(file).value ?? '',
        })
    }
})

useDropZone(dropZoneRef, onDrop)

const getFilesData = () => filesData.value.map(f => f.file)
const removeAllFiles = () => {
    filesData.value = []
}
defineExpose({ getFilesData , removeAllFiles })
</script>

<style lang="scss" scoped></style>