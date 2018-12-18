<template>
  <div id="header">
    <div class="wraper">
      <div class="logo">
        <img :src="logImg" alt="">
      </div>
      <div class="nav">
        <ul>
          <li v-for="(item,index) of navList" :class="{active:index===headerIndex}" @click="goLink(index,item.url)">{{item.text}}</li>
        </ul>
        <div class="search_bar">
          <input type="text" placeholder="搜索您要寻找的DEMO">
          <img :src="searchIcon" alt="">
        </div>
        <span class="common-font">或</span>
        <button class="btn-default" @click="$router.push('releaseDemand')">发布需求</button>
      </div>
      <div class="userinfo" >
        <div v-if="!ifLoinged">
          <span>登录</span>
          <i class="ml-5 mr-5 col-warning">|</i>
          <span>注册</span>
        </div>
        <div v-else>
          <img :src="userData.imgurl" alt="">
          <span>退出</span>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="less">
  @import "header.less";
</style>
<script>
  export default{
    name: 'myheader',
    data(){
      return {
        logImg: require('../assets/img/logo.png'),
        searchIcon:require('../assets/img/search.png'),
        navList: [
          {text: "首页",url:'/'},
          {text: "源代码",url:'DemoDetail'},
          {text: "个人中心",url:'BasicInfo'},
        ],
        ifLoinged:this.$store.state.ifLoinged,
        userData:this.$store.state.userData,
        headerIndex:this.$store.state.headerIndex
      }
    },
    methods:{
      goLink(index,url){
          this.$store.commit('headerIndexChange',index)
          this.$router.push(url)
      }
    }
  }
</script>


