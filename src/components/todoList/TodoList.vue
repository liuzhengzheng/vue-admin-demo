<template>
  <div class="home-main">
    <Row :gutter="10">
      <Col :md="12" :lg="24" :style="{marginBottom: '10px'}">
        <Card>
          <p slot="title" class="card-title">
            <Icon type="android-checkbox-outline"></Icon>
            待办事项
          </p>
          <a type="text" slot="extra" @click.prevent="addNewToDoItem">
            <Icon type="plus-round"></Icon>
          </a>
          <Modal
            v-model="showAddNewTodo"
            title="添加新的待办事项"
            @on-ok="addNew"
            @on-cancel="cancelAdd">
            <Row type="flex" justify="center">
              <Input v-model="newToDoItemValue" icon="compose" placeholder="请输入..." style="width: 300px" />
            </Row>
            <Row slot="footer">
              <Button type="text" @click="cancelAdd">取消</Button>
              <Button type="primary" @click="addNew">确定</Button>
            </Row>
          </Modal>
          <div class="to-do-list-con">
            <div v-for="(item, index) in toDoList" :key="'todo-item' + (toDoList.length - index)" class="to-do-item">
              <to-do-list-item :content="item.title"></to-do-list-item>
            </div>
          </div>
        </Card>
      </Col>
    </Row>
  </div>
</template>

<script>
import { Row, Col, Card, Modal, Input, Button, Icon } from 'iview'
import toDoListItem from './components/ToDoListItem.vue'

export default {
  name: 'todoList',
  components: {
    toDoListItem, Row, Col, Card, Modal, Input, Button, Icon
  },
  data () {
    return {
      toDoList: [
        {
          title: '去iView官网学习完整的iView组件'
        },
        {
          title: '去iView官网学习完整的iView组件'
        },
        {
          title: '去iView官网学习完整的iView组件'
        },
        {
          title: '去iView官网学习完整的iView组件'
        },
        {
          title: '去iView官网学习完整的iView组件'
        }
      ],
      showAddNewTodo: false,
      newToDoItemValue: ''
    }
  },
  methods: {
    addNewToDoItem () {
      this.showAddNewTodo = true
    },
    addNew () {
      if (this.newToDoItemValue.length !== 0) {
        this.toDoList.unshift({
          title: this.newToDoItemValue
        })
        setTimeout(() => {
          this.newToDoItemValue = ''
        }, 200)
        this.showAddNewTodo = false
      } else {
        this.$Message.error('请输入待办事项内容')
      }
    },
    cancelAdd () {
      this.showAddNewTodo = false
      this.newToDoItemValue = ''
    }
  }
}
</script>
