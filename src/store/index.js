/**
 * Created by Liqiaomiao on 2018/11/11.
 */
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    ifLoinged: true,
    userData: {
      imgurl: require('@/assets/img/userIcon.png')
    },
    currentsidebar:"1",
    bread:'基本信息',
    headerIndex:0
  }
  ,
  mutations: {
    headerIndexChange(state,val){
      state.headerIndex=val;
    },
    sidebarIndexChange(state,val){
      state.currentsidebar=val;
    }
  },
  actions: {
    //
  },
  modules: {
    //
  }
})
