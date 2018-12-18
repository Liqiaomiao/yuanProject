<template>
    <div id="sidebar" class="sidebar">
      <el-menu unique-opened
               @open="handleOpen"
               @close="handleClose"
               :default-active="defaultActive"
      >
        <sidebar-item :sidebar-data="sidebarData"></sidebar-item>
      </el-menu>
    </div>
</template>
<script>
  import sidebarItem from './sidebaritem.vue'
    export default{
       props:{
         defaultActive:{
           type:String,
         }
       },
      components:{
        sidebarItem
      },
        data(){
            return {
                sidebarData:[
                  {icon:'icon-caidaniconwodehui',title:'基本信息',index:'1',router:'BasicInfo'},
                  {icon:'icon-zhanghuyue',title:'个人账户',index:'2',router:'PersonalAccount'},
                  {icon:'icon-iconset0124',title:'我的DEMO',index:"3",router:'myDemo',
                    children:[
                      {title:'已发布',index:"3-1",router:'myDemo?q=0'},
                      {title:'已承接',index:'3-2',router:'myDemo?q=1'},
                      {title:'已关注',index:"3-3",router:'myDemo?q=2'},
                      {title:'已评论',index:'3-4',router:'myDemo?q=3'}
                    ]
                  }
                ]
            }
        },
        methods:{
          handleOpen(){

          },
          handleClose(){}
        }
    }
</script>
<style lang="less" scoped>
  @import "sidebarscoped.less";
</style>
<style lang="less">
@import "sidebar.less";
</style>


