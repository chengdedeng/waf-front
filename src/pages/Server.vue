<template>
  <div>
    <el-table
      :data="this.$store.state.common.upstreamTable[this.$store.state.common.rowNum].upstream['serverConfigs']"
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
        prop="config.weight"
        label="权重">
      </el-table-column>
      <el-table-column
        :formatter="formatter1"
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
</template>

<script>
  export default {
    data () {
      return {
        a: 1,
        serverConfigDto: {
          wafRoute: '',
          ip: '',
          port: '',
          isStart: '',
          weight: ''
        }
      }
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
        this.serverConfigDto.isStart = event
        this.serverConfigDto.wafRoute = this.$store.state.common.upstreamTable[this.$store.state.common.rowNum].upstream['wafRoute']
        this.serverConfigDto.ip = scope.row.ip
        this.serverConfigDto.port = scope.row.port
        this.serverConfigDto.weight = scope.row.config.weight
        let upstreamConfigDtoJson = JSON.stringify(this.serverConfigDto)
        let _this = this
        this.$http.put(this.$url_config.waf_url + '/api/config/forward/http/upstream/server', upstreamConfigDtoJson, {
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
        this.serverConfigDto.wafRoute = this.$store.state.common.upstreamTable[this.$store.state.common.rowNum].upstream['wafRoute']
        this.serverConfigDto.ip = scope.row.ip
        this.serverConfigDto.port = scope.row.port
        let _this = this

        this.$http.delete(this.$url_config.waf_url + '/api/config/forward/http/upstream/server', {data: this.serverConfigDto}).then(function (response) {
          if (response.data.code === 200) {
            _this.getData()
          }
        })
      },
      formatter1 (row, column, cellValue, index) {
        if (cellValue === undefined) {
          return '未知'
        } else {
          return 'a'
        }
      }
    },
    created: function () {
      this.getData()
      this.$store.commit('common/CHANGE_PAGE_NAME', 'Server')
    },
    destroyed: function () {
      this.$store.dispatch('common/changePageName', '')
    }
  }
</script>
