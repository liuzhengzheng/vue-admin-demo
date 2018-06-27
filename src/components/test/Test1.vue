<template>
    <div>
       <p>{{$route.name}}</p>
        <h2>{{msg}}</h2>
        <hr/>
        <h3>{{count}}</h3>
        <div>
          <Button @click="add">+</Button>
          <Button @click="reduce">-</Button>
      </div>
    </div>
</template>
<script>
import { Button } from 'iview'
import store from '@/store'
import { mapState, mapMutations, mapGetters } from 'vuex'
export default {
  components: {
    Button
  },
  data () {
    return {
      msg: 'Hello Vuex'
    }
  },
  store,
  computed: {
    ...mapGetters(['count'])
  },
  methods: mapMutations(['add', 'reduce'])
}
</script>