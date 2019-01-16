<template lang="html">
  <div class="modal fade" id="bsModal" tabindex="-1" role="dialog" aria-labelledby="bsModalLabel" data-toggle="modal"
       data-backdrop="static" data-keyboard="false">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
            aria-hidden="true">&times;</span></button>
          <h4 class="modal-title" id="bsModalLabel">新增路由</h4>
        </div>
        <div class="modal-body">
          <el-form :model="form1" ref="form1" label-width="100px">
            <el-form-item
              prop="wafRoute"
              label="路由"
              :rules="[{ required: true, message: '路由地址不能为空', trigger: 'blur' }]">
              <el-input v-model="form1.wafRoute"></el-input>
            </el-form-item>
            <el-form-item label="开启" prop="isStart">
              <el-switch v-model="form1.isStart"></el-switch>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('form1')">提交</el-button>
              <el-button @click="resetForm('form1')">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    mounted () {
      this.$bus.$on('Upstream', (args) => {
        $('#bsModal').modal('show')
        console.log('show')
      })
      $('#bsModal').on('show.bs.modal', (e) => {
        console.log('show.bs.modal')
      })

      $('#bsModal').on('hidden.bs.modal', (e) => {
        console.log('hidden.bs.modal')
      })
    },
    data () {
      return {
        form1: {
          wafRoute: '',
          isStart: ''
        }
      }
    },
    methods: {
      submitForm (formName) {
        let _this = this
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let upstreamConfigDtoJson = JSON.stringify(this.form1)
            this.$http.put(this.$url_config.waf_url + '/api/config/forward/http/upstream', upstreamConfigDtoJson, {
              headers: {
                'Content-Type': 'application/json'
              }
            }).then(function (response) {
              _this.resetForm(formName)
              if (response.data.code === 200) {
                _this.$http.get(_this.$url_config.waf_url + '/api/config/forward/http/upstream').then(function (response) {
                  if (response.data['code'] === 200) {
                    let tableData = []
                    for (let i = 0; i < response.data['value'].length; i++) {
                      tableData[i] = {
                        route: response.data['value'][i]['wafRoute'],
                        switch: response.data['value'][i]['config']['isStart'],
                        servers: response.data['value'][i]['serverConfigs'].length
                      }
                    }
                    _this.$store.commit('common/setUpstreamTable', tableData)
                  }
                })
              }
            })
            $('#bsModal').modal('hide')
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
