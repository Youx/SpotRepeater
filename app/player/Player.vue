<template>
    <div>
        <div style="width: 50%">
            <img style="margin-left: 35%; width: 30%" :src="cover"/>
        </div>
        <div style="text-align: center; width: 50%">{{title}}</div>
        <progress-bar   :length="length"
                        :progress="progress"
                        :label="progressLabel + '/' + lengthLabel"/>
        <div>
            <repeater-slider    :length="length"
                                :start="repeater.start"
                                :end="repeater.end"
                                @update-values="updateValues"/>
        </div>
        <div class="btn-group" role="group" aria-label="Button group">
            <toggle-button :icon1="'play'"
                    :icon2="'pause'"
                    :state="playing"
                    @click="playPause"/>
        </div>
        <presets    :songId="songId"
                    :start="repeater.start"
                    :end="repeater.end"
                    @set-values="updateValues"></presets>
    </div>
</template>

<script>
import $ from 'jquery'
import ToggleButton from '../bootstrap/ToggleButton.vue'
import ProgressBar from '../bootstrap/ProgressBar.vue'
import RepeaterSlider from './RepeaterSlider.vue'
import Presets from './Presets.vue'

export default {
    name: 'player',
    props: ['accessToken'],
    data: function() {
        return {
            progress: 0,       /* current progress (in ms) */
            length: 1,         /* length (in ms) */
            title: '',         /* title of track */
            cover: '',         /* url of album image */
            playing: false,
            songId: 0,
            repeater: {
                start: 0,      /* where to go back (in ms) */
                end: undefined /* when to loop (in ms) */
            }
        }
    },
    computed: {
        loopStartLabel: function() {
            return this.printTime(this.repeater.start);
        },
        loopEndLabel: function() {
            return this.printTime(this.repeater.end);
        },
        progressLabel: function() {
            return this.printTime(this.progress);
        },
        lengthLabel: function() {
            return this.printTime(this.length);
        }
    },
    methods: {
        updateValues: function(val) {
            this.repeater.start = val[0];
            this.repeater.end = val[1];
        },
        printTime: function(t_ms) {
            if (t_ms === undefined) {
                return '-';
            }
            return (
                Math.floor(t_ms / 60000).toString().padStart(2, 0) +
                ':' +
                Math.floor(t_ms / 1000 % 60).toString().padStart(2, 0)
            );
        },
        playPause: function() {
            $.ajax({
                url: 'https://api.spotify.com/v1/me/player/' + 
                (this.playing ? 'pause' : 'play'),
                headers: {
                    'Authorization': 'Bearer ' + this.accessToken
                },
                method: 'PUT'
            }).done((data) => {
                this.getInfo();
            });
        },
        getInfo: function() {
            $.ajax({
                url: 'https://api.spotify.com/v1/me/player',
                headers: {
                    'Authorization': 'Bearer ' + this.accessToken
                }
            }).done((data) => {
                this.progress = data.progress_ms;
                this.length   = data.item.duration_ms;
                this.title    = data.item.name;
                this.songId   = data.item.id;
                this.playing  = data.is_playing;

                if (data.item.album.images[0]) {
                    this.cover = data.item.album.images[0].url;
                }

                /* end is beyond length or undefined, reset to length */
                if (this.repeater.end === undefined
                ||  this.repeater.end > this.length) {
                    this.repeater.end = this.length;
                }
                /* start is beyond length (track change?), reset to beginning */
                if (this.repeater.start > this.length) {
                    this.repeater.start = 1;
                }
                /* loop song */
                if (this.repeater.end !== undefined 
                &&  this.progress > this.repeater.end
                ||  this.progress < this.repeater.start)
                {
                    this.resetPosition();
                }
            });
        },
        resetPosition: function() {
            $.ajax({
                url: 'https://api.spotify.com/v1/me/player/seek?position_ms='+this.repeater.start,
                headers: {
                    'Authorization': 'Bearer ' + this.accessToken
                },
                method: 'PUT'
            })
        }
    },
    created: function() {
        this.getInfo();
        setInterval(() => { this.getInfo(); }, 1000);
    },
    components: {
        'toggle-button': ToggleButton,
        'progress-bar': ProgressBar,
        'repeater-slider': RepeaterSlider,
        'presets': Presets
    }
}
</script>