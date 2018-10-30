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
            <el-menu-item v-for="(item,index) in themeData" :key="index" class="menu-item" :index="item.index">
                {{item.title}}
            </el-menu-item>
        </el-menu>
        <transition enter-active-class="animated fadeInLeft">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
    export default {
        name: 'index',
        components: {},
        data() {
            return {
                themeData: [
                    {
                        index: '0',
                        to: 'theme',
                        title: '换肤'
                    },
                    {
                        index: '1',
                        to: 'animation',
                        title: '动画'
                    },
                    {
                        index: '2',
                        to: 'test2',
                        title: '待定2'
                    }
                ],
                activeIndex1: '0'
            }
        },
        created(){
            this.activeIndex1 = String(this.$route.meta.index);
        },
        methods: {
            themeSelect(key, keyPath) {
                let path = this.themeData[key].to
                this.$router.push(path)
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import  '../../node_modules/animate.css/animate.css';
    .main {
        width: 100%;
        .menu {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            .menu-item {
                flex: none;
            }
        }
    }
</style>
