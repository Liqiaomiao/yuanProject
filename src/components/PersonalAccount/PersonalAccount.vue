<template>
  <div id="PersonalAccount" @click.stop="visible=false;">
    <div class="account">
      <ul class="cell-hd">
        <li class="fz18">账户总额（元）</li>
        <li class="fz30">{{totalcount}}</li>
        <li>
          <el-button round class='btn-error'>充值</el-button>
          <el-button round class='btn-warning'>提现</el-button>
        </li>
      </ul>
      <dl class="cell-ft">
        <dt>请选择支付方式</dt>
        <dd>
          <el-radio v-model="payment" label="1"><img :src="WeChaturl" alt="">微信支付</el-radio>
        </dd>
        <dd>
          <el-radio v-model="payment" label="2"><img :src="Alipayurl" alt="">支付宝支付</el-radio>
        </dd>
        <dd>
          <el-popover
            placement="bottom"
            width="389"
            v-model="visible"
            popper-class="paymentPop"
          >
            <div>
              <el-radio-group v-model="bank" id="banklist" @change="paymentChange">
                <el-radio :label="item.value" v-for="(item,index) of banklist" :key="`bank${index}`"
                          :class="{'mb20':index==0||index==1||index==2}"
                ><img :src="item.imgurl" alt=""></el-radio>
              </el-radio-group>
            </div>
            <el-radio slot="reference" v-model="payment" label="3" @click.native.stop="visible=true"><img :src="imgurl"
                                                                                                          alt="">网上银行支付
            </el-radio>
          </el-popover>
        </dd>
      </dl>
    </div>
    <div class="tablelist">
      <div class="btns">
        <button :class="{current:sort==0}" @click="searchByIncome(0)">收入</button>
        <button :class="{current:sort==1}" @click="searchByIncome(1)">支出</button>
      </div>

      <el-table
        :data="tableData"
        stripe
        class="account_tb"
        v-loading.lock="loading"
      >
        <el-table-column align="center" label="日期">
          <template slot-scope="scope">
            <span>{{scope.row.date|filterTime}}</span>
          </template>
        </el-table-column>
        <el-table-column align="right" label="账户余额（元）">
          <template slot-scope="scope">
            <span>{{scope.row.accountbalance|toRmb}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="流水交易">
          <template slot-scope="scope">
            <span>{{scope.row.transaction}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="交易对方">
          <template slot-scope="scope">
            <span>{{scope.row.tradingpartner}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="交易备注">
          <template slot-scope="scope">
            <span>{{scope.row.remarks||"-"}}</span>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        layout="prev, pager, next"
        :total="total"
        :current-page="page"
        v-if="total>0"
        class="tablepager"
      >
      </el-pagination>


    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import apis from '@/api'
    export default {
        name: "PersonalAccount",
        data(){
          return {
            totalcount:372819.47,
            payment:'',
            bank:'',
            WeChaturl:require('@/assets/img/wechartimg.png'),
            Alipayurl:require('@/assets/img/alipay.png'),
            imgurl:require('@/assets/img/online.png'),
            visible:false,
            banklist:[
              {imgurl:require('@/assets/img/nongye.png'),value:1},
              {imgurl:require('@/assets/img/gongshang.png'),value:2},
              {imgurl:require('@/assets/img/zhaoshang.png'),value:3},
              {imgurl:require('@/assets/img/youzheng.png'),value:4},
              {imgurl:require('@/assets/img/jiaotong.png'),value:5},
              {imgurl:require('@/assets/img/pufa.png'),value:6},
            ],
            tableData:[],
            loading:true,
            total:0,
            page:0,
            sort:0//0 收入，1支出
          }
        },
      methods:{
        paymentChange(value){
          console.log(`您选择了${value}付款方式`);
          this.visible=false;
        },
        searchByIncome(index){
          this.sort=index;
          this.initData()
          this.$message.info(`您选择按${index}查询`)
        },
        initData(){
          this.loading=true
          axios({
            methods:"get",
            url:apis.account
          }).then(({data})=>{
            this.loading=false;
            if(data.tableData){
              this.tableData=data.tableData;
              this.total=data.total;
              this.page=data.page;
              // this.sort=data.sort;
            }
          }).catch(err=>{
            this.$message.error(err);
          })
        }
      },
      mounted(){
        this.initData()
      }
    }
</script>

<style scoped lang="less">
@import "./PersonalAccountscoped.less";
</style>
<style lang="less">
@import "./PersonalAccount.less";
</style>
