function format(val){
  return val<10?`0${val}`:val;
}
let filterTime = (value)=>{
  let date=new Date(value);
  let year=date.getFullYear();
  let month=format(date.getMonth()+1);
  let day=format(date.getDate());
  let hour=format(date.getHours());
  let minutes=format(date.getMinutes());

  return `${year}-${month}-${day} ${hour}:${minutes}`
}
let capitalize=(value)=>{
  return `${value.slice(0,1).toUpperCase()}${value.slice(1).toLowerCase()}`
}
let toRmb=(value)=>{
  let result = '0.00';
  if(value!==''){
    result = value.toFixed(2);
  }
  return result
}
let fontlen=(val,size)=>{
 return val.length>size?val.slice(0,size)+'...':val
}


export default {
  filterTime,
  capitalize,
  toRmb,
  fontlen
}
