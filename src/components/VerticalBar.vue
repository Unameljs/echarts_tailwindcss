<template>
  <div>
    <div>【服务资源占比】</div>
    <div ref="target" class=" w-full h-full"></div>
  </div>
</template>

<script setup lang='ts'>
import type {ServerData} from '@/server/type'
import { ref,onMounted,watch } from 'vue';
import * as echars from 'echarts'

const props = defineProps<{
  data:ServerData
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

const renderChart = ()=>{
  const option = {
    xAxis:{
      type:"category",
      data:props.data.servers.map(v=>v.name),
      axisLabel:{
        color:"#9EB1C8"
      }
    },
    yAxis:{
      show:false,
      type:"value",
      max:function(value:any){
        return parseInt(value.max * 1.2 as any)
      }
    },
    grid:{
      top:16,
      right:0,
      bottom:26,
      left:-26,
      containLabel:true
    },
    series:[
      {
        type:"bar",
        data:props.data.servers.map(v=>({name:v.value,value:v.value})),
        itemStyle:{
        color:"#5D98CE",
        // barBorderRadius:5,
        shadowColor:"rgba(0,0,0,0.3)",
        shadowBlur:5
      },
      barWidth:12,
      label:{
        //显示标签 即type:"category"这一轴 标签的值是轴的data
        show:true,
        positon:'top',
        color:"#fff",
        //修改标签显示的文字 变成百分比 {c}是固定的 代表值
        formatter:'{c}%'
      }
      }
    ]
  }
  myEchars.value.setOption(option)
}

//传递过来的是reactive对象
watch(()=>props.data.servers,()=>{
  renderChart()
})

</script>

<style>

</style>