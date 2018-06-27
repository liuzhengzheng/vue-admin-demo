<template>
  <div class="data-table-wrapper">
    <div class="table-content">
      <iv-table
      ref="table"
      border
      :columns="columns"
      :data="data"
      :row-class-name="rowClassName"
      :height="tableHeight"
      :width="tableWidth"
      size="default"
      highlight-row
      no-data-text="暂无数据"
      :loading="showLoading"
      @on-select="select"
      @on-select-all="select"
      @on-select-cancel="select"
      @on-selection-change="select"
      @on-current-change='currentChange'
      ></iv-table>
    </div>
    <div class="page-wrapper" v-if="isPagination">
      <div class="switch-wrapper" v-if="isSwitch">
        <span>只看我的任务</span>
        <i-switch @on-change="onlyMyTask">
          <span slot="open">开</span>
          <span slot="close">关</span>
        </i-switch>
      </div>
      <iv-page
      show-total
      :styles="style"
      :show-sizer="showSizer"
      placement="top"
      :page-size-opts="pageSizeArr"
      :total="total"
      :page-size="defaultSize"
      @on-change="onChange"
      @on-page-size-change="onPageSizeChange"
      ></iv-page>
    </div>
  </div>
</template>

<script>
import { Table, Page, Switch } from 'iview'
export default {
  props: [ 'columns', 'data', 'loading', 'total', 'onPageChange', 'isPagination', 'selectRow', 'customHeight', 'customSize', 'isSwitch' ],
  data () {
    return {
      tableHeight: 450,
      defaultSize: this.customSize ? this.customSize : 25,
      pageSize: 25,
      showSizer: !this.customSize,
      tableWidth: 1000,
      showLoading: this.loading,
      pageSizeArr: [ 10, 20, 25, 35 ],
      style: { float: 'right' }
    }
  },
  methods: {
    rowClassName (row, index) {
      this.showLoading = false
      if (index % 2 !== 0) {
        return 'data-table-odd'
      } else {
        return ''
      }
    },
    onlyMyTask (onlyMyTask) {
      if (onlyMyTask) {
        this.showLoading = true
        this.$router.push('/a/load-simulation/my-task')
      } else {
        this.showLoading = true
        this.$router.push('/a/load-simulation/simulation-task-list')
      }
    },
    onChange (page) {
      this.showLoading = true
      if (this.showSizer) {
        this.$emit('onPageChange', page, this.pageSize)
      } else {
        this.$emit('onPageChange', page, this.defaultSize)
      }
    },
    onPageSizeChange (pageSize) {
      this.showLoading = true
      this.pageSize = pageSize
      this.$emit('onPageChange', 1, pageSize)
    },
    handleResize () {
      // const pageHeight = this.isPagination ? 50 : 0
      this.tableHeight = this.customHeight ? this.customHeight : window.innerHeight - this.$refs.table.$el.offsetTop - 50
      this.tableWidth = window.innerWidth - this.$refs.table.$el.offsetLeft
    },
    select (selection, row) {
      this.$emit('selectRow', selection, row)
    },
    currentChange (currentRow, oldCurrentRow) {
      this.$emit('currentChange', currentRow, oldCurrentRow)
    }
  },
  watch: {
    loading (val) {
      this.showLoading = val
    },
    data (newValue, oldValue) {
      if (newValue.length === 0) {
        this.showLoading = false
      } else {
        this.handleResize()
      }
    }
  },
  mounted () {
    this.handleResize()
    window.addEventListener('resize', this.handleResize)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.handleResize)
  },
  components: {
    'iv-table': Table,
    'iv-page': Page,
    'i-switch': Switch
  }
}
</script>

<style lang="css" scoped>
.data-table-wrapper {
  padding: 5px;
}
.table-content {
  overflow: hidden;
  overflow-y: auto;
}
.page-wrapper {
  height: 50px;
  padding: 8px 8px 0px 0px;
  background-color: #fff;
}
.page-wrapper .switch-wrapper {
  float: left;
  margin-left: 10px;
}
</style>
