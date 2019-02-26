<template lang="html">
  <div class="modal fade" id="bsModal" tabindex="-1" role="dialog" aria-labelledby="bsModalLabel" data-toggle="modal"
       data-backdrop="static" data-keyboard="false">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
            aria-hidden="true">&times;</span></button>
          <h4 class="modal-title" id="bsModalLabel">新增Server</h4>
        </div>
        <div class="modal-body">
          <el-form :model="form" ref="form" label-width="100px">
            <el-form-item
              label="IP"
              :rules="[{ required: true, message: 'IP地址不能为空', trigger: 'blur' }]">
              <el-input v-model="form.ip"></el-input>
            </el-form-item>
            <el-form-item
              label="端口"
              :rules="[{ required: true, message: '端口不能为空', trigger: 'blur' }]">
              <el-input v-model="form.port"></el-input>
            </el-form-item>
            <el-form-item
              label="权重"
              :rules="[{ required: true, message: '权重不能为空', trigger: 'blur' }]">
              <el-select v-model="form.weight" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="开启" prop="isStart">
              <el-switch v-model="form.isStart"></el-switch>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('form')">提交</el-button>
              <el-button @click="resetForm('form')">重置</el-button>
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
      $('#bsModal').modal('show')
      this.$bus.$on('create-server-modal', (args) => {
        $('#bsModal').modal('show')
      })
    },
    data () {
      return {
        options: [{
          value: 1,
          label: '1'
        }, {
          value: 2,
          label: '2'
        }, {
          value: 3,
          label: '3'
        }, {
          value: 4,
          label: '4'
        }, {
          value: 5,
          label: '5'
        }, {
          value: 6,
          label: '6'
        }, {
          value: 7,
          label: '7'
        }, {
          value: 8,
          label: '8'
        }, {
          value: 9,
          label: '9'
        }, {
          value: 10,
          label: '10'
        }
        ],
        form: {
          wafRoute: '',
          ip: '',
          port: '',
          isStart: '',
          weight: ''
        }
      }
    },
    beforeDestroy () {
      this.$bus.$off('create-server-modal')
    },
    methods: {
      submitForm (formName) {
        this.form.wafRoute = this.$store.state.common.upstreamTable[this.$store.state.common.rowNum].upstream['wafRoute']
        let _this = this
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let upstreamConfigDtoJson = JSON.stringify(this.form)
            this.$http.put(this.$url_config.waf_url + '/api/config/forward/http/upstream/server', upstreamConfigDtoJson, {
              headers: {
                'Content-Type': 'application/json'
              }
            }).then(function (response) {
              _this.resetForm(formName)
              if (response.data.code === 200) {
                _this.$http.get(_this.$url_config.waf_url + '/api/config/forward/http/upstream').then(function (response) {
                  if (response.data['code'] === 200) {
                    let upstreamTable = []
                    for (let i = 0; i < response.data['value'].length; i++) {
                      upstreamTable[i] = {
                        upstream: response.data['value'][i]
                      }
                    }
                    _this.$store.commit('common/CHANGE_UPSTREAM_LIST_TABLE', upstreamTable)
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
