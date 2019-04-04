<template>
    <div>
        <div class="alert alert-danger" v-if="error">error</div>
        <player v-if="ready" :access-token="accessToken"></player>
        <login v-else></login>
    </div>
</template>

<script>
import Player from './player/Player.vue'
import Login from './Login.vue'

export default {
    name: 'spot-repeater',
    data: () => {
        return {
            accessToken: null,
            refreshToken: null,
            error: null
        };
    },
    computed: {
        ready: function() {
            return this.error === null
                && this.accessToken !== null;
        }
    },
    methods: {
        getHashParams: function() {
            var hashParams = {};
            var e;
            var r = /([^&;=]+)=?([^&;]*)/g;
            var q = window.location.hash.substring(1);
            
            while (e = r.exec(q)) {
                switch(e[1]) {
                    case 'access_token':
                        this.accessToken = e[2];
                        break;
                    case 'refresh_token':
                        this.refreshToken = e[2];
                        break;
                    case 'error':
                        this.error = e[2];
                        break;
                }
            }
        }
    },
    mounted: function() {
        this.getHashParams();
    },
    components: {
        'login': Login,
        'player': Player
    }
}
</script>