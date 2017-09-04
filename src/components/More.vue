<template>
    <section class="video">
        <vfooter></vfooter>
        <div class="loading" v-if="loading">
            <img src="./common/loading.svg" alt="">
        </div> 
        <section class="video_list">
            <h1>{{ videoCls }}</h1>
            <ul>
                <li v-for="list in lists">
                    <router-link :to="'video/' + list.id">
                        <div><img :src="'http://vue.wclimb.site/images/'+list.img" alt=""></div>
                        <h3>{{list.name}}</h3>
                        <div>
                            <div class="starList" :style="{'background-position-y':-15*(10-list.star)+'px'}"></div>
                            <span>{{list.star}}</span>
                        </div> 
                    </router-link>
                </li>
            </ul>
        </section>
    </section>
</template>

<script>
import vfooter from './common/vfooter.vue'
import { mapState } from 'vuex'
export default {
    name: 'detail',
    components:{
        vfooter,
    },
    data () {
        return {
            lists: '',
            icon: 'iconfont',
            iconStyle: 'icon-wjx',
            iconStyleCopy: 'icon-wjx-copy',
            loading: false,
            videoCls:''
        }
    },
    computed:{
        ...mapState([
            'videoData'
        ])
    },
    created () {
        this.initData()
    },
    methods:{
        initData(){
            // console.log(this.videoData)
            if (this.$route.path === '/all') {
                this.lists = this.videoData[3]
                this.videoCls = '全部'
            }else if (this.$route.path === '/movie') {
                this.lists = this.videoData[0]
                this.videoCls = '电影'
            }else if (this.$route.path ==='/tv') {
                this.lists = this.videoData[1]
                this.videoCls = '电视剧'
            }else if (this.$route.path === '/zy') {
                this.lists = this.videoData[2]
                this.videoCls = '综艺'
            }   
        }
    }
}
</script>

<style lang="scss" scoped>
.video {
    a{
      color: #444;
    }
    padding:0 0.15rem;
    padding-bottom: 1.2rem;
    margin-bottom: 1rem;
    font-size: 12px;
    .icon-wjx {
        color: rgb(255, 172, 45);
    }
    .icon-wjx-copy{
        color: #ccc;
    }
    .video_list {
        text-align: center;
            h1 {
                font-weight: bold;
                color: #666;
                font-size:25px;
                margin-top: 0.5rem;
                color: #0fce0f;
                padding-bottom: 0.15rem;
                border-bottom:1px solid #f1eaea;
            }
            ul {
                display: flex;
                width: 100%;
                flex-wrap:wrap;
                justify-content: space-between;
                
                li {
                    margin-top: 0.5rem;
                    width: 2.3rem;
                    h3 {
                        font-size: 16px;
                        margin: 0.1rem 0;
                        text-align:left;
                        height: 0.5rem;
                        line-height: 0.5rem;
                    }
                    img {
                        width: 100%;
                        height: 3.4rem;
                    }
                    .color {
                        color: yellow;
                    }
                    div{
                      color: #333;
                      display: flex;
                      span{
                        margin-left: 0.1rem;
                    }
                }
            }
        }
    }
    .icon-my1{
      color: #4ebf60
    }
}
</style>
