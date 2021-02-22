<template>
    <div class="home" id="home" name="home">
        <!-- 轮播图 -->
        <div class="block">
            <treeList :treeList="treeList"/>
            <el-carousel height="460px" style="width: 1025px;display: inline-block;">
                <el-carousel-item v-for="item in carousel" :key="item.carousel_id">
                    <img style="height:460px;width: 100%;" :src="item.carouselUrl" :alt="item.redirectUrl" />
                </el-carousel-item>
            </el-carousel>
        </div>
        <!-- 首页展示 -->
        <div class="home-wrapper">
            <div v-if="hotGoodses.length > 0">
                <h5>当季流行</h5>
                <div class="home-wrapper-bottom">
                    <div class="fl showList">
                        <HomeList v-for="item in hotGoodses" :key="item.id" :objData="item"/>
                    </div>
                </div>
            </div>

            <div v-if="newGoodses.length > 0">
                <h5>新品上市</h5>
                <div class="home-wrapper-bottom">
                    <div class="fl showList">
                        <HomeList v-for="item in newGoodses" :key="item.id" :objData="item"/>
                    </div>
                </div>
            </div>
            
            <div v-if="recommendGoodses.length > 0">
                <h5>推荐好物</h5>
                <div class="home-wrapper-bottom">
                    <div class="fl showList">
                        <HomeList v-for="item in recommendGoodses" :key="item.id" :objData="item"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
const treeList = () => import('@/components/TreeList.vue');
import apiData from '@/lib/apiData'
export default {
    name: 'Home',
    components: {
        treeList
    },
    data() {
        return {
            carousel: [
                {imgPath: 'https://img.alicdn.com/imgextra/i2/O1CN01aQaSDt1IAiVGiICrs_!!6000000000853-0-tps-1130-500.jpg_q100.jpg_.webp'},
                {imgPath: 'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/6a60c7eb2229733d85d8b4aea3be4ddd.jpg?thumb=1&w=1226&h=460&f=webp&q=90'}
            ], // 轮播图数据
            // 列表主体数据
            hotGoodses: [
                {
                    id: '1',
                    smallImgs: ['https://img.alicdn.com/bao/uploaded/i1/92688455/O1CN01luycfl2CKRMkUneZV_!!92688455.jpg_b.jpg','https://img.alicdn.com/bao/uploaded/i1/92688455/O1CN01luycfl2CKRMkUneZV_!!92688455.jpg_b.jpg','https://img.alicdn.com/bao/uploaded/i1/92688455/O1CN01luycfl2CKRMkUneZV_!!92688455.jpg_b.jpg','https://img.alicdn.com/bao/uploaded/i1/92688455/O1CN01luycfl2CKRMkUneZV_!!92688455.jpg_b.jpg','https://img.alicdn.com/bao/uploaded/i1/92688455/O1CN01luycfl2CKRMkUneZV_!!92688455.jpg_b.jpg'],
                    title1: '秋季女孩基础打底衫', // 标题1
                    title2: '时尚修身长袖针织衫', // 标题2
                    price: '79.0' // 价格
                },
                {
                    id: '2',
                    smallImgs: ['https://img.alicdn.com/bao/uploaded/i3/92688455/O1CN01Bagzvh2CKRMklRq0y_!!92688455.jpg_b.jpg','https://img.alicdn.com/bao/uploaded/i1/92688455/O1CN01luycfl2CKRMkUneZV_!!92688455.jpg_b.jpg','https://img.alicdn.com/bao/uploaded/i3/92688455/O1CN01Bagzvh2CKRMklRq0y_!!92688455.jpg_b.jpg','https://img.alicdn.com/bao/uploaded/i1/92688455/O1CN01luycfl2CKRMkUneZV_!!92688455.jpg_b.jpg','https://img.alicdn.com/bao/uploaded/i1/92688455/O1CN01luycfl2CKRMkUneZV_!!92688455.jpg_b.jpg'],
                    title1: '秋季女孩基础打底衫', // 标题1
                    title2: '时尚修身长袖针织衫', // 标题2
                    price: '79.0' // 价格
                },
                {
                    id: '3',
                    smallImgs: ['https://img.alicdn.com/bao/uploaded/i1/92688455/O1CN01luycfl2CKRMkUneZV_!!92688455.jpg_b.jpg','https://img.alicdn.com/bao/uploaded/i1/92688455/O1CN01luycfl2CKRMkUneZV_!!92688455.jpg_b.jpg','https://img.alicdn.com/bao/uploaded/i1/92688455/O1CN01luycfl2CKRMkUneZV_!!92688455.jpg_b.jpg','https://img.alicdn.com/bao/uploaded/i1/92688455/O1CN01luycfl2CKRMkUneZV_!!92688455.jpg_b.jpg','https://img.alicdn.com/bao/uploaded/i1/92688455/O1CN01luycfl2CKRMkUneZV_!!92688455.jpg_b.jpg'],
                    title1: '秋季女孩基础打底衫', // 标题1
                    title2: '时尚修身长袖针织衫', // 标题2
                    price: '79.0' // 价格
                },
                {
                    id: '4',
                    smallImgs: ['https://img.alicdn.com/bao/uploaded/i1/92688455/O1CN01luycfl2CKRMkUneZV_!!92688455.jpg_b.jpg','https://img.alicdn.com/bao/uploaded/i1/92688455/O1CN01luycfl2CKRMkUneZV_!!92688455.jpg_b.jpg','https://img.alicdn.com/bao/uploaded/i1/92688455/O1CN01luycfl2CKRMkUneZV_!!92688455.jpg_b.jpg','https://img.alicdn.com/bao/uploaded/i1/92688455/O1CN01luycfl2CKRMkUneZV_!!92688455.jpg_b.jpg','https://img.alicdn.com/bao/uploaded/i1/92688455/O1CN01luycfl2CKRMkUneZV_!!92688455.jpg_b.jpg'],
                    title1: '秋季女孩基础打底衫', // 标题1
                    title2: '时尚修身长袖针织衫', // 标题2
                    price: '79.0' // 价格
                },
                {
                    id: '5',
                    smallImgs: ['https://img.alicdn.com/bao/uploaded/i1/92688455/O1CN01luycfl2CKRMkUneZV_!!92688455.jpg_b.jpg','https://img.alicdn.com/bao/uploaded/i1/92688455/O1CN01luycfl2CKRMkUneZV_!!92688455.jpg_b.jpg','https://img.alicdn.com/bao/uploaded/i1/92688455/O1CN01luycfl2CKRMkUneZV_!!92688455.jpg_b.jpg','https://img.alicdn.com/bao/uploaded/i1/92688455/O1CN01luycfl2CKRMkUneZV_!!92688455.jpg_b.jpg','https://img.alicdn.com/bao/uploaded/i1/92688455/O1CN01luycfl2CKRMkUneZV_!!92688455.jpg_b.jpg'],
                    title1: '秋季女孩基础打底衫', // 标题1
                    title2: '时尚修身长袖针织衫', // 标题2
                    price: '79.0' // 价格
                },
                {
                    id: '6',
                    smallImgs: ['https://img.alicdn.com/bao/uploaded/i1/92688455/O1CN01luycfl2CKRMkUneZV_!!92688455.jpg_b.jpg','https://img.alicdn.com/bao/uploaded/i1/92688455/O1CN01luycfl2CKRMkUneZV_!!92688455.jpg_b.jpg','https://img.alicdn.com/bao/uploaded/i1/92688455/O1CN01luycfl2CKRMkUneZV_!!92688455.jpg_b.jpg','https://img.alicdn.com/bao/uploaded/i1/92688455/O1CN01luycfl2CKRMkUneZV_!!92688455.jpg_b.jpg','https://img.alicdn.com/bao/uploaded/i1/92688455/O1CN01luycfl2CKRMkUneZV_!!92688455.jpg_b.jpg'],
                    title1: '秋季女孩基础打底衫', // 标题1
                    title2: '时尚修身长袖针织衫', // 标题2
                    price: '79.0' // 价格
                },
                {
                    id: '7',
                    smallImgs: ['https://img.alicdn.com/bao/uploaded/i3/92688455/O1CN01Bagzvh2CKRMklRq0y_!!92688455.jpg_b.jpg','https://img.alicdn.com/bao/uploaded/i1/92688455/O1CN01luycfl2CKRMkUneZV_!!92688455.jpg_b.jpg','https://img.alicdn.com/bao/uploaded/i1/92688455/O1CN01luycfl2CKRMkUneZV_!!92688455.jpg_b.jpg','https://img.alicdn.com/bao/uploaded/i1/92688455/O1CN01luycfl2CKRMkUneZV_!!92688455.jpg_b.jpg','https://img.alicdn.com/bao/uploaded/i1/92688455/O1CN01luycfl2CKRMkUneZV_!!92688455.jpg_b.jpg'],
                    title1: '秋季女孩基础打底衫', // 标题1
                    title2: '时尚修身长袖针织衫', // 标题2
                    price: '79.0' // 价格
                },
                {
                    id: '8',
                    smallImgs: ['https://img.alicdn.com/bao/uploaded/i1/92688455/O1CN01luycfl2CKRMkUneZV_!!92688455.jpg_b.jpg','https://img.alicdn.com/bao/uploaded/i3/92688455/O1CN01Bagzvh2CKRMklRq0y_!!92688455.jpg_b.jpg','https://img.alicdn.com/bao/uploaded/i1/92688455/O1CN01luycfl2CKRMkUneZV_!!92688455.jpg_b.jpg','https://img.alicdn.com/bao/uploaded/i1/92688455/O1CN01luycfl2CKRMkUneZV_!!92688455.jpg_b.jpg','https://img.alicdn.com/bao/uploaded/i1/92688455/O1CN01luycfl2CKRMkUneZV_!!92688455.jpg_b.jpg'],
                    title1: '秋季女孩基础打底衫', // 标题1
                    title2: '时尚修身长袖针织衫', // 标题2
                    price: '79.0' // 价格
                }
            ],
            newGoodses: [], // 最新推荐
            recommendGoodses: [],
            treeList: [
                {
                    title: '手机 pad',
                    children: [
                        {
                            id: '0',
                            img: '',
                            title: '小米11'
                        }
                    ]
                },
                {
                    title: '手机 pad',
                    children: [
                        {   
                            id: '1',
                            img: require('@/assets/logo.png'),
                            title: '小米11'
                        },
                        {
                            id: '2',
                            img: '',
                            title: '小米11 pro'
                        }
                    ]
                }
            ]
        }
    },
    watch: {
        // 家电当前选中的商品分类，响应不同的商品数据
        applianceActive: function(val) {
            // 页面初始化的时候把applianceHotList(热门家电商品列表)直接赋值给applianceList(家电商品列表)
            // 所以在切换商品列表时判断applianceHotList是否为空,为空则是第一次切换,把applianceList赋值给applianceHotList
            if (this.applianceHotList == '') {
                this.applianceHotList = this.applianceList
            }
            if (val == 1) {
                // 1为热门商品
                this.applianceList = this.applianceHotList
                return
            }
            if (val == 2) {
                // 2为电视商品
                this.applianceList = this.miTvList
                return
            }
        },
        // 配件当前选中的商品分类，响应不同的商品数据
        accessoryActive: function(val) {
            // 页面初始化的时候把accessoryHotList(热门配件商品列表)直接赋值给accessoryList(配件商品列表)
            // 所以在切换商品列表时判断accessoryHotList是否为空,为空则是第一次切换,把accessoryList赋值给accessoryHotList
            if (this.accessoryHotList == '') {
                this.accessoryHotList = this.accessoryList
            }
            if (val == 1) {
                // 1为热门商品
                this.accessoryList = this.accessoryHotList
                return
            }
            if (val == 2) {
                // 2为保护套商品
                this.accessoryList = this.protectingShellList
                return
            }
            if (val == 3) {
                //3 为充电器商品
                this.accessoryList = this.chargerList
                return
            }
        },
    },
    mounted() {
        this.getHome();
    },
    methods: {
        // 获取首页数据
        getHome() {
            this.$http.get(apiData.getHome).then(res => {
                if(res.resultCode == 200) {
                    // 轮播图数据
                    this.carousel = res.data.carousels;
                    // 当季流行数据
                     this.hotGoodses = res.data.hotGoodses.map(item => {
                        let smallImgs = [];
                        return {
                            smallImgs: smallImgs.push(item.goodsCoverImg),
                            id: item.goodsId,
                            title1: item.goodsName,
                            title2: item.goodsIntro,
                            price: item.sellingPrice,
                        }
                    });
                    // 新商品上市数据
                    this.newGoodses = res.data.newGoodses.map(item => {
                        let smallImgs = [];
                        return {
                            smallImgs: smallImgs.push(item.goodsCoverImg),
                            id: item.goodsId,
                            title1: item.goodsName,
                            title2: item.goodsIntro,
                            price: item.sellingPrice,
                        }
                    });
                    // 推荐好物数据
                    this.recommendGoodses = res.data.recommendGoodses.map(item => {
                        let smallImgs = [];
                        return {
                            smallImgs: smallImgs.push(item.goodsCoverImg),
                            id: item.goodsId,
                            title1: item.goodsName,
                            title2: item.goodsIntro,
                            price: item.sellingPrice,
                        }
                    });
                }
            })
        },
        // 获取家电模块子组件传过来的数据
        getChildMsg(val) {
            this.applianceActive = val
        },
        // 获取配件模块子组件传过来的数据
        getChildMsg2(val) {
            this.accessoryActive = val
        },
        // 获取各类商品数据方法封装
        getPromo(categoryName, val, api) {
            api = api != undefined ? api : '/api/product/getPromoProduct'
            this.$axios
                .post(api, {
                    categoryName,
                })
                .then((res) => {
                    this[val] = res.data.Product.slice(0, 7)
                })
                .catch((err) => {
                    return Promise.reject(err)
                })
        },
    },
}
</script>
<style lang="scss" scoped>
.home-wrapper{
    width: 1225px;
    margin: 0 auto;
    h5{
        line-height: 40px;
        font-size: 16px;
        margin: 20px 0;
        &::before{
            content: '';
            display: inline-block;
            width: 4px;
            height: 23px;
            margin-right: 6px;
            vertical-align: middle;
            background: rgb(139, 8, 8);
        }
    }
    &-bottom{
        overflow: hidden;
        .bigImg{
            width: 280px;
            height: 620px;
            img{
                width: 100%;
                height: 100%;
            }
        }
    }
}
@import '../assets/css/index.scss';
</style>
