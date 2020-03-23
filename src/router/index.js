import Vue from "vue";
import Router from "vue-router";
import Search from "@/components/Search";
import Home from "@/components/Home";
import More from "@/components/More";
import Me from "@/components/Me";
import Login from "@/components/Login";
import Detail from "@/components/Detail";
// const Home = r => require.ensure([], () => r(require('../components/Home')), 'Home')
// const More = r => require.ensure([], () => r(require('../components/More')), 'More')
// const Me = r => require.ensure([], () => r(require('../components/Me')), 'Me')
// const Login = r => require.ensure([], () => r(require('../components/Login')), 'Login')
// const Search = r => require.ensure([], () => r(require('../components/Search')), 'Search')
// const Detail = r => require.ensure([], () => r(require('../components/Detail')), 'Detail')

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "*",
      redirect: "/",
      meta: {
        index: 0
      }
    },
    {
      path: "/",
      name: "home",
      component: Home,
      meta: {
        index: 1
      }
      // children:[
      //     {
      //         name:'search',
      //         path: '/home/search',
      //         component: Search
      //     }
      // ],
      // meta: {
      // 	keepAlive: true // 需要被缓存
      // }
    },
    {
      path: "/search",
      name: "search",
      component: Search,
      meta: {
        index: 2
      }
    },
    {
      path: "/video/:id",
      name: "video",
      component: Detail,
      meta: {
        index: 3
      }
    },
    {
      path: "/all",
      name: "all",
      component: More,
      meta: {
        index: 2
      }
    },
    {
      path: "/movie",
      name: "movie",
      component: More,
      meta: {
        index: 2
      }
    },
    {
      path: "/tv",
      name: "tv",
      component: More,
      meta: {
        index: 2
      }
    },
    {
      path: "/zy",
      name: "zy",
      component: More,
      meta: {
        index: 2
      }
    },
    {
      path: "/login",
      name: "login",
      component: Login,
      meta: {
        index: 4
      }
    },
    {
      path: "/me",
      name: "me",
      component: Me,
      meta: {
        index: 2
      }
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 };
  }
});
