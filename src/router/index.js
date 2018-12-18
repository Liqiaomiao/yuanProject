import Vue from 'vue'
import Router from 'vue-router'
import DemoDetail from '@/components/DemoDetail/DemoDetail'/*DEMO详情*/
import releaseDemand from '@/components/releaseDemand/releaseDemand'/*发布需求*/
import main from '@/components/main/main'
import BasicInfo from '@/components/BasicInfo/BasicInfo'/*基本信息*/
import PersonalAccount from '@/components/PersonalAccount/PersonalAccount'/*个人账户*/
import myDemo from '@/components/myDemo/myDemo'/*我的demo*/
import index from '@/components/index/index' /*首页*/
import Loading from '@/subpages/loading.vue' /*首页*/
import Error from '@/subpages/error.vue' /*首页*/
Vue.use(Router);
function lazyLoadView(AsyncView) {
  const AsyncHandler = () => ({
    component: AsyncView,
    // A component to use while the component is loading.
    loading: require('@/subpages/loading.vue').default,
    // A fallback component in case the timeout is exceeded
    // when loading the component.
    error: require('@/subpages/loading.vue').default,
    // Delay before showing the loading component.
    // Default: 200 (milliseconds).
    delay: 200,
    // Time before giving up trying to load the component.
    // Default: Infinity (milliseconds).
    timeout: 1000
  });
  console.log(new AsyncHandler());
  return Promise.resolve({
    functional: true,
    render(h, { data, children }) {
      // Transparently pass any props or children
      // to the view component.
      return h(AsyncHandler, data, children);
    }
  });
}
const My = () => lazyLoadView(import('@/components/DemoDetail/DemoDetail'));
let router = new Router({
  history:true,
  routes: [
    {
      path: '/DemoDetail',
      name: 'DemoDetail',
      component: My
    },
    {
      path: '/releaseDemand',
      name: 'releaseDemand',
      component: releaseDemand
    },
    {
      path: '/main',
      name: 'main',
      component: main,
      children: [
        {
          path: '/BasicInfo',
          name: 'BasicInfo',
          component: BasicInfo,
        },
        {
          path: '/PersonalAccount',
          name: 'PersonalAccount',
          component: PersonalAccount,
        },
        {
          path:'/myDemo',
          name:'myDemo',
          component:myDemo,
        }

      ]
    },
    {
      path: '/',
      name: 'index',
      component: index
    },
  ]
})

export default router
