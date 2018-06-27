<template>
<div>
<Button type='primary' @click='modal1 = true'>新建后处理任务</Button>
    <Modal
        width=800
        v-model='modal1'
        @on-ok='ok'
        @on-cancel='cancel'>
        <div class='page'>
            <h3>新建后处理任务</h3>
            <div class='transfer'>
                <Transfer
                    :titles='titles'
                    :data='data'
                    :target-keys='targetKeys'
                    :list-style='listStyle'
                    filterable
                    :filter-method='filterMethod'
                    @on-change='handleChange'>
                </Transfer>
            </div>
            <div class='select'>
                <p class='title'>排除工况</p>
                <div class='content'>
                    <Select
                        v-model='model14'
                        multiple
                        filterable
                        remote
                        placeholder='请选择需要排除的工况'
                        :remote-method='remoteMethod2'
                        :loading='loading2'>
                        <Option v-for='(option, index) in options2' :value='option.value' :key='index'>{{option.label}}</Option>
                    </Select>
                </div>
            </div>
        </div>
    </Modal>
</div>
    
</template>
<script>
import { Modal, Button, Message, Transfer, Tree, Select, Option } from 'iview'
export default {
  components: { Modal, Button, Message, Transfer, Tree, Select, Option },
  data () {
    return {
      modal1: false,
      titles: ['选择工况组', '已选工况组'],
      data: this.getMockData(),
      targetKeys: [],
      listStyle: {
        height: '450px'
      },
      model14: [],
      loading2: false,
      options2: [],
      list: [
        'Alabama',
        'Alaska',
        'Arizona',
        'Arkansas',
        'California',
        'Colorado',
        'Connecticut',
        'Delaware',
        'Florida',
        'Georgia',
        'Hawaii',
        'Idaho',
        'Illinois',
        'Indiana',
        'Iowa',
        'Kansas',
        'Kentucky',
        'Louisiana',
        'Maine',
        'Maryland',
        'Massachusetts',
        'Michigan',
        'Minnesota',
        'Mississippi',
        'Missouri',
        'Montana',
        'Nebraska',
        'Nevada',
        'New hampshire',
        'New jersey',
        'New mexico',
        'New york',
        'North carolina',
        'North dakota',
        'Ohio',
        'Oklahoma',
        'Oregon',
        'Pennsylvania',
        'Rhode island',
        'South carolina',
        'South dakota',
        'Tennessee',
        'Texas',
        'Utah',
        'Vermont',
        'Virginia',
        'Washington',
        'West virginia',
        'Wisconsin',
        'Wyoming'
      ]
    }
  },
  methods: {
    ok () {
      console.log('Clicked ok')
    },
    cancel () {
      console.log('Clicked cancel')
    },
    getMockData () {
      let mockData = []
      for (let i = 1; i <= 20; i++) {
        mockData.push({
          key: i.toString(),
          label: 'DLC ' + i
        })
      }
      return mockData
    },
    handleChange (newTargetKeys) {
      this.targetKeys = newTargetKeys
    },
    filterMethod (data, query) {
      return data.label.indexOf(query) > -1
    },
    remoteMethod2 (query) {
      if (query !== '') {
        this.loading2 = true
        setTimeout(() => {
          this.loading2 = false
          const list = this.list.map(item => {
            return {
              value: item,
              label: item
            }
          })
          this.options2 = list.filter(
            item => item.label.toLowerCase().indexOf(query.toLowerCase()) > -1
          )
        }, 200)
      } else {
        this.options2 = []
      }
    }
  }
}
</script>
<style scoped>
.page {
  width: 760px;
  overflow: auto;
}
h3 {
  margin: 10px 0 30px 10px;
}
.transfer {
  display: inline-block;
  height: 450px;
  width: 450px;
  min-width: 450px;
}
.select {
  position: absolute;
  display: inline-block;
  height: 450px;
  width: 300px;
  min-width: 300px;
  padding: 0;
  border: 1px solid #dddee1;
  border-radius: 6px;
}
.title {
  background: #1890ff;
  color: #fff;
  padding: 8px 16px;
  border: 1px solid #dddee1;
  border-bottom: 1px solid #e9eaec;
  border-radius: 6px 6px 0 0;
  width: 100%;
  text-align: center;
}
.content {
  padding: 20px;
  height: 90%;
  overflow: auto;
}
</style>
<style>
.ivu-transfer-list-header {
  background: #1890ff;
  color: #fff;
}
/* .ivu-select {
  max-height: 100%;
}
.ivu-select-multiple .ivu-select-selection {
  max-height: 100%;
  overflow: auto;
} */
</style>
