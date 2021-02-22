const HOST = 'http://47.106.91.117:28019/api/';
let INTERFACE = `${HOST}v1/`;


const apiData = {
  // 获取用户信息
  getUserInfo: `${INTERFACE}user/info`,
  // 登录
  login: `${INTERFACE}user/login`,
  // 注册
  register: `${INTERFACE}user/register`,
  // 获取首页数据
  getHome: `${INTERFACE}index-infos`,
  // 删除订单
  deleteOrder: `${INTERFACE}`,
  // 获取地址
  getAddress: `${INTERFACE}address`,
  // 保存地址
  saveAddress: `${INTERFACE}address`,
  // 商品详情
  goodsDetail: `${INTERFACE}goods/detail/`,
}


export default apiData;