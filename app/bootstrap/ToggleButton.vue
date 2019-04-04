<template>
    <button type="button" class="btn btn-secondary" @click="$emit('click')">
        <icn v-if="state" :icon="icon2"></icn>
        <icn v-else :icon="icon1"></icn>
    </button>
</template>

<script>
import Icon from './Icon.vue'

export default {
    name: 'toggle-button',
    props: ['icon1', 'icon2', 'state'],
    template: ``,
    components: {
        icn: Icon
    }
}
</script>