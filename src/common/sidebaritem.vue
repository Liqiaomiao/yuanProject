<template>
    <div class="sidebar">
      <el-menu-item :index="item.index" @click.native="goLink(item.router)"
                    v-for="(item,index) of sidebarData"
                    :key="`item${index}`"
                    v-if="!item.children">
        <i :class="{icon:true,[item.icon]:true}"></i>
        <span slot="title">{{item.title}}</span>
      </el-menu-item>
      <el-submenu :index="item.index" v-else>
        <template slot="title">
          <i :class="{icon:true,[item.icon]:true}"></i>
          <span>{{item.title}}</span>
        </template>
        <sidebaritem :sidebar-data="item.children"></sidebaritem>
      </el-submenu>
    </div>
</template>

<script>
    export default{
        name:'sidebaritem',
        props:{
          sidebarData:{
              type:Array
          }
        },
        data(){
            return {}
        },
        methods:{
          goLink(url){
              this.$router.push(url)
          }
        }
    }
</script>
<style  lang="less">
  @import "sidebarscoped.less";
</style>


