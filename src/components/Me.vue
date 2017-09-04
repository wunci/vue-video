<template>
    <section class="me">
        <vfooter></vfooter>
        <div class="loading" v-if="loading">
            <img src="./common/loading.svg" alt="">
        </div>
        <section class="me_deatil" @click="showDefaultName">
            <section class="avator">
            <template v-if=" nowUploadAvator !='' ">
                <input @click="upload" id="upload" type="file">
                <div class="avator_border">
                    <img :src="'http://vue.wclimb.site/images/avator/'+ nowUploadAvator +'.png' " alt="">
                </div>
            </template>
            <template v-else-if="avator == ''">
                <input @click="upload" id="upload" type="file">
                <div class="avator_border">上传头像</div>
            </template>
            <template v-else>
                <input @click="upload" id="upload" type="file">
                <div class="avator_border">
                    <img :src="'http://vue.wclimb.site/images/avator/'+ avator +'.png' " alt="">
                </div>
            </template>
            <div class="name" @click.stop="editUserName">
                <template v-if="defaultName">
                    {{ userName }} <i class="iconfont icon-bianji"></i>
                </template>
                <template v-else>
                    <input type="text" v-focus v-model="userNameModel" @keyup.enter="submitEditName" :value="userName">
                    <i class="iconfont icon-submit"  @click.stop="submitEditName" ></i>
                </template>
            </div>
            <div @click="logout" class="logout">
               <i class="iconfont icon-logout23"></i>
               退出
            </div>
        </section>
        <section class="like_list list">
            <h3>
                <i class="iconfont icon-msnui-love"></i>
                喜欢<span>({{ likeLengthOne }})</span>
            </h3>
            <ul>
                <li v-for="likeList in likeLists[0]">
                    <router-link :to="'/video/'+likeList.uid">
                        <img :src="'http://vue.wclimb.site/images/'+likeList.videoImg" alt="">
                        <h4>{{likeList.videoName}}</h4>
                        <div>
                            <div class="starList" :style="{'background-position-y':-15*(10-likeList.star)+'px'}"></div>
                            <span>{{likeList.star}}</span>
                       </div>
                    </router-link>
                </li>
            </ul>
        </section>
        <section class="dislike_list list">
            <h3>
                <i class="iconfont icon-buxihuan"></i>
                不喜欢<span>({{likeLengthTwo}})</span>
            </h3>
            <ul>
                <li v-for="likeList in likeLists[1]">
                    <router-link :to="'/video/'+likeList.uid">
                        <img :src="'http://vue.wclimb.site/images/'+likeList.videoImg" alt="">
                        <h4>{{likeList.videoName}}</h4>
                        <div>
                            <!-- <i :class="[icon, likeList.star/2 >= index+1 ? iconStyle : iconStyleCopy]" v-for="(i,index) in 5"></i> -->
                            <div class="starList" :style="{'background-position-y':-15*(10-likeList.star)+'px'}"></div>
                            <span>{{likeList.star}}</span>
                        </div>
                    </router-link>  
                </li>
            </ul>     
        </section>
        <section class="comment list">
            <h3>
                <i class="iconfont icon-pinglun1"></i>
                评论<span>({{comments.length}})</span>
            </h3>
            <ul>
                <li v-for="comment in comments">
                    <section 
                     @touchstart.stop.prevent="touchStart($event)" 
                     @touchmove.stop.prevent="touchMove($event)" 
                     @touchend.stop.prevent="touchEnd($event)" 
                     class="commentWrap">
                        <h5>影片：{{comment.videoName}}</h5>
                        <section>
                            <span>评论：</span>
                            <p>{{comment.content}}</p>
                        </section>
                    </section>
                    <div class="delete" @click="deleteComment(comment.id,$event)">删除</div>
                </li> 
            </ul>
        </section>
    </section>
    <alert-dialog v-if="dialogShow" :icon="tipsImg" :aniDialog="aniDialog"  :dialogTxt="dialogTxt"></alert-dialog>
  </section>  
</template>

<script>
import vfooter from './common/vfooter.vue'
import alertDialog from './common/alertDialog.vue'
import {mapState,mapActions} from 'vuex'
import { meComment , meLike , meDelete , uploadAvator , editNameData} from '../data/fetchData.js'
export default {
    name: 'detail',
    components:{
        vfooter,
        alertDialog
    },
    data () {
        return {
            likeLists:'',
            comments: '',
            loading: false,
            likeLengthOne:'',
            likeLengthTwo:'',
            start:'',
            scroll:'',
            dialogShow:false,
            dialogTxt:'',
            tips:true,
            aniDialog:'',
            Aversion:'',
            nowUploadAvator:'',
            defaultName:true,
            userNameModel:'',
            userName:''
        }
    },
    computed:{
        ...mapState([
            'meCommentDatas',
        ]),
        avator(){ 
            return localStorage.getItem('avator') ? localStorage.getItem('avator') : '';
        },
        tipsImg(){
            return this.tips ? 'icon-chenggong' : 'icon-shibai' 
        }
    },
    mounted () {
        this.userName =  localStorage.getItem('token');
        this.initData();
    },
    watch: {
        // 如果路由有变化，会再次执行该方法
        '$route': 'initData', 
    },
    directives: {
        focus: {
          inserted: function (el) {
            // 聚焦元素
            el.focus()
          }
        }
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
        // 初始化数据
        initData(){
            this.loading = true
            if (localStorage.getItem('token') === null) {
                this.$router.push({path:'/login'})
            }
            meComment(this.userName).then(data =>  {
                this.initMeCommentData(data)
                this.comments = data
            })
            .catch(e => console.log("error", e))
            // 获取喜欢不喜欢数据
            meLike(this.userName).then(data =>  {
                this.loading = false
                this.likeLists = data;
                this.likeLengthOne = data[0].length
                this.likeLengthTwo = data[1].length
                // console.log(data)
                // console.log(data[1].length)
           })
           .catch(e => console.log("error", e))
        },
        // 登出
        logout () {
            this.dialogChange(true,'登出成功');
            setTimeout(()=>{
              this.dialogShow = false;
              this.$router.push({path:'/'})
            },1500)
            localStorage.removeItem('token');
            localStorage.removeItem('avator');
        },
        // 删除自己的评论
        deleteComment(id,e){
            var el = e.currentTarget
            meDelete(id).then(data=>{
                console.log(data)
                if (data == 'success') {
                    this.dialogChange(true,'删除成功');
                    el.parentNode.style.height = 0;
                    el.parentNode.style.borderTop = 'none';
                }
            })
        },
        // 滑动删除评论
        touchStart(e){
            var commentWrap = document.querySelectorAll('.commentWrap')
            for (var i = 0; i < commentWrap.length; i++) {
              commentWrap[i].style.transform = 'translate('+ 0 +'rem)';
              commentWrap[i].style.webkitTransform = 'translate('+ 0 +'rem)';
            }
            var start = e.touches[0].pageX/100;
            this.start = start;
        },
        touchMove (e) {
            var scroll = e.touches[0].pageX/100 - this.start;
            this.scroll = scroll
            if (scroll < -1.5) {
                scroll = -1.5
            }else if (scroll > 0) {
                scroll = 0
            }
            console.log(scroll)
            var el= e.currentTarget
            el.style.transform = 'translate('+ scroll +'rem)';
            el.style.webkitTransform = 'translate('+ scroll +'rem)';
        },
        touchEnd (e) {
            var el= e.currentTarget
            if (this.scroll < 0 && this.scroll >= -1) {
                el.style.transform = 'translate('+ 0 +'rem)';
                el.style.webkitTransform = 'translate('+ 0 +'rem)';
            } 
            if (this.scroll < -1) {
                el.style.transform = 'translate('+ -1.5 +'rem)';
                el.style.webkitTransform = 'translate('+ -1.5 +'rem)';
            }
            this.scroll = 0 ;
        },
        // 上传头像
        upload(){
            var upload = document.querySelector('#upload')  
            var _that = this
            upload.addEventListener('change', function() {
          
                if (this.files.length != 0) {
                    var file = this.files[0],
                        reader = new FileReader();
                    if (!reader) {
                        this.value = '';
                        return;
                    };
                    reader.onload = function(e) {
                        this.value = '';
                        uploadAvator(_that.userName,e.target.result).then(data=>{
                        
                          _that.dialogChange(true,"上传成功");
                          // console.log(data)
                          window.localStorage.setItem('avator',data);
                          _that.nowUploadAvator = data;
                        }).catch(err=>{
                          
                          _that.dialogChange(false,"上传失败");
                        })
                    };
                    reader.readAsDataURL(file);
                };
            }, false);
        },
        // 修改用户名
        editUserName(){
            this.defaultName = false;
            this.userNameModel = this.userName
        },
        // 提交修改用户名操作
        submitEditName(){
            var modelData = this.userNameModel;
            if (modelData == this.userName) {
                this.dialogChange(false,"请修改名称！");
                this.defaultName = true;
                return
            }
            editNameData(this.userName,modelData).then(data=>{
                // console.log('edit',data)
                if (data == 'editSuccess') {
                   this.dialogChange(true,'修改成功');
                   localStorage.setItem('token',modelData)
                   this.userName = modelData
                   this.defaultName = true;
                }else if(data == 'repeatName'){
                  
                  this.dialogChange(false,"用户已存在");
                  this.defaultName = true;
                }else{
                  t
                  this.dialogChange(false,"修改失败");
                  this.defaultName = true;
                }
            })
        },
        // 显示原来的名字，即隐藏修改用户名输入框
        showDefaultName(){
            this.defaultName = true;
        }
    }
}

</script>

<style lang="scss" scoped>
@import 'src/style/me';  
</style>
