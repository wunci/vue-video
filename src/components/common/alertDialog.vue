<template>
    <section class="dialog">
        <div class="dialog_wrap" :class="aniDialog">
            <i class="iconfont" :class="icon"></i>
            <p>{{ dialogTxt }}</p>
        </div>
    </section>
</template>

<script>

export default {
    name: 'dialog',
    components:{

    },
    data () {
        return {
      
        }
    },
    props:['dialogTxt','icon','aniDialog'],
    computed:{

    },
    mounted(){
     
    },
    methods:{
     
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@keyframes tipMove{
   0%   { transform: scale(1) }
   35%  { transform: scale(.8) }
   70%  { transform: scale(1.1) }
   100% { transform: scale(1) }
}
.dialog{
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 999999;  
    text-align: center;    
    .dialog_wrap{
        padding:0.2rem 0.25rem;
        background: rgba(0,0,0,0.5);
        border-radius:5px;
        i{
            font-size: 50px;
            position: relative;
            border-radius:50%;
        }
        p{
            font-size: 18px;
            margin-top: 0.1rem;
            color: #fff;
        }
        b{
            display: block;
            width: 0.8rem;
            height: 0.8rem;
            background: #fff;
            position: absolute;
            top: 0;
            z-index: -1;
        }
    }
}
.aniDialog{
    animation: tipMove .4s ;
}
</style>
