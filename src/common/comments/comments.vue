<template>
    <div id="comments" >
      <div class="comments_summar">
        <div class="hd">{{commentsdata.count}}条评论 </div>
        <ul class="ft">
          <li @click="commentSort(0)" :class="{current:commentsdata.sort==0}">按时间正序</li>
          <li @click="commentSort(1)" :class="{current:commentsdata.sort==1}">按时间倒序</li>
        </ul>
      </div>
      <div class="comments_list">
        <div class="list" v-for="(item,itemi) of commentsdata.comments" :key="`comment${itemi}`">
          <div class="list-hd">
            <div class="cell-hd">
              <img :src="item.userInfo.userIcon?item.userInfo.userIcon:defaulavatar" alt=""><span class="name">{{item.userInfo.name}}</span><i
              class="level">{{item.userInfo.level}}</i>
              <span :class="{
                    'tag':true,
                    'html':taglist.toLocaleLowerCase().indexOf('html')>-1,
                    'java':taglist.toLocaleLowerCase().indexOf('java')>-1,
                    'c':taglist.toLocaleLowerCase().indexOf('c++')>-1
                    }" v-for="(taglist,tagi) of item.userInfo.tag" :key="`tag${tagi}`">{{taglist|capitalize}}</span>
            </div>
            <time class="cell-ft">{{item.time|filterTime}}</time>
          </div>
          <div class="list-bd">{{item.content}}</div>
          <div class="list-ft">
            <ul>
              <li :class="{focus:item.isLiked}" @click="handleZan(index,itemi)"><i class="icon icon-zan"></i>{{item.linksCount}}
              </li>
              <li :class="{focus:item.replyvisible,iconreply:true}"  @click.stop="handleReply(index,itemi)"><i class="icon icon-huifu"></i>回复</li>
            </ul>
          </div>

          <!--回复内容-->
          <div class="recomments" v-if="item.topComment&&item.topComment.length>0">
            <div class="recomment_cell" v-for="(recomment,itemi) of item.topComment" :key="`recomment${itemi}`">
              <div class="recomment_hd">
                <span>{{recomment.userInfo.name}}</span> 回复 <span>{{recomment.respUserInfo.name}} :</span>
                {{recomment.content}}
              </div>
              <time class="recomment_ft">
                {{recomment.time|filterTime}}
              </time>
            </div>
          </div>
          <!--回复输入框-->
          <div class="reply" v-show="item.replyvisible" :ref="`reply${index}`">
            <div class="hd">
              <label>
                回复 <span>{{item.userInfo.name}}</span> :
              </label>
              <el-input  ref="replytextarea"  type="textarea"  autosize resize="none"  v-model="replytext"></el-input>
            </div>
            <div class="ft">
              <el-button class="btn-cancel" round @click="handleCancel">取消</el-button>
              <el-button class="btn-default btn-small" round @click="handleInnerReply">回复</el-button>
            </div>
          </div>
        </div>

        <el-pagination
          v-if="commentsdata.count"
          layout="prev, pager, next"
          :current-page="commentsdata.page"
          :total="commentsdata.count"
          @current-change="pageChange"
          class="pager"
        >
        </el-pagination>
        <slot name="mycomment"></slot>
      </div>
    </div>
</template>

<script>

  export default {
    name: "commoncomments",
    props:{
      commentsdata:{
          type:Object
      },
      index:{
        type:Number
      }
    },
    data() {
      return {
        defaulavatar:require("@/assets/img/userIcon.png"),
        replytext:''
      }
    },
    watch:{
      replytext(){
        if(this.replytext==''){
          this.$emit('replyfocus',false)
        }else{
          this.$emit('replyfocus',true)
        }
      }
    },
    methods:{
      pageChange(a){/*分页*/

        this.$emit('pagechange',a,this.index)
      },
      handleZan(index,itemi){
       this.$emit("zan",{index,itemi})

      },
      handleReply(index,itemi){
        this.replytext='';
        this.$emit("reply",{index,itemi,callback:()=>{
            this.$refs.replytextarea[itemi].$el.querySelector('.el-textarea__inner').focus();
           return this.$refs.replytextarea[itemi].$el.querySelector('.el-textarea__inner')
          }});


      },
      handleCancel(){/*评论取消*/
        this.$emit('replyfocus',false);
        this.replytext='';
      },
      handleInnerReply() {/*评论确定*/
        let replytext = this.replytext;
        this.$emit('innerReply', replytext);
        this.$emit('replyfocus',false);
        this.replytext = '';

      },
      commentSort(type){
          this.$emit('commentSort',type,this.index)
      }
    }
  }
</script>

<style scoped lang="less">
@import "./commentsscoped.less";
</style>
<style  lang="less">
  @import "./comments.less";
</style>
