<template>
  <div>
    <el-upload ref="uploadRef" class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" :limit="1" :auto-upload="false">
      <template #trigger>
        <el-button type="primary">select file</el-button>
      </template>
    </el-upload>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { UploadInstance } from 'element-plus'

const uploadRef = ref<UploadInstance>()
</script>
