<template>
  <div id="myDemo">
    <div class="searchbar">
      <div class="searchcontainer">
        <el-input class="searchinput" type="text" clearable placeholder="请输入搜索内容" ></el-input>
        <el-button class="btn-default" round >搜索</el-button>
      </div>
    </div>
    <!--demo列表-->
    <demos :demodata="demodata"
           :needdel="true"
           @goDemodetail="goDemodetail"
           @handleDelete="handleDelete"
    >

      <template slot="buttons" slot-scope="props">
        <el-button v-if="props.item.step==0" class="btn-warning" round>修改</el-button>
        <template v-else-if="props.item.step==1">
          <el-button  class="btn-primary" round>申请延期</el-button>
          <el-button  class="btn-disabled" round>拒绝延期</el-button>
          <el-button  class="btn-default" round>同意延期</el-button>
        </template>
      </template>
    </demos>
  </div>
</template>
<script>
  import axios from 'axios';
  import apis from '@/api/index.js';
  import {filterTime,fontlen} from  '@/libs/filters'
  import { Loading } from 'element-ui';
  import demos from '@/common/demos/demos.vue'
  export default {
    name: "myDemo",
    components:{
      demos
    },
    data() {
      return {
        steptext: ['待接单', '制作中', '审核中', '完成'],
        options:{
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        },
        demodata: {
          total: 100,
          pagercount: 10,
          currentpage: 1,
          list:  [
            {
              imgurl: require("@/assets/img/apple.png"),
              title: "ios scrollview嵌套tableview同向滑动（初级、进阶），支持oc/Swift",
              username: '知晓1829',
              avatar: require("@/assets/img/userIcon.png"),
              dealimg: require("@/assets/img/dealimg.png"),
              dealprice: 100,
              time: 1539138600000,
              code: 'java',
              focus: 100,
              comment: 100,
              step: 0,
              introduce: '最新代码地址：https://github.com/gltwy/LTScrollView ios scrollview嵌套tableview同向滑动（初级、进阶)， \n' +
              '方法可见内部Demo 如果对您有用，欢迎给个star哦！最新代码地址：https://github.com/gltwy/LTScrollView ios 最新代码地址：https://github.com/gltwy/LTScrollView ios'
            },
            {
              imgurl: require("@/assets/img/bird.png"),
              title: "Swift版抽屉效果，自定义转场动画管理器",
              username: 'pfujsnaj',
              avatar: require("@/assets/img/userIcon.png"),
              dealimg: require("@/assets/img/dealimg.png"),
              dealprice: 100,
              time: 1539138600000,
              code: 'java',
              focus: 100,
              comment: 100,
              step: 1,
              introduce: `需求介绍：iOS7.0加入了自定义转场动画，淘汰了之前左右两大隐藏护法的抽屉效果，并且一些浮窗、弹层都可以用vc来显
示了，不再是用view盖在window上看了一些抽屉Demo发觉都是OC写的。`
            },
            {
              imgurl: require("@/assets/img/vue.png"),
              title: "使用 vue-cli + element-ui 快速搭建项目",
              username: '魔鬼',
              avatar: require("@/assets/img/userIcon.png"),
              dealimg: require("@/assets/img/dealimg.png"),
              dealprice: 100,
              time: 1539138600000,
              code: 'java',
              focus: 100,
              comment: 100,
              step: 2,
              introduce: `需求介绍：iOS7.0加入了自定义转场动画，淘汰了之前左右两大隐藏护法的抽屉效果，并且一些浮窗、弹层都可以用vc来显
示了，不再是用view盖在window上看了一些抽屉Demo发觉都是OC写的。`
            },
            {
              imgurl: require("@/assets/img/java.png"),
              title: "使用 vue-cli + element-ui 快速搭建项目",
              username: '魔鬼',
              avatar: require("@/assets/img/userIcon.png"),
              dealimg: require("@/assets/img/dealimg.png"),
              dealprice: 100,
              time: 1539138600000,
              code: 'java',
              focus: 100,
              comment: 100,
              step: 4,
              introduce: `需求介绍：iOS7.0加入了自定义转场动画，淘汰了之前左右两大隐藏护法的抽屉效果，并且一些浮窗、弹层都可以用vc来显
示了，不再是用view盖在window上看了一些抽屉Demo发觉都是OC写的。`
            },
          ]
        },
      }
    },
    mounted(){
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        fullscreenLoading: false,
        background: 'rgba(255, 255, 255, 0.7)'
      });
      axios({
        method:'get',
        url:apis.demo
      }).then(({data})=>{

     setTimeout(()=>{
       loading.close();
       let demodata=data.demodata;
       demodata.list=demodata.list.map(item=>{
         item.avatar=require(`@/${item.avatar}`)
         item.dealimg=require(`@/${item.dealimg}`)
         item.imgurl=require(`@/${item.imgurl}`)
         return item
       })
       this.demodata=demodata;
     },500)

      }).catch(error=>{
        this.$message.error('数据加载异常');
      })
    },
    methods:{
      handleDelete(item){
        console.log(item);
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      goDemodetail(){
        this.$router.push('DemoDetail')
      }
    },

  }
</script>

<style scoped lang="less">

@import "myDemoscoped.less";

</style>
<style lang="less">
  @import "myDemo.less";
</style>
