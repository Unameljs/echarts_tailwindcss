<template>
  <div>
    <div>【数据传递效率图】</div>
    <div ref="target" class=" w-full h-full"></div>
  </div>
</template>

<script setup lang='ts'>
import { ref,onMounted, watch } from 'vue';
import type { RelationData } from '@/server/type'
import * as echarts from 'echarts'

const props = defineProps<{
  data:RelationData
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
    xAxis:{
      show:false,
      type:"value"
    },
    yAxis:{
      show:false,
      type:"value"
    },
    series:[
      {
        type:"graph",//展现节点以及节点之间的关系数据
        layout:"none",//图的布局。
        coordinateSystem:"cartesian2d",//使用二维的直角坐标系
        symbolSize:26,//节点大小
        z:3,
        edgeLabel:{//边界的标签文字
          show:true,
          color:"#fff",
          fontSize:14,
          /*标签内容格式器 {a}：系列名。{b}：数据名。{c}：数据值。{@xxx}：数据中名为 'xxx' 的维度的值，
          {@product} 表示名为 'product' 的维度的值。
          {@[n]}：数据中维度 n 的值，如 {@[3]} 表示维度 3 的值，从 0 开始计数。*/
          formatter:(params:any)=>params.data.speed
        },
        label:{//图形上的文本标签
          show:true,
          position:"bottom",
          color:"#5E5E5E", 
        },
        edgeSymbol:['none', 'arrow'],//边两端的标记类型，可以是一个数组分别指定两端，也可以是单个统一指定 常见的可以设置为箭头
        edgeSymbolSize:8,//边两端的标记大小
        data:props.data.relations.map(v=>{
          if(v.id !== 0){
            return {
              name:v.name,
              category:0,
              active:true,
              speed:`${v.speed}kb/s`,
              value:v.value
            }
          }else{
            return{
              name:v.name,
              value:v.value,
              symbolSize:100,
              itemStyle:{
                color:{
                  colorStops:[
                    {
                      offset:0,color:'#157eff'
                    },
                    {
                      offset:1,color:"#35c2ff"
                    }
                  ]
                }
              },
              label:{
                fontSize:14
              }
            }
          }
        }),
        //节点间的关系数据
        links:props.data.relations.map((item)=>({
            source:item.source,
            target:item.target,
            speed:`${item.speed}kb/s`,
            lineStyle:{
              color:"#12b5d0",
              curveness:.2//边的曲度
            },
            label:{
              show:true,//显示标签
              position:'middle',
              offset:[10,0]//偏移
            }
        }))
      },
      {
        type:"lines",
        coordinateSystem:"cartesian2d",
        z:1,
        effect:{ //线特效的配置
          show:true,
          smooth:false,
          trailLength:0, //特效尾迹的长度
          symbol:"arrow", //特效图形的标记
          color:"#208fb5",
          symbolSize:14 //特效标记的大小
        },
        lineStyle:{
          curveness:0.2,
        },
        data:[
          [{coord:[0,300]},{coord:[50,200]}],//一个包含两个到多个二维坐标的数组
          [{coord:[0,100]},{coord:[50,200]}],
          [{coord:[50,200]},{coord:[100,100]}],
          [{coord:[50,200]},{coord:[100,300]}],
        ]
      }
    ]
  }
  myEchars.value.setOption(options)
}

watch(()=>props.data.relations,()=>{
  renderChart()
})
</script>

<style>

</style>