<template>
  <div class='wrapper'>
    <div class='top'>
      <i-input v-model="cModelName" placeholder="模型名称" style="width:200px"></i-input>
      <i-select v-model="cProductSeries" placeholder="机型系列" @on-change="onChangeModelSeries" clearable filterable style="width:150px">
        <i-option v-for="(item, index) in dict.cProductSeries" :value="parseInt(index)" :key="index">{{item}}</i-option>
      </i-select>
      <i-select v-if="cTurbineModels.length===0" v-model="cTurbineModel" placeholder="机组型号" clearable filterable style="width:150px" disabled>
        <i-option v-for="item in cTurbineModels" :value="item.cTurbineModel" :key="item.cTurbineModel">{{item.cTurbineModel}}</i-option>
      </i-select>
      <i-select v-if="cTurbineModels.length>0" v-model="cTurbineModel" placeholder="机组型号" clearable filterable style="width:150px">
        <i-option v-for="item in cTurbineModels" :value="item.cTurbineModel" :key="item.cTurbineModel">{{item.cTurbineModel}}</i-option>
      </i-select>
      <i-select placeholder="权限" clearable filterable style="width:150px" disabled>
      </i-select>
      <i-button type="primary" @click="onSearch">查询</i-button>
      <div class="top-right">
        <span>只显示已定版：</span>
        <i-switch @on-change="handleIsFinal" v-model="cIsFinal">
          <span slot="open">开</span>
          <span slot="close">关</span>
        </i-switch>
      </div>
    </div>
    <div class='center'>
      <i-table
      :columns='tableHeaders'
      :data='dataList'
      :loading='true'
      :isPagination='true'
      :total='this.listTotal'
      @onPageChange="onGetListByPage"
      ></i-table>
    </div>
  </div>
</template>

<script>
import { Button, Tag, Select, Option, Input, Switch, Table } from 'iview'
import DataTable from './DataTable.vue'
import Moment from 'moment'
import { Dict, Pages, Mapping } from './data/tableEdit.js'

export default {
  data () {
    return {
      dict: {},
      cModelName: '',
      cProductSeries: null,
      cTurbineModel: null,
      cTurbineModels: [],
      // cTags: [],
      cIsFinal: false,
      dataList: [],
      tableHeaders: [],
      listTotal: 0
    }
  },
  created: function () {
    this.dict = Dict.data
    this.onGetListByPage(1, 25)
  },
  methods: {
    handleIsFinal () {
      this.onGetListByPage(1, 25)
    },
    onChangeModelSeries () {
      if (this.cProductSeries === '' || this.cProductSeries === null) {
        this.cTurbineModels = []
      } else {
        [...this.cTurbineModels] = Mapping.data
      }
    },
    // 查询
    onSearch (page, pageSize) {
      this.cProductSeries = this.cProductSeries === '' ? null : this.cProductSeries
      this.cTurbineModel = this.cTurbineModel === '' ? null : this.cTurbineModel
      this.onGetListByPage(1, 25)
    },
    // 获取列表
    onGetListByPage (page, pageSize) {
      this.listTotal = Pages.data.pages.total
      this.tableHeaders = [
        {
          title: '模型名称',
          key: 'cModelName',
          fixed: 'left',
          width: 300
        },
        {
          title: '塔架重量',
          key: 'cTowerMass',
          width: 100
        },
        {
          title: '机型系列',
          key: 'cProductSeries',
          width: 100,
          render: (h, params) => {
            return this.dict.cProductSeries ? this.dict.cProductSeries[params.row.cProductSeries] : params.row.cProductSeries
          }
        },
        {
          title: '塔架编号',
          key: 'cTowerDrawingNo',
          width: 100
        },
        {
          title: '叶片名称',
          key: 'cBladeName',
          width: 150
        },
        {
          title: '最优桨距角',
          key: 'cOptPitch',
          width: 100
        },
        {
          title: '软件版本',
          key: 'cBladedVersion',
          width: 120,
          render: (h, params) => {
            return this.dict.cBladedVersion ? this.dict.cBladedVersion[params.row.cBladedVersion] : params.row.cBladedVersion
          }
        },
        {
          title: '是否定版',
          key: 'cIsFinal',
          width: 90,
          align: 'center',
          render: (h, params) => {
            switch (params.row.cIsFinal) {
              case true:
                return <Tag color="#19be6b">是</Tag>
              default:
                return <Tag color="rgb(220, 90, 91)">否</Tag>
            }
          }
        },
        {
          title: '创建人',
          key: 'cOwner',
          width: 120
        },
        {
          title: '创建时间',
          key: 'cCreateTime',
          width: 170,
          render: (h, params) => {
            return Moment(params.row.cCreateTime).format('YYYY-MM-DD hh:mm:ss')
          }
        },
        {
          title: '操作',
          key: 'action',
          width: 100,
          render: (h, params) => {
            return h('div', [
              h(Button, {
                props: {
                  type: 'success',
                  size: 'small'
                },
                style: {
                  // marginRight: '5px',
                  backgroundColor: '#52b1c1'
                },
                on: {
                  click: () => {
                    const path = {
                      path: `switchform/2`,
                      params: {
                        id: params.row.cId
                      }
                    }
                    this.$router.push(path)
                  }
                }
              }, '修改')
              // h(Button, {
              //   props: {
              //     type: 'error',
              //     size: 'small'
              //   },
              //   style: {
              //     backgroundColor: 'rgb(220, 90, 91)'
              //   },
              //   on: {
              //     click: () => {
              //       this.onDelete(params.row)
              //     }
              //   }
              // }, '删除')
            ])
          }
        }
      ]
      this.dataList = Pages.data.list
    }
    // 删除
    // onDelete (msg) {
    //   this.$Modal.confirm({
    //     title: '确定要删除吗',
    //     content: `${msg.modelname}`,
    //     onOk: () => {
    //       this.$Message.info('Clicked ok')
    //     },
    //     onCancel: () => {
    //       this.$Message.info('Clicked cancel')
    //     }
    //   })
    // }
  },
  components: {
    'i-table': DataTable,
    'i-button': Button,
    'i-select': Select,
    'i-option': Option,
    'i-input': Input,
    'i-switch': Switch
  }
}
</script>

<style lang='css' scoped>
.wrapper{
  margin: 0 20px 0 0
}
.top {
  padding: 8px 10px;
  margin: 0 0 10px;
  margin-bottom: 10px;
  line-height: 35px;
  list-style: none;
  background-color: #f5f5f5;
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  border-radius: 3px;
  overflow: hidden;
}
.top-right{
  float: right;
}
.center {
  background-color: #f5f5f5;
}
</style>
