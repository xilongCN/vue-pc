<template>
    <div class="main">
        <div class="nav theme-background">切换皮肤</div>
        <el-row class="menu">
            <el-button class="menu-item" type="danger"  @click="changeTheme('a')">红色</el-button>
            <el-button class="menu-item" type="primary" @click="changeTheme('b')">蓝色</el-button>
            <el-button class="menu-item" type="success" @click="changeTheme('c')">绿色</el-button>
        </el-row>
    </div>
</template>

<script>
export default {
  name: 'index',
  components: {},
  methods: {
    changeTheme (themeNumber) {
      document.getElementById('app').className = 'theme' + themeNumber
    }
  }
}
</script>

<style lang="scss" scoped>
    .main {
        width: 100%;
        .nav {
            width: 100%;
            height: 50px;
            font-size: 20px;color: #fff;
            text-align: center;line-height: 50px;
        }
        .menu{
            margin-top: 30px;
            display: flex;
            flex-wrap:wrap;
            justify-content: center;
            .menu-item{
                flex: none;
            }
        }
    }
</style>
