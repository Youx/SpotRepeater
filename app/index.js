import Vue from 'vue';
import $ from 'jquery';
import 'bootstrap';
import 'bootstrap-slider';

import SpotRepeater from './SpotRepeater.vue'

$(() => {
    var v = new Vue({
        el: '#app',
        template: '<spot-repeater></spot-repeater>',
        components: {
            'spot-repeater': SpotRepeater
        }
    });
});