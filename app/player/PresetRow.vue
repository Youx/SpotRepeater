<template>
    <div class="form-inline">
        <div class="input-group input-group-sm mb-2 mr-1">
            <div class="input-group-prepend">
                <span class="input-group-text">Name</span>
            </div>
            <input type="text" class="form-control" data-type='name'
                :data-id='index'
                :value='name'
                @input="$emit('update-name', index, $event.target.value)"/>
        </div>

        <div class="input-group input-group-sm mb-2 mr-1 col-sm-3">
            <div class="input-group-prepend">
                <span class="input-group-text">[</span>
            </div>
            <input  type="text"
                    class="form-control"
                    data-type='start'
                    :data-id='index'
                    :value="start"
                    @input="$emit('update-start', index, $event.target.value)"/>
            <input  type="text"
                    class="form-control"
                    data-type='end'
                    :data-id='index'
                    :value='end'
                    @input="$emit('update-end', index, $event.target.value)"/>
            <div class="input-group-append">
                <span class="input-group-text">]</span>
            </div>
        </div>

        <div class="btn-group btn-group-sm mb-2" role="group" aria-label="Basic example">
            <btn    :kind="'secondary'"
                    :icon="'sign-in-alt fa-rotate-180'"
                    @click="$emit('set-entry', index)">
            </btn>
            <btn    :kind="'secondary'"
                    :icon="'play'"
                    @click="$emit('load-entry', index)">
            </btn>
            <btn    :kind="'success'"
                    :icon="'plus'"
                    @click="$emit('add-entry', index)">
            </btn>
            <btn    :kind="'danger'"
                    :icon="'trash'"
                    @click="$emit('trash-entry', index)">
            </btn>
        </div>
    </div>
</template>

<script>
import Icon from '../bootstrap/Icon.vue'
import Button from '../bootstrap/Button.vue'
import moment from 'moment'


export default {
    name: 'preset-row',
    props: ['index', 'name', 'start', 'end'],
    components: {
        icn: Icon,
        btn: Button
    }
}
</script>