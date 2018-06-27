<template>
  <div class="hello">
    <swiper v-if="list.length > 0" width="590px" height="404px" :auto-play="true" @change="getNum">
      <slide v-for="(item,index) in list"  :key="index" @clickSlide="show">
        <img :src="item.img" >
      </slide>
    </swiper>
  </div>
</template>

<script>
  import { swiper, slide } from './components/index.js';

  export default {
    name: 'HelloWorld',
    components: {
      swiper,
      slide
    },
    data() {
      return {
        list: [
          { img: 'https://qiniu.epipe.cn/5456575529551388672?imageslim&imageView2/1/w/750/h/360', href: 'www.baidu.com'},
          { img: 'https://qiniu.epipe.cn/5430983074181545984?imageslim&imageView2/1/w/750/h/360', href: 'www.baidu.com' },
          { img: 'https://qiniu.epipe.cn/5464226412548325376?imageslim&imageView2/1/w/750/h/360', href: 'www.baidu.com' }
        ]
      }
    },
    methods: {
      getNum(index) {
        // console.log(index);
      },
      show() {
        console.log(123);
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
  * {
    margin: 0;
    padding: 0;
  }
  .hello {
    width: 600px;
  }
</style>
