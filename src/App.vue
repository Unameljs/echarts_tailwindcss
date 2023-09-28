<template>
  <div class="bg-[url('assets/imgs/bg.png')] bg-cover 
  bg-center h-screen text-white w-screen p-5 flex overflow-hidden m-0" v-if="data">

    <div class="flex-1 mr-5 bg-opacity-50 bg-slate-800 p-3 flex flex-col">
      <!-- 横向柱状图 -->
      <HorizontalBar class="h-1/3 box-border pb-4" :data="data.data.regionData"></HorizontalBar>
      <!-- 雷达图 -->
      <RadarBar class="h-1/3 box-border pb-4" :data="data.data.riskData"></RadarBar>
      <!-- 关系图 -->
      <Relation class="h-1/3" :data="data.data.relationData"></Relation>
    </div>

    <div class="w-1/2 mr-5 flex flex-col">
      <!-- 数据总览 -->
      <TotalData class="bg-opacity-50 bg-slate-800 p-3" :data="data.data.totalData"></TotalData>
      <!-- 地图可视化 -->
      <MapChart class="bg-opacity-50 bg-slate-800 p-3 mt-4 flex-1" :data="data.data.mapData"></MapChart>
    </div>

    <div class="flex-1 mr-5 bg-opacity-50 bg-slate-800 p-3 flex flex-col">
      <!-- 竖向柱状图 -->
      <VerticalBar class="h-1/3 box-border pb-4" :data="data.data.serverData"></VerticalBar>
      <!-- 环形图 -->
      <RingBar class="h-1/3 box-border pb-4" :data="data.data.abnormalData"></RingBar>
      <!-- 文档云图 -->
      <WordCloud class="h-1/3" :data="data.data.wordCloudData"></WordCloud>
    </div>
  </div>
</template>

<script setup lang='ts'>
import HorizontalBar from './components/HorizontalBar.vue';
import RadarBar from './components/RadarBar.vue';
import MapChart from './components/MapChart.vue';
import Relation from './components/Relation.vue';
import RingBar from './components/RingBar.vue';
import TotalData from './components/TotalData.vue';
import VerticalBar from './components/VerticalBar.vue';
import WordCloud from './components/WordCloud.vue';

import { getVisualization } from '@/server/request.ts'
import { ref } from 'vue';
import type {RootObject} from '@/server/type'

const data = ref<RootObject>()

const getData = async ()=>{
  data.value = await getVisualization()
}

getData()

setInterval(()=>{
  getData()
},3000)

</script>

<style>
*{
  padding: auto;
  margin: 0;
}
</style>