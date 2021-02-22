<template>
    <div class="order">
        <!-- 我的订单头部 -->
        <div class="order-header">
            <div class="order-header-content">
                <p>
                    <i class="el-icon-s-order" style="font-size: 30px;color: #ff6700;"></i>
                    我的订单
                </p>
            </div>
        </div>
        <!-- 我的订单头部END -->

        <!-- 我的订单主要内容 -->
        <div class="order-content" v-if="orders.length > 0">
                 <el-table
                    ref="multipleTable"
                    :data="orders"
                    tooltip-effect="dark"
                    style="width: 1225px;margin: 0 auto;"
                    @selection-change="handleSelectionChange"
                >
                    <el-table-column type="selection" label="全选" width="100" />
                    <el-table-column label="商品名称"  width="400">
                        <template slot-scope="scope">
                            <img :src="scope.row.img" alt="" style="float: left;width: 80px;maxHeight: 100px;">
                            <p style="float: left;lineHeight: 80px;marginLeft: 40px;">{{scope.row.name}}</p>
                        </template>
                    </el-table-column>
                    <el-table-column label="单价"  width="140" >
                        <template slot-scope="scope">
                            <span>{{scope.row.price}}元</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="数量" width="240">
                        <template slot-scope="scope">
                            <el-input-number v-model="scope.row.number" :min="1" :max="100" :disabled="scope.row.isNumber"></el-input-number>
                        </template>
                    </el-table-column>
                    <el-table-column label="小计"  width="140" >
                        <template slot-scope="scope">
                            <span style="color: orange">
                                {{scope.row.price * scope.row.number}}元
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作"  width="140" >
                        <template slot-scope="scope">
                            <el-link type="primary" style="marginRight: 40px;" @click="jumpToDetail(scope.row)">详情</el-link>
                            <el-link type="danger" @click="deleteOrder(scope.row.id)">删除</el-link>
                        </template>
                    </el-table-column>
                </el-table>
               
                <div class="order-bar" style="margin: 0 auto;">
                    <div class="order-bar-left">
                        <span class="order-total">
                            共
                            <span class="order-total-num">{{ total.totalNum }}</span> 件商品
                            已选 <span class="order-total-num"> {{ total.chooseNum }} </span> 件商品
                        </span>
                    </div>
                    <div class="order-bar-right">
                        <span>
                            <span class="total-price-title">合计：</span>
                            <span class="total-price">{{ total.totalPrice }}元</span>
                        </span>
                        <el-button type="primary" style="margin:0 0 10px 20px;">去结算</el-button>
                    </div>
                </div>
            <div style="margin-top:-40px;"></div>
        </div>
        <!-- 我的订单主要内容END -->

        <!-- 订单为空的时候显示的内容 -->
        <div v-else class="order-empty">
            <div class="empty">
                <h2>您的订单还是空的！</h2>
                <p>快去购物吧！</p>
            </div>
        </div>
        <!-- 订单为空的时候显示的内容END -->
    </div>
</template>
<script>
import apiData from '@/lib/apiData';
export default {
    data() {
        return {
            orders: [
                {
                    id: '1',
                    img: 'https://g-search1.alicdn.com/img/bao/uploaded/i4/i2/199343403/O1CN01DtT3QB1b0cTHfYtyR_!!0-item_pic.jpg_250x250.jpg',
                    name: '衣服1',
                    price: 233,
                    number: 1,
                    isNumber: true
                },
                {
                    id: '2',
                    img: 'https://g-search1.alicdn.com/img/bao/uploaded/i4/i2/199343403/O1CN01DtT3QB1b0cTHfYtyR_!!0-item_pic.jpg_250x250.jpg',
                    name: '衣服2',
                    price: 233,
                    number: 2,
                    isNumber: true
                },
                {
                    id: '3',
                    img: 'https://g-search1.alicdn.com/img/bao/uploaded/i4/i2/199343403/O1CN01DtT3QB1b0cTHfYtyR_!!0-item_pic.jpg_250x250.jpg',
                    name: '衣服3',
                    price: 451,
                    number: 1,
                    isNumber: true
                },
                {
                    id: '4',
                    img: 'https://g-search1.alicdn.com/img/bao/uploaded/i4/i2/199343403/O1CN01DtT3QB1b0cTHfYtyR_!!0-item_pic.jpg_250x250.jpg',
                    name: '衣服4',
                    price: 23,
                    number: 1,
                    isNumber: true
                },
                {
                    id: '5',
                    img: 'https://g-search1.alicdn.com/img/bao/uploaded/i4/i2/199343403/O1CN01DtT3QB1b0cTHfYtyR_!!0-item_pic.jpg_250x250.jpg',
                    name: '衣服5',
                    price: 33,
                    number: 3,
                    isNumber: true
                },
           ],
            total: {
                totalNum: 0,
                chooseNum: 0,
                totalPrice: 0
            }, // 每个订单的商品数量及总价列表
        }
    },
    activated() {
        // 获取订单数据
        // this.getOrder()
    },
    watch: {
        orders: {
            handler(val) {
                if(val) {
                    this.total.totalNum = val.length
                }
            },
            immediate: true
        }
    },
    methods: {
        handleSelectionChange(val) {
            if(val) {
                this.total.chooseNum = val.length;
                var totalPrice = 0;
                val.forEach(item => {
                    item.isNumber = false;
                    totalPrice += item.price * item.number;
                });
                this.total.totalPrice = totalPrice;
            }
        },
        jumpToDetail({id}) {
            this.$router.push({
                name: 'Details',
                params: {
                    categoryID: id
                }
            })
        },
        getOrder() {
            this.$http
                .post('/api/user/order/getOrder', {
                    user_id: this.$store.getters.getUser.user_id,
                })
                .then((res) => {
                    if (res.data.code === '001') {
                        this.orders = res.data.orders
                        // 002订单为空
                    } else if (res.data.code === '002') {
                        this.orders = []
                        this.notifyError(res.data.msg)
                    }
                })
                .catch((err) => {
                    return Promise.reject(err)
                })
        },
        // 删除
        deleteOrder({id}) {
            this.$http.post(apiData.deleteOrder, {
                id: id
            }).then(res => {
                if(res.code == 1) {
                    this.notifySucceed(res.msg);
                    this.getOrder();
                }else{
                    this.notifyError(res.msg);
                }
            })
        }
    },
}
</script>
<style scoped>
.order {
    background-color: #f5f5f5;
    padding-bottom: 20px;
}
/* 我的订单头部CSS */
.order .order-header {
    height: 64px;
    border-bottom: 2px solid #ff6700;
    background-color: #fff;
    margin-bottom: 20px;
}
.order .order-header .order-header-content {
    width: 1225px;
    margin: 0 auto;
}
.order .order-header p {
    font-size: 28px;
    line-height: 58px;
    float: left;
    font-weight: normal;
    color: #424242;
}
/* 我的订单头部CSS END */
.order .content {
    width: 1225px;
    margin: 0 auto;
    background-color: #fff;
    margin-bottom: 50px;
}

.order .content ul {
    background-color: #fff;
    color: #424242;
    line-height: 85px;
}
/* 我的订单表头CSS */
.order .content ul .order-info {
    height: 60px;
    line-height: 60px;
    padding: 0 26px;
    color: #424242;
    border-bottom: 1px solid #ff6700;
}
.order .content ul .order-info .order-id {
    float: left;
    color: #ff6700;
}
.order .content ul .order-info .order-del {
    float: right;
    margin-right: 10px;
}
.order .content ul .order-info .order-time {
    /* float: right; */
    text-align: center;
}

.order .content ul .header {
    height: 85px;
    padding-right: 26px;
    color: #424242;
}
/* 我的订单表头CSS END */

/* 订单列表CSS */
.order .content ul .product-list {
    height: 85px;
    padding: 15px 26px 15px 0;
    border-top: 1px solid #e0e0e0;
}
.order .content ul .pro-img {
    float: left;
    height: 85px;
    width: 120px;
    padding-left: 80px;
}
.order .content ul .pro-img img {
    height: 80px;
    width: 80px;
}
.order .content ul .pro-name {
    float: left;
    width: 380px;
}
.order .content ul .pro-name a {
    color: #424242;
}
.order .content ul .pro-name a:hover {
    color: #ff6700;
}
.order .content ul .pro-price {
    float: left;
    width: 160px;
    padding-right: 18px;
    text-align: center;
}
.order .content ul .pro-num {
    float: left;
    width: 190px;
    text-align: center;
}
.order .content ul .pro-total {
    float: left;
    width: 160px;
    padding-right: 81px;
    text-align: right;
}
.order .content ul .pro-total-in {
    color: #ff6700;
}

.order .order-bar {
    width: 1185px;
    padding: 0 20px;
    border-top: 1px solid #ff6700;
    height: 50px;
    line-height: 50px;
    background-color: #fff;
}
.order .order-bar .order-bar-left {
    float: left;
}
.order .order-bar .order-bar-left .order-total {
    color: #757575;
}
.order .order-bar .order-bar-left .order-total-num {
    color: #ff6700;
}
.order .order-bar .order-bar-right {
    float: right;
}
.order .order-bar .order-bar-right .total-price-title {
    color: #ff6700;
    font-size: 14px;
}
.order .order-bar .order-bar-right .total-price {
    color: #ff6700;
    font-size: 30px;
}
/* 订单列表CSS END */

/* 订单为空的时候显示的内容CSS */
.order .order-empty {
    width: 1225px;
    margin: 0 auto;
}
.order .order-empty .empty {
    height: 300px;
    padding: 0 0 130px 558px;
    margin: 65px 0 0;
    background: url(../assets/imgs/cart-empty.png) no-repeat 124px 0;
    color: #b0b0b0;
    overflow: hidden;
}
.order .order-empty .empty h2 {
    margin: 70px 0 15px;
    font-size: 36px;
}
.order .order-empty .empty p {
    margin: 0 0 20px;
    font-size: 20px;
}
/* 订单为空的时候显示的内容CSS END */
</style>
