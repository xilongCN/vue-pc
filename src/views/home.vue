<template>
    <div class="main">
        <el-menu
                :default-active="activeIndex1"
                class="menu"
                @select="themeSelect"
                mode="horizontal"
                background-color="#545c64"
                text-color="#fff"
                active-text-color="#ffd04b">
            <el-menu-item v-for="(item,index) in themeData" :key="index" class="menu-item" :index="item.index">{{item.title}}</el-menu-item>
        </el-menu>
    </div>
</template>

<script>
export default {
  name: 'index',
  components: {},
  data () {
    return {
      themeData: [
        {
          index: '0',
          to: 'theme',
          title: '换肤'
        },
        {
          index: '1',
          to: '/',
          title: '待定1'
        },
        {
          index: '2',
          to: '/',
          title: '待定2'
        }
      ],
      activeIndex1: '0'
    }
  },
  methods: {
    themeSelect (key, keyPath) {
      let path = this.themeData[key].to
      this.$router.push(path)
    }
  }
}
</script>

<style lang="scss" scoped>
    .main {
        width: 100%;
        .menu{
            display: flex;
            flex-wrap:wrap;
            justify-content: center;
            .menu-item{
                flex: none;
            }
        }
    }
</style>
