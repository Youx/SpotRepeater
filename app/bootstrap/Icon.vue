<template>
    <i :class="faicon"></i>
</template>
<script>
export default {
    name: 'icn',
    props: ['icon'],
    computed: {
        faicon: function() {
            return 'fas fa-' + this.icon;
        }
    }
}
</script>
