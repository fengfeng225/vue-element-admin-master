<template>
  <div>
    <el-row type="flex" justify="end">
      <el-select v-model="currentYear" size="small" style="width: 120px;" @change="dateChange">
        <el-option v-for="item in yearList" :key="item" :label="item" :value="item" />
      </el-select>
      <el-select v-model="currentMonth" size="small" style="width: 120px; margin-left: 10px;" @change="dateChange">
        <el-option v-for="item in 12" :key="item" :label="item" :value="item" />
      </el-select>
    </el-row>
    <!-- 放置日历组件 -->
    <el-calendar v-model="currentDate" simple>
      <template #dateCell="{ date, data }">
        <div class="date-content">
          <span class="text">{{ dayFormat(data) }}</span>
          <span v-if="isWeekend(date)" class="rest">休</span>
        </div>
      </template>
    </el-calendar>
  </div>
</template>

<script>
// import Mcalendar from '@/components/calendar/Mcalendar'

export default {
  components: {
    // Mcalendar
  },
  props: {
    startDate: {
      type: Date,
      default: () => new Date()
    }
  },
  data() {
    return {
      yearList: [],
      currentYear: null, // 当前年
      currentMonth: null, // 当前月
      currentDate: null // 当前日期
    }
  },
  watch: {
    currentDate() {
      this.currentYear = this.currentDate.getFullYear()
      this.currentMonth = this.currentDate.getMonth() + 1
    }
  },
  created() {
    this.currentMonth = this.startDate.getMonth() + 1
    this.currentYear = this.startDate.getFullYear()
    this.yearList = Array.from(Array(11), (v, i) => this.currentYear + i - 5)
    this.dateChange()
  },
  methods: {
    dateChange() {
      this.currentDate = new Date(`${this.currentYear}-${this.currentMonth}-1`)
    },
    dayFormat(data) {
      const date = data.day.split('-')[2]
      return date.startsWith('0') ? date.slice(1) : date
    },
    isWeekend(date) {
      const day = date.getDay()
      return day === 6 || day === 0
    }
  }
}
</script>

<style lang="scss" scoped>
 ::v-deep .el-calendar-day {
  height:  auto;
 }
 ::v-deep .el-calendar-table__row td,::v-deep .el-calendar-table tr td:first-child,  ::v-deep .el-calendar-table__row td.prev{
  border:none;
 }
.date-content {
  height: 40px;
  text-align: center;
  line-height: 40px;
  font-size: 14px;
}
.date-content .rest {
  color: #fff;
  border-radius: 50%;
  background: rgb(250, 124, 77);
  width: 20px;
  height: 20px;
  line-height: 20px;
  display: inline-block;
  font-size: 12px;
  margin-left: 10px;
}
.date-content .text{
  width: 20px;
  height: 20px;
  line-height: 20px;
 display: inline-block;

}
 ::v-deep .el-calendar-table td.is-selected .text{
   background: #409eff;
   color: #fff;
   border-radius: 50%;
 }
 ::v-deep .el-calendar__header {
   display: none
 }
 ::v-deep .el-calendar-table:not(.is-range) td.next,
 ::v-deep .el-calendar-table:not(.is-range) td.prev {
  visibility: hidden;
 }

</style>
