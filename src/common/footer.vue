<template>
    <div id="footer">
      <div class="wraper">
          <ul>
            <li v-for="(item,index) of list" :key="`list${index}`">{{item.text}}</li>
          </ul>
        <p>
          2004-2012 心如明镜版权所有，并保留所有权利 | ICP备案证书号：京ICP备00001号
        </p>
      </div>
    </div>
</template>
<style scoped lang="less">
@import "footer.less";
</style>
<script>
  export default{
    name: 'yuanFooter',
    data(){
      return {
        list: [
          {text: '商务合作'},
          {text: '隐私保护'},
          {text: '联系我们'},
          {text: '投诉建议'},
        ]
      }
    }
  }
</script>


