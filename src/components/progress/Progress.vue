<template>
  <div class="progress-wrapper">
    <Card>
      <Progress :percent="percent"></Progress>
      <ButtonGroup size="large">
        <Button icon="ios-minus-empty" @click="minus"></Button>
        <Button icon="ios-plus-empty" @click="add"></Button>
      </ButtonGroup>
    </Card>
  </div>
</template>
<script>
import { Progress, Button, ButtonGroup, Card } from 'iview'
export default {
  components: { Progress, Button, ButtonGroup, Card },
  data () {
    return {
      percent: 0
    }
  },
  methods: {
    add () {
      if (this.percent >= 100) {
        return false
      }
      this.percent += 10
    },
    minus () {
      if (this.percent <= 0) {
        return false
      }
      this.percent -= 10
    }
  }
}
</script>
<style>
.progress-wrapper {
  margin: 50px;
}
</style>