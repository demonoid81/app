<template>

        <v-app class="app-main">
            <v-container fluid pa-0>
                <router-view></router-view>
            </v-container>
        </v-app>

</template>

<script>
export default {
    name: 'app'
}
</script>

<style>
    html,body{
        width: 100%;
        height: 100%;
        margin: 0;
        background: #f0f0f0;
        overflow: hidden;
    }
    .app-main{
        width: 100%;
        height: 100%;
    }
</style>
