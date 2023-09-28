<template>
  <div>
    <div>【大区数据信息】</div>
    <div ref="target" class=" w-full h-full"></div>
  </div>
</template>

<script setup lang='ts'>
import type {RegionData} from '@/server/type'
import { ref,onMounted,watch } from 'vue';
import * as echars from 'echarts'
// import type {EChartsType} from 'echarts'

const props = defineProps<{
  data:RegionData
}>()

const myEchars = ref()
const target = ref<HTMLDivElement>()
onMounted(()=>{
  //在挂载之后才能拿到DOM元素 这时初始化echarts
  myEchars.value = echars.init(target.value)
  renderChart()
  window.addEventListener("resize",()=>{
    myEchars.value.resize()
  })
})

const renderChart = ()=>{
  const option = {
    //X轴数据
    xAxis:{
      show:false,
      type:"value",
      max:function(value:any){
        return parseInt(value.max * 1.2 as any)
      }
    },
    //Y轴数据
    yAxis:{
      type:'category',
      data:props.data.regions.map(v=>v.name),
      inverse:true,
      axisLine:{
        show:false
      },
      axisTick:{
        show:false
      },
      axisLabel:{
        color:"#9eb1c8"
      }
    },
    //图表距离上下左右的位置
    grid:{
      top:0,
      right:0,
      bottom:0,
      left:0,
      containLabel:true
    },
    //核心配置
    series:[{
      type:"bar",
      data:props.data.regions.map(v=>({
        name:v.name,
        value:v.value
      })),
      showBackground:true,
      backgroundStyle:{
        color:"rgba(180,180,180,0.2)"
      },
      itemStyle:{
        color:"#5D98CE",
        borderRadius:5,
        shadowColor:"rgba(0,0,0,0.3)",
        shadowBlur:5
      },
      barWidth:12,
      label:{
        show:true,
        positon:'right',
        color:"#fff"
      }
    }]
  }
  myEchars.value.setOption(option)
}

//传递过来的是reactive对象
watch(()=>props.data.regions,()=>{
  renderChart()
})
</script>

<style>

</style>