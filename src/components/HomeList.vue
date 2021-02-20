<template>
  <div class="homeList-wrapper" @click="jumpToDetail(objData.id)">
    <img :src="bigImg || objData.smallImgs[0]" alt="" class="bigImg">
    <ul class="homeList-wrapper-smallImg">
      <li v-for="(item, index) in objData.smallImgs" :class="{'selected': index == nowChoose}" :key="index" @click="choose(item, index)"><img :src="item" alt=""></li>
    </ul>
    <p>{{objData.title1}}</p>
    <p v-if="objData.title2">{{objData.title2}}</p>
    <p>￥{{objData.price}}</p>
  </div>
</template>

<script>
  export default {
    props: {
      objData: {
        type: Object,
        default: () => {
          return {
            id: {
              type: String,
              default: ''
            },
            smallImgs: {
              type: Array,
              default: () => []
            },
            title1: {
              type: String,
              default: ''
            },
            title2: {
              type: String,
              default: ''
            },
            price: {
              type: String,
              default: ''
            }
          }
        }
      }
    },
    data() {
      return {
        bigImg: '',
        nowChoose: null // 当前小图选中
      }
    },
    methods: {
      // 选中小图
      choose(item, index) {
        this.nowChoose = index;
        this.bigImg = item;
      },
      jumpToDetail(id) {
        this.$router.push({
          name: 'Details',
          params: {
            categoryID: id
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
.homeList-wrapper{
  width: 210px;
  height: 300px;
  box-shadow: 0 0 3px 1px rgba(0,0,0,.4);
  margin:0 0 20px 24px;
  display: inline-block;
  background: #fff;
  &:hover{
    box-shadow: 0 0 3px 3px rgba(0,0,0,.4);
  }
  .bigImg{
    cursor: pointer;
  }
  img{
    width: 210px;
    height: 200px;
  }
  &-smallImg{
    li{
      display: inline-block;
      width: 30px;
      height: 30px;
      margin-left: 8px;
      border: 1px solid #ccc;
      cursor: pointer;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .selected{
      border-color: red;
    }
  }
  p{
    text-align: center;
    &:last-child{
      color: red;
      font-weight: 700;
    }
  }
}
</style>