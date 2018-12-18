<template>
  <div id="releaseDemand">
    <yuan-header></yuan-header>
    <div class="wraper">
      <header>
        <img :src="headerImg" alt="">
      </header>
      <main>
        <el-form label-position="top" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px"
                 class="demo-ruleForm">
          <div class="formLists">
            <dl class="row">
              <dt class="required"><i>1</i><span>标题</span></dt>
              <dd>
                <el-form-item prop="title" class="cell">
                  <el-input class="wi100" v-model="ruleForm.title" size="small" placeholder="请输入标题"></el-input>
                </el-form-item>
              </dd>
            </dl>
            <dl class="row">
              <dt class="required"><i>2</i><span>需求截止时间</span></dt>
              <dd>
                <el-form-item prop="year" class="cell">
                  <el-date-picker class="timepicker" v-model="ruleForm.year" size="small" type="year"></el-date-picker>
                </el-form-item>
                <span>年</span>
                <el-form-item prop="month" class="cell">
                  <el-date-picker class="timepicker" v-model="ruleForm.month" size="small" type="month" format="MM"></el-date-picker>
                </el-form-item>
                <span>月</span>
                <el-form-item prop="date" class="cell">
                  <el-date-picker class="timepicker" v-model="ruleForm.date" size="small" type="date" format="dd"></el-date-picker>
                </el-form-item>
                <span>日</span>
              </dd>
            </dl>
            <dl class="row">
              <dt class="required"><i>3</i><span>出价</span></dt>
              <dd>
                <el-form-item prop="price">
                  <el-select v-model="ruleForm.price" placeholder="请选择出价" class="size-middle" clearable>
                    <el-option  v-for="(item,index) of price" :key="`price${index}`"
                                :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </dd>
            </dl>
            <dl class="row">
              <dt class="required"><i>4</i><span>主语言</span></dt>
              <dd>
                <el-form-item prop="language">
                  <el-select v-model="ruleForm.language" placeholder="请选择主语言"  class="size-middle" clearable>
                    <el-option v-for="(item,index) of language" :key="item.label"
                      :label="item.label|capitalize" :value="item.value"></el-option>
                  </el-select>
                </el-form-item>
              </dd>
            </dl>
            <dl class="row">
              <dt class="required"><i>5</i>运行环境</dt>
              <dd >
                <div class="run">
                  <el-form-item prop="environment">
                    <el-input type="textarea" v-model="ruleForm.environment"  class="textarea-large" placeholder="请输入运行环境"></el-input>
                  </el-form-item>
                  <div class="upload">
                    <span>运行环境附件上传</span>
                    <el-upload
                      action="https://jsonplaceholder.typicode.com/posts/"
                      :on-preview="handlePreview"
                      :on-remove="handleRemove"
                      :before-remove="beforeRemove"
                      multiple
                      :file-list="fileList">
                      <el-button size="small" type="primary" round>上传</el-button>
                    </el-upload>

                  </div>
                </div>
              </dd>

            </dl>
            <dl>
              <dt class="required"><i>6</i>需求介绍</dt>
              <dd>
                <el-form-item prop="introduction">
                  <el-input type="textarea" v-model="ruleForm.introduction" placeholder="请输入需求介绍" class="textarea-large"></el-input>
                </el-form-item>
              </dd>

            </dl>
            <dl>
              <dt><i>7</i>上传图片</dt>
              <dd>
                <el-upload
                  action="https://jsonplaceholder.typicode.com/posts/"
                  list-type="picture-card"
                  :on-preview="handlePictureCardPreview"
                  :on-remove="handlePictureRemove">
                  <img :src="camera" alt="" class="camera">
                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                  <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
              </dd>

            </dl>
          </div>

          <div  class="submit">
            <el-button type="primary" round @click="submitForm('ruleForm')">发布</el-button>
          </div>
        </el-form>
      </main>

    </div>

    <yuan-footer></yuan-footer>
  </div>
</template>
<script>

  export default{
    data(){
      return {
        headerImg: require('@/assets/img/headerImg.png'),
        price: [{label: '1956', value: '1956'}, {label: '1966', value: '1966'}],
        language: [{label: 'java', value: 0}, {label: 'css', value: 1}, {label: 'html', value: 2}],
        ruleForm: {
          title:"",
          year: "",
          month: "",
          date: "",
          price: "",
          language: "",
          environment: "",
          introduction: ""
        },
        rules: {
          title: [
            {required: true, message: '请输入标题', trigger: 'blur'},
          ],
          year: [
            {required: true, message: '请选择年', trigger: 'blur'},
          ],
          month: [
            {required: true, message: '请选择月', trigger: 'blur'},
          ],
          date: [
            {required: true, message: '请选择日期', trigger: 'blur'},
          ],
          price: [
            {required: true, message: '请选择出价', trigger: 'blur'},
          ]
          ,
          language: [
            {required: true, message: '请选择主语言', trigger: 'blur'},
          ],
          environment: [
            {required: true, message: '请输入运行环境', trigger: 'blur'},
          ],
          introduction: [
            {required: true, message: '请输入需求介绍', trigger: 'blur'},
          ]
        },
        dialogImageUrl: '',
        dialogVisible: false,
        fileList: [{
          name: 'food.jpeg',
          url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        }, {
          name: 'food2.jpeg',
          url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        }],
        camera: require('@/assets/img/camera.png')
      }
    },
    methods: {
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      handlePictureRemove(file,fileList){
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            this.$message.error(`请输入必填项`);
            return false;
          }
        });
      },
    }
  }
</script>
<style lang="less" scoped>
  @import "releaseDemandscoped.less";
</style>
<style lang="less">
@import "releaseDemand.less";

</style>


