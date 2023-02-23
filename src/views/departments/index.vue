<template>
  <div v-loading="loading" class="dashboard-container">
    <div class="app-container">
      <el-card class="tree-card">
        <TreeTools :tree-node="company" :is-root="true" @addDept="addDept" />
        <el-tree :data="departs" :props="defaultProps" default-expand-all>
          <!-- 插槽内容 -->
          <template v-slot:default="{ data }">
            <TreeTools :tree-node="data" @delDepts="getDeparts" @editDept="editDept" @addDept="addDept" />
          </template>
        </el-tree>
      </el-card>
    </div>
    <!-- 新增部门组件 -->
    <AddDept ref="addDept" :show-dialog.sync="showDialog" :tree-node="node" @addDepts="getDeparts" />
  </div>
</template>

<script>
import TreeTools from '@/views/departments/component/tree-tools.vue'
import AddDept from '@/views/departments/component/add-dept.vue'
import { getDepartments } from '@/api/departments'
import { tranListToTreeData } from '@/utils'

export default {
  components: {
    TreeTools,
    AddDept
  },
  data() {
    return {
      departs: [],
      defaultProps: {
        label: 'name'
      },
      company: {},
      showDialog: false,
      node: null,
      laoding: false
    }
  },
  created() {
    this.getDeparts()
  },
  methods: {
    async getDeparts() {
      this.loading = true
      const result = await getDepartments()
      this.company = { name: result.companyName, manager: '负责人', id: '' }
      this.departs = tranListToTreeData(result.depts, '') // 需要将其转化成树形结构
      this.loading = false
    },
    addDept(node) {
      this.showDialog = true
      this.node = node // 表示当前点击的部门
    },
    editDept(node) {
      this.showDialog = true
      this.node = node // 表示当前点击的部门
      this.$refs.addDept.getDepartDetail(node.id)
    }
  }
}
</script>

<style scoped>
.tree-card {
  padding: 30px  140px;
  font-size:14px;
}
</style>
