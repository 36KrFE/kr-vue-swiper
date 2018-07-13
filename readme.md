# kr-vue-swiper
一个基于Vue的轮播图组件。应用于鲸准·洞见的门户

# Usage
```js
  npm install --save kr-vue-swiper
```
```js
  import { swiper, slide} from 'kr-vue-swiper';
  export default {
    components: {
      swiper,
      slide
    }
  }
```
```html
  <swiper ref="swiper" v-if="list.length > 0"  @change="getNum">
    <slide v-for="(item,index) in list"  :key="index" @clickSlide="show">
      <img :src="item.img" >
    </slide>
  </swiper>
```
图片自动轮播效果如下图：
![轮播](./img/轮播.gif)

点击轮播点效果如下图：
![点播](./img/点播.gif)

点击左右箭头效果如下图：
![箭头播](./img/箭头播.gif)


# API 
参数 | 说明 | 类型 | 默认值
-|-|-|-
height | 轮播图的高度 | string | 300px
autoPlay | 是否自动奇幻 | boolean | true
interval | 自动切换的时间间隔，单位为毫秒 | number | 1000
duration | 图片切换的所用时间，单位为毫秒 | number | 500
showIndicator | 是否显示指示器 | boolean | true
showArrow |　是否显示左右箭头 | boolean | true

# Events

事件名称 | 说明 | 回调参数
-|-|-
change | 幻灯片切换时触发 | 目前激活的幻灯片的索引
clickSlide | 当点击幻灯片时触发 | -

