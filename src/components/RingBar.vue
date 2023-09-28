<template>
  <div>
    <div>【大区异常处理】</div>
    <div ref="target" class=" w-full h-full"></div>
  </div>
</template>

<script setup lang='ts'>
import { ref,onMounted, watch } from 'vue';
import type {AbnormalData} from '@/server/type'
import * as echarts from 'echarts'

const props = defineProps<{
  data:AbnormalData
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

const getSeriesData = ()=>{
  const series:any[] = []
  
  props.data.abnormals.forEach((item,index)=>{
    //上层
    series.push({
      name:item.name,//饼图显示的标题
      type:"pie",//画一个饼图
      clockWise: false,//逆时针排序
      emphasis: {
        scale: false //鼠标放上去不缩小线条
      },
      radius:[73 - index * 15 +"%",68 - index * 15+"%"], //每条线条之间的距离
      center:["55%","55%"],//让线条填充到饼图的路线上
      label:{ //饼图每条数据的标签 让他不显示
        show:false
      },
      data:[
        {
          value:item.value,
          name:item.name
        },
        {
          value:1000,//数据最大限制 这里数值会影响每条数据线条长度
          itemStyle:{
            color:"rgba(0,0,0,0)",
            borderWidth:0
          },
          tooltip:{
            show:false,//不显示阴影部分的数据
          },
        }
      ]
    })

    //下层
    series.push({
      name:item.name,
      type:"pie",
      silent:true,
      z:1,
      clockWise: false,
      emphasis: {
        scale: false
      },
      radius:[73 - index * 15 +"%",68 - index * 15+"%"],
      center:["55%","55%"],
      label:{
        show:false
      },
      data:[
        {
          value:7.5,
          itemStyle:{
            color:"rgba(3,31,62)",
            borderWidth:0
          },
          tooltip:{
            show:false,
          },
        },
        {
          value:2.5,
          itemStyle:{
            color:"rgba(0,0,0,0)",
            borderWidth:0
          },
          tooltip:{
            show:false,
          },
        }
      ]
    })
  })

  return series
}

const renderChart = ()=>{
  const options = {
    //图例配置 华南华北这些
    legend:{
      show:true,
      icon:"circle",
      top:'14%',
      left:"60%",
      data:props.data.abnormals.map(v=>v.name),
      width:-5,
      itemWidth:10,
      itemHeight:10,
      itemGap:6,
      textStyle:{
        fontSize:12,
        lineHeight:5,
        color:"#ffffff"
      }
    },
    //提示层 放到环上面显示的文字
    tooltip:{
      show:true,
      trigger:"item",
      formatter:"{a}<br>{b}:{c}({d}%)"
    },
    //Y轴
    yAxis:[
      {
        type:"category",
        inverse:true,
        axisLine: {
          show: false
        }
      }
    ],
    //X轴
    xAxis:[{
      show:false,
    }],
    series:getSeriesData()
  }
  myEchars.value.setOption(options)
}

watch(()=>props.data.abnormals,()=>{
  renderChart()
})

</script>

<style>

</style>