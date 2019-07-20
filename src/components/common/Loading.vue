<template>
  <!-- <transition name="fade">
        <div v-move class="loading" v-if="loading">
            <div class="loading_dialog">
                <img src="./loading.svg" alt="">
            </div>
        </div>
    </transition> -->
  <div class="mini-loading" :style="{ height: loading ? '' : '0' }">
    <img src="./loading-copy.svg" alt="" />
  </div>
</template>

<script>
export default {
  name: 'vfooter',
  props: ['loading'],
  data() {
    return {
      // msg: ''
    };
  },
  directives: {
    move: {
      inserted(el) {
        document.body.appendChild(el);
      },
      unbind(el) {
        document.body.removeChild(el);
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>
