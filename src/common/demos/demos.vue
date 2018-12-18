<template>
  <!--demo列表-->
  <div class="democommon" >
    <div class="demomain"  v-for="(item,index) of demodata.list" :key="`list${index}`" >
      <div class="panel" >

        <i class="icon icon-delete" v-if="item.step!=2 && needdel" @click="handleDelete(item)"></i>
        <div class="panel_hd">
          <div class="imgcontainer">
            <img :src="item.imgurl" alt="">
          </div>
          <div class="step" >
            <div v-for="(step,stepi) of steptext" :key="`step${stepi}`"  :class="{waiting:true,active:item.step==stepi,success:stepi<item.step||item.step==steptext.length-1}">
              <div class="stepline"><div></div><i class="icon"></i></div>
              <div class="main">{{step}}</div>
            </div>
          </div>
        </div>
        <div class="panel_bd"  >
          <h5 @click="goDemodetail"><span>{{item.title}}</span><time><i class="icon icon-shijian"></i>{{item.time|filterTime}}</time></h5>
          <div class="row-1">
            <div class="userInfo">
              <img :src="item.avatar" alt="">
              <span>{{item.username}}</span>
            </div>
            <div class="deal">
              <img :src="item.dealimg" alt="">
              <span>成交价{{item.dealprice}}</span>
            </div>
          </div>
          <div class="row-2" @click="goDemodetail">
            需求介绍：{{item.introduce|fontlen(250)}}
          </div>
          <div class="row-3">
            <div class="row-hd">
              <div class="list code">
                <i class="icon icon-code1"></i>
                <span>{{item.code|capitalize}}</span>
              </div>
              <div class="list curp" v-if="item.step==3">
                <i class="icon icon-xiazai"></i>
                <span>{{item.downloadnum}}</span>
              </div>
              <div :class="{list:true, curp:true,active:item.isLiked} "  v-if="item.step==3" @click="handlelike(item)">
                <i class="icon icon-zan1" v-if="!item.isLiked"></i>
                <i class="icon icon-zan" v-if="item.isLiked"></i>
                <span>{{item.likescount}}</span>
              </div>
              <div :class="{list:true, curp:true ,active:item.focused}" v-if="item.step!=3"  @click="handlefocus(item)">
                <i class="icon icon-guanzhu"></i>
                <span>{{item.focus}}</span>
              </div>
              <div :class="{list:true,curp:true,active:commentVisible===index}" @click="commentsVisible(index)">
                <i class="icon icon-pinglun"></i>
                <span>{{item.comment}}</span>
              </div>
            </div>
            <div class="row-ft" >
              <slot name="buttons" :item="item"></slot>
            </div>
          </div>

        </div>
      </div>

      <!--评论-->
      <slot name="ifmycomment" :index="index" :item="item"></slot>


    </div>
    <div class="block" v-if="demodata.total">
      <el-pagination
        layout="prev, pager, next"
        :total="demodata.total"
        :page-count="demodata.pagercount"
        :current-page="demodata.currentpage"

      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import comments from '@/common/comments/comments'

  export default {
    name: "demos",
    components:{
      comments
    },
    props: {
      demodata: {
        type: Object
      },
      needdel:{
        type:Boolean,
        default:false
      }
    },

    data(){
      return{
        steptext: ['待接单', '制作中', '审核中', '完成'],
        commentVisible:"",
        mycomment:'',
      }
    },
    methods:{
      goDemodetail(){
        this.$emit('goDemodetail')
      },
      handlelike(item){
        this.$emit('handlelike',item)
      },
      handlefocus(item){
        this.$emit('handlefocus',item)
      },
      commentsVisible(index){
        this.$emit('commentsVisible',index)
      },
      handleDelete(item){
        this.$emit('handleDelete',item)
      }
    },
    updated(){
    }
  }
</script>

<style lang="less">
@import "./demo.less";
</style>
