let ifPhone = (rule, value, callback) => {
  if(!/^1[0-9]{10}$/.test(value)){
    callback(new Error('请输入正确的手机号'))
  }else{
    callback()
  }

}
export default {
  ifPhone
}
