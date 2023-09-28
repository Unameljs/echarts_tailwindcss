<template>
  <div class="p-6">
    <div class="text-slate-300 text-center">
      数据总量：
      <span ref="totalCountTarget"
        class="text-gradient font-[Electronic] text-7xl ml-2 mr-2 font-bold">679,473,929</span>
      条记录
    </div>
    <div class="mt-3 flex flex-wrap">
      <div class="w-1/3 text-center text-slate-400 text-sm">
        华北：
        <span ref="city1" class="font-[Electronic] text-[#5dc5ef] text-3xl">8,778,988</span>
      </div>
      <div class="w-1/3 text-center text-slate-400 text-sm">
        东北：
        <span ref="city2" class="font-[Electronic] text-[#5dc5ef] text-3xl">8,778,988</span>
      </div>
      <div class="w-1/3 text-center text-slate-400 text-sm">
        华东：
        <span ref="city3" class="font-[Electronic] text-[#5dc5ef] text-3xl">8,778,988</span>
      </div>
      <div class="w-1/3 text-center text-slate-400 text-sm">
        中南：
        <span ref="city4" class="font-[Electronic] text-[#5dc5ef] text-3xl">8,778,988</span>
      </div>
      <div class="w-1/3 text-center text-slate-400 text-sm">
        西南：
        <span ref="city5" class="font-[Electronic] text-[#5dc5ef] text-3xl">8,778,988</span>
      </div>
      <div class="w-1/3 text-center text-slate-400 text-sm">
        西北：
        <span ref="city6" class="font-[Electronic] text-[#5dc5ef] text-3xl">8,778,988</span>
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import type {TotalData} from '@/server/type'
import { ref,onMounted } from 'vue';

import {CountUp} from 'countup.js'

const props = defineProps<{
  data:TotalData
}>()

const totalCountTarget = ref<HTMLElement>()
const city1 = ref<HTMLElement>()
const city2 = ref<HTMLElement>()
const city3 = ref<HTMLElement>()
const city4 = ref<HTMLElement>()
const city5 = ref<HTMLElement>()
const city6 = ref<HTMLElement>()

onMounted(()=>{
  new CountUp(totalCountTarget.value!,Number(props.data.total)).start()//直接让数据开始自增
  new CountUp(city1.value!,Number(props.data.hb)).start()
  new CountUp(city2.value!,Number(props.data.db)).start()
  new CountUp(city3.value!,Number(props.data.hd)).start()
  new CountUp(city4.value!,Number(props.data.zn)).start()
  new CountUp(city5.value!,Number(props.data.xn)).start()
  new CountUp(city6.value!,Number(props.data.xb)).start()
})
</script>

<style>

</style>