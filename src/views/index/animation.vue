<template>
    <div class="main">
        <div style="width: 100%;height: 80px;background-color: #0B2B4D"></div>
        <button @click="show = !show" class="click-button">
            发红包
        </button>
        <transition enter-active-class="animated bounceInDown">
            <div v-if="show" class="animated-main">
                <div class="background-div" :class="{'bg-active':show}"></div>
                <div class="pure-color">拆红包</div>
            </div>
        </transition>
    </div>
</template>

<script>
    export default {
        name: "test1",
        data(){
            return{
                show: false,
            }
        },
        mounted(){
            // setTimeout(()=>{
            //     this.focusShow = true;
            // },2000)
        }
    }
</script>


<style lang="scss" scoped>
    @import  '../../../node_modules/animate.css/animate.css';
    .main{
        width: 100%;
        text-align: center;
        .click-button{
            width: 100px;height: 40px;
            text-align: center;line-height: 40px;
            cursor: pointer;
        }
        .animated-main{
            position: relative;
            width: 420px;height: 264px;
            margin: 50px auto 0;
            .background-div{
                width: 100%;height: 100%;
                background: url("../../assets/image/main/red_bg.png") no-repeat;
                background-size: 420px auto;
            }
            .bg-active{
                animation: big 1.6s linear;
            }
            .pure-color{
                position: absolute;top: 76px;left: 112px;z-index: 5;
                width: 172px;height: 187px;background-color: red;
                text-align: center;line-height: 187px;
            }
        }
    }
    @keyframes big {
        0%{
            opacity: 0;
            transform: scale(0.8);
        }
        50%{
            opacity: 0;
            transform: scale(0.8);
        }
        100%{
            opacity: 1;
            transform: scale(1);
        }
    }
    .slide-fade-enter-active {
             transition: all .3s ease-in-out;
             /*transition: all .3s cubic-bezier(.95,.14,.94,.58);*/
         }
    .slide-fade-enter, .slide-fade-leave-to
        /* .slide-fade-leave-active for below version 2.1.8 */ {
        transform: translateY(-100px);
        opacity: 0;
    }
</style>