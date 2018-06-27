<template>
    <div class="scroll">
        <Scroll :on-reach-bottom="handleReachBottom">
            <CheckboxGroup v-for="(item, index) in list1" :key="index" style="margin: 12px 20px">
                <Checkbox :label="'021a+0'+item"></Checkbox>
            </CheckboxGroup>
        </Scroll>
    </div>
</template>
<script>
import { Scroll, Card, CheckboxGroup, Checkbox, Spin, Icon } from 'iview'
export default {
  components: {
    Scroll,
    Card,
    CheckboxGroup,
    Checkbox,
    Spin,
    Icon
  },
  data () {
    return {
      fruit: [''],
      list1: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    }
  },
  methods: {
    handleReachBottom () {}
  }
}
</script>
<style scoped>
.scroll {
  margin: 20px;
  height: 80vh;
  width: 200px;
  border: 2px solid #ddd;
  overflow: hidden;
}
.ivu-checkbox-group-item {
  display: block;
}
.ivu-checkbox-wrapper {
  font-size: 14px;
  margin: 5px 0;
}
</style>
