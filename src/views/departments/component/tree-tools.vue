<template>
  <el-row type="flex" justify="space-between" align="middle" style="height: 40px; width: 100%;">
    <el-col><span>{{ treeNode.name }}</span></el-col>
    <el-col :span="4">
      <el-row type="flex" justify="end">
        <el-col>{{ treeNode.manager }}</el-col>
        <el-col>
          <el-dropdown @command="operateDepts">
            <span class="do">操作<i class="el-icon-arrow-down" /></span>
            <el-dropdown-menu>
              <el-dropdown-item command="add">添加子部门</el-dropdown-item>
              <el-dropdown-item v-if="!isRoot" command="edit">编辑部门</el-dropdown-item>
              <el-dropdown-item v-if="!isRoot" command="del">删除部门</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import { delDepartments } from '@/api/departments'
export default {
  props: {
    treeNode: {
      required: true,
      type: Object
    },
    isRoot: {
      default: false,
      type: Boolean
    }
  },
  methods: {
    operateDepts(type) {
      if (type === 'add') {
        // 这里是添加的操作
        this.$emit('addDept', this.treeNode)
      } else if (type === 'edit') {
        // 这里是编辑操作
        this.$emit('editDept', this.treeNode)
      } else {
        // 这里是删除的操作
        this.$confirm('您确定要删除该组织部门吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(() => {
          return delDepartments(this.treeNode.id)
        }).then(() => {
          this.$emit('delDepts')
          this.$message.success('删除部门成功')
        })
      }
    }
  }
}
</script>

<style scoped>
.do {
  cursor: pointer;
}
</style>
