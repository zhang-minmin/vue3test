<template>
  <div></div>
</template>

<script setup>
import { ref } from 'vue'
import { getInfo } from '@/api'
import { async } from 'q'

let num = ref(0)

function c() {
  console.log(num)
  num.value++
}
const fun = async () => {
  const { data, total } = await getInfo()
  console.log(data)
}
fun()
</script>
