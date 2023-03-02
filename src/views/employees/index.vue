<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 工具栏页面 -->
      <PageTools :show-before="true">
        <template #before>
          <span>共{{ page.total }}条记录</span>
        </template>
        <template #after>
          <el-button type="success" size="small" @click="$router.push('/import')">Excel导入</el-button>
          <el-button type="danger" size="small" @click="exportData">Excel导出</el-button>
          <el-button type="primary" size="small" icon="el-icon-plus" @click="showDialog = true">新增员工</el-button>
        </template>
      </PageTools>
      <!-- 员工列表 -->
      <el-card v-loading="loading">
        <el-table :data="list" border>
          <el-table-column type="index" label="序号" width="60" align="center" />
          <el-table-column prop="username" label="姓名" sortable align="center" />
          <el-table-column label="头像" align="center" width="110px">
            <!-- 插槽用来显示头像 -->
            <template v-slot="{ row }">
              <img
                v-imagerror="require('@/assets/common/head.jpg')"
                :src="row.staffPhoto"
                alt=""
                style="border-radius: 50%; width: 100px; height: 100px; padding: 10px;"
                @click="showQrCode(row.staffPhoto)"
              >
            </template>
          </el-table-column>
          <el-table-column prop="workNumber" label="工号" sortable align="center" />
          <el-table-column prop="formOfEmployment" label="聘用形式" sortable :formatter="formatEmployment" align="center" />
          <el-table-column prop="departmentName" label="部门" align="center" />
          <el-table-column label="入职时间" sortable align="center">
            <template v-slot="{ row }">
              <!-- 将时间进行格式化 -->
              {{ row.timeOfEntry | formatDate }}
            </template>
          </el-table-column>
          <el-table-column label="账户状态" sortable align="center">
            <template v-slot="{ row }">
              <el-switch :value="row.enableState === 1" />
            </template>
          </el-table-column>
          <el-table-column fixed="right" width="280" label="操作" header-align="center">
            <template v-slot="{ row }">
              <el-button type="text" size="small" @click="$router.push(`/employees/detail/${row.id}`)">查看</el-button>
              <el-button type="text" size="small">转正</el-button>
              <el-button type="text" size="small">调岗</el-button>
              <el-button type="text" size="small">离职</el-button>
              <el-button type="text" size="small">角色</el-button>
              <el-button type="text" size="small" @click="delEmployee(row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-row type="flex" justify="center" align="middle" style="height: 60px">
          <el-pagination layout="prev, pager, next" :total="page.total" :page-size="page.size" :current-page="page.page" @current-change="changePage" />
        </el-row>
      </el-card>
      <!-- sync修饰符，让子组件修改父组件的值 -->
      <add-employee :show-dialog.sync="showDialog" />
      <el-dialog title="二维码" :visible.sync="showCodeDialog">
        <el-row type="flex" justify="center">
          <!-- 二维码 -->
          <canvas ref="myCanvas" />
        </el-row>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { getEmployeeList, delEmployee } from '@/api/employees'
import EmployeeEnum from '@/api/constant/employees'
import AddEmployee from '@/views/employees/components/add-employee.vue'
import { formatDate } from '@/filters'
import QrCode from 'qrcode'

export default {
  components: {
    AddEmployee
  },
  data() {
    return {
      list: [],
      page: {
        page: 1,
        size: 10,
        total: 0 // 分页总数
      },
      loading: false, // 显示加载 遮罩层
      showDialog: false, // 控制新增员工的弹层
      showCodeDialog: false // 控制二维码的弹层
    }
  },
  created() {
    this.getEmployeeList()
  },
  methods: {
    async getEmployeeList() {
      this.loading = true
      const { total, rows } = await getEmployeeList(this.page)
      this.list = rows
      this.page.total = total
      this.loading = false
    },
    changePage(newPage) {
      this.page.page = newPage // 赋值最新页码
      this.getEmployeeList() // 重新渲染
    },
    formatEmployment(row, column, cellValue, index) {
      const obj = EmployeeEnum.hireType.find(item => item.id === cellValue)
      return obj ? obj.value : '未知'
    },
    async delEmployee(id) {
      try {
        await this.$confirm('确定删除该员工吗？', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        })
        await delEmployee(id)
        this.$message.success('删除员工成功!')
        this.getEmployeeList()
      } catch (error) {
        console.log(error)
      }
    },
    async exportData() {
      const headers = {
        '姓名': 'username',
        '手机号': 'mobile',
        '入职日期': 'timeOfEntry',
        '聘用形式': 'formOfEmployment',
        '转正日期': 'correctionTime',
        '工号': 'workNumber',
        '部门': 'departmentName'
      }
      const { rows } = await getEmployeeList({ page: 1, size: this.page.total })
      // const data = rows.map(item => Object.values(headers).map(key => item[key]))  要处理时间格式
      const data = this.formatJson(headers, rows)
      // 复杂表头的两个参数
      const multiHeader = [['姓名', '基本信息', '', '', '', '', '部门']]
      const merges = ['A1:A2', 'B1:F1', 'G1:G2']
      import('@/vendor/Export2Excel').then(excel => {
        excel.export_json_to_excel({
          header: Object.keys(headers),
          data,
          filename: '员工信息表',
          multiHeader,
          merges
        })
      })
    },
    formatJson(headers, rows) {
      return rows.map(item => {
        return Object.values(headers).map(key => {
          if (key === 'timeOfEntry' || key === 'correctionTime') {
            return formatDate(item[key])
          } else if (key === 'formOfEmployment') {
            const obj = EmployeeEnum.hireType.find(item1 => item1.id === item[key])
            return obj ? obj.value : '未知'
          } else {
            return item[key]
          }
        })
      })
    },
    showQrCode(url) {
      if (url) {
        this.showCodeDialog = true
        this.$nextTick(() => {
          QrCode.toCanvas(this.$refs.myCanvas, url)
        })
      } else {
        this.$message.warning('该用户还未上传头像')
      }
    }
  }
}
</script>

<style>

</style>
