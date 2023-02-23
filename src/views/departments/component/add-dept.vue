<template>
  <!-- 弹层组件 -->
  <el-dialog :title="showTitle" :visible="showDialog" @close="btnCancel">
    <!-- 表单区域 -->
    <el-form ref="deptForm" :model="formData" :rules="rules" label-width="120px">
      <el-form-item label="部门名称" prop="name">
        <el-input v-model="formData.name" style="width:80%" placeholder="1-50个字符" />
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input v-model="formData.code" style="width:80%" placeholder="1-50个字符" />
      </el-form-item>
      <el-form-item label="部门负责人" prop="manager">
        <el-select v-model="formData.manager" style="width:80%" placeholder="请选择" @focus="getEmployeeSimple">
          <el-option v-for="item in people" :key="item.id" :label="item.username" :value="item.username" />
        </el-select>
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce">
        <el-input v-model="formData.introduce" type="textarea" :rows="3" style="width:80%" placeholder="1-300个字符" />
      </el-form-item>
    </el-form>
    <!-- 按钮区域 -->
    <template #footer>
      <el-row type="flex" justify="center">
        <el-col :span="6">
          <el-button size="small" @click="btnCancel">取消</el-button>
          <el-button size="small" type="primary" @click="btnOK">确定</el-button>
        </el-col>
      </el-row>
    </template>
  </el-dialog>
</template>

<script>
import { getDepartments, addDepartments, getDepartDetail, updateDepartments } from '@/api/departments'
import { getEmployeeSimple } from '@/api/employees'

export default {
  props: {
    showDialog: {
      type: Boolean,
      default: false
    },
    treeNode: {
      type: Object,
      default: null
    }
  },
  data() {
    // 检查部门名称是否重复
    const checkNameRepeat = async(rule, value, callback) => {
      // const isRepeat = this.treeNode.children.every(item => item.name !== value)
      // isRepeat ? callback() : callback(new Error('重复'))
      const { depts } = await getDepartments()
      let isRepeat = false
      if (this.formData.id) {
        // 编辑模式
        isRepeat = depts.filter(item => item.pid === this.treeNode.pid && item.id !== this.treeNode.id).some(item => item.name === value)
      } else {
        // 新增模式
        isRepeat = depts.filter(item => item.pid === this.treeNode.id).some(item => item.name === value)
      }
      // 如果true 表示找到相同的了
      isRepeat ? callback(new Error(`同级部门下已存在${value}部门了`)) : callback()
    }
    // 检查编码是否重复
    const checkCodeRepeat = async(rule, value, callback) => {
      // const isRepeat = this.treeNode.children.every(item => item.name !== value)
      // isRepeat ? callback() : callback(new Error('重复'))
      const { depts } = await getDepartments()
      let isRepeat = false
      if (this.formData.id) {
        // 编辑
        isRepeat = depts.filter(item => item.id !== this.treeNode.id).some(item => item.code === value && value)
      } else {
        // 新增
        isRepeat = depts.some(item => item.code === value && value)
      }
      // 如果true 表示找到相同的了
      isRepeat ? callback(new Error(`已存在${value}编码`)) : callback()
    }
    return {
      formData: {
        name: '',
        code: '',
        manager: '',
        introduce: ''
      },
      rules: {
        name: [{ required: true, message: '部门名称不能为空', trigger: 'blur' }, { min: 1, max: 50, message: '请输入1-50个字符', trigger: 'blur' }, { trigger: 'blur', validator: checkNameRepeat }],
        code: [{ required: true, message: '部门编码不能为空', trigger: 'blur' }, { min: 1, max: 50, message: '请输入1-50个字符', trigger: 'blur' }, { trigger: 'blur', validator: checkCodeRepeat }],
        manager: [{ required: true, message: '部门负责人不能为空', trigger: 'blur' }],
        introduce: [{ required: true, message: '部门介绍不能为空', trigger: 'blur' }, { min: 1, max: 300, message: '请输入1-300个字符', trigger: 'blur' }]
      },
      people: []
    }
  },
  computed: {
    showTitle() {
      return this.formData.id ? '编辑部门' : '新增子部门'
    }
  },
  methods: {
    // 获取员工名称
    async getEmployeeSimple() {
      this.people = await getEmployeeSimple()
    },
    async getDepartDetail(id) {
      this.formData = await getDepartDetail(id)
      // props传参是异步的
    },
    btnOK() {
      this.$refs.deptForm.validate(async isOK => {
        if (isOK) {
          if (this.formData.id) {
            // 编辑
            await updateDepartments(this.formData)
          } else {
            // 提交
            await addDepartments({ ...this.formData, pid: this.treeNode.id })
          }
          this.$emit('addDepts')
          // 并关闭弹层
          this.$emit('update:showDialog', false)
          // 同时会清除表单数据 因为触发了close事件
        }
      })
    },
    // 取消操作
    btnCancel() {
      this.formData = {
        name: '',
        code: '',
        manager: '',
        introduce: ''
      }
      this.$emit('update:showDialog', false)
      this.$refs.deptForm.resetFields() // 重置表单校验字段
    }
  }
}
</script>

<style>

</style>
