// polyfill
import 'babel-polyfill';

import Vue from 'vue';
import App from './App';


Vue.config.devtools = true;

new Vue({
    el: 'body',
    components: { App }
});
