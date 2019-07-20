<template>
  <section class="detail" @touchmove="scroll">
    <Loading :loading="loading" />
    <template v-if="lists">
      <header v-if="lists">
        <div class="wrap">
          <div @click="back" class="back">
            <i class="iconfont icon-logout23"></i>
            返回
          </div>
          <template>
            <img v-lazy="baseUrl + lists.img" alt="" />
          </template>
          <!--  <template v-else>
                <img src="" alt="加载失败">
            </template> -->
          <div class="video_name">
            <h3>{{ lists.name }}</h3>
            <div class="score_wrap">
              <strong>{{ lists.star }}</strong>
              <div class="score">
                <div
                  class="starList"
                  :style="{
                    'background-position-y':
                      -15 * (10 - lists.star).toFixed(0) + 'px'
                  }"
                ></div>
                <p>
                  {{ likeTotalLength }}人评分/{{
                    pageNeedComments.length
                  }}条评论
                </p>
              </div>
            </div>
          </div>
        </div>
        <a target="_blank" href="https://github.com/wclimb/vue-video"
          ><svg
            class="github"
            fill="#FFF"
            height="32"
            version="1.1"
            viewBox="0 0 16 16"
            width="32"
          >
            <path
              fill-rule="evenodd"
              d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"
            ></path></svg
        ></a>
      </header>
      <section class="video_txt">
        <div class="video_txt_wrap">
          <p>
            <template v-if="lists.timelong > 90">
              {{ lists.timelong }}分钟
            </template>
            <template v-else>
              {{ lists.timelong }}季
            </template>
            {{ lists.type }}
          </p>
          <p>
            {{ lists.time1 }}( {{ lists.country }} )上映 {{ lists.country }}
          </p>
          <p>{{ lists.actors }}</p>
        </div>
      </section>
      <section class="like_list">
        <template v-if="!userName || userName == ''">
          <div class="like" @click="likeNeedLogin">喜欢</div>
          <div class="like" @click="likeNeedLogin">不喜欢</div>
          <!-- <p>登录后才可选择哟！</p> -->
        </template>
        <template v-else-if="likes">
          <div :class="[likes == 1 ? likeActive : likeDisable, likeCls]">
            喜欢
          </div>
          <div :class="[likes == 2 ? likeActive : likeDisable, likeCls]">
            不喜欢
          </div>
        </template>
        <template v-else>
          <div @click="like(1)" class="like">喜欢</div>
          <div @click="like(2)" class="like">不喜欢</div>
        </template>
      </section>
      <section class="video_about">
        <h3>{{ lists.name }}的剧情简介</h3>
        <p>
          {{ lists.detail }}
        </p>
      </section>
      <section v-move class="fixed_comment">
        <template v-if="userName && userName != ''">
          <input
            type="text"
            v-model="comment"
            @click="resetScrollTop"
            @keyup.enter="report"
            name="comment"
            placeholder="评论"
          />
          <button @click="report">评论</button>
        </template>
        <template v-else>
          <input
            type="text"
            v-model="comment"
            name="comment"
            placeholder="登陆后才可以评论哟！"
            readonly
          />
          <button class="disabled">评论</button>
        </template>
      </section>
      <section class="video_comments">
        <h3>评论({{ pageNeedComments.length }})</h3>
        <ul id="ul">
          <li :key="comment.id" v-for="comment in comments">
            <template v-if="comment.avator != ''">
              <div class="avator">
                <img
                  v-lazy="baseUrl + '/avator/' + comment.avator + '.png'"
                  alt=""
                />
              </div>
            </template>
            <template v-else>
              <div class="avator">
                {{ comment.userName.charAt(0) }}
              </div>
            </template>
            <div class="comments_detail">
              <h4>{{ comment.userName }}</h4>
              <p>{{ comment.date }}</p>
              <div>{{ comment.content }}</div>
            </div>
          </li>
        </ul>
      </section>
      <section class="page">
        <transition name="page-scale">
          <div @click="goPage(1)" v-if="commentsPageLength > 1 && page > 1">
            首页
          </div>
        </transition>
        <transition name="page-scale">
          <div @click="prevPage()" v-if="page >= 2">上一页</div>
        </transition>
        <transition name="page-scale">
          <div @click="nextPage()" v-if="page < commentsPageLength">下一页</div>
        </transition>
        <transition name="page-scale">
          <div
            @click="goPage(commentsPageLength)"
            v-if="page < commentsPageLength"
          >
            尾页
          </div>
        </transition>
        <template v-if="commentsPageLength >= 1">
          <div class="pageNum">{{ page }}/{{ commentsPageLength }}页</div>
        </template>
        <template v-else>
          <div class="pageNum">{{ commentLoad }}</div>
        </template>
      </section>
    </template>
  </section>
</template>

<script>
import Loading from './common/Loading.vue';
import { mapState, mapActions } from 'vuex';
import {
  url,
  singleVideoData,
  getVideoComment,
  getInitVideoLikeData,
  postVideoLikeData,
  reportComment,
  checkUser
} from '../data/fetchData.js';

export default {
  name: 'detail',
  components: {
    Loading
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
  },
  data() {
    return {
      lists: null,
      comments: '',
      pageNeedComments: '',
      likes: '',
      star: '',
      baseUrl: url + '/images/',
      likeTotalLength: 0,
      loading: false,
      comment: '',
      likeActive: 'like_active',
      likeCls: 'like',
      likeDisable: 'likeDisable',
      scrollTop: 200,
      page: 1,
      commentLoad: '评论正在加载中......',
      userName: localStorage.user
    };
  },
  computed: {
    ...mapState(['userInfo', 'meCommentDatas']),
    comment_allow() {
      return localStorage.user ? true : false;
    },
    avator() {
      return localStorage.avator;
    },
    commentsPageLength() {
      return Math.ceil(this.pageNeedComments.length / 5);
    }
  },
  mounted() {
    this.initData();
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    $route: 'initData'
  },
  methods: {
    async initData() {
      this.loading = true;
      // 获取video数据
      var routerId = this.$route.params.id;
      var userName = this.userName;
      setTimeout(() => {
        this.loading = false;
      }, 500);
      await singleVideoData(routerId)
        .then(res => {
          var data = res.data;
          if (data[0].length == 0) {
            this.$toast({
              icon: 'fail',
              message: '影片不存在',
              success: () => {
                this.$router.push({ path: '/' });
              }
            });
          }
          this.lists = data[0][0];
          // 喜欢的数量
          var likeLength = data[1][0]['count(*)'];
          // 该video总的评价数量
          var likeTotalLength = data[2][0]['count(*)'];
          this.likeTotalLength = likeTotalLength;
          if (likeTotalLength > 0 && likeLength >= 0) {
            this.star = (likeLength / likeTotalLength) * 10;
          }
        })
        .catch(e => {
          this.loading = false;
          this.$toast({
            icon: 'fail',
            message: e.message
          });
        });

      // 获取评论
      await getVideoComment(routerId)
        .then(res => {
          this.comments = res.data.slice(0, 5);
          this.pageNeedComments = res.data;
          this.commentLoad = '暂时没有相关评论.......';
        })
        .catch(e => {
          this.$toast({
            icon: 'fail',
            message: e.message
          });
        });
      setTimeout(() => {
        this.loading = false;
      }, 500);
      if (userName !== '' || !userName) {
        // 获取like参数
        await getInitVideoLikeData(routerId, userName)
          .then(res => {
            this.likes = res.data[0] ? res.data[0]['iLike'] : null;
          })
          .catch(e => {
            this.$toast({
              icon: 'fail',
              message: e.message
            });
          });
      }
    },
    // 点击like操作
    like(likeData) {
      // 提交like信息
      postVideoLikeData(
        this.$route.params.id,
        likeData,
        this.userName,
        this.lists.name,
        this.lists.img,
        this.lists.star
      )
        .then(data => {
          if (likeData == 1) {
            this.likes = 1;
            this.$toast({
              icon: 'success',
              message: '标记为喜欢'
            });
          } else if (likeData == 2) {
            this.likes = 2;
            this.$toast({
              icon: 'success',
              message: '标记为不喜欢'
            });
          }
        })
        .catch(e => {
          this.$toast({
            icon: 'fail',
            message: e.message,
            success: () => {
              if (e.code == 404) this.$router.push({ path: '/login' });
              localStorage.clear();
            }
          });
        });
    },
    // 监听滚动，动态更新scrollTop
    scroll() {
      window.onscroll = function() {
        this.scrollTop =
          document.body.scrollTop || document.documentElement.scrollTop;
      };
      this.scrollTop =
        document.body.scrollTop || document.documentElement.scrollTop;
    },
    // 评论后滚动到底部
    scrollToBottom() {
      var scrollHeight = document.documentElement.scrollHeight;
      scrollTo(0, scrollHeight);
    },
    // 解决键盘抬起遮挡问题(现在是直接滚动到底部评论）
    resetScrollTop() {
      // document.body.scrollTop = document.documentElement.scrollTop = document.body.scrollHeight + 600;
    },
    date(x, y) {
      var z = {
        y: x.getFullYear(),
        M: x.getMonth() + 1,
        d: x.getDate(),
        h: x.getHours(),
        m: x.getMinutes(),
        s: x.getSeconds()
      };
      return y.replace(/(y+|M+|d+|h+|m+|s+)/g, function(v) {
        return ((v.length > 1 ? '0' : '') + eval('z.' + v.slice(-1))).slice(
          -(v.length > 2 ? v.length : 2)
        );
      });
    },
    // 发表评论
    report() {
      if (this.comment == '') {
        this.$toast({
          icon: 'fail',
          message: '请输入评论内容'
        });
        this.comment = '';
        return;
      }
      var date = this.date(new Date(), 'yyyy-M-d h:m:s');
      var avator = this.avator == null ? '' : this.avator;
      reportComment(
        this.$route.params.id,
        this.userName,
        this.comment,
        this.lists.name,
        avator
      )
        .then(data => {
          console.log(data);
          this.pageNeedComments.push({
            userName: localStorage.getItem('user'),
            date: date, //现在由服务端处理
            content: this.comment,
            avator: avator
          });
          this.goPage(Math.ceil(this.pageNeedComments.length / 5));
          this.$toast({
            icon: 'success',
            message: '评论成功'
          });
          this.comment = '';
          this.$nextTick(() => {
            this.scrollToBottom();
          });
        })
        .catch(e => {
          this.$toast({
            icon: 'fail',
            message: e.message,
            success: () => {
              if (e.code == 404) this.$router.push({ path: '/login' });
              localStorage.clear();
            }
          });
          this.comment = '';
        });
    },
    nextPage() {
      if (this.page != this.commentsPageLength) {
        this.page++;
      }
      this.comments = this.pageNeedComments.slice(
        (this.page - 1) * 5,
        this.page * 5
      );
    },
    prevPage() {
      if (this.page != 1) {
        this.page--;
      }
      this.comments = this.pageNeedComments.slice(
        (this.page - 1) * 5,
        this.page * 5
      );
    },
    goPage(page) {
      this.page = page;
      this.comments = this.pageNeedComments.slice((page - 1) * 5, page * 5);
    },
    likeNeedLogin() {
      this.$toast({
        icon: 'fail',
        message: '请先登录！'
      });
    },
    back() {
      this.$router.go(-1);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import 'src/style/detail';
</style>
