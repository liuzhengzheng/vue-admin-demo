<template>
  <Card>
    <Timeline class="timeline-wrapper">
      <TimelineItem color="green">发布1.0版本</TimelineItem>
      <TimelineItem color="green">发布2.0版本</TimelineItem>
      <TimelineItem color="red">严重故障</TimelineItem>
      <TimelineItem color="blue">发布3.0版本</TimelineItem>
    </Timeline>
  </Card>
</template>
<script>
import { Timeline, TimelineItem, Card } from 'iview'
export default {
  components: {
    Timeline,
    TimelineItem,
    Card
  }
}
</script>
<style>
.timeline-wrapper {
  margin: 50px;
}
</style>