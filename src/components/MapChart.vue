<template>
  <div>
    <div ref="target" class=" w-full h-full"></div>
  </div>
</template>

<script setup lang='ts'>
import { ref, onMounted } from 'vue';
import type { MapData,city } from '@/server/type'
import * as echarts from 'echarts'
import mapJson from '@/assets/mapData/china.json'

const props = defineProps<{
  data: MapData
}>()

const myEchars = ref()
const target = ref<HTMLDivElement>()
onMounted(() => {
  echarts.registerMap('china',mapJson as any) //注册地图
  myEchars.value = echarts.init(target.value)
  renderChart()
  window.addEventListener("resize",()=>{
    myEchars.value.resize()
  })
})

type OptionsDataType = {
  timeline:any,
  baseOption:any,
  options:any
}

const renderChart = () => {
  const options:OptionsDataType = {
    //下方时间轴
    timeline: {
      data: props.data.voltageLevel,
      axisType: "category",
      autoPlay: true,
      playInterval: 3000,
      left: "10%",
      right: "10%",
      bottom: "0%",
      width: "80%",
      label: {
        color: "#ddd",
        emphasis: {
          scale: true
        }
      },
      symbolSize: 10,
      lineStyle: {
        color: "#555"
      },
      checkpointStyle: { //选中点的颜色
        borderColor: "#888",
        borderWidth: 2
      },
      controlStyle: {
        showNextBtn: true, //下一步按钮
        showPrevBtn: true, //上一步按钮
        color: "#666",
        borderColor: "#666",
        emphasis: {
          color: "#aaa",
          borderColor: "#aaa"
        }
      }
    },
    //柱形图展示位置范围
    baseOption: {
      grid: {
        right: "2%",
        top: "15%",
        bottom: "10%",
        width: "20%"
      },
      geo:{ //地图配置
        show:true,
        map:"china",
        roam:true, //开启缩放
        zoom:0.8, //初始缩放值
        center:[113.83531246,34.0267395887],//当前地图中心的经纬度
        itemStyle:{ //每个省份样式
          borderColor:"rgba(147,235,248,1)",
          borderWidth:1,
          areaColor:{ //区域的颜色
            type:"radial",
            x:0.5,
            y:0.5,
            r:0.5,
            colorStops:[
              {
                offset:0,
                color:"rgba(147,235,248,0)"
              },
              {
                offset:1,
                color:"rgba(147,235,248,.2)"
              }
            ]
          },
          emphasis:{ //鼠标移入后高亮的颜色 有默认的颜色 这里是进行修改
            areaColor:"#389BB8",
            borderWidth:0
          }
        }
      }
    },
    options: [],//options里面的每一个对象都是柱形图需要展示的数据，一个对象代表一个年份的数据
  }

  //往options里动态添加数据
  props.data.voltageLevel.forEach((item, index) => {
    options.options.push({
      backgroudColor: "#142037",
      title: [
        {
          text: "2019-2023 年度数据统计",
          left: "0%",
          top: "0%",
          textStyle: {
            color: "#ccc",
            fontSize: 30
          }
        },
        {
          id: "statistic",
          text: item + '年数据统计情况',
          right: "0%",
          top: "4%",
          textStyle: {
            color: "#ccc",
            fontSize: 20
          }
        }
      ],
      xAxis: {
        type: "value",
        scale: true, //脱离零刻度
        position: "top",
        splitLine: {
          show: false
        },
        axisLine: { //不显示轴线
          show: false
        },
        axisTick: { //不显示刻度
          show: false
        },
        axisLabel: {
          margin: 2,
          color: "#aaa",
        }
      },
      yAxis: {
        type: "category",
        axisLine: {
          show: true,
          lineStyle: {
            color: "#ddd"
          },
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          interval: 0,
          textStyle: {
            color: '#ddd'
          }
        },
        data: props.data.categoryData[item].map((v:city)=> v.name)
      },
      series: [
        {
          type: "bar",
          zlevel: 1.5,
          itemStyle: {
            color: props.data.colors[index]
          },
          data: props.data.categoryData[item].map((v:city)=> v.value)
        },
        //散点图
        {
          type:"effectScatter",
          coordinateSystem:"geo",//指定为地图
          data:props.data.topData[item],
          symbolSize:function(val:number[]){
            return val[2] / 4 //地图上点的大小
          },
          showEffertOn:'render',
          rippleEffect:{
            brushType:"stroke",//散点图形效果
          },
          label:{
            formatter:'{b}',
            position:"right",
            show:true
          },
          itemStyle:{
            color:props.data.colors[index],
            shadowBlur:5,
            shadowColor:props.data.colors[index]
          }
        }
      ]
    })
  })
  myEchars.value.setOption(options)
}

// watch(()=>props.data.voltageLevel,()=>{
//   renderChart()
// })
</script>

<style></style>