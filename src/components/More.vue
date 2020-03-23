<template>
  <section class="video">
    <Loading :loading="loading" />
    <section class="video_list">
      <h1>{{ videoCls }}</h1>
      <ul>
        <li v-for="list in lists" :key="list.id">
          <router-link :to="'video/' + list.id">
            <div><img v-lazy="baseUrl + list.img" alt="" /></div>
            <h3>{{ list.name }}</h3>
            <div>
              <div
                class="starList"
                :style="{
                  'background-position-y':
                    -15 * (10 - list.star).toFixed(0) + 'px'
                }"
              ></div>
              <span>{{ list.star }}</span>
            </div>
          </router-link>
        </li>
      </ul>
    </section>
  </section>
</template>

<script>
import Loading from './common/Loading.vue';
import { mapState } from 'vuex';
import { initHome, url } from '@/data/fetchData.js';
export default {
  name: 'more',
  components: {
    Loading
  },
  data() {
    return {
      lists: '',
      icon: 'iconfont',
      iconStyle: 'icon-wjx',
      iconStyleCopy: 'icon-wjx-copy',
      loading: false,
      videoCls: '',
      baseUrl: url + '/images/'
    };
  },
  computed: {
    ...mapState(['videoData'])
  },
  created() {
    this.initData();
  },
  methods: {
    async initData() {
      var path = this.$route.path;
      // 这里修复源码中从url进入 '/all' 等路径时列表为空的bug
      if (this.videoData == null) {
        this.loading = true;
        await initHome().then(data => {
          this.$store.dispatch('initVideoData', {
            initVideoData: data
          });
          this.loading = false;
        });
      }
      if (path === '/all') {
        this.lists = this.videoData[3];
        this.videoCls = '全部';
      } else if (path === '/movie') {
        this.lists = this.videoData[0];
        this.videoCls = '电影';
      } else if (path === '/tv') {
        this.lists = this.videoData[1];
        this.videoCls = '电视剧';
      } else if (path === '/zy') {
        this.lists = this.videoData[2];
        this.videoCls = '综艺';
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.video {
  a {
    color: #444;
  }
  padding: 0 0.15rem;
  padding-bottom: 1.2rem;
  margin-bottom: 1rem;
  font-size: 12px;
  .icon-wjx {
    color: rgb(255, 172, 45);
  }
  .icon-wjx-copy {
    color: #ccc;
  }
  .video_list {
    text-align: center;
    h1 {
      font-weight: bold;
      color: #666;
      font-size: 25px;
      margin-top: 0.5rem;
      color: #0fce0f;
      padding-bottom: 0.15rem;
      border-bottom: 1px solid #f1eaea;
    }
    ul {
      display: flex;
      width: 100%;
      flex-wrap: wrap;
      li {
        margin-top: 0.15rem;
        width: 2.3rem;
        h3 {
          font-size: 16px;
          margin: 0.1rem 0;
          text-align: left;
          height: 0.5rem;
          line-height: 0.5rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        img {
          width: 100%;
          height: 3.4rem;
          &[lazy='loaded'] {
            object-fit: cover;
          }
          &[lazy='loading'] {
            object-fit: contain;
          }
        }
        .color {
          color: yellow;
        }
        div {
          color: #333;
          display: flex;
          span {
            margin-left: 0.1rem;
          }
        }
        &:nth-child(3n-1) {
          margin: 0.15rem 0.15rem;
        }
      }
    }
  }
  .icon-my1 {
    color: #4ebf60;
  }
}
</style>
