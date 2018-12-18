/**
 * Created by Liqiaomiao on 2018/11/11.
 */
let BASEURL='https://easy-mock.com/mock/5be814d8b953a11dfd8ce65a/yuanProject/';/*请求根路径*/
let apis={
  comments:'comments',
  account:'account',
  province:'province',
  demo:'demo'
}

for(let key in apis){
  apis[key]=BASEURL+apis[key]
}
export default  apis
