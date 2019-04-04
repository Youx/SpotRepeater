<template>
    <div class="progress" style="width: 50%">
        <div class="progress-bar"
            role="progressbar"
            :style="style">
            <span>{{ label }}</span>
        </div>
    </div>
</template>
<script>
export default {
    name: 'progress-bar',
    props: ['progress', 'length', 'label', 'start', 'end'],
    computed: {
        style: function() {
            var length = this.length;
            var progress = this.progress;

            if (progress === 0 || length === 0) {
                return 'width: 0%'
            }
            return 'width: ' + Math.floor(progress * 100 / length) + '%';
        }
    }
}
</script>