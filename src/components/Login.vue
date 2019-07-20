<template>
  <main>
    <section class="main_wrap">
      <section class="user_title">
        <i class="iconfont icon-denglu"></i>
        <h3>注册/登录</h3>
      </section>
      <section class="user">
        <form enctype="multipart/form-data">
          <div class="input">
            <div class="input_wrap">
              <i class="iconfont icon-name"></i>
              <input
                type="text"
                v-model.trim="userName"
                @keyup.enter="signin"
                name="userName"
                placeholder="用户名"
              />
            </div>
            <div class="input_wrap">
              <i class="iconfont icon-mima1"></i>
              <input
                type="password"
                v-model="password"
                @keyup.enter="signin"
                name="password"
                placeholder="密码"
              />
            </div>
            <div class="input_wrap">
              <i class="iconfont icon-yanzhengma1"></i>
              <input
                type="text"
                v-model="yzm"
                @keyup.enter="signin"
                name="yzm"
                placeholder="验证码"
              />
              <img @click="changYzm" :src="url" alt="" />
              <!-- <p>点击更换</p> -->
            </div>
          </div>
          <div class="submit" @click="signin">立即注册/登录</div>
        </form>
      </section>
    </section>
  </main>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { signin, yzmChange, checkUser, url } from '../data/fetchData.js';
export default {
  name: 'login',
  data() {
    return {
      lists: '',
      loading: false,
      userName: '',
      password: '',
      yzm: '',
      yzmTest: '',
      url: ''
    };
  },
  computed: {
    ...mapState(['userInfo'])
  },
  mounted() {
    if (localStorage.user && localStorage.user != '') {
      this.$router.push('/me');
    }
    this.url = url + '/images/yzm.jpg';
    this.changYzm();
  },
  methods: {
    // 登录
    signin() {
      if (this.userName === '' || this.password === '') {
        this.$toast({
          icon: 'fail',
          message: '用户名/密码不能为空'
        });
        return;
      }
      if (this.yzm != this.yzmTest) {
        this.$toast({
          icon: 'fail',
          message: '验证码错误'
        });
        return;
      }
      signin(this.userName, this.password)
        .then(data => {
          // 用户存在
          if (data.code == 200) {
            this.$toast({
              icon: 'success',
              message: '登录成功',
              success: () => {
                this.$router.push({ path: '/me' });
              }
            });
            this.$store.dispatch('createUser', {
              userName: this.userName
            });
            document.cookie = `token=${data.token};max-age=${30 *
              24 *
              60 *
              60 *
              1000}`;
            localStorage.setItem('user', this.userName);
            localStorage.setItem('avator', data.avator);
          } else if (data.code == 201) {
            //新用户
            this.$toast({
              icon: 'success',
              message: '注册成功',
              success: () => {
                this.$router.push({ path: '/me' });
              }
            });
            document.cookie = `token=${data.token};max-age=${30 *
              24 *
              60 *
              60 *
              1000}`;

            localStorage.setItem('user', this.userName);
          }
        })
        .catch(e => {
          this.$toast({
            icon: 'fail',
            message: e.message
          });
        });
    },
    // 验证码切换
    changYzm() {
      yzmChange().then(res => {
        this.yzmTest = res.data;
        this.url = url + '/images/yzm.jpg' + '?v=' + new Date().getTime();
        console.log('验证码', this.yzmTest);
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.main_wrap {
  margin-top: 2rem;
}
.user_title {
  display: flex;
  flex-direction: column;
  align-items: center;
  i {
    color: #1abc9c;
    font-size: 60px;
  }
  h3 {
    font-size: 18px;
    color: #1abc9c;
  }
}
.user {
  .input_wrap {
    position: relative;
    margin-top: 0.5rem;
    i {
      font-size: 30px;
      color: #1abc9c;
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
    }
    input {
      border: none;
      width: 100%;
      padding: 0.25rem 0;
      border-top: 1px solid #1abc9c;
      border-bottom: 1px solid #1abc9c;
      font-size: 16px;
      padding-left: 0.7rem;
      background: transparent;
    }
    img {
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      height: 90%;
    }
    p {
      position: absolute;
      top: 0;
      right: 0;
      color: #ec5051;
    }
  }
  .submit {
    width: 70%;
    background: #1abc9c;
    padding: 0.2rem 0.3rem;
    border-radius: 10px;
    text-align: center;
    font-size: 18px;
    color: #fff;
    margin: 0.5rem auto;
  }
}
</style>
