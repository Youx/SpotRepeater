<template>
    <div>
        <btn    v-if="presets.length === 0"
                :kind="'success'"
                :icon="'plus'"
                @click="addEntry(-1)">
        </btn>
        <preset-row v-for="(preset, index) in presets"
                    :name="preset.name"
                    :start="millisToTime(preset.start)"
                    :end="millisToTime(preset.end)"
                    :index="index"
                    :key="index"
                    @add-entry="addEntry"
                    @trash-entry="trashEntry"
                    @load-entry="loadEntry"
                    @set-entry="setEntry"
                    @update-name="updateName"
                    @update-start="updateStart"
                    @update-end="updateEnd">
        </preset-row>
    </div>
</template>

<script>
import PresetRow from './PresetRow.vue'
import Button    from '../bootstrap/Button.vue'
import moment    from 'moment'
import momentDurationFormatSetup from 'moment-duration-format'

momentDurationFormatSetup(moment);

export default {
    name: 'presets',
    props: ['songId', 'start', 'end'],
    data: function() {
        return { presets: this.getPresets() };
    },
    methods: {
        timeToMillis: function(val) {
            var duration = moment.duration('00:' + val);

            if (duration.isValid) {
                return duration.as('milliseconds');
            }
            return NaN;
        },
        millisToTime: function(val) {
            return moment.duration(val).format('mm:ss.SSS', { trim: false });
        },
        getPresets: function() {
            var item = localStorage.getItem(this.songId);

            if (item) {
                return JSON.parse(item);
            } else {
                return [];
            }
        },
        storePresets: function() {
            return localStorage.setItem(
                this.songId,
                JSON.stringify(this.presets)
            );
        },
        updateName: function(index, value) {
            this.presets[index].name = value;
            this.storePresets();
        },
        updateStart: function(index, value) {
            var parsed = this.timeToMillis(value);

            if (!isNaN(parsed)) {
                this.presets[index].start = parsed;
                this.storePresets();
            }
        },
        updateEnd: function(index, value) {
            var parsed = this.timeToMillis(value);

            if (!isNaN(parsed)) {
                this.presets[index].end = parsed;
                this.storePresets();
            }
        },
        addEntry: function(idx) {
            this.presets.splice(idx + 1, 0, {
                name: 'test',
                start: this.start,
                end: this.end
            });
            this.storePresets();
        },
        trashEntry: function(idx) {
            this.presets.splice(idx, 1);
            this.storePresets();
        },
        loadEntry: function(idx) {
            this.$emit(
                'set-values',
                [this.presets[idx].start, this.presets[idx].end]
            )
        },
        setEntry: function(idx) {
            this.presets[idx].start = this.start;
            this.presets[idx].end = this.end;
        }
    },
    watch: {
        songId: function (val) {
            this.presets = this.getPresets();
        }
    },
    components: {
        'preset-row': PresetRow,
        'btn': Button
    }
}
</script>