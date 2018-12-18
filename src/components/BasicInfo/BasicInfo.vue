<template>
  <div id="BasicInfo">
    <div class="userinfo_container">
      <div class="userinfo">
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          :on-error="handleAvatarError"
        >
          <div class="pr">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i  class="icon icon-weibiaoti553"></i>
            <div class="masker"></div>
          </div>
        </el-upload>
        <dl class="processing">
          <dt>{{username}}</dt>
          <dd>
            <span>完善度：</span>
            <el-progress class="my-progress" :percentage="percentage"></el-progress>
          </dd>
        </dl>
        <div class="btns">
          <el-button round class="btn-default">预览</el-button>
          <el-button round class="btn-warning">上传简历</el-button>
          <el-button round class="btn-primary">简历模板下载</el-button>
        </div>
      </div>
    </div>
    <el-form  :label-position="labelPosition" label-width="84px" :model="form" :rules="rules" ref="form">
      <div class="form-panel">
        <div class="form-title">基本资料</div>
        <div class="row">
          <el-form-item label="姓名" prop="baseInfo.name">
            <el-input clearable  v-model="form.baseInfo.name"></el-input>
          </el-form-item>
        </div>
        <div class="row">
          <el-form-item label="性别" prop="baseInfo.sex">
            <el-radio-group v-model="form.baseInfo.sex">
              <el-radio v-for="(item,index) of sex" :key="`sex${index}`"
                        :label="item.label"
                        :value="item.value"
              ></el-radio>
            </el-radio-group>
          </el-form-item>
        </div>
        <div class="row">
          <el-form-item label="职位" prop="baseInfo.job">
            <el-input clearable  v-model="form.baseInfo.job"></el-input>
          </el-form-item>
        </div>
        <div class="row">
          <el-form-item label="工作年限" prop="baseInfo.workingyears">
            <el-select clearable  v-model="form.baseInfo.workingyears" placeholder="请选择工作年限">
              <el-option v-for="(item,index) of workingyears" :key="`working${index}`"
                         :label="item.label"
                         :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="row location">
          <el-form-item label="所在城市" required>
            <el-form-item prop="baseInfo.province"
                          :rules="[
                            {required:true, message: '请选择省', trigger: 'change'}
                          ]"
            >
              <el-select v-model="form.baseInfo.province" clearable
                         placeholder="省" @change="provinceChange">
                <el-option v-for="(item,index) of province " :key="`plist${index}`"
                           :label="item.label"
                           :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="baseInfo.city"
                          :rules="[
                            {required:true, message: '请选择城市', trigger: 'change'}
                          ]">
              <el-select v-model="form.baseInfo.city" clearable
                         placeholder="市"  @change="cityChange">
                <el-option v-for="(item,index) of city " :key="`clist${index}`"
                           :label="item.label"
                           :value="item.value"

                ></el-option>

              </el-select>
            </el-form-item>
            <el-form-item prop="baseInfo.city"
                          :rules="[
                            {required:true, message: '请选择区县', trigger: 'change'}
                          ]">
              <el-select v-model="form.baseInfo.area" clearable
                         placeholder="区/县">
                <el-option v-for="(item,index) of area " :key="`clist${index}`"
                           :label="item.label"
                           :value="item.value"
                ></el-option>

              </el-select>
            </el-form-item>
          </el-form-item>
        </div>
        <div class="row date">
          <el-form-item label="出生日期" required>
            <el-form-item prop="baseInfo.year">
              <el-date-picker
                v-model="form.baseInfo.year"
                type="year"
                placeholder="选择年">
              </el-date-picker>
            </el-form-item>
            <span class="split">年</span>
            <el-form-item prop="baseInfo.month">
              <el-date-picker
                v-model="form.baseInfo.month"
                type="month"
                prop="month"
                placeholder="选择月"
                format="MM"
              >
              </el-date-picker>
            </el-form-item>
            <span class="split">月</span>
            <el-form-item prop="baseInfo.date">
              <el-date-picker
                v-model="form.baseInfo.date"
                type="date"
                prop="date"
                placeholder="选择日期"
                format="dd"
              >
              </el-date-picker>
            </el-form-item>
            <span class="split">日</span>
          </el-form-item>
        </div>
        <div class="row">
          <el-form-item label="手机号" prop="baseInfo.phone">
            <el-input clearable  v-model="form.baseInfo.phone"></el-input>
          </el-form-item>
        </div>
        <div class="row cardId">
          <el-form-item label="身份证" required="">
            <el-upload
              class="id-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="cidpositive" :src="cidpositive">
              <div class="center" v-else>
                <img :src="cameraImg" alt="">
                <p>身份证正面</p>
              </div>


            </el-upload>
            <el-upload
              class="id-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="cidNegative" :src="cidNegative">
              <div class="center" v-else>
                <img :src="cameraImg" alt="">
                <p>身份证反面</p>
              </div>
            </el-upload>
          </el-form-item>
        </div>
      </div>
      <!--教育经历-->
      <template v-for="(item,index) of form.edu">
        <div class="form-panel">
          <div class="form-title">
            <span>教育经历</span>
            <p v-if="index==0" @click="handleAdd('edu',index)"><i class="icon icon-add"></i>添加教育经历</p>
            <p v-else @click="handleRemove('edu',index)"><i class="icon icon-ios-remove-circle-ou"></i>移除该项经历</p>
          </div>
          <div class="row w450">
            <el-form-item label="学校" :prop="`edu.${index}.school`"
                          :rules="[
                            {required:true, message: '请输入学校', trigger: 'blur'}
                          ]">
              <el-input clearable v-model="item.school"></el-input>
            </el-form-item>
          </div>
          <div class="row">
            <el-form-item label="学历" :prop="`edu.${index}.eduBackground`"
                          :rules="[
                            {required:true, message: '请输入学历', trigger: 'blur'}
                          ]">
              <el-input clearable v-model="item.eduBackground"></el-input>
            </el-form-item>

          </div>
          <div class="row">
            <el-form-item label="专业" :prop="`edu.${index}.profession`"
                          :rules="[
                            {required:true, message: '请输入专业', trigger: 'blur'}
                          ]">
              <el-input clearable v-model="item.profession"></el-input>
            </el-form-item>
          </div>
          <div class="row">
            <el-form-item label="开始时间" :prop="`edu.${index}.startTime`"
                          :rules="[
                            {required:true, message: '请选择开始时间', trigger: 'blur'}
                          ]">
              <el-date-picker
                v-model="item.startTime"
                type="date"
                placeholder="请输入开始时间"
                format="yyyy-MM-dd"
                :ref="`start${index}`"
                :picker-options="pickerOptionsStart"
                @change="eduindex=index"
                @focus="eduindex=index"
              >
              </el-date-picker>
            </el-form-item>
          </div>
          <div class="row">
            <el-form-item label="结束时间" :prop="`edu.${index}.endTime`"
                          :rules="[
                            {required:true, message: '请选择结束时间', trigger: 'blur'}
                          ]">
              <el-date-picker
                v-model="item.endTime"
                type="date"
                placeholder="请输入结束时间"
                format="yyyy-MM-dd"
                :picker-options="pickerOptionsEnd"
                @change="eduindex=index"
                @focus="eduindex=index"
              >
              </el-date-picker>
            </el-form-item>
          </div>
        </div>
      </template>
      <!--技能信息-->
      <template v-for="(item,index) of form.skills">
        <div class="form-panel">
          <div class="form-title">
            <span>技能信息</span>
            <p v-if="index==0" @click="handleAdd('skills',index)"><i class="icon icon-add"></i>添加技能信息</p>
            <p v-else @click="handleRemove('skills',index)"><i class="icon icon-ios-remove-circle-ou"></i>移除该项技能</p>
          </div>
          <div class="row">
            <el-form-item label="技能" :prop="`skills.${index}.skillname`"
                          :rules="[
                          {required:true, message: '请输入技能', trigger: 'blur'}
                          ]"
            >
              <el-input clearable v-model="item.skillname"></el-input>
            </el-form-item>
          </div>
          <div class="row">
            <el-form-item label="等级" :prop="`skills.${index}.skillresult`"
                          :rules="[
                          {required:true, message: '请选择技能等级', trigger: 'change'}
                          ]"
            >
              <el-radio-group v-model="item.skillresult">
                <el-radio v-for="(level,index) of item.skilllevel" :key="`level${index}`"
                          :label="level.label"
                          :value="level.value"
                ></el-radio>
              </el-radio-group>
            </el-form-item>
          </div>

        </div>

      </template>
      <!--项目经历-->
      <template v-for="(item,index) of form.projects" >
        <div class="form-panel">
          <div class="form-title">
            <span>项目经历</span>
            <p v-if="index==0" @click="handleAdd('projects',index)"><i class="icon icon-add"></i>添加项目经历</p>
            <p v-else @click="handleRemove('projects',index)"><i class="icon icon-ios-remove-circle-ou"></i>移除该项经历</p>
          </div>
          <div class="row w450">
            <el-form-item label="项目名称" :prop="`projects.${index}.name`"
                          :rules="[
                          {required:true, message: '请输入项目名称', trigger: 'blur'}
                          ]"
            >
              <el-input clearable v-model="item.name" ></el-input>
            </el-form-item>
          </div>
          <div class="row w450">
            <el-form-item label="项目角色" :prop="`projects.${index}.role`"
                          :rules="[
                          {required:true, message: '请输入项目角色', trigger: 'blur'}
                          ]"
            >
              <el-input clearable v-model="item.role" ></el-input>
            </el-form-item>
          </div>
          <div class="row">
            <el-form-item label="开始时间" :prop="`projects.${index}.startTime`"
                          :rules="[
                          {required:true, message: '请输入开始时间', trigger: 'blur'}
                          ]"
            >
              <el-date-picker v-model="item.startTime"
                              type="date"
                              format="yyyy-MM-dd"
                              :picker-options="pickerOptionsStartP"
                              @change="projectindex=index"
                              @focus="projectindex=index"
              ></el-date-picker>
            </el-form-item>
          </div>
          <div class="row">
            <el-form-item label="完成时间" :prop="`projects.${index}.endTime`"
                          :rules="[
                          {required:true, message: '请输入完成时间', trigger: 'blur'}
                          ]"
            >
              <el-date-picker v-model="item.endTime"
                              type="date"
                              format="yyyy-MM-dd"
                              :picker-options="pickerOptionsEndP"
                              @change="projectindex=index"
                              @focus="projectindex=index"
              ></el-date-picker>
            </el-form-item>
          </div>
          <div class="row project">
            <el-form-item label="项目简介" :prop="`projects.${index}.introduction`"
                          :rules="[
                          {required:true, message: '请对项目进行简要的描述', trigger: 'blur'}
                          ]"
            >
              <el-input
                type="textarea"
                placeholder="请对项目进行简要的描述"
                v-model="item.introduction">
              </el-input>
            </el-form-item>

          </div>
        </div>

      </template>
      <!--自我评价-->
      <div class="form-panel">
        <div class="form-title">
          <span>自我评价</span>
        </div>
        <div class="row selfevaluation">
          <el-form-item label="自我评价" prop="selfEvaluation"
                        :rules="[
                          {required:true, message: '请简要的评价自己', trigger: 'blur'}
                          ]"

          >
            <el-input type="textarea" placeholder="请简要的评价自己" v-model="form.selfEvaluation"></el-input>
          </el-form-item>
        </div>
      </div>
      <el-button round class="btn-default" @click="submitForm('form')">保存</el-button>
    </el-form>
  </div>
</template>

<script>
  import validates from '../../libs/validates'
  import axios from 'axios'
  import apis from '@/api'
    export default {
        name: "BasicInfo",
        data(){
          return{
            eduLength:[0],
            imageUrl:require('@/assets/img/userIcon.png'),
            username:'知晓1829',
            percentage:50,
            labelPosition:'right',
            sex:[{label:'男',value:'1'},{label:'女',value:'2'}],
            cameraImg:require('@/assets/img/camera.png'),
            location:[],//省市区全部数据
            province:[],
            city:[],
            area:[],
            cidpositive:'',
            cidNegative:'',
            workingyears:[
              {
                label:'1年',
                value:'1'
              },
              {
                label:'2-3年',
                value:'2'
              },
              {
                label:'5年以上',
                value:'3'
              }
            ],
            form:{
              baseInfo:{
                name:'',
                sex:'',
                job:'',
                workingyears:'',
                year:'',
                month:'',
                date:'',
                province:'',
                city:'',
                area:''
              },
              edu:[{
                school:'',
                eduBackground:'',
                profession:'',
                startTime:'',
                endTime:''
              }],
              skills:[
                {
                  skillname:'',
                  skilllevel:[
                    {label:'精通',value:0},
                    {label:'高级',value:1},
                    {label:'中级',value:2},
                    {label:'初级',value:3},
                  ]
                }
              ],
              projects:[{
                name:'',
                role:'',
                startTime:'',
                endTime:'',
                producion:'',
                introduction:''
              }],
              selfEvaluation:''
            },
            eduindex:0,
            projectindex:0,
            rules: {
              baseInfo:{
                name: [
                  {required: true, message: '请输入姓名', trigger: 'blur'},
                ],
                sex:[
                  {required: true, message: '请选择性别', trigger: 'change'},
                ],
                job:[
                  {required: true, message: '请输入职位', trigger: 'blur'},
                ],
                workingyears:[
                  {required: true, message: '请选择工作年限', trigger: 'change'},
                ],
                year:[
                  {required: true, type: 'date', message: '请选择年', trigger: 'change'},
                ],
                month:[
                  {required: true, type: 'date', message: '请选择月', trigger: 'change'},
                ],
                date:[
                  {required: true, type: 'date', message: '请选择日期', trigger: 'change'},
                ],
                phone:[
                  {required: true,message: '请选择输入手机号', trigger: 'blur'},
                  {
                    validator:validates.ifPhone,trigger:'blur'
                  }
                ],
                year:[
                  {required: true,message: '请选择年', trigger: 'blur'},
                ],
                month:[
                  {required: true,message: '请选择月', trigger: 'blur'},
                ],
                date:[
                  {required: true,message: '请选择日期', trigger: 'blur'},
                ],
                selfEvaluation:[
                  {required: true,message: '请简要的评价自己', trigger: 'blur'},
                ]
              }

            },
            pickerOptionsStart:{
              disabledDate:(time)=> {
                if(this.form.edu[this.eduindex].endTime){
                  return  time.getTime() > this.form.edu[this.eduindex].endTime.getTime()
                }

              }
            },
            pickerOptionsEnd:{
              disabledDate:(time)=> {
                if(this.form.edu[this.eduindex].startTime){
                  return  time.getTime() < this.form.edu[this.eduindex].startTime.getTime()
                }

              }
            },
            pickerOptionsStartP:{
              disabledDate:(time)=> {
                if(this.form.projects[this.projectindex].endTime){
                  return  time.getTime() > this.form.projects[this.projectindex].endTime.getTime()
                }

              }
            },
            pickerOptionsEndP:{
              disabledDate:(time)=> {
                if(this.form.projects[this.projectindex].startTime){
                  return  time.getTime() < this.form.projects[this.projectindex].startTime.getTime()
                }

              }
            },
            eduobj:{
              school:'',
              eduBackground:'',
              profession:'',
              startTime:'',
              endTime:''
            },
            skillsobj:{
              skillname:'',
              skilllevel:[
                {label:'精通',value:0},
                {label:'高级',value:1},
                {label:'中级',value:2},
                {label:'初级',value:3},
              ]
            },
            projectsobj:{
              name:'',
              role:'',
              startTime:'',
              endTime:'',
              producion:''
            }
          }
        },
      methods:{
        handleAvatarSuccess(res,file){
          this.imageUrl = URL.createObjectURL(file.raw);
        },
        beforeAvatarUpload(file){
          // const isJPG = file.type === 'image/jpeg';
          const isLt2M = file.size / 1024 / 1024 < 2;
          // if (!isJPG) {
          //   this.$message.error('上传头像图片只能是 JPG 格式!');
          // }
          if (!isLt2M) {
            this.$message.error('上传头像图片大小不能超过 2MB!');
          }
          return  isLt2M;

        },
        handleAvatarError(err,file,fileList){
        },
        handleAdd(key,index){
         this.form[key].push(this[`${key}obj`])
        },
        handleRemove(key,index){
          this.form[key].splice(index,1)
        },
        provinceChange(val){
          this.form.baseInfo.city=''
          this.form.baseInfo.area=''
          if(val==''){
            return
          }
         this.city=this.province.filter(item=>{
           return item.value==val
         })[0].childs;



        },
        cityChange(val){
          this.form.baseInfo.area=''
          if(val==''){
            return
          }
          this.area=this.city.filter(item=>{
            return item.value==val
          })[0].childs;

        },
        submitForm(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              if(!this.cidpositive&&!this.cidNegative){
                this.$message.warning('请上传身份')
                return
              }
              console.log(this.form);
              alert('submit!');
            } else {

              console.log('error submit!!');
              return false;
            }
          });
        }
      },
      mounted(){
        axios({
          url:apis.province
        }).then(({data})=>{
          let result=data.data;
          this.province=result
        }).catch(err=>{
          this.$message.error('省接口获取失败')
        })
      }
    }
</script>

<style scoped lang="less">
@import 'BasicInfoscoped.less';
</style>
<style lang="less">
@import "BasicInfo.less";
</style>
