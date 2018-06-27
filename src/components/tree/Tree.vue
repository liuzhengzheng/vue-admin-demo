<template>
  <div class="tree">
    <Card>
      <Button type="primary" @click="submit">提交</Button>
      <Tree ref="treeData" :data="data5" :render="renderContent"></Tree>
    </Card>
  </div>
</template>
<script>
import { Tree, Button, Icon, Input, Card } from 'iview'
export default {
  components: {
    Tree,
    Button,
    Icon,
    Input,
    Card
  },
  data () {
    return {
      data5: [
        {
          title: 'parent 1',
          expand: true,
          render: (h, { root, node, data }) => {
            return h(
              'span',
              {
                style: {
                  display: 'inline-block',
                  width: '100%'
                }
              },
              [
                h('span', [
                  h(Icon, {
                    props: {
                      type: 'ios-folder-outline'
                    },
                    style: {
                      marginRight: '8px'
                    }
                  }),
                  h(Input, {
                    domProps: {
                      value: data.title
                    },
                    style: {
                      width: '200px'
                    },
                    on: {
                      input: function (e) {
                        self.value = e.target.value
                        data.title = self.value
                      }
                    }
                  })
                ]),
                h(
                  'span',
                  {
                    style: {
                      display: 'inline-block',
                      float: 'right',
                      marginRight: '32px'
                    }
                  },
                  [
                    h(Button, {
                      props: Object.assign({}, this.buttonProps, {
                        icon: 'ios-plus-empty',
                        type: 'primary'
                      }),
                      style: {
                        width: '52px'
                      },
                      on: {
                        click: () => {
                          this.append(data)
                        }
                      }
                    })
                  ]
                )
              ]
            )
          },
          children: [
            {
              title: 'child 1-1',
              expand: true,
              children: [
                {
                  title: 'leaf 1-1-1',
                  expand: true
                },
                {
                  title: 'leaf 1-1-2',
                  expand: true
                }
              ]
            },
            {
              title: 'child 1-2',
              expand: true,
              children: [
                {
                  title: 'leaf 1-2-1',
                  expand: true
                },
                {
                  title: 'leaf 1-2-1',
                  expand: true
                }
              ]
            }
          ]
        }
      ],
      buttonProps: {
        type: 'ghost',
        size: 'small'
      }
    }
  },
  methods: {
    renderContent (h, { root, node, data }) {
      return h(
        'span',
        {
          style: {
            display: 'inline-block',
            width: '100%'
          }
        },
        [
          h('span', [
            h(Icon, {
              props: {
                type: 'ios-paper-outline'
              },
              style: {
                marginRight: '8px'
              }
            }),
            h(Input, {
              domProps: {
                value: data.title
              },
              style: {
                width: '200px'
              },
              on: {
                input: function (e) {
                  self.value = e.target.value
                  data.title = self.value
                }
              }
            })
          ]),
          h(
            'span',
            {
              style: {
                display: 'inline-block',
                float: 'right',
                marginRight: '32px'
              }
            },
            [
              h(Button, {
                props: Object.assign({}, this.buttonProps, {
                  icon: 'ios-plus-empty'
                }),
                style: {
                  marginRight: '8px'
                },
                on: {
                  click: () => {
                    this.append(data)
                  }
                }
              }),
              h(Button, {
                props: Object.assign({}, this.buttonProps, {
                  icon: 'ios-minus-empty'
                }),
                on: {
                  click: () => {
                    this.remove(root, node, data)
                  }
                }
              })
            ]
          )
        ]
      )
    },
    append (data) {
      const children = data.children || []
      children.push({
        title: 'appended node',
        expand: true
      })
      this.$set(data, 'children', children)
    },
    remove (root, node, data) {
      const parentKey = root.find(el => el === node).parent
      const parent = root.find(el => el.nodeKey === parentKey).node
      const index = parent.children.indexOf(data)
      parent.children.splice(index, 1)
    },
    submit () {
      console.log(this.$refs.treeData.data[0])
    }
  }
}
</script>
<style scoped>
.tree {
  width: 400px
}
</style>