<template lang="html">
  <div class="modal fade" id="bsModal" tabindex="-1" role="dialog" aria-labelledby="bsModalLabel" data-toggle="modal"
       data-backdrop="static" data-keyboard="false">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
            aria-hidden="true">&times;</span></button>
          <h4 class="modal-title" id="bsModalLabel">服务器管理</h4>
        </div>
        <div class="modal-body">
          <el-table
            :data="serversConfig"
            style="width: 100%"
            :row-class-name="tableRowClassName">
            <el-table-column
              fixed
              prop="ip"
              label="IP">
            </el-table-column>
            <el-table-column
              fixed
              prop="port"
              label="端口">
            </el-table-column>
            <el-table-column
              fixed
              prop="config.weight"
              label="权重">
            </el-table-column>
            <el-table-column
              fixed
              prop="health"
              label="健康">
            </el-table-column>
            <el-table-column
              label="状态">
              <template slot-scope="scope">
                <el-tag
                  :type="scope.row.config.isStart === true ? 'primary' : 'success'"
                  close-transition>{{scope.row.config.isStart===true?'已激活':'未激活'}}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column
              prop="switch"
              fixed="right"
              label="开关"
              width="150">
              <template slot-scope="scope">
                <el-switch
                  @change="handleSwitch($event,scope)"
                  v-model="scope.row.config.isStart"
                  active-color="#13ce66"
                  inactive-color="#ff4949">
                </el-switch>
                <el-button type="danger" @click="handleDelete($event,scope)" icon="el-icon-delete" size="small"
                           v-bind:disabled="scope.row.config.isStart"
                           round></el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
</style>

<script>
  export default {
    mounted () {
      $('#bsModal').modal('show')
      this.serversConfig = this.$store.state.common.upstreamTable[this.$store.state.common.rowNum].upstream['serverConfigs']
      this.$bus.$on('upstream-config-modal', (args) => {
        $('#bsModal').modal('show')
        this.serversConfig = this.$store.state.common.upstreamTable[this.$store.state.common.rowNum].upstream['serverConfigs']
      })
    },
    data () {
      return {
        serversConfig: null
      }
    },
    beforeDestroy () {
      this.$bus.$off('upstream-config-modal')
    },
    methods: {
      tableRowClassName ({row}) {
        if (row['switch'] === false) {
          return 'warning-row'
        } else if (row['switch'] === true) {
          return 'success-row'
        } else {
          return ''
        }
      },
      getData () {
        let _this = this
        this.$http.get(this.$url_config.waf_url + '/api/config/forward/http/upstream').then(function (response) {
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
      },
      handleSwitch (event, scope) {
        let _this = this
        let upstreamConfigDto = {
          isStart: '',
          wafRoute: ''
        }
        upstreamConfigDto.isStart = event
        upstreamConfigDto.wafRoute = scope.row.route
        let upstreamConfigDtoJson = JSON.stringify(upstreamConfigDto)
        this.$http.put(this.$url_config.waf_url + '/api/config/forward/http/upstream', upstreamConfigDtoJson, {
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(function (response) {
          if (response.data.code === 200) {
            _this.getData()
          }
        })
      },
      handleDelete (event, scope) {
        let _this = this
        let upstreamConfigDto = {
          wafRoute: ''
        }
        upstreamConfigDto.wafRoute = scope.row.route
        this.$http.delete(this.$url_config.waf_url + '/api/config/forward/http/upstream', {data: upstreamConfigDto}).then(function (response) {
          if (response.data.code === 200) {
            _this.getData()
          }
        })
      },
      handleChange (value) {
        console.log(value)
      }
    }
  }
</script>
