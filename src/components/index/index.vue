<template>
    <div id="index" @click.stop="replayinit('1', $event)">
      <yuan-header></yuan-header>
      <div class="wraper">
        <!--查询条件-->
        <div class="search_category">
          <div class="search_list list_all">
            <div class="search_hd">
              <div class="imgcontainer">
                <img :src="categoryimg" alt="">
              </div>
              <label>全部条件</label>
              <div class='tag'>
                <p v-for="(item,index) of category" :key="`category${index}`">
                  <span>{{item}}</span>
                  <i v-if="index!=category.length-1">> </i>
                </p>

              </div>
            </div>
            <div class="search_ft">共<a>{{fitnum}}</a>位开发者满足条件</div>
          </div>
          <div class="search_list">
            <div class="search_hd">
              <div class="imgcontainer">
                <img :src="languageimg" alt="">
              </div>
              <label>语言</label>
              <div class="list" >
                <p  v-for="(item,index) of language" :key="`category${index}`" @click="handlelanguage('languageactive',index)">
                  <span :class="{active:index==languageactive}">{{item.label}}</span>
                </p>

              </div>
            </div>
            <div class="search_ft"> 更多> </div>
          </div>
          <div class="search_list">
            <div class="search_hd">
              <div class="imgcontainer">
                <img :src="statusimg" alt="">
              </div>
              <label>状态</label>
              <div class="list" >
                <p  v-for="(item,index) of status" :key="`category${index}`" @click="handlestatus('statusactive',index)">
                  <span :class="{active:index==statusactive}">{{item.label}}</span>
                </p>

              </div>
            </div>
          </div>
          <div class="search_list search_sort">
            <div class="search_hd">
              <div class="imgcontainer">
                <img :src="sortimg" alt="">
              </div>
              <label >排序</label>
              <div class="list">
                <p :class="{active:index==sortactive}" v-for="(item,index) of sort" :key="`sort${index}`" @click="handlesort(index)">
                  <span>
                    {{item.label}}
                  </span>
                  <i :class="['sort',item.sort]"></i>
                </p>
              </div>
            </div>
          </div>
        </div>
        <!--demo列表-->
        <demos :demodata="demodata"
               @goDemodetail="goDemodetail"
               @handlelike="handlelike"
               @handlefocus="handlefocus"
               @sendcomment="sendcomment"
               @commentsVisible="commentsVisible"
        >
          <template slot="ifmycomment" slot-scope="props">
            <comments v-show="commentVisible===props.index"
                      :commentsdata="props.item.commentsdata"
                      :index="props.index"
                      :ref="`comment${props.index}`"
                      @zan="zan"
                      @reply="reply"
                      @replyfocus="replyfocus"
                      @innerReply="innerReply"
                      @pagechange="pageChange"
                      @commentSort="commentSort"
                      :class="{commentOrder:props.item.step==3}"
            >
              <template  slot="mycomment">
                <div class="mycomment">
                  <el-input
                    placeholder="发表下自己的评论~"
                    v-model="mycomment"
                    clearable>
                  </el-input>
                  <el-button class="btn-default btn-small" @click="sendcomment(props.item)">评论</el-button>
                </div>

              </template>
            </comments>
          </template>
          <template slot="buttons" slot-scope="props">
            <el-button v-if="props.item.step==0" class="btn-warning" round>接 单</el-button>
            <el-button v-if="(props.item.step==1 ||props.item.step==2 )&& !props.item.focused"  class="btn-default" round @click="handlefocus(props.item)">关注</el-button>
            <el-button v-if="(props.item.step==1 ||props.item.step==2 )&& props.item.focused"  class="btn-primary" round @click="handlefocus(props.item)">已关注</el-button>
            <el-button v-if="props.item.step==3"  class="btn-success btn-download" round>下载{{props.item.downcost?'￥'+props.item.downcost:''}}</el-button>
          </template>

        </demos>
      </div>
      <yuan-footer></yuan-footer>
      <yuan-top></yuan-top>
    </div>
</template>

<script>
  import comments from '@/common/comments/comments'
  import demos from '@/common/demos/demos.vue'
  export default {
    name: "index",
    components:{
      comments,
      demos
    },
    data() {
      return {
        categoryimg:require("@/assets/img/category.png"),
        category:['javaScript','待接单'],
        languageimg:require("@/assets/img/code.png"),
        language:[
          {'label':'JavaScript',active:true},
          {'label':'Java'},
          {'label':'HTML'},
          {'label':'CSS'},
          {'label':'Python'},
          {'label':'C++'},
          {'label':'PHP'}
        ],
        statusimg:require("@/assets/img/status.png"),
        status:[
          {'label':'全部'},
          {'label':'待接单',active:true},
          {'label':'制作中'},
          {'label':'审核中'},
          {'label':'已完成'}
        ],
        fitnum:1520,
        sortimg:require('@/assets/img/sort.png'),
        sort:[
          {
            label:'出价',
            sort:'up',
          },
          {
            label:'好评',
            sort:'',
          },
          {
            label:'下载量',
            sort:'',
          }
        ],
        sortactive:0,
        languageactive:0,
        statusactive:0,
        demodata: {
          total: 100,
          pagercount: 10,
          currentpage: 1,
          list:  [
            {
              id:'1',
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
              downloadnum:100,
              likescount:100,

              step: 0,
              introduce: `最新代码地址：https://github.com/gltwy/LTScrollView ios scrollview嵌套tableview同向滑动（初级、进阶)，方法可见内部Demo 如果对您有用，欢迎给个star哦！最新代码地址：https://github.com/gltwy/LTScrollView ios 最新代码地址：https://github.com/gltwy/LTScrollView ios
              最新代码地址：https://github.com/gltwy/LTScrollView ios scrollview嵌套tableview同向滑动（初级、进阶)，方法可见内部Demo 如果对您有用，欢迎给个star哦！最新代码地址：https://github.com/gltwy/LTScrollView ios 最新代码地址：https://github.com/gltwy/LTScrollView ios`
              ,
              commentsdata:{
                page: 1,
                count: 100,
                sort: 0,
                "comments": [{
                  userInfo: {
                    name: '凉轩辕9',
                    level: 'v1',
                    tag: ['HTML']
                  },
                  content: '我是来学习的，相当不错，已经关注了',
                  time: '2018-11-09T05:19:05.912Z',
                  isLiked: true,
                  linksCount: 100,
                  topComment: []
                },
                  {
                    userInfo: {
                      name: '知晓32',
                      level: 'v1',
                      tag: ['Java']
                    },
                    content: '我是来学习的，相当不错，已经关注了',
                    time: '2018-11-09T05:19:05.912Z',
                    isLiked: true,
                    linksCount: 100,
                    topComment: [{
                      content: "我也是",
                      time: '2018-11-09T05:19:05.912Z',
                      respUserInfo: { /*被回复者 后面*/
                        name: "知晓32",
                      },
                      userInfo: { /*回复者 前面*/
                        name: '阿萨姆啦',
                      }

                    },
                      {
                        content: "我也是我也是我也是我也是我也是我也是我也是我也是我也是我也是我也是我也是我也是我也是我也是我也是我也是我也是我也是我也是我也是我也是我也是我也是我也是我也是我也是我也是我也是我也是我也是我也是",
                        time: '2018-11-09T05:19:05.912Z',
                        respUserInfo: { /*被回复者 后面*/
                          name: "知晓32",
                        },
                        userInfo: { /*回复者 前面*/
                          name: '金银岛',
                        }

                      }

                    ]
                  },
                  {
                    userInfo: {

                      name: '熊猫先生',
                      level: 'v1',
                      tag: ['c++']
                    },
                    content: '我是来学习的，相当不错，已经关注了',
                    time: '2018-11-09T05:19:05.912Z',
                    isLiked: true,
                    linksCount: 100,
                    topComment: []
                  },
                ]

              }
            },
            {  id:'2',
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
              downloadnum:100,
              likescount:100,
              step: 1,
              focused:false,
              introduce: `需求介绍：iOS7.0加入了自定义转场动画，淘汰了之前左右两大隐藏护法的抽屉效果，并且一些浮窗、弹层都可以用vc来显
示了，不再是用view盖在window上看了一些抽屉Demo发觉都是OC写的。`,
              commentsdata:{
                page: 1,
                count: 100,
                sort: 0,
                "comments": [{
                  userInfo: {
                    name: '凉轩辕9',
                    level: 'v1',
                    tag: ['HTML']
                  },
                  content: '我是来学习的，相当不错，已经关注了',
                  time: '2018-11-09T05:19:05.912Z',
                  isLiked: true,
                  linksCount: 100,
                  topComment: []
                },
                  {
                    userInfo: {
                      name: '知晓32',
                      level: 'v1',
                      tag: ['Java']
                    },
                    content: '我是来学习的，相当不错，已经关注了',
                    time: '2018-11-09T05:19:05.912Z',
                    isLiked: true,
                    linksCount: 100,
                    topComment: [{
                      content: "我也是",
                      time: '2018-11-09T05:19:05.912Z',
                      respUserInfo: { /*被回复者 后面*/
                        name: "知晓32",
                      },
                      userInfo: { /*回复者 前面*/
                        name: '阿萨姆啦',
                      }

                    },
                      {
                        content: "我也是我也是我也是我也是我也是我也是我也是我也是我也是我也是我也是我也是我也是我也是我也是我也是我也是我也是我也是我也是我也是我也是我也是我也是我也是我也是我也是我也是我也是我也是我也是我也是",
                        time: '2018-11-09T05:19:05.912Z',
                        respUserInfo: { /*被回复者 后面*/
                          name: "知晓32",
                        },
                        userInfo: { /*回复者 前面*/
                          name: '金银岛',
                        }

                      }

                    ]
                  },
                  {
                    userInfo: {

                      name: '熊猫先生',
                      level: 'v1',
                      tag: ['c++']
                    },
                    content: '我是来学习的，相当不错，已经关注了',
                    time: '2018-11-09T05:19:05.912Z',
                    isLiked: true,
                    linksCount: 100,
                    topComment: []
                  },
                ]

              }
            },
            {  id:'3',
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
              downloadnum:100,
              likescount:100,
              step: 2,
              focused:true,
              introduce: `需求介绍：iOS7.0加入了自定义转场动画，淘汰了之前左右两大隐藏护法的抽屉效果，并且一些浮窗、弹层都可以用vc来显
示了，不再是用view盖在window上看了一些抽屉Demo发觉都是OC写的。`,
              commentsdata:{
                page: 1,
                count: 100,
                sort: 0,
                "comments": [{
                  userInfo: {
                    name: '凉轩辕9',
                    level: 'v1',
                    tag: ['HTML']
                  },
                  content: '我是来学习的，相当不错，已经关注了',
                  time: '2018-11-09T05:19:05.912Z',
                  isLiked: true,
                  linksCount: 100,
                  topComment: []
                },
                  {
                    userInfo: {
                      name: '知晓32',
                      level: 'v1',
                      tag: ['Java']
                    },
                    content: '我是来学习的，相当不错，已经关注了',
                    time: '2018-11-09T05:19:05.912Z',
                    isLiked: true,
                    linksCount: 100,
                    topComment: [{
                      content: "我也是",
                      time: '2018-11-09T05:19:05.912Z',
                      respUserInfo: { /*被回复者 后面*/
                        name: "知晓32",
                      },
                      userInfo: { /*回复者 前面*/
                        name: '阿萨姆啦',
                      }

                    },
                      {
                        content: "我也是我也是我也是我也是我也是我也是我也是我也是我也是我也是我也是我也是我也是我也是我也是我也是我也是我也是我也是我也是我也是我也是我也是我也是我也是我也是我也是我也是我也是我也是我也是我也是",
                        time: '2018-11-09T05:19:05.912Z',
                        respUserInfo: { /*被回复者 后面*/
                          name: "知晓32",
                        },
                        userInfo: { /*回复者 前面*/
                          name: '金银岛',
                        }

                      }

                    ]
                  },
                  {
                    userInfo: {

                      name: '熊猫先生',
                      level: 'v1',
                      tag: ['c++']
                    },
                    content: '我是来学习的，相当不错，已经关注了',
                    time: '2018-11-09T05:19:05.912Z',
                    isLiked: true,
                    linksCount: 100,
                    topComment: []
                  },
                ]

              }
            },
            {  id:'4',
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
              downloadnum:100,
              likescount:100,
              step: 3,
              isLiked:false,
              introduce: `需求介绍：iOS7.0加入了自定义转场动画，淘汰了之前左右两大隐藏护法的抽屉效果，并且一些浮窗、弹层都可以用vc来显
示了，不再是用view盖在window上看了一些抽屉Demo发觉都是OC写的。`,
              commentsdata:{
                page: 1,
                count: 100,
                sort: 0,
                "comments": [{
                  userInfo: {
                    name: '凉轩辕9',
                    level: 'v1',
                    tag: ['HTML']
                  },
                  content: '我是来学习的，相当不错，已经关注了',
                  time: '2018-11-09T05:19:05.912Z',
                  isLiked: true,
                  linksCount: 100,
                  topComment: []
                },
                  {
                    userInfo: {
                      name: '知晓32',
                      level: 'v1',
                      tag: ['Java']
                    },
                    content: '我是来学习的，相当不错，已经关注了',
                    time: '2018-11-09T05:19:05.912Z',
                    isLiked: true,
                    linksCount: 100,
                    topComment: [{
                      content: "我也是",
                      time: '2018-11-09T05:19:05.912Z',
                      respUserInfo: { /*被回复者 后面*/
                        name: "知晓32",
                      },
                      userInfo: { /*回复者 前面*/
                        name: '阿萨姆啦',
                      }

                    },
                      {
                        content: "我也是我也是我也是我也是我也是我也是我也是我也是我也是我也是我也是我也是我也是我也是我也是我也是我也是我也是我也是我也是我也是我也是我也是我也是我也是我也是我也是我也是我也是我也是我也是我也是",
                        time: '2018-11-09T05:19:05.912Z',
                        respUserInfo: { /*被回复者 后面*/
                          name: "知晓32",
                        },
                        userInfo: { /*回复者 前面*/
                          name: '金银岛',
                        }

                      }

                    ]
                  },
                  {
                    userInfo: {

                      name: '熊猫先生',
                      level: 'v1',
                      tag: ['c++']
                    },
                    content: '我是来学习的，相当不错，已经关注了',
                    time: '2018-11-09T05:19:05.912Z',
                    isLiked: true,
                    linksCount: 100,
                    topComment: []
                  },
                ]

              }
            },
            {  id:'5',
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
              downloadnum:100,
              likescount:100,
              step: 3,
              isLiked:false,
              introduce: `需求介绍：iOS7.0加入了自定义转场动画，淘汰了之前左右两大隐藏护法的抽屉效果，并且一些浮窗、弹层都可以用vc来显
示了，不再是用view盖在window上看了一些抽屉Demo发觉都是OC写的。`,
              downcost:'10',
              commentsdata:{
                page: 1,
                count: 100,
                sort: 0,
                "comments": [{
                  userInfo: {
                    name: '凉轩辕9',
                    level: 'v1',
                    tag: ['HTML']
                  },
                  content: '我是来学习的，相当不错，已经关注了',
                  time: '2018-11-09T05:19:05.912Z',
                  isLiked: true,
                  linksCount: 100,
                  topComment: []
                },
                  {
                    userInfo: {
                      name: '知晓32',
                      level: 'v1',
                      tag: ['Java']
                    },
                    content: '我是来学习的，相当不错，已经关注了',
                    time: '2018-11-09T05:19:05.912Z',
                    isLiked: true,
                    linksCount: 100,
                    topComment: [{
                      content: "我也是",
                      time: '2018-11-09T05:19:05.912Z',
                      respUserInfo: { /*被回复者 后面*/
                        name: "知晓32",
                      },
                      userInfo: { /*回复者 前面*/
                        name: '阿萨姆啦',
                      }

                    },
                      {
                        content: "我也是我也是我也是我也是我也是我也是我也是我也是我也是我也是我也是我也是我也是我也是我也是我也是我也是我也是我也是我也是我也是我也是我也是我也是我也是我也是我也是我也是我也是我也是我也是我也是",
                        time: '2018-11-09T05:19:05.912Z',
                        respUserInfo: { /*被回复者 后面*/
                          name: "知晓32",
                        },
                        userInfo: { /*回复者 前面*/
                          name: '金银岛',
                        }

                      }

                    ]
                  },
                  {
                    userInfo: {

                      name: '熊猫先生',
                      level: 'v1',
                      tag: ['c++']
                    },
                    content: '我是来学习的，相当不错，已经关注了',
                    time: '2018-11-09T05:19:05.912Z',
                    isLiked: true,
                    linksCount: 100,
                    topComment: []
                  },
                ]

              }
            },
          ]
        },
        commentVisible:"",
        mycomment:'',
        inputfocus:false,
        focustarget:'',
      }
    },
    methods:{
      handlesort(index){
        this.sortactive=index;
        let sortname=this.sort[index].sort;
        this.sort.map((item,i)=>{
          if(i!=index){
            item.sort=''
          }
        });
        switch (sortname){
          case '':
            this.sort[index].sort='up';
            break;
          case 'up':
            this.sort[index].sort='down';
            break;
          case 'down':
            this.sort[index].sort='up';
            break;
        }

      },
      handlelanguage(prop,index){
          this.highlight(prop,index)
      },
      handlestatus(prop,index){
        this.highlight(prop,index)
      },
      highlight(prop,index){
        this[prop]=index
      },
      goDemodetail(){
        this.$router.push('DemoDetail')
      },
      commentsVisible(index){
        let commentVisible=this.commentVisible;
        this.commentVisible=commentVisible===index?"":index;

      },
      sendcomment(item,val){/*回复展开的评论*/
        this.$message.info(`这是对demo id为${item.id}的评论操作，回复内容为${val}`)//后续删除
      },
      handlelike(item){
        if(item.isLiked){
          item.isLiked=false;
          item.likescount=item.likescount-1;//点赞数量做演示用，以实际数据为准
        }else{
          item.isLiked=true;
          item.likescount=item.likescount+1;//点赞数量做演示用，以实际数据为准
        }

      },
      zan({index,itemi}){/*点赞*/
        let currentlist=this.demodata.list[index];

        let currentcomment=currentlist.commentsdata.comments[itemi];
        //赞高亮
        this.demodata.list[index].commentsdata.comments[itemi].isLiked=!currentcomment.isLiked;
        //赞加减
        if(currentcomment.isLiked){
          this.demodata.list[index].commentsdata.comments[itemi].linksCount++
        }else{
          this.demodata.list[index].commentsdata.comments[itemi].linksCount--
        }
      },
      reply({index,itemi,callback},$event){/*点赞旁边的回复*/
        this.replayinit();
        let currentlist=this.demodata.list[index];

        let currentcomment=currentlist.commentsdata.comments[itemi];

        //回复高亮
        this.demodata.list[index].commentsdata.comments[itemi].replyvisible=!currentcomment.replyvisible;
        this.$nextTick(()=>{
         this.focustarget=callback();
        })

      },
      replyfocus(val){
        this.inputfocus=val;
      },
      replayinit(type,event){/*评论中的单个回复*/
        if(event&& event.target.className=='el-textarea__inner'){
          this.focustarget=event.target;
          return
        }
        if(this.inputfocus){
          this.focustarget.focus();
          return
        }
        this.demodata.list.forEach(item=>{
          item.commentsdata.comments.forEach(comment=>{
            if(type=='init'){
              this.$set(comment,'replyvisible',false)

            }else{
              comment.replyvisible=false;
            }

          })
        })
      },
      innerReply(val){
        this.$message.info(`您的回复为：${val}`)

      },
      handlefocus(item){
        let iffocused=item.focused;
        item.focused=!iffocused;
        if(iffocused){
          item.focus--
        }else{
          item.focus++
        }
      },
      handlecancelfocus(item){
        item.focused=false;
        this.$message({
          message: '取消成功',
          type: 'success'
        });
      },
      pageChange(a,index){
        console.log(`第${a}页，第${index}项`);
      },
      commentSort(val,index){
        this.$message.info(`第${index}模块的评论按${val}排序`)
      }
    },
    mounted(){
      //增加评论中回复的显示设置 replyvisible
      this.replayinit('init')
    }
  }
</script>


<style scoped lang="less">
  @import "./indexScope.less";
</style>
<style lang="less">
  @import "./index.less";
</style>
