<template>
    <section class="detail" @touchmove="scroll">
        <div class="loading" v-if="loading">
            <img src="./common/loading.svg" alt="">
        </div>
        <header>
            <div class="wrap">
                <template v-if="lists.img">
                    <img v-lazy="baseUrl+lists.img" alt="">
                </template>
               <!--  <template v-else>
                    <img src="" alt="加载失败">
                </template> -->
                <div class="video_name">
                    <h3>{{ lists.name }}</h3>
                    <div class="score_wrap">
                        <strong>{{ lists.star }}</strong>
                        <div class="score">
                            <div class="starList" :style="{'background-position-y':-15*(10-lists.star).toFixed(0)+'px'}"></div>
                            <p>{{ likeTotalLength }}人评分/{{comments.length}}条评论</p>
                        </div>
                    </div>
                </div>        
            </div>
        </header>
        <section class="video_txt">
            <div class="video_txt_wrap">
                <p>
                    <template v-if="lists.timelong > 90 ">
                      {{ lists.timelong }}分钟
                    </template>
                    <template v-else>
                     {{ lists.timelong }}季
                    </template>
                    {{ lists.type }}
                </p>
                <p>{{ lists.time1 }}( {{lists.country}} )上映 {{lists.country}}</p>
                <p>{{ lists.actors }}</p>
            </div>
        </section>
        <section class="like_list">
            <template v-if="userName == null">
                <div class="like likeDisable">喜欢</div>
                <div class="like likeDisable">不喜欢</div>
                <p>登录后才可选择哟！</p>
            </template>
            <template v-else-if="likes">
                <div :class="[ likes == 1 ? likeActive : likeDisable, likeCls ]">喜欢</div>
                <div :class="[ likes == 2 ? likeActive : likeDisable, likeCls ]">不喜欢</div>
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
        <section class="fixed_comment">
            <template v-if="comment_allow">
                <input type="text" v-model="comment" @click="resetScrollTop" @keyup.enter="report" name="comment" placeholder="评论">
                <button @click="report">评论</button>
            </template>
            <template v-else>
                <input type="text" v-model="comment" name="comment" placeholder="登陆后才可以评论哟！" readonly>
                <button class="disabled">评论</button>
            </template>
        </section>
        <section class="video_comments">
            <h3>评论({{comments.length}})</h3>
                <ul id="ul">
                    <li v-for="comment in comments">
                    <template v-if="comment.avator != '' ">
                        <div class="avator">
                            <img v-lazy="baseUrl+'/avator/'+ comment.avator +'.png' " alt="">
                        </div>
                    </template>
                    <template v-else>
                        <div class="avator">
                            {{comment.userName.charAt(0)}}
                        </div>
                    </template>
                    <div class="comments_detail">
                        <h4> {{comment.userName}}</h4>
                        <p> {{comment.date}}</p>
                        <div>{{comment.content}}</div>
                    </div>
                </li>
            </ul>
        </section>
        <alert-dialog v-if="dialogShow" :icon="tipsImg" :aniDialog="aniDialog"  :dialogTxt="dialogTxt"></alert-dialog>
    </section>
</template>

<script>
import vfooter from './common/vfooter.vue'
import alertDialog from './common/alertDialog.vue'
import {mapState,mapActions} from 'vuex'
import { singleVideoData , getVideoComment , getInitVideoLikeData , postVideoLikeData ,reportComment} from '../data/fetchData.js'
export default {
    name: 'detail',
    components:{
        vfooter,
        alertDialog
    },
    data () {
        return {
            lists: '',
            comments: '',
            likes: '',
            star:'',
            baseUrl:'http://vue.wclimb.site/images/',
            likeTotalLength:0,
            loading: false,
            comment: '',
            dialogShow: false,
            dialogTxt: '',
            tips: true,
            aniDialog: '',
            likeActive: 'like_active',
            likeCls: 'like',
            likeDisable: 'likeDisable',
            scrollTop:200
        }
    },
    computed:{
        ...mapState([
            'userInfo',
            'meCommentDatas'
        ]),
        comment_allow(){
          return localStorage.getItem('token') ? true : false
        },
        tipsImg(){
            return this.tips ? 'icon-chenggong' : 'icon-shibai' 
          },
        userName(){ 
          return localStorage.getItem('token');
        },
        avator(){ 
          return localStorage.getItem('avator');
        }
    },
    mounted(){
        this.initData();
        this.scroll()
    },
    watch: {
        // 如果路由有变化，会再次执行该方法
        '$route': 'initData', 
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
        ...mapActions([
            'initMeCommentData',
        ]),
        initData () {
            this.loading = true
            // 获取video数据
            var routerId = this.$route.params.id
            singleVideoData(routerId).then(data =>  {
                // console.log(data[0][0]['star'])
                this.lists = data[0][0];
                // 喜欢的数量
                var likeLength = data[1].length;
                // 该video总的评价数量
                var likeTotalLength = data[2].length;
                // console.log(likeLength,likeTotalLength)
                this.likeTotalLength = likeTotalLength
                if (likeTotalLength > 0 && likeLength >= 0) {
                    this.star = likeLength / likeTotalLength * 10
                    // console.log(this.star)
                }
            })
            .catch(e => console.log("error", e)) 

            // 获取评论
            getVideoComment(routerId).then( data =>  {
                this.comments = data
            })
            .catch(e => console.log("error", e))   

            // 获取like参数
            getInitVideoLikeData(routerId , this.userName).then(data =>  {
                setTimeout(()=>{
                    this.loading = false;
                },500)
                var likes = JSON.parse(data)[0]['iLike']
                this.likes = likes
            })
            .catch(e => {
                this.likes = false
            })  
        },
        // 点击like操作
        like (likeData) {
            // 提交like信息
            postVideoLikeData(
                    this.$route.params.id,
                    likeData,
                    localStorage.getItem('token'),
                    this.lists.name,
                    this.lists.img,
                    this.lists.star
                ).then(data=>{
                if (likeData == 1) {
                    this.likes = 1
                    this.dialogChange(true,'标记为喜欢')
                }
                 if (likeData == 2) {
                    this.likes = 2 
                    this.dialogChange(true,'标记为不喜欢')  
                }
            })
        },
        // 监听滚动，动态更新scrollTop
        scroll(){
            window.onscroll=function(){
                this.scrollTop = document.body.scrollTop || document.documentElement.scrollTop
            }
            this.scrollTop = document.body.scrollTop || document.documentElement.scrollTop
        },
        // 评论后滚动到底部
        scrollToBottom () {       
            var video = document.querySelector("#video");
            var scrollHeight = video.scrollHeight;
            var timer = null;
            var speed = 30;
            // console.log(scrollHeight)
            timer = setInterval(function(){
                speed += 30;
                var scrollTop = document.body.scrollTop = document.documentElement.scrollTop = this.scrollTop + speed
                if (scrollTop >= scrollHeight - 687) {
                    clearInterval(timer)
                    document.body.scrollTop = document.documentElement.scrollTop = scrollHeight
                }
            })     
        },
        // 解决键盘抬起遮挡问题(现在是直接滚动到底部评论)
        resetScrollTop(){
            document.body.scrollTop = document.documentElement.scrollTop = document.body.scrollHeight + 600;
        },
        // 发表评论
        report () {
            var date = new Date().toLocaleDateString() + ' ' +  new Date().toLocaleTimeString();
            if (this.comment == '') {
                this.dialogChange(false,"请输入评论内容")
                this.comment = '';
                return
            }
            var avator = this.avator == null ? '' : this.avator
            reportComment(this.$route.params.id, this.userName,date,this.comment,this.lists.name,avator).then(data=>{
                if (data == 'success') {
                    this.comments.push({
                        "userName": localStorage.getItem('token'),
                        "date": date,
                        "content": this.comment,
                        "avator": avator
                    });
                    this.dialogChange(true,'评论成功');
                    this.comment = ''
                    this.$nextTick(() => {
                        this.scrollToBottom()
                    })
                }else{
                    this.dialogChange(false,"评论失败")
                    this.comment = ''
                }
            })
        },
       
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import 'src/style/detail'; 
</style>
