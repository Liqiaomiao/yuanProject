<template>
  <div id="Main" @click.stop="visible=false;">
    <yuan-header></yuan-header>
    <div class="wraper">
      <yuan-sidebar :default-active="sidebaractive"></yuan-sidebar>
      <main>
        <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb">
          <el-breadcrumb-item>当前所在位置：</el-breadcrumb-item>
          <el-breadcrumb-item>个人中心</el-breadcrumb-item>
          <el-breadcrumb-item>{{bread}}</el-breadcrumb-item>
        </el-breadcrumb>
        <router-view></router-view>
      </main>
    </div>
    <yuan-footer></yuan-footer>
    <yuan-top></yuan-top>
  </div>
</template>

<script>
  import axios from 'axios';
  import apis from '@/api'
  export default {
    name: "Main",
    data(){
      return {
        sidebaractive:this.$store.state.currentsidebar,
        bread:this.$store.state.bread
      }
    },
    methods:{
      paymentChange(value){
        console.log(`您选择了${value}付款方式`);
        this.visible=false;
      }
    },
    mounted(){
      axios({
        methods:"get",
        url:apis.account
      }).then(({data})=>{
        this.loading=false;
        if(data.tableData){
          this.tableData=data.tableData;
          this.total=data.total;
          this.page=data.page;
          this.sort=data.sort;
        }
      }).catch(err=>{
        this.$message.error(err);
      })
    }
  }
</script>

<style scoped lang="less">
  @import "./main.less";
</style>
<style lang="less">
  @tablebd:1px solid #ededed;
  .breadcrumb{
    background: #fff;
    padding: 20px;
    .el-breadcrumb__item:first-child{
      .el-icon-arrow-right{
        display: none;
      }
    }
  }



</style>
