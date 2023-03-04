<template>
  <el-calendar v-model="value" :range="range ? range : (simple ? smallRange: '')" :first-day-of-week="day">
    <template #dateCell="{ date, data }">
      <slot name="dateCell" :date="date" :data="data" />
    </template>
  </el-calendar>
</template>

<script>
import { formatDate } from '@/filters/'

export default {
  name: 'Mcalendar',
  props: {
    value: {
      type: Date,
      default: () => new Date()
    },
    range: {
      type: Array,
      default: null
    },
    day: {
      type: Number,
      default: 1
    },
    simple: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      dayList: {
        1: 1,
        2: 2,
        3: 3,
        4: 4,
        5: 5,
        6: 6,
        0: 7
      },
      smallRange: [],
      nowMonth: ''
    }
  },
  watch: {
    value() {
      if (this.value.getMonth() + 1 !== this.nowMonth) {
        this.nowMonth = this.value.getMonth() + 1
        this.initialization()
      }
    }
  },
  created() {
    this.nowMonth = this.value.getMonth() + 1
    this.initialization()
  },
  methods: {
    realDay(day) {
      return this.dayList[day]
    },
    initialization() {
      this.smallRange = []
      const monday = new Date(this.value - (this.realDay(this.value.getDay()) - 1) * 24 * 60 * 60 * 1000)
      const startDate = formatDate(monday)
      const rangeOneMonth = +new Date(startDate) + 34 * 24 * 60 * 60 * 1000 // 目前只能跨两个月
      const endDate = formatDate(rangeOneMonth)
      this.smallRange.push(startDate, endDate)
    }
  }
}
</script>

<style>

</style>
