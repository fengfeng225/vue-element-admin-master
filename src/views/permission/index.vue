<template>
  <div class="dashboard-container">
    <div class="app-container">
      <page-tools>
        <template #after>
          <el-button size="small" type="primary" @click="addPermission(1, '0')">添加权限</el-button>
        </template>
      </page-tools>
      <el-table border :data="list" row-key="id">
        <el-table-column label="名称" prop="name" />
        <el-table-column label="标识" prop="code" />
        <el-table-column label="描述" prop="description" />
        <el-table-column align="center" label="操作">
          <template v-slot="{ row }">
            <el-button v-if="row.type === 1" type="text" @click="addPermission(2, row.id)">添加</el-button>
            <el-button type="text" @click="editPermission(row.id)">编辑</el-button>
            <el-button type="text" @click="delPermission(row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 新增编辑 -->
      <el-dialog :visible.sync="showDialog" :title="showText" @close="btnCancel">
        <el-form ref="permission" label-width="120px" :model="formData" :rules="rules">
          <el-form-item label="名称" prop="name">
            <el-input v-model="formData.name" style="width: 90%;" />
          </el-form-item>
          <el-form-item label="标识" prop="code">
            <el-input v-model="formData.code" style="width: 90%;" />
          </el-form-item>
          <el-form-item label="描述">
            <el-input v-model="formData.description" style="width: 90%;" />
          </el-form-item>
          <el-form-item label="开启">
            <el-switch v-model="formData.enVisible" active-value="1" inactive-value="0" style="width: 90%;" />
          </el-form-item>
        </el-form>
        <template #footer>
          <el-row type="flex" justify="center">
            <el-button size="small" @click="btnCancel">取消</el-button>
            <el-button size="small" type="primary" @click="btnOK">确定</el-button>
          </el-row>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { getPermissionList, addPermission, updatePermission, delPermission, getPermissionDetail } from '@/api/permission'
import { tranListToTreeData } from '@/utils/index'

export default {
  data() {
    return {
      list: [],
      showDialog: false,
      formData: {
        name: '', // 名称
        code: '', // 标识
        description: '', // 描述
        type: '', // 类型 该类型 不需要显示 因为点击添加的时候已经知道类型了
        pid: '', // 因为做的是树 需要知道添加到哪个节点下了
        enVisible: '0'
      },
      rules: {
        name: [{ required: true, message: '名称不能为空', trigger: 'blur' }],
        code: [{ required: true, message: '标识不能为空', trigger: 'blur' }]
      }
    }
  },
  computed: {
    showText() {
      return this.formData.id ? '编辑权限' : '新增权限'
    }
  },
  created() {
    this.getPermissionList()
  },
  methods: {
    async getPermissionList() {
      this.list = tranListToTreeData(await getPermissionList(), '0')
    },
    delPermission(id) {
      this.$confirm('确认删除该权限吗', '提示', {
        cancelButtonText: '取消',
        confirmButtonText: '确定'
      }).then(async() => {
        await delPermission(id)
        this.getPermissionList()
        this.$message.success('删除成功')
      }).catch(error => {
        console.log(error)
      })
    },
    addPermission(type, pid) {
      this.formData.type = type
      this.formData.pid = pid
      this.showDialog = true
    },
    btnOK() {
      this.$refs.permission.validate(async isOK => {
        if (isOK) {
          try {
            if (this.formData.id) {
              // 有id是编辑
              await updatePermission(this.formData)
            } else {
              await addPermission(this.formData)
            }
            this.$message.success('添加权限成功')
            this.getPermissionList()
            this.showDialog = false
          } catch (error) {
            console.log(error)
          }
        }
      })
    },
    btnCancel() {
      this.formData = {
        name: '', // 名称
        code: '', // 标识
        description: '', // 描述
        type: '', // 类型 该类型 不需要显示 因为点击添加的时候已经知道类型了
        pid: '', // 因为做的是树 需要知道添加到哪个节点下了
        enVisible: '0'
      }
      this.$refs.permission.resetFields()
      this.showDialog = false
    },
    async editPermission(id) {
      this.formData = await getPermissionDetail(id)
      this.showDialog = true
    }
  }
}
</script>

<style>

</style>
