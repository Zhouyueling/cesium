// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import '../src/assets/css/global.css'


import axios from 'axios'
Vue.prototype.$axios = axios //全局注册，使用方法为:this.$axios

//导入elemntui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

//导入vuecesium
import VueCesium from 'vue-cesium'
import 'vue-cesium/lib/vc-navigation.css'
import 'vue-cesium/lib/vc-map-overview.css'
import { VcOverviewMap } from 'vue-cesium'
Vue.use(VcOverviewMap)

Vue.use(VueCesium, {
    cesiumPath: '../static/Build/Cesium/Cesium.js',
    accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIwMzQ4MmU3NC1mOWVjLTRkYjctYTVhMS1mNjgzYTEzYjY2MmQiLCJpZCI6MjM5MzksInNjb3BlcyI6WyJhc2wiLCJhc3IiLCJhc3ciLCJnYyJdLCJpYXQiOjE1ODQyODgxMjV9.SnfERBhTwXh3mNojnCU8elhzeAK5jwzISg3Hs1sJERM'
})

import echarts from 'echarts'

Vue.prototype.$echarts = echarts

import store from './store/index.js'


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})