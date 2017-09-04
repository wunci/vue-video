import Vue from 'vue'
import Router from 'vue-router'
const Home = r => require.ensure([], () => r(require('../components/Home')), 'Home')
const More = r => require.ensure([], () => r(require('../components/More')), 'More')
const Me = r => require.ensure([], () => r(require('../components/Me')), 'Me')
const Login = r => require.ensure([], () => r(require('../components/Login')), 'Login')
const Search = r => require.ensure([], () => r(require('../components/Search')), 'Search')
const Detail = r => require.ensure([], () => r(require('../components/Detail')), 'Detail')
Vue.use(Router)

export default new Router({
	// mode:'history',
    routes: [
        {
      	    path:'*',
      	    redirect:'/'
        },
        {
            path: '/',
            name: 'Home',
            component: Home,
            children:[
                {
                    path: '/home/search',
                    component: Search
                }
            ],
            meta:{
          		keepAlive: true // 需要被缓存
        	}
        },
        {
            path: '/video/:id',
            name: 'video',
            component: Detail
        },
        {
            path: '/all',
            name: 'all',
            component: More,
        },
        {
            path: '/movie',
            name: 'movie',
            component: More
        },
        {
            path: '/tv',
            name: 'tv',
            component: More
        },
        {
            path: '/zy',
            name: 'zy',
            component: More,

        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/me',
            name: 'me',
            component: Me,
        }
    ]
})
