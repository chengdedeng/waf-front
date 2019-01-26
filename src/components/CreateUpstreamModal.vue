<template type="text/x-template">
  <div class="modal-mask">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" @click="closeModal"><span
            aria-hidden="true">&times;</span></button>
          <h4 class="modal-title" id="modalTitle">新增路由</h4>
        </div>

        <div class="modal-body">
          <el-form :model="upstreamForm" ref="upstreamForm" label-width="100px">
            <el-form-item
              prop="wafRoute"
              label="路由"
              :rules="[{ required: true, message: '路由地址不能为空', trigger: 'blur' }]">
              <el-input v-model="upstreamForm.wafRoute"></el-input>
            </el-form-item>
            <el-form-item label="开启" prop="isStart">
              <el-switch v-model="upstreamForm.isStart"></el-switch>
            </el-form-item>
          </el-form>
        </div>

        <div class="modal-footer">
          <el-button type="primary" @click="submitForm('upstreamForm')">提交</el-button>
          <el-button @click="resetForm('upstreamForm')">重置</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    mounted () {
      this.$bus.$on('create-upstream-modal', (args) => {
        console.log('c')
      })
    },
    data () {
      return {
        upstreamForm: {
          wafRoute: '',
          isStart: ''
        }
      }
    },
    methods: {
      submitForm (formName) {
        let _this = this
        let form = this.$refs[formName]
        form.validate((valid) => {
          if (valid) {
            let upstreamConfigDtoJson = JSON.stringify(this.upstreamForm)
            this.$http.put(this.$url_config.waf_url + '/api/config/forward/http/upstream', upstreamConfigDtoJson, {
              headers: {
                'Content-Type': 'application/json'
              }
            }).then(function (response) {
              if (response.data.code === 200) {
                _this.$http.get(_this.$url_config.waf_url + '/api/config/forward/http/upstream').then(function (response) {
                  if (response.data['code'] === 200) {
                    form.resetFields()
                    let tableData = []
                    for (let i = 0; i < response.data['value'].length; i++) {
                      tableData[i] = {
                        route: response.data['value'][i]['wafRoute'],
                        switch: response.data['value'][i]['config']['isStart'],
                        servers: response.data['value'][i]['serverConfigs'].length
                      }
                    }
                    _this.$store.dispatch('common/changeUpstreamListTable', tableData)
                  }
                })
              }
            })
            _this.closeModal()
          } else {
            return false
          }
        })
      },
      resetForm (formName) {
        this.$refs[formName].resetFields()
      }
    }
  }
</script>
<style>
  .modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    display: table;
    transition: opacity .3s ease;
  }
</style>
