<template>
    <button type="button"
            :class="'btn btn-'+kind"
            @click="$emit('click')">
        <icn v-if="icon" :icon="icon"></icn>
        {{ label }}
    </button>
</template>

<script>
import Icon from './Icon.vue';

export default {
    name: 'btn',
    props: ['icon', 'label', 'kind'],
    components: {
        'icn': Icon
    }
}
</script>
