<template>
  <div>
    <div>【关键词条】</div>
    <div ref="target" class=" w-full h-full"></div>
  </div>
</template>

<script setup lang='ts'>
import type {WordCloudData} from '@/server/type'
import { ref,onMounted,watch } from 'vue';
import * as echars from 'echarts'
import 'echarts-wordcloud'

const props = defineProps<{
  data:WordCloudData
}>()

const myEchars = ref()
const target = ref<HTMLDivElement>()

onMounted(()=>{
  myEchars.value = echars.init(target.value)
  renderChart()
  window.addEventListener("resize",()=>{
    myEchars.value.resize()
  })
})

//随机颜色
const randomRGB = ()=>{
  const r = Math.floor(Math.random() * 255)
  const g = Math.floor(Math.random() * 255)
  const b = Math.floor(Math.random() * 255)
  return `rgb(${r},${g},${b})`
}

const renderChart = ()=>{
  const option = {
    series:[
      {
        type:"wordCloud",
        sizeRange:[8,46], //文字大小的范围
        rotationRange:[0,0],//旋转
        gridSize:0, //文字间距
        layoutAnimation:true,//动画
        textStyle:{
          color:randomRGB
        },
        emphasis:{
          textStyle:{
            fontWeight:'bold',
            color:"#000"
          }
        },
        data:props.data.datas
      }
    ]
  }
  myEchars.value.setOption(option)
}

//传递过来的是reactive对象
watch(()=>props.data.datas,()=>{
  renderChart()
})

</script>

<style>

</style>