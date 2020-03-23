<template>
  <section class="me" @touchstart="touchStartHideAll">
    <section class="me_deatil" @click="showDefaultName">
      <section class="avator">
        <template v-if="avator == ''">
          <input @click="upload" id="upload" type="file" />
          <div class="avator_border">上传头像</div>
        </template>
        <template v-else>
          <input @click="upload" id="upload" type="file" />
          <div class="avator_border">
            <img v-lazy="baseUrl + '/avator/' + avator + '.png'" alt="" />
          </div>
        </template>
        <div class="name" @click.stop="editUserName">
          <template v-if="defaultName">
            {{ userName }} <i class="iconfont icon-bianji"></i>
          </template>
          <template v-else>
            <input
              type="text"
              v-focus
              v-model="userNameModel"
              @keyup.enter="submitEditName"
            />
            <i class="iconfont icon-submit" @click.stop="submitEditName"></i>
          </template>
        </div>
        <div @click="logout" class="logout">
          <i class="iconfont icon-logout23"></i>
          退出
        </div>
      </section>
      <Loading :loading="loading" />
      <section class="like_list list">
        <h3>
          <i class="iconfont icon-msnui-love"></i>
          喜欢<span>({{ likeLengthOne }})</span>
        </h3>
        <ul>
          <li :key="likeList.id" v-for="likeList in likeLists[0]">
            <router-link :to="'/video/' + likeList.uid">
              <img v-lazy="baseUrl + likeList.videoImg" alt="" />
              <h4>{{ likeList.videoName }}</h4>
              <div>
                <div
                  class="starList"
                  :style="{
                    'background-position-y':
                      -15 * (10 - likeList.star).toFixed(0) + 'px'
                  }"
                ></div>
                <span>{{ likeList.star }}</span>
              </div>
            </router-link>
          </li>
        </ul>
      </section>
      <section class="dislike_list list">
        <h3>
          <i class="iconfont icon-buxihuan"></i>
          不喜欢<span>({{ likeLengthTwo }})</span>
        </h3>
        <ul>
          <li :key="likeList.id" v-for="likeList in likeLists[1]">
            <router-link :to="'/video/' + likeList.uid">
              <img v-lazy="baseUrl + likeList.videoImg" alt="" />
              <h4>{{ likeList.videoName }}</h4>
              <div>
                <div
                  class="starList"
                  :style="{
                    'background-position-y':
                      -15 * (10 - likeList.star).toFixed(0) + 'px'
                  }"
                ></div>
                <span>{{ likeList.star }}</span>
              </div>
            </router-link>
          </li>
        </ul>
      </section>
      <section class="comment list">
        <h3>
          <i class="iconfont icon-pinglun1"></i>
          评论<span>({{ comments.length }})</span>
        </h3>
        <ul>
          <li :key="comment.id" v-for="(comment, index) in comments">
            <section
              @touchstart.stop="touchStart($event)"
              @touchmove.stop="touchMove($event)"
              @touchend.stop="touchEnd($event)"
              class="commentWrap"
            >
              <h5>影片：{{ comment.videoName }}</h5>
              <section>
                <span>评论：</span>
                <p>{{ comment.content }}</p>
              </section>
              <div class="time">{{ comment.date }}</div>
            </section>
            <div
              class="delete"
              @click="deleteComment(comment.id, userName, index, $event)"
            >
              删除
            </div>
          </li>
        </ul>
      </section>
    </section>
  </section>
</template>

<script>
import Loading from './common/Loading.vue';
import { mapState, mapActions } from 'vuex';
import {
  url,
  meComment,
  meLike,
  meDelete,
  uploadAvator,
  editNameData,
  getAvator
} from '../data/fetchData.js';
export default {
  name: 'me',
  components: {
    Loading
  },
  data() {
    return {
      likeLists: '',
      comments: [],
      loading: false,
      likeLengthOne: '',
      likeLengthTwo: '',
      start: '',
      scroll: '',
      defaultName: true,
      userNameModel: '',
      userName: '',
      baseUrl: url + '/images/',
      avator: ''
    };
  },
  computed: {
    ...mapState(['meCommentDatas'])
  },
  mounted() {
    this.userName = localStorage.user;
    if (!this.userName || this.userName === '') {
      this.$router.push('/login');
    }
    this.initData();
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    $route: 'initData'
  },
  directives: {
    focus: {
      inserted: function(el) {
        // 聚焦元素
        el.focus();
      }
    }
  },
  methods: {
    ...mapActions(['initMeCommentData']),
    // 初始化数据
    async initData() {
      this.loading = true;
      if (localStorage.user === null) {
        this.$router.push({ path: '/login' });
      }
      let userName = this.userName;
      await meComment(userName)
        .then(res => {
          let data = res.data;
          this.initMeCommentData(data);
          this.comments = data;
        })
        .catch(e => {
          this.loading = false;
          this.$toast({
            icon: 'fail',
            message: e.message
          });
        });
      // 获取喜欢不喜欢数据
      await meLike(userName)
        .then(res => {
          let data = res.data;
          this.likeLists = data;
          this.likeLengthOne = data[0].length;
          this.likeLengthTwo = data[1].length;
        })
        .catch(e => {
          this.loading = false;
          this.$toast({
            icon: 'fail',
            message: e.message
          });
        });
      await getAvator(userName)
        .then(data => {
          this.avator = data.avator;
          localStorage.setItem('avator', data.avator);
        })
        .catch(e => {});
      setTimeout(() => {
        this.loading = false;
      }, 500);
    },
    // 登出
    logout() {
      this.$toast({
        icon: 'success',
        message: '登出成功'
      });
      localStorage.clear();
      document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/';
      setTimeout(() => {
        this.$router.push({ path: '/' });
      }, 1500);
    },
    // 删除自己的评论
    deleteComment(id, name, index, e) {
      var el = e.currentTarget;
      meDelete(id, name)
        .then(data => {
          this.$toast({
            icon: 'success',
            message: '删除成功'
          });
          el.parentNode.style.height = 0;
          el.parentNode.style.borderTop = 'none';
          this.$nextTick(() => {
            setTimeout(() => {
              this.comments.splice(index, 1);
            }, 500);
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
        });
    },
    // 滑动删除评论
    touchStart(e) {
      var commentWrap = document.querySelectorAll('.commentWrap');
      for (var i = 0; i < commentWrap.length; i++) {
        commentWrap[i].style.transform = 'translate(' + 0 + 'rem)';
        commentWrap[i].style.webkitTransform = 'translate(' + 0 + 'rem)';
      }
      var start = e.touches[0].pageX / 100;
      this.start = start;
    },
    touchStartHideAll(e) {
      if (e.target.className !== 'delete') {
        var commentWrap = document.querySelectorAll('.commentWrap');
        for (var i = 0; i < commentWrap.length; i++) {
          commentWrap[i].style.transform = 'translate(' + 0 + 'rem)';
          commentWrap[i].style.webkitTransform = 'translate(' + 0 + 'rem)';
        }
      }
    },
    touchMove(e) {
      var scroll = e.touches[0].pageX / 100 - this.start;
      this.scroll = scroll;
      if (scroll < -1.5) {
        scroll = -1.5;
      } else if (scroll > 0) {
        scroll = 0;
      }
      var el = e.currentTarget;
      el.style.transform = 'translate(' + scroll + 'rem)';
      el.style.webkitTransform = 'translate(' + scroll + 'rem)';
    },
    touchEnd(e) {
      var el = e.currentTarget;
      if (this.scroll < 0 && this.scroll >= -1) {
        el.style.transform = 'translate(' + 0 + 'rem)';
        el.style.webkitTransform = 'translate(' + 0 + 'rem)';
      }
      if (this.scroll < -1) {
        el.style.transform = 'translate(' + -1.5 + 'rem)';
        el.style.webkitTransform = 'translate(' + -1.5 + 'rem)';
      }
      this.scroll = 0;
    },
    // 上传头像
    upload() {
      var upload = document.querySelector('#upload');
      var _that = this;
      upload.addEventListener(
        'change',
        function() {
          if (this.files.length != 0) {
            var file = this.files[0],
              reader = new FileReader();
            if (!reader) {
              this.value = '';
              return;
            }
            // if (file.size >= 1024*1024/2) {
            //     _that.$toast({
            //         icon:'fail',
            //         message:'超过512Kb了哟!'
            //     })
            //     return
            // }
            reader.onload = function(e) {
              this.value = '';
              var image = new Image();
              image.onload = function() {
                var canvas = document.createElement('canvas');
                var ctx = canvas.getContext('2d');
                canvas.width = 100;
                canvas.height = 100;
                ctx.clearRect(0, 0, 100, 100);
                ctx.drawImage(image, 0, 0, 100, 100);
                var blob = canvas.toDataURL('image/png');
                uploadAvator(_that.userName, blob)
                  .then(data => {
                    _that.$toast({
                      icon: 'success',
                      message: '上传成功'
                    });
                    localStorage.setItem('avator', data.avator);
                    _that.avator = data.avator;
                  })
                  .catch(e => {
                    _that.$toast({
                      icon: 'fail',
                      message: e.message,
                      success: () => {
                        if (e.code == 404)
                          _that.$router.push({ path: '/login' });
                        localStorage.clear();
                      }
                    });
                  });
              };
              image.src = e.target.result;
            };
            reader.readAsDataURL(file);
          }
        },
        false
      );
    },
    // 修改用户名
    editUserName() {
      this.defaultName = false;
      this.userNameModel = this.userName;
    },
    // 提交修改用户名操作
    submitEditName() {
      var modelData = this.userNameModel;
      if (modelData == this.userName) {
        this.$toast({
          icon: 'fail',
          message: '请修改名称！'
        });
        this.defaultName = true;
        return;
      }
      editNameData(this.userName, modelData)
        .then(res => {
          this.$toast({
            icon: 'success',
            message: '修改成功'
          });
          document.cookie = `token=${res.token};max-age=${30 *
            24 *
            60 *
            60 *
            1000}`;
          localStorage.setItem('user', modelData);
          this.userName = modelData;
          this.defaultName = true;
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
          this.defaultName = true;
        });
    },
    // 显示原来的名字，即隐藏修改用户名输入框
    showDefaultName() {
      this.defaultName = true;
    }
  }
};
</script>

<style lang="scss" scoped>
@import 'src/style/me';
</style>
