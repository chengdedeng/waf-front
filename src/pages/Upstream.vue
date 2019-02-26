<template>
  <el-table
    :data="this.$store.state.common.upstreamTable"
    style="width: 100%"
    @row-click="openDetails"
    :row-class-name="tableRowClassName">
    <el-table-column
      fixed
      prop="index"
      label="序号">
      <template slot-scope="scope">
        {{scope.$index+1}}
      </template>
    </el-table-column>
    <el-table-column
      prop="upstream.wafRoute"
      label="路由">
    </el-table-column>
    <el-table-column
      label="状态">
      <template slot-scope="scope">
        <el-tag
          :type="scope.row.upstream.config.isStart === true ? 'primary' : 'success'"
          close-transition>{{scope.row.upstream.config.isStart===true?'已激活':'未激活'}}
        </el-tag>
      </template>
    </el-table-column>
    <el-table-column
      prop="upstream.serverConfigs.length"
      label="服务器数量">
    </el-table-column>
    <el-table-column
      prop="upstream.config.isStart"
      fixed="right"
      label="开关"
      width="150">
      <template slot-scope="scope">
        <el-switch
          @change="handleSwitch($event,scope)"
          v-model="scope.row.upstream.config.isStart"
          active-color="#13ce66"
          inactive-color="#ff4949">
        </el-switch>
        <el-button type="danger" @click="handleDelete($event,scope)" icon="el-icon-delete" size="small"
                   v-bind:disabled="scope.row.upstream.config.isStart"
                   round></el-button>
      </template>
    </el-table-column>
  </el-table>
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
    methods: {
      tableRowClassName ({row}) {
        if (row.upstream.config['isStart'] === false) {
          return 'warning-row'
        } else if (row.upstream.config['isStart'] === true) {
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
        upstreamConfigDto.wafRoute = scope.row.upstream.wafRoute
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
        upstreamConfigDto.wafRoute = scope.row.upstream.wafRoute
        this.$http.delete(this.$url_config.waf_url + '/api/config/forward/http/upstream', {data: upstreamConfigDto}).then(function (response) {
          if (response.data.code === 200) {
            _this.getData()
          }
        })
      },
      openDetails (row, event, column) {
        if (column['property'] !== 'upstream.config.isStart') {
          this.$store.commit('common/CHANGE_ROW_NUM', this.getRowIndex(row))
          this.$router.push('/config/upstream/server')
        }
      },
      getRowIndex (row) {
        let i = 0
        for (let upstream of this.$store.state.common.upstreamTable) {
          if (upstream.upstream.wafRoute === row.upstream.wafRoute) {
            break
          } else {
            i++
          }
        }
        return i
      }
    },
    created: function () {
      this.getData()
      this.$store.commit('common/CHANGE_PAGE_NAME', 'Upstream')
    },
    destroyed: function () {
      this.$store.dispatch('common/changePageName', '')
    }
  }
</script>
