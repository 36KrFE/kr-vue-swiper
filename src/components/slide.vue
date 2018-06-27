<template>
  <div class="kr_slide" @click="clickSlide">
    <slot/>
  </div>
</template>
<script>
  export default {
    methods: {
      clickSlide() {
        this.$emit('clickSlide');
      }
    }
  }
</script>
<style>
  .kr_slide {
    width: 100%;
    flex-shrink: 0;
  }
  .kr_slide img {
    width: 100%;
    height: 100%;
    display: block;
  }
</style>