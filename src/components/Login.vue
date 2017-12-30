<template>
    <main>
        <vfooter></vfooter>
        <alert-dialog v-if="dialogShow" :icon="tipsImg" :aniDialog="aniDialog"  :dialogTxt="dialogTxt"></alert-dialog>
        <section class="main_wrap">
            <section class="user_title">
                <i class="iconfont icon-denglu"></i>
                <h3>注册/登录</h3>
            </section>
            <section class="user">
                <form  enctype='multipart/form-data'>
                    <div class="input">
                        <div class="input_wrap">
                            <i class="iconfont icon-name"></i>
                            <input type="text" v-model.trim="userName" @keyup.enter="signin" name="userName" placeholder="用户名">
                        </div>
                        <div class="input_wrap">
                            <i class="iconfont icon-mima1"></i>
                            <input type="password" v-model="password" @keyup.enter="signin" name="password" placeholder="密码">
                        </div>
                        <div class="input_wrap">
                            <i class="iconfont icon-yanzhengma1"></i>
                            <input type="text" v-model="yzm" @keyup.enter="signin" name="yzm" placeholder="验证码">
                            <img @click="changYzm" :src="url" alt="">
                            <!-- <p>点击更换</p> -->
                        </div>
                    </div>
                    <div class="submit" @click="signin">立即注册</div> 
               </form>
            </section>
        </section> 
    </main>
</template>

<script>
import vfooter from './common/vfooter.vue'
import alertDialog from './common/alertDialog.vue'
import {mapActions,mapState} from 'vuex'
import { signin , yzmChange, checkUser } from '../data/fetchData.js'
export default {
    name: 'login',
    components:{
        vfooter,
        alertDialog
    },
    data () {
        return {
            lists: '',
            loading: false,
            userName: '',
            password: '',
            yzm: '',
            dialogShow: false,
            dialogTxt: '',
            tips: true,
            aniDialog: '',
            yzmTest: '',
            url: ''
        }
    },
    computed:{
        ...mapState([
            'userInfo',
        ]),
        tipsImg(){
            return this.tips ? 'icon-chenggong' : 'icon-shibai' 
        }     
    },
    mounted () {
        checkUser(localStorage.getItem('user'),localStorage.getItem('token')).then(data => {
            //console.log(data)
            if (data == 'success') {
                this.$router.push({path:'/me'})
            }
        })
        this.url='http://vue.wclimb.site/images/yzm.jpg'
        this.changYzm()
    },
    methods:{
         // 弹窗
        dialogChange(tips,dialogTxt){
            this.aniDialog = 'aniDialog';
            this.dialogShow = true;
            this.tips = tips
            this.dialogTxt = dialogTxt
            setTimeout(()=>{
                this.dialogShow = false;
            },1500)
        },   
        // 登录 
        signin(){
            if (this.userName === '' || this.password === '') {
                this.dialogChange(false,"用户名/密码不能为空");
                return 
            }
            if (this.yzm != this.yzmTest) {
                this.dialogChange(false,'验证码错误');
                return 
            }
            signin(this.userName,this.password).then(data => {
                var data = JSON.parse(data)
                //console.log(data.msg)
                // 用户存在
                if (data.msg == 'allTrue') {
                    this.dialogChange(true,'登录成功')
                    this.$store.dispatch('createUser',{
                        userName:this.userName
                    })
                    localStorage.setItem('user',this.userName)
                    localStorage.setItem('avator',data.avator)
                    localStorage.setItem('token',data.token)
                    var  _that = this
                    setTimeout(function(){
                        _that.$router.push({path:'/me'})
                    },1000)
                }else if(data.msg == 'passwordFalse'){
                  //密码错误
                   this.dialogChange(false,'密码错误')
                }else if(data.msg == 'newUser'){
                  //新用户
                  //console.log(data)
                    this.dialogChange(true,'注册成功')
                    localStorage.setItem('user',this.userName)
                    localStorage.setItem('token',data.token)
                    var  _that = this
                    setTimeout(function(){
                        _that.$router.push({path:'/me'})
                    },1000)
                }
            })
        },
        // 验证码切换
        changYzm () {
            var d=new Date;
            this.url='http://vue.wclimb.site/images/yzm.jpg'+'?v='+ (new Date).getTime()
            yzmChange().then(data=>{
                this.yzmTest = data;
                console.log('验证码',this.yzmTest)
            })
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.main_wrap{
    position: absolute;
    top: 50%;
    width: 100%;
    transform: translateY(-55%)
}
.user_title{
    display:flex;
    flex-direction: column;
    align-items: center;
    i{
        color: #1ABC9C;
        font-size: 60px;
    }
    h3{
        font-size: 18px;
        color: #1ABC9C;
    }
}
.user{
    .input_wrap{
        position: relative;
        margin-top: 0.5rem;
        i{
            font-size: 30px;
            color: #1ABC9C;
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-50%)
        }
        input{
            border:none;
            width: 100%;
            padding:0.25rem 0;
            border-top:1px solid  #1ABC9C;
            border-bottom:1px solid  #1ABC9C;
            font-size: 16px;
            padding-left: 0.7rem;
            background: transparent; 
        }
        img{
            position: absolute;
            right: 0;
            top:50%;
            transform: translateY(-50%);
            height: 90%;
        }
        p{
            position: absolute;
            top: 0;
            right: 0;
            color: #ec5051;
        }
    }
    .submit{
        width: 70%;
        background: #1ABC9C;
        padding:0.2rem 0.3rem;
        border-radius:10px;
        text-align: center;
        font-size: 18px;
        color: #fff;
        margin:0.5rem auto;
    }
}
</style>
