<template>
    <input  id="repeater-slider"
            type="text"
            class="span2"
            style="width: 50%" />
</template>
<script>
import $ from 'jquery';

export default {
    name: 'repeater-slider',
    props: ['start', 'end', 'length', 'label'],
    computed: {
        range: function() {
            var end = this.end || this.length;
            return [this.start, end];
        }
    },
    data: () => {
        return { slider: null };
    },
    mounted: function() {
        this.reInit();
    },
    methods: {
        printTime: function(t_ms) {
            return (
                Math.floor(t_ms / 60000).toString().padStart(2, 0) +
                ':' +
                Math.floor(t_ms / 1000 % 60).toString().padStart(2, 0)
            );
        },
        reInit: function() {
            if (this.slider) {
                $(this.$el).slider('destroy');
            }
            this.slider = $(this.$el)
                .slider({
                    'value': this.range,
                    'min': 0,
                    'max': this.length,
                    formatter: (val) => {
                        if (Array.isArray(val)) {
                            return this.printTime(val[0]) + ' - ' +
                                   this.printTime(val[1]);
                        }
                    }
                })
                .on('change', (val) => {
                    this.$emit('update-values', val.value.newValue);
                });
        }
    },
    watch: {
        length: function(val) {
            this.reInit();
        },
        start: function(val) {
            this.slider.slider('setValue', [this.start, this.end]);
        },
        end: function(val) {
            this.slider.slider('setValue', [this.start, this.end]);
        }
    },
    beforeDestroy: function() {
        $(this.$el).destroy()
    }
}
</script>