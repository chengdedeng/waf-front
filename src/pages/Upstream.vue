<template>
  <el-table
    :data="this.$store.state.common.upstreamTable"
    style="width: 100%"
    @cell-dblclick="openDetails"
    :row-class-name="tableRowClassName">
    <el-table-column
      fixed
      prop="route"
      label="路由">
    </el-table-column>
    <el-table-column
      label="状态">
      <template slot-scope="scope">
        <el-tag
          :type="scope.row.switch === true ? 'primary' : 'success'"
          close-transition>{{scope.row.switch===true?'已激活':'未激活'}}
        </el-tag>
      </template>
    </el-table-column>
    <el-table-column
      prop="servers"
      label="服务器数量">
    </el-table-column>
    <el-table-column
      prop="switch"
      fixed="right"
      label="开关"
      width="150">
      <template slot-scope="scope">
        <el-switch
          @change="handleSwitch($event,scope)"
          v-model="scope.row.switch"
          active-color="#13ce66"
          inactive-color="#ff4949">
        </el-switch>
        <el-button type="danger" icon="el-icon-delete" size="small" v-bind:disabled="scope.row.switch"
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
                route: response.data['value'][i]['wafRoute'],
                switch: response.data['value'][i]['config']['isStart'],
                servers: response.data['value'][i]['serverConfigs'].length
              }
            }
            _this.$store.commit('common/setUpstreamTable', upstreamTable)
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
      openDetails (row, column, cell, event) {
        if (column['property'] !== 'switch') {
          console.log(column)
        }
      }
    },
    created: function () {
      this.getData()
      this.$store.commit('common/setContentPageName', 'Upstream')
    },
    destroyed: function () {
      this.$store.commit('common/setContentPageName', '')
    }
  }
</script>
