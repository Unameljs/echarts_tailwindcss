<template>
  <div>
    <div>【云端报警风险】</div>
    <div ref="target" class=" w-full h-full"></div>
  </div>
</template>

<script setup lang='ts'>
import { ref,onMounted, watch } from 'vue';
import type {RiskData} from '@/server/type'
import * as echarts from 'echarts'

const props = defineProps<{
  data:RiskData
}>()

const myEchars = ref()
const target = ref<HTMLDivElement>()
onMounted(()=>{
  myEchars.value = echarts.init(target.value)
  renderChart()
  window.addEventListener("resize",()=>{
    myEchars.value.resize()
  })
})

const renderChart = ()=>{
  const options = {
    //坐标系配置
    radar:{
      axisName: {
        //标签的样式 华南华北这些
        color: '#05d5ff',
        fontSize: 14
      },
      //指示器 就是标签 华南华北这些
      indicator:props.data.risks.map(v=>({name:v.name,max:100})),
      // 雷达图绘制类型，支持 polygon 和 circle
      shape:'polygon',
      //距离中心的位置 左右 上下 这里刚好是居中
      center:['50%','50%'],
      //整个雷达图的大小
      radius: '80%',
      // 线条角度
      startAngle: 120,
      axisLine: {
        //X轴线条
        lineStyle: {
          color: 'rgba(211, 253, 250, 0.8)'
        }
      },
      //雷达图线的样式
      splitLine: {
        show: true,
        lineStyle: {
          width: 2,
          color: 'rgba(5,213,255,.8)'
        }
      },
      //不拆分区域 true的话 每一块之间有类似遮罩层的东西
      splitArea:{
        show:true
      }
    },
    //坐标极点
    polar:{
      center:['50%','50%'],
      radius:'0%'
    },
    //坐标角度
    angleAxis:{
      min:0,
      interval:5,
      //雷达刻度是否按顺时针增长
      clockwise:false,
    },
    //径向轴
    radiusAxis:{
      min:0,
      interval:20,
      splitLine:{
        show:true
      }
    },
    series:[{
      type:"radar",
      data:[props.data.risks.map(v=>v.value)],
      //环形图
      symbol:"circle",
      symbolSize:10,
      itemStyle:{
        color:"#05D5FF"
      },
      //填充区域
      areaStyle:{
        color:"#05D5FF",
        opacity:0.5
      },
      lineStyle:{
        width:2,
        color:'#05D5FF'
      },
      label:{
        show:true,
        color:"#fff",
      }
    }]
  }
  myEchars.value.setOption(options)
}

watch(()=>props.data.risks,()=>{
  renderChart()
})

</script>

<style>

</style>