<template>
    <section class="home">
        <vfooter></vfooter>
        <div class="loading" v-if="loading">
            <img src="./common/loading.svg" alt="">
        </div>
        <div id="search">
            <router-link to="/home/search">
                <div class="search_input">
                    <i class="iconfont icon-sousuo1"></i>搜索
                </div>
            </router-link>
        </div>
        <section class="video_list">
            <div class="video_list_header">
                <h3>全部<span>({{allLength}})</span></h3>
                <router-link to="/all">更多 <i class="iconfont icon-jiantouyou"></i></router-link>
            </div>
            <ul>
                <li v-for="(list,index) in lists[3]" v-if="index < 10">
                    <router-link :to="'/video/'+list.id">
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
        <section class="video_list">
            <div class="video_list_header">
                <h3>电影<span>({{movieLength}})</span></h3>
                <router-link to="/movie">更多 <i class="iconfont icon-jiantouyou"></i></router-link>
            </div>
            <ul>
                <li v-for="list in lists[0]">
                    <router-link :to="'/video/'+list.id">
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
        <section class="video_list">
            <div class="video_list_header">
                <h3>电视剧<span>({{tvLength}})</span></h3>
                <router-link to="/tv">更多 <i class="iconfont icon-jiantouyou"></i></router-link>
            </div>
            <ul>
                <li v-for="list in lists[1]">
                    <router-link :to="'/video/'+list.id">
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
        <section class="video_list">
            <div class="video_list_header">
                <h3>综艺<span>({{zyLength}})</span></h3>
                <router-link to="/zy">更多 <i class="iconfont icon-jiantouyou"></i></router-link>
            </div>
            <ul>
                <li v-for="list in lists[2]">
                    <router-link :to="'/video/'+list.id">
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
        <transition name="router-in">
            <router-view></router-view>
        </transition>
    </section>
</template>

<script>
import vfooter from './common/vfooter.vue'
import { initHome } from '../data/fetchData'
import { mapActions } from 'vuex'
export default {
    name: 'detail',
    components:{
        vfooter,
    },
    data () {
        return {
            lists: '',
            loading: true
        }
    },
    computed:{
        allLength(){
            return this.getJsonLength(this.lists[3])
        },
        movieLength(){
            return this.getJsonLength(this.lists[0])
        },
        tvLength(){
            return this.getJsonLength(this.lists[1])
        },
        zyLength(){
            return this.getJsonLength(this.lists[2])
        }
    },
    created () {
       this.initData()
    },
    watch: {
        // 如果路由有变化，会再次执行该方法
        '$route': 'initData'
    },
    methods:{
        initData () {
            this.loading = true
            initHome().then(data =>  {
                this.loading = false;
                this.lists = data 
                this.initVideoData(data)
            }).catch(e => console.log("error", e))   
        },
        ...mapActions([
            'initVideoData'
        ]),
        getJsonLength(jsonData){
            var jsonLength = 0;  
            for(var item in jsonData){  
                jsonLength++;  
            }  
            return jsonLength;  
        }  
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import 'src/style/home';  
</style>
