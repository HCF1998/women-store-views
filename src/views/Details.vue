<template>
    <div id="details">
        <!-- 主要内容 -->
        <div class="main">
            <!-- 左侧商品轮播图 -->
            <div class="block">
                <el-carousel height="560px" v-if="productPicture.length > 1">
                    <el-carousel-item v-for="item in productPicture" :key="item.id">
                        <img style="height:560px;" :src="item.product_picture" :alt="item.intro" />
                    </el-carousel-item>
                </el-carousel>
                <div v-if="productPicture.length == 1">
                    <img style="height:560px;" :src="productPicture[0].product_picture" :alt="productPicture[0].intro" />
                </div>
            </div>
            <!-- 左侧商品轮播图END -->

            <!-- 右侧内容区 -->
            <div class="content">
                <h1 class="name">{{ productDetails.product_name }}</h1>
                <p class="intro">{{ productDetails.product_intro }}</p>
                <p class="store">女性商城</p>
                <div class="price">
                    <span>{{ productDetails.product_selling_price }}元</span>
                    <span v-show="productDetails.product_price != productDetails.product_selling_price" class="del"
                        >{{ productDetails.product_price }}元</span
                    >
                </div>
                <div class="pro-list">
                    <span class="pro-name">{{ productDetails.product_name }}</span>
                    <span class="pro-price">
                        <span>{{ productDetails.product_selling_price }}元</span>
                        <span v-show="productDetails.product_price != productDetails.product_selling_price" class="pro-del"
                            >{{ productDetails.product_price }}元</span
                        >
                    </span>
                    <p class="price-sum">总计 : {{ productDetails.product_selling_price }}元</p>
                </div>
                <!-- 内容区底部按钮 -->
                <div class="button">
                    <el-button class="shop-cart" :disabled="dis" @click="addShoppingCart">
                        {{ notCart ? '已加入购物车' : '加入购物车' }}
                    </el-button>
                    <el-button class="like" @click="addCollect">喜欢</el-button>
                </div>
                <!-- 内容区底部按钮END -->
                <div class="pro-policy">
                    <ul>
                        <li><i class="el-icon-circle-check"></i> 7天无理由退货</li>
                        <li><i class="el-icon-circle-check"></i> 7天价格保护</li>
                    </ul>
                </div>
            </div>
            <!-- 右侧内容区END -->
        </div>
        <!-- 主要内容END -->
        <!-- 评论 -->
        <ul class="evaluate-wrapper">
            <li v-for="item in evaluate" :key="item.id">
                <div class="evaluate-wrapper-top">
                    <img :src="item.avatar" alt="" class="avatar">
                    <span class="name">{{item.name}}</span>
                    <span class="time">发布时间： {{item.time}}</span>
                </div>
                <div class="evaluate-wrapper-center">
                    <p>{{item.evaluate}}</p>
                    <div v-if="item.imgs.length > 0">
                        <img v-for="(it, i) in item.imgs" :key="i" :src="it" alt="" @click="showReview(it)">
                    </div>
                </div>
            </li>
        </ul>
        <el-dialog
            :visible.sync="showImg"
            width="30%"
            :close-on-click-modal="false"
        >
            <img :src="this.reviewImg" alt="">
        </el-dialog>
    </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
    data() {
        return {
            reviewImg: '',
            showImg: false,
            dis: false, // 控制“加入购物车按钮是否可用”
            productID: '', // 商品id
            productDetails: {
                product_name: '衣服1',
                product_intro: '舒服好看，物美价廉',
                product_selling_price: 100,
                product_price: 199,

            }, // 商品详细信息
            productPicture: [
                {
                    product_picture: 'https://g-search1.alicdn.com/img/bao/uploaded/i4/i2/199343403/O1CN01DtT3QB1b0cTHfYtyR_!!0-item_pic.jpg_250x250.jpg',
                    intro: '衣服1'
                },
                {
                    product_picture: 'https://img.alicdn.com/bao/uploaded/i1/92688455/O1CN01luycfl2CKRMkUneZV_!!92688455.jpg_b.jpg',
                    intro: '衣服2'
                }
            ], // 商品图片
            notCart: false,
            // 评论列表
            evaluate: [
                {
                    id: '1',
                    avatar: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2856846879,389279115&fm=26&gp=0.jpg',
                    name: '用户1',
                    time: '2020-10-10',
                    evaluate: '很好很好很好很好很好很好很好很好很好很好',
                    imgs: ['https://g-search1.alicdn.com/img/bao/uploaded/i4/i2/199343403/O1CN01DtT3QB1b0cTHfYtyR_!!0-item_pic.jpg_250x250.jpg','https://g-search1.alicdn.com/img/bao/uploaded/i4/i2/199343403/O1CN01DtT3QB1b0cTHfYtyR_!!0-item_pic.jpg_250x250.jpg']
                },
                {
                    id: '2',
                    avatar: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3392663359,4194879068&fm=26&gp=0.jpg',
                    name: '用户2',
                    time: '2020-10-12',
                    evaluate: '很好很好很好很好很好很好很好很好很好很好good goods;)',
                    imgs: ['https://g-search1.alicdn.com/img/bao/uploaded/i4/i2/199343403/O1CN01DtT3QB1b0cTHfYtyR_!!0-item_pic.jpg_250x250.jpg','https://g-search1.alicdn.com/img/bao/uploaded/i4/i2/199343403/O1CN01DtT3QB1b0cTHfYtyR_!!0-item_pic.jpg_250x250.jpg','https://img.alicdn.com/bao/uploaded/i1/92688455/O1CN01luycfl2CKRMkUneZV_!!92688455.jpg_b.jpg']
                }
            ],
        }
    },
    // 通过路由获取商品id
    activated() {
        // console.log('mouted = ', this.$route.query.productID)
        if (this.$route.query.productID != undefined) {
            this.productID = this.$route.query.productID
            this.notCart = false
            this.$store.state.shoppingCart.shoppingCart.forEach((item) => {
                if (item.productID == this.productID) {
                    this.notCart = true
                    // console.log(this.notCart)
                }
            })
        }
    },
    watch: {
        // 监听商品id的变化，请求后端获取商品数据
        // productID: function(val) {
        //     this.getDetails(val)
        //     this.getDetailsPicture(val)
        // },
    },
    mounted() {
        this.getDetails();
    },
    methods: {
        ...mapActions(['unshiftShoppingCart', 'addShoppingCartNum']),
        showReview(img) {
            this.reviewImg = img;
            this.showImg = true;
        },
        // 获取商品详细信息
        getDetails(val) {
            this.$http.get(apiData.goodsDetail, {
                    params: {
                        productID: 10895,
                    }
                })
                .then((res) => {
                    this.productDetails = res.data.Product[0]
                })
                .catch((err) => {
                    return Promise.reject(err)
                })
        },
        // 获取商品图片
        getDetailsPicture(val) {
            this.$axios
                .post('/api/product/getDetailsPicture', {
                    productID: val,
                })
                .then((res) => {
                    this.productPicture = res.data.ProductPicture
                })
                .catch((err) => {
                    return Promise.reject(err)
                })
        },
        // 加入购物车
        addShoppingCart() {
            // 判断是否登录,没有登录则显示登录组件
            if (!this.$store.getters.getUser) {
                this.$store.dispatch('setShowLogin', true)
                return
            }
            this.$axios
                .post('/api/user/shoppingCart/addShoppingCart', {
                    user_id: this.$store.getters.getUser.user_id,
                    product_id: this.productID,
                })
                .then((res) => {
                    this.notCart = true
                    switch (res.data.code) {
                        case '001':
                            // 新加入购物车成功
                            this.unshiftShoppingCart(res.data.shoppingCartData[0])
                            this.notifySucceed(res.data.msg)
                            break
                        case '002':
                            // 该商品已经在购物车，数量+1
                            this.addShoppingCartNum(this.productID)
                            this.notifySucceed(res.data.msg)
                            break
                        case '003':
                            // 商品数量达到限购数量
                            this.dis = true
                            this.notifyError(res.data.msg)
                            break
                        default:
                            this.notifyError(res.data.msg)
                    }
                })
                .catch((err) => {
                    return Promise.reject(err)
                })
        },
        // 加入收藏
        addCollect() {
            // 判断是否登录,没有登录则显示登录组件
            if (!this.$store.getters.getUser) {
                this.$store.dispatch('setShowLogin', true)
                return
            }
            this.$axios
                .post('/api/user/collect/addCollect', {
                    user_id: this.$store.getters.getUser.user_id,
                    product_id: this.productID,
                })
                .then((res) => {
                    if (res.data.code == '001') {
                        // 添加收藏成功
                        this.notifySucceed(res.data.msg)
                    } else {
                        // 添加收藏失败
                        this.notifyError(res.data.msg)
                    }
                })
                .catch((err) => {
                    return Promise.reject(err)
                })
        },
    },
}
</script>

<style lang="scss" scoped>
    .evaluate-wrapper{
        width: 1225px;
        padding: 20px;
        margin: 0 auto;
        li{
            border: 1px solid #ccc;
            padding: 20px 40px;
        }
        &-top{
            overflow: hidden;
            border-bottom: 1px dashed #ccc;
            .avatar{
                width: 30px;
                float: left;
                margin-right: 20px;
            }
            .name{
                float: left;
                line-height: 40px;
            }
            .time{
                float: right;
                color: grey;
            }
        }
        &-center{
            p{
                margin: 20px 0;
            }
            img{
                width: 60px;
                margin-right: 20px;
            }
        }
    }
</style>

<style>
/* 头部CSS */
#details .page-header {
    height: 64px;
    margin-top: -20px;
    z-index: 4;
    background: #fff;
    border-bottom: 1px solid #e0e0e0;
    -webkit-box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.07);
    box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.07);
}
#details .page-header .title {
    width: 1225px;
    height: 64px;
    line-height: 64px;
    font-size: 18px;
    font-weight: 400;
    color: #212121;
    margin: 0 auto;
}
#details .page-header .title p {
    float: left;
}
#details .page-header .title .list {
    height: 64px;
    float: right;
}
#details .page-header .title .list li {
    /* float: left; */
    display: inline-block;
    margin-left: 20px;
}
#details .page-header .title .list li a {
    font-size: 14px;
    color: #616161;
}
#details .page-header .title .list li a:hover {
    font-size: 14px;
    color: #ff6700;
}
/* 头部CSS END */

/* 主要内容CSS */
#details .main {
    width: 1225px;
    height: 560px;
    padding-top: 30px;
    margin: 0 auto;
}
#details .main .block {
    float: left;
    width: 560px;
    height: 560px;
}
#details .el-carousel .el-carousel__indicator .el-carousel__button {
    background-color: rgba(163, 163, 163, 0.8);
}
#details .main .content {
    float: left;
    margin-left: 25px;
    width: 640px;
}
#details .main .content .name {
    height: 30px;
    line-height: 30px;
    font-size: 24px;
    font-weight: normal;
    color: #212121;
}
#details .main .content .intro {
    color: #b0b0b0;
    padding-top: 10px;
}
#details .main .content .store {
    color: #ff6700;
    padding-top: 10px;
}
#details .main .content .price {
    display: block;
    font-size: 18px;
    color: #ff6700;
    border-bottom: 1px solid #e0e0e0;
    padding: 25px 0 25px;
}
#details .main .content .price .del {
    font-size: 14px;
    margin-left: 10px;
    color: #b0b0b0;
    text-decoration: line-through;
}
#details .main .content .pro-list {
    background: #f9f9fa;
    padding: 30px 60px;
    margin: 50px 0 50px;
}
#details .main .content .pro-list span {
    line-height: 30px;
    color: #616161;
}
#details .main .content .pro-list .pro-price {
    float: right;
}
#details .main .content .pro-list .pro-price .pro-del {
    margin-left: 10px;
    text-decoration: line-through;
}
#details .main .content .pro-list .price-sum {
    color: #ff6700;
    font-size: 24px;
    padding-top: 20px;
}
#details .main .content .button {
    height: 55px;
    margin: 10px 0 20px 0;
}
#details .main .content .button .el-button {
    float: left;
    height: 55px;
    font-size: 16px;
    color: #fff;
    border: none;
    text-align: center;
}
#details .main .content .button .shop-cart {
    width: 340px;
    background-color: #ff6700;
}
#details .main .content .button .shop-cart:hover {
    background-color: #f25807;
}

#details .main .content .button .like {
    width: 260px;
    margin-left: 40px;
    background-color: #b0b0b0;
}
#details .main .content .button .like:hover {
    background-color: #757575;
}
#details .main .content .pro-policy li {
    float: left;
    margin-right: 20px;
    color: #b0b0b0;
}
/* 主要内容CSS END */
</style>
