<template>
    <div id="video">
        <transition name="router-fd">
            <keep-alive include="home">
                <router-view></router-view>
            </keep-alive>
        </transition>
    </div>
</template>

<script>
export default {
    name: 'app'
}
</script>

<style lang="scss" >
@import './src/style/reset.scss';
</style>
