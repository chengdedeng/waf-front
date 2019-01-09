<template>
  <el-table
    :data="tableData"
    style="width: 100%"
    :row-class-name="tableRowClassName">
    <el-table-column
      fixed
      prop="route"
      label="路由"
      width="200">
    </el-table-column>
    <el-table-column
      prop="status"
      label="状态"
      width="200">
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
      fixed="right"
      label="操作"
      width="200">
      <template slot-scope="scope">
        <el-switch
          @change="handleSwitch($event,scope)"
          v-model="scope.row.switch"
          active-color="#13ce66"
          inactive-color="#ff4949">
        </el-switch>
        <el-button type="danger" icon="el-icon-delete" size="small" v-bind:disabled="scope.row.switch"
        ></el-button>
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
    data () {
      return {
        tableData: []
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
          console.log(response.data)
          if (response.data['code'] === 200) {
            for (let i = 0; i < response.data['value'].length; i++) {
              _this.tableData[i] = {
                route: response.data['value'][i]['wafRoute'],
                status: response.data['value'][i]['config']['isStart'] === true ? '开启' : '关闭',
                switch: response.data['value'][i]['config']['isStart'],
                servers: response.data['value'][i]['serverConfigs'].length
              }
            }
          } else {
            alert('')
          }
        })
      },
      handleClick (row) {
        console.log(row)
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
            let newRow = {
              route: scope.row.route,
              status: event === true ? '开启' : '关闭',
              switch: event,
              servers: scope.row.servers
            }
            _this.$set(_this.tableData, scope.$index, newRow)
          }
        })
      }
    },
    created: function () {
      this.getData()
    }
  }
</script>
