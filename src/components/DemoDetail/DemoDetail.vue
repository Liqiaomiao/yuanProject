<template>
  <div id="DemoDetail"  @click.stop="replayinit('1', $event)">
    <yuan-header></yuan-header>
    <div class="wraper">
      <div class="main-left">
        <div class="tag">
          <span>已完成</span>
        </div>
        <div class="cost">
          <span>
             ￥ {{cost}}
          </span>
        </div>
        <div class="authorInfo">
          <img class="profilePhoto" :src="profilePhoto" alt="">
          <div class="author">
            <span class="nickname"> {{nickname}} </span>
            <p class="level">{{level}}</p>
          </div>
        </div>
        <dl class="rates">
          <dt>评分：</dt>
          <dd v-for="(item,index) in rates">
            <span :class="index==3?'col_4c':''">{{item.text}} :</span>
            <el-rate
              v-model="item.rate"
              disabled
              show-score
              :text-color="index==3?'#2595fe':'#808080'"
              :colors="['#fce14c', '#fad841', '#f8d33d']"
              score-template="{value} 分">
            </el-rate>
          </dd>
        </dl>
      </div>
      <div class="main-right">
        <div class="panel">
          <!--大标题-->
          <h4 class="detail_title"><span>{{detail_title}}</span><button class="btn-success">下载 ￥10</button></h4>
          <div class="sub">
            <ul>
              <li v-for="(item,index) in subs" :key="`sub${index}`" :class="item.iffocus?'focus':''" @click="handlemethods(index)">
                <i :class="['icon',`icon-${item.icon}`]"></i>
                <span>{{`${item.text}${item.num}`}}</span>
              </li>
              <li>
                <i :class="['icon','icon-shijian']"></i>
                <time>{{time|filterTime}}</time>
              </li>
            </ul>
          </div>
          <!--蓝框内容-->
          <div class="project_info">
            <div class="project_cell">
              <p class="title">语言:</p>
              <ul>
                <li v-for="(item,index) in language" :key="`language${index}`">{{item}}</li>
              </ul>
            </div>
            <div class="project_cell">
              <p class="title">附件下载</p>
            </div>
            <div class="project_cell">
              <p class="title">运行环境:</p>
              <el-upload
                class="upload"
                action="https://jsonplaceholder.typicode.com/posts/"
                :on-remove="handleRemove"
                :before-remove="beforeRemove"
                multiple
                :on-exceed="handleExceed"
                :on-error="handleError"
                :on-success="handleSuccess"
                :file-list="environment">
                <el-button size="small" type="primary" round>上传</el-button>
              </el-upload>
            </div>
            <div class="project_cell">
              <p class="title">代码部分:</p>
              <el-upload
                class="upload"
                action="https://jsonplaceholder.typicode.com/posts/"
                :on-remove="handleRemove"
                :before-remove="beforeRemove"
                multiple
                :on-exceed="handleExceed"
                :on-error="handleError"
                :on-success="handleSuccess"
                :file-list="code">
                <el-button size="small" type="primary" round>上传</el-button>
              </el-upload>
            </div>
          </div>
          <!--需求介绍-->
          <div class="project_Detail">
            <h5>需求介绍</h5>
            <div class="details"  v-html="requirement">
            </div>
          </div>
          <!--详细-->
          <div class="project_Detail">
            <h5>详细</h5>
            <div class="details">
              <!--一 准备工作-->
              <div class="title">一 准备工作</div>
              <div class="pl20">
                <div class="subtitle">运行环境要求</div>
                <ul class="environmentReq">
                  <li v-for="(item,index) in environmentReq" :key="`req${index}`">{{item}}</li>
                </ul>
                <div class="subtitle">部署说明</div>
                <div class="details">
                  {{requirement}}
                </div>
              </div>
              <!--二 代码部分-->
              <div class="title">二 代码部分</div>
              <div class="pl20">
                <div class="details">
                  {{requirement}}
                </div>
                <div class="codes">
               <pre class="brush: c-sharp;">
                 {{markdownhtml}}
                </pre>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="panel">
          <!--评论-->
          <div class="comments">
            <div class="unlogin"  v-if="!ifLoinged">
              <img :src="userIcon" alt="">
              <div class="unlogin_ft">
                <div>
                  <el-button  size="small" type="primary" round class="btn-default">登录</el-button>
                  <span>后发表评论~</span>
                </div>
              </div>
            </div>
            <div class="logined" v-else>
              <img :src="userIcon" alt="">
              <div class="logined_ft">
                <el-input type="textarea" resize="none" class="mycomment" v-model="mycomment" placeholder="发表下自己的评论~"></el-input>
                <div>
                  <el-button class="btn-default">评论</el-button>
                </div>

              </div>
            </div>
            <div v-if="commentsdata.count&&commentsdata.count>0">
              <comments
                        :commentsdata="commentsdata"
                        :ref="`comment`"
                        :index="1"
                        @zan="zan"
                        @reply="reply"
                        @replyfocus="replyfocus"
                        @innerReply="innerReply"
                        @pagechange="pageChange"
                        @commentSort="commentSort"
              >
              </comments>
            </div>
          </div>

        </div>
        <el-row></el-row>
      </div>
    </div>
    <yuan-footer></yuan-footer>
    <yuan-top></yuan-top>
  </div>
</template>
<script>
  import comments from '@/common/comments/comments'
  import axios from 'axios'
  import apis from '@/api'
  export default {
    name: 'demoDetail',
    components:{
      comments
    },
    data () {
      return {
        cost: 1000,
        profilePhoto: require('../../assets/img/defaultIcon.png'),
        nickname: '知晓1829',
        level:"v1",
        rates:[
          {text:"代码质量",rate:4.8},
          {text:"按时完成",rate:4.7},
          {text:"实现效果",rate:4.9},
          {text:"综合评分",rate:4.8},
        ],
        detail_title:'ios scrollview嵌套tableview同向滑动（初级、进阶）',
        subs:[
          {text:'关注',num:'100',icon:'guanzhu',iffocus:false,},
          {text:'下载',num:'100',icon:'xiazai',iffocus:false,},
          {text:'分享',num:'100',icon:'fenxiang',iffocus:false,},
          {text:'赞',num:'100',icon:'zan',iffocus:true,},
          {text:'评论',num:'100',icon:'pinglun',iffocus:false,}
        ],
        time:'2018-11-09T05:19:05.912Z',
        language:['Java'],
        environment:[{name:'Android studio 2.3.2'},{name:'Android 7.0'}],
        code:[{name:'前端src'},{name:'后台src'}],
        requirement:'最新代码地址：https://github.com/gltwy/LTScrollView\n' +
        'ios scrollview嵌套tableview同向滑动（初级、进阶)， 支持OC / Swift具体使用方法可见内部Demo\n' +
        '\n' +
        '如果对您有用，欢迎给个star哦！',
        environmentReq:['Android studio 2.3.2','jdk 1.7.0','Android studio 自带模拟器'],
        markdownhtml:`
        <span>abc</span>
        <p>sksk</p>
        <div>ijij</div>
        \<script\>
           methods:{
              handlemethods(index){
                let iffocus=this.subs[index].iffocus;
                let num=this.subs[index].num;
                this.subs[index].iffocus= !iffocus;
                this.subs[index].num=!iffocus?(num+1):(num-1)
              }
            }
        <\/script\>
        `,
        userIcon:require('@/assets/img/userIcon.png'),
        commentsdata:{},
        mycomment:'',
        ifLoinged:this.$store.state.ifLoinged,
        commentVisible:"",
      }
    },
    computed:{
      ratetextcolor(index){
        return '#808080'
      }
    },
    methods:{
      handlemethods(index){
        let iffocus=this.subs[index].iffocus;
        let num=this.subs[index].num;
        this.subs[index].iffocus= !iffocus;
        this.subs[index].num=!iffocus?(num+1):(num-1)
      },
      /*上传start*/
      handleRemove(file, fileList) {/*移除文件*/
        console.log(file, fileList);
      },
      handleExceed(files, fileList) { //属性limit 限定选定个数， handleExceed 处理超出个数
        // this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove(file, fileList) {/*移除确认*/
        return this.$confirm(`确定移除 ${ file.name }？`);
      },
      handleError(err, file, fileList){
        this.$message.error(`上传失败`);
      },
      handleSuccess(response, file, fileList){
        this.$message.error(`上传成功`);
      },
      /*上传end*/
      pageChange(a){/*分页*/
        console.log('第',a,'页');
      },
      zan({index,itemi}){/*点赞*/
        let currentcomment=this.commentsdata.comments[itemi];
        //赞高亮
        this.commentsdata.comments[itemi].isLiked=!currentcomment.isLiked;
        //赞加减
        if(currentcomment.isLiked){
          this.commentsdata.comments[itemi].linksCount++
        }else{
          this.commentsdata.comments[itemi].linksCount--
        }
      },
      reply({index,itemi,callback},$event){/*点赞旁边的回复*/
        this.replayinit();
        let currentcomment=this.commentsdata.comments[itemi];
        console.log(itemi);
        // //回复高亮
        this.commentsdata.comments[itemi].replyvisible=!currentcomment.replyvisible;
        this.$nextTick(()=>{
          this.focustarget=callback();
        })

      },
      replyfocus(val){
        this.inputfocus=val;
      },
      innerReply(val){
        this.$message.info(`您的回复为：${val}`)

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

          this.commentsdata.comments.forEach(comment=>{
            if(type=='init'){
              this.$set(comment,'replyvisible',false)

            }else{
              comment.replyvisible=false;
            }//




        })
      },
      commentSort(val,index){
        this.$message.info(`第${index}模块的评论按${val}排序`)
      }
    },
    updated(){

    },
    mounted(){
        //代码高亮调用
      SyntaxHighlighter.highlight();
      //模拟 请求评论
      axios({
          methods:'get',
          url:apis.comments,
      }).then(({data})=>{
        data.comments.forEach((item)=>{
          item.userInfo.userIcon=require(`@/${item.userInfo.userIcon}`)
        })
        this.commentsdata=data;
        this.replayinit('init')
      }).catch(err=>{
        this.$message.error(err)
      })
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  @import "DemoDetailscoped.less";
</style>
<style lang="less">
@import "DemoDetail.less";
</style>
