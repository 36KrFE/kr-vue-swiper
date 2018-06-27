<template>
  <section class="kr_container" :style="{width: width, height: height}" @mouseover="mouseover" @mouseout="mouseout">
    <div class="kr_swiper" >
      <slot/>
    </div>
    <div v-if="showIndicator" class="kr_indicator" >
      <div 
        v-for="(item,$index) in slidesLength" 
        :key="$index" 
        class="kr_indicator_item" 
        :class="{kr_indicator_activeItem: $index+1 === index}"
        @click="indicatorClick($index)"
      >
      </div>
    </div>
    <div v-if="showArrow" class="kr_arrow" :class="{kr_arrow_show: kr_arrow_show}">
      <div class="kr_arrow_left" @click="showNext('prev')"> &lt; </div>
      <div class="kr_arrow_right" @click="showNext('next')"> &gt; </div>
    </div>
  </section>

</template>
<script>
  export default {
    data() {
      return {
        slidesLength: 1,
        boxWidth: 0, // 轮播图所有图的总宽度
        dom: {},  // 存放轮播图的样式
        timeId: '',  // 计时器ID
        index: 1,
        auto: true, // 轮播图是否继续进行
        kr_arrow_show: false, //鼠标进入箭头显示
        
      }
    },
    props: {
      // 两次滑动的时间间隔
      interval: {
        type: Number,
        default: 1000
      },
      // 是否是自动播放
      autoPlay: {
        type: Boolean,
        default: true
      },
      // 持续时间
      duration: {
        type: Number,
        default: 500
      },
      // 是否显示轮播点
      showIndicator: {
        type: Boolean,
        default: true
      },
      // 是否显示箭头
      showArrow: {
        type: Boolean,
        default: true
      },
      width: {
        type: String,
        default: '600px'
      },
      height: {
        type: String,
        default: '300px'
      }
    },
    methods: {
      // 复制元素
      copyDom() {
        let SlideDom = document.querySelector('.kr_swiper').getElementsByClassName('kr_slide');
        this.slidesLength = SlideDom.length;
        if(this.slidesLength > 1) {
          let cloneDom1 = SlideDom[0].cloneNode(true); 
          let cloneDom2 = SlideDom[SlideDom.length - 1].cloneNode(true); 
          document.querySelector('.kr_swiper').insertBefore(cloneDom2, SlideDom[0]);
          document.querySelector('.kr_swiper').appendChild(cloneDom1);
          this.boxWidth = document.querySelector('.kr_swiper').offsetWidth;
          this.dom = document.querySelector('.kr_swiper').style;
        }
      },
      // 设置定时函数
      setTime() {
        this.timeId = window.setTimeout( () => {
          if(this.auto && this.autoPlay) {
            this.index++;
            this.move();
          }else {
            window.clearTimeout(this.timeId);
          }
        }, this.interval);
      },
      move() {
        this.dom.transition = this.duration + 'ms';
        this.setTransform(this.index * -1 * this.boxWidth);
        if(this.autoPlay) {
          this.setTime();
        }
       this.setController();
      },
      // 控制index的变化
      setController() {
        let timeDuration = this.duration;
        setTimeout(() => {
          this.dom.transition = '0s';
          // 向后翻
          if(this.index >= this.slidesLength + 1) {
            // 当播到最后一张图时，回到第一张
            this.index = 1;
            this.setTransform(this.index * -1 * this.boxWidth);
          }
          // 向前翻
          if(this.index <= 0) {
            this.index = this.slidesLength;
            this.setTransform(this.index * -1 * this.boxWidth);
          }
          this.auto = true;
        },timeDuration);
      },
      // 设置图片移动的距离
      setTransform(num) {
        this.dom.transform = `translateX(${num}px)`;
        this.dom['-webkit-transform'] = `translateX(${num}px)`;
        this.dom['-ms-transform'] = `translateX(${num}px)`;
      },
      // 鼠标进入
      mouseover() {
        this.kr_arrow_show = true;
        this.clearTimeout();
      },
      // 鼠标离开
      mouseout() {
        this.kr_arrow_show = false;
        this.auto = true;
        this.setTime();
      },
      // 清楚定时器
      clearTimeout() {
        this.auto = false;
        window.clearTimeout(this.timeId);
      },
      // 点击轮播点
      indicatorClick($index) {
        this.index = $index + 1;
        this.dom.transition = this.duration + 'ms';
        this.setTransform(this.index * -1 * this.boxWidth);
      },
      // 向前 或 向后滚动
      showNext(type) {
        this.index = type === 'prev' ? this.index - 1 : this.index + 1;
        this.dom.transition = this.duration + 'ms';
        this.setTransform(this.index * -1 * this.boxWidth);
        this.setController();

      }
    },
    watch: {
      'index'() {
        let newIndex = this.index;
        if(newIndex <= 0 || newIndex >= this.slidesLength + 1) {
          return;
        }else {
          this.$emit('change', newIndex - 1);
        }        
      }
    },
    mounted() {
      this.$nextTick(() => {
        // 复制元素
        this.copyDom();
        // 设置动画
        this.dom.transform = `translateX(-${this.boxWidth}px)`;
        this.dom['-webkit-transform'] = `translateX(-${this.boxWidth}px)`;
        this.dom['-ms-transform'] = `translateX(-${this.boxWidth}px)`;
        if(this.autoPlay) {
          this.setTime();
        }
      }) 
    }
  }
</script>
<style>
  .kr_container {
    position: relative;
    overflow: hidden;
  }
  .kr_swiper {
    width: 100%;
    height: 100%;
    display: flex;
    transition: 0s linear;
  }
  .kr_indicator {
    position: absolute;
    bottom: 16px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
  }
  .kr_indicator_item {
    width: 20px;
    height: 3px;
    background-color: rgba(255, 255, 255, 0.2);
    margin-right: 6px;
    cursor: pointer;
  }
  .kr_indicator_activeItem {
    background-color: rgba(255, 255, 255 );
  }
  .kr_arrow {
    width: 100%;
    position: absolute;
    display: flex;
    justify-content: space-between;
    top: 50%;
    transform: translateY(-50%);
    opacity: 0;
  }
  .kr_arrow_show {
    opacity: 1;
  }
  .kr_arrow_left, .kr_arrow_right {
    margin: 0 14px;
    cursor: pointer;
    width: 36px;
    height: 36px;
    text-align: center;
    line-height: 36px;
    border-radius: 50%;
    transition: 0.3s;
    font-size: 14px;
    color: rgb(255, 255, 255);
    background-color: rgba(31, 45, 61, 0.3);
  }
  .kr_arrow_left:hover, .kr_arrow_right:hover {
    background-color: rgba(31, 45, 61, 0.4);
  }
</style>