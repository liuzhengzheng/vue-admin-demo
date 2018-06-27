<template>
  <div class="layout">
    <Layout>
      <Header>
        <Menu mode="horizontal" theme="dark" active-name="1">
          <div class="layout-logo">
            <img src="../../assets/img/logo.png" alt="logo"/>
          </div>
            <div class="horizontal-nav">
              <MenuItem name="1">
                <router-link to="/a/dashboard">
                  <Icon type="ios-home"></Icon>
                  主页
                </router-link>
              </MenuItem>
              <div class="user">
                <Dropdown transfer trigger="click" @on-click="handleClickUserDropdown">
                  <a href="javascript:void(0)">
                    <span class="main-user-name">{{ userName }}</span>
                    <Icon type="arrow-down-b"></Icon>
                  </a>
                  <DropdownMenu slot="list">
                    <DropdownItem name="ownSpace">个人中心</DropdownItem>
                    <DropdownItem name="loginout" divided>退出登录</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
                <Avatar style="background: #619fe7;margin-left: 10px;">L</Avatar>
              </div>
              <Breadcrumb>
                <BreadcrumbItem>{{this.openNames()}}</BreadcrumbItem>
                <BreadcrumbItem>{{this.activeName()}}</BreadcrumbItem>
              </Breadcrumb>
            </div>
          </Menu>
      </Header>
    </Layout>
    <Layout>
      <Sider hide-trigger :style="{position: 'fixed', height: '100vh', left: 0, overflow: 'auto'}">
        <Menu  width="auto" :active-name="this.activeName()" :open-names="[this.openNames()]">
          <template v-for="item in menu">
            <MenuItem v-if="!item.twoLevelMenu" :name="item.name" :key="item.name">
              <router-link :to="item.link">
                <Icon :type="item.icon"></Icon>
                {{ item.name }}
              </router-link>
            </MenuItem>
            <Submenu v-if="item.twoLevelMenu" :name="item.name" :key="item.name">
              <template slot="title">
                <Icon :type="item.icon"></Icon>
                {{ item.name }}
              </template>
              <MenuItem v-for="submenu in item.twoLevelMenu" :key="submenu.name" :name="submenu.name">
                <router-link :to="submenu.link">
                  <Icon :type="submenu.icon"></Icon>
                  {{ submenu.name }}
                </router-link>
              </MenuItem>
            </Submenu>
          </template>
        </Menu>
      </Sider>
      <Content :style="{marginLeft: '200px', padding:'10px', height: 'calc(100vh - 50px)', overflow:'auto'}">
        <router-view></router-view>
      </Content>
    </Layout>
  </div>
</template>
<script>
import { Layout, Header, Sider, Content, Menu, MenuItem, Icon, Card, Submenu, Breadcrumb, BreadcrumbItem, Row, Col, Dropdown, DropdownMenu, DropdownItem, Avatar } from 'iview'
import Cookies from 'js-cookie'
export default {
  components: {
    Layout, Header, Sider, Content, Menu, MenuItem, Icon, Card, Submenu, Breadcrumb, BreadcrumbItem, Row, Col, Dropdown, DropdownMenu, DropdownItem, Avatar
  },
  data () {
    return {
      pathName: '',
      userName: 'liuzhengzheng',
      menu: [
        { name: this.$t('international'),
          link: '/a/international',
          icon: 'earth'
        },
        { name: '组件',
          icon: 'ivu-icon ivu-icon-social-buffer',
          twoLevelMenu: [
            { name: '进度条', link: '/a/progress', icon: 'load-c' },
            { name: '时间轴', link: '/a/timeline', icon: 'person' },
            { name: 'todo-list', link: '/a/todolist', icon: 'ios-list' },
            { name: '树状图', link: '/a/tree', icon: 'levels' }
          ]
        },
        { name: '表格',
          icon: 'ivu-icon ivu-icon-ios-grid-view',
          twoLevelMenu: [
            { name: '可拖拽表格', link: '/a/dragabletable', icon: 'arrow-move' },
            { name: '可导出表格', link: '/a/exporttable', icon: 'arrow-move' },
            { name: '可编辑表格', link: '/a/edittable', icon: 'arrow-move' }
          ]
        },
        { name: '表单',
          icon: 'ivu-icon ivu-icon-android-checkbox',
          twoLevelMenu: [
            { name: '表单', link: '/a/form', icon: 'compose' },
            { name: '可切换表单', link: '/a/switchform', icon: 'compose' }
          ]
        }
        // { name: 'demo',
        //   icon: 'ivu-icon ivu-icon-android-checkbox',
        //   twoLevelMenu: [
        //     { name: 'demo1', link: '/a/demo1', icon: 'stats-bars' },
        //     { name: 'demo2', link: '/a/demo2', icon: 'stats-bars' },
        //   ]
        // }
      ]
    }
  },
  methods: {
    openNames () {
      for (let i = 0; i < this.menu.length; i++) {
        if (this.menu[i].twoLevelMenu) {
          for (let j = 0; j < this.menu[i].twoLevelMenu.length; j++) {
            if (this.menu[i].twoLevelMenu[j].name === this.$router.history.current.name) {
              return this.menu[i].name
            }
          }
        }
      }
    },
    activeName () {
      return this.$router.history.current.name
    },
    handleClickUserDropdown (name) {
      if (name === 'ownSpace') {
      } else if (name === 'loginout') {
        // 退出登录
        Cookies.remove('user')
        Cookies.remove('access')
        this.$router.push('login')
      }
    }
  }
}
</script>

<style scoped>
  .layout {
    background: #f5f7f9;
    position: relative;
    overflow: hidden;
    height: 100%;
  }
  .layout-logo img {
    width: 150px;
    height: 50px;
    float: left;
  }
 .ivu-layout-header {
    height: 48px;
    line-height: 48px;
    padding: 0 20px;
    background-color: #1c2438;
}
  .horizontal-nav .ivu-menu-item-selected a[data-v-3fec20e2], .ivu-breadcrumb>span:last-child, .ivu-layout-sider {
    color: #fff;
  }
  .ivu-menu {
    height: 100%;
  }
  .ivu-menu-item a {
    color: #495060;
    display: block;
    width: 100%;
    height: 100%;
  }
  .ivu-menu-item-selected a {
    color: #2d8cf0;
  }
  .ivu-menu-light.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu) {
    background-color: #f3f3f3;
  }
  .ivu-menu-dark {
    background-color: #1c2438;
  }
  .ivu-menu-horizontal {
    line-height: 48px;
  }
  .ivu-menu-horizontal .ivu-menu-item, .ivu-menu-horizontal .ivu-menu-submenu {
    margin-left: 10px;
  }
  .user{
    display: inline-block;
    position: absolute;
    right: 0;
  }
  .user a{
    color: #fff;
  }
</style>