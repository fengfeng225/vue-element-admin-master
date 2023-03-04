<template>
  <!-- 雷达图 -->
  <div ref="myDiv" class="radar-echart" />
</template>

<script>
// const echarts = require('echarts')
const echarts = require('echarts/lib/echarts') // 引入主模块
require('echarts/lib/chart/radar') // 引入雷达模块
// 引入提示框和标题组件
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')

export default {
  mounted() {
    const myChart = echarts.init(this.$refs.myDiv)
    myChart.setOption({
      title: {
        text: 'Basic Radar Chart'
      },
      // legend: {
      //   data: ['Allocated Budget', 'Actual Spending']
      // },
      radar: {
        // shape: 'circle',
        indicator: [
          { name: '工作效率', max: 100 },
          { name: '考勤', max: 100 },
          { name: '积极性', max: 100 },
          { name: '帮助同事', max: 100 },
          { name: '自主学习', max: 100 },
          { name: '正确率', max: 100 }
        ]
      },
      series: [
        {
          name: 'Budget vs spending',
          type: 'radar',
          data: [
            {
              value: [10, 30, 100, 100, 70, 50],
              name: 'zs'
            },
            {
              value: [70, 60, 100, 90, 40, 80],
              name: 'ls'
            }
          ]
        }
      ]
    })
  }
}
</script>

<style scoped>
.radar-echart {
  width: 600px;
  height: 400px;
}
</style>
