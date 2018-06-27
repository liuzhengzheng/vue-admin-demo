import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/Login'
import GlobalLayout from '@/components/globalLayout/GlobalLayout'
import Dashboard from '@/components/home/Dashboard'
import International from '@/components/international/International'
import DragableTable from '@/components/table/DragableTable'
import ExportTable from '@/components/table/ExportTable'
import EditTable from '@/components/table/EditTable'
import Form from '@/components/form/Form'
import SwitchForm from '@/components/form/SwitchForm'
import Progress from '@/components/progress/Progress'
import Timeline from '@/components/timeline/Timeline'
import TodoList from '@/components/todoList/TodoList'
import Tree from '@/components/tree/Tree'
import Test1 from '@/components/test/Test1'
import Demo1 from '@/components/demo1/Demo1'
import Demo2 from '@/components/demo2/Demo2'

Vue.use(Router)

export default new Router({
  mode: 'history',
  linkActiveClass: 'active',
  routes: [{
    path: '/login',
    name: 'login',
    meta: {
      title: 'Login'
    },
    component: Login
  }, {
    path: '/a',
    component: GlobalLayout,
    children: [{
      path: '/',
      redirect: 'dashboard'
    },
    {
      path: 'dashboard',
      name: 'dashboard',
      meta: {
        title: 'Vue Demo'
      },
      component: Dashboard
    },
    {
      path: 'international',
      name: 'international',
      component: International
    },
    {
      path: 'dragabletable',
      name: '可拖拽表格',
      component: DragableTable
    },
    {
      path: 'exporttable',
      name: '可导出表格',
      component: ExportTable
    },
    {
      path: 'edittable',
      name: '可编辑表格',
      component: EditTable
    },
    {
      path: 'form',
      name: '表单',
      component: Form
    },
    {
      path: 'switchform/:id',
      name: '可切换表单',
      component: SwitchForm
    },
    {
      path: 'progress',
      name: '进度条',
      component: Progress
    },
    {
      path: 'timeline',
      name: '时间轴',
      component: Timeline
    },
    {
      path: 'test1',
      name: 'test1',
      component: Test1
    },
    {
      path: 'todolist',
      name: 'todo-list',
      component: TodoList
    },
    {
      path: 'tree',
      name: '树状图',
      component: Tree
    },
    {
      path: 'demo1',
      name: 'demo1',
      component: Demo1
    },
    {
      path: 'demo2',
      name: 'demo2',
      component: Demo2
    }
    ]
  }

  ]
})
