<template>
    <div id="top">
      <div class="customer">
        <i class="icon icon-kefu"></i>
        <p>400-800-8888</p>
      </div>
      <div class="top" @click="goTop">
        <i class="icon icon-top"></i>
      </div>
    </div>
</template>

<script>
    export default{
        data(){
            return {}
        },
      methods:{
        goTop(){
          var gotoTop= function(){
            var currentPosition = document.documentElement.scrollTop || document.body.scrollTop;
            currentPosition -= 6;
            if (currentPosition > 0) {
              window.scrollTo(0, currentPosition);
            }
            else {
              window.scrollTo(0, 0);
              clearInterval(timer);
              timer = null;
            }
          }
          var timer=setInterval(gotoTop,1);
        }
      }
    }
</script>
<style scoped lang='less'>
@import "top.less";
</style>

