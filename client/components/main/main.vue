<template>
    <div id="app">
    <v-app id="inspire">
        <v-navigation-drawer :mini-variant.sync="mini" v-model="drawer" mini-variant-width = 40>
            <v-toolbar flat class="transparent">
                <v-list class="pa-0">
                    <v-list-tile avatar>
                        <v-list-tile-action>
                            <v-btn icon @click.native.stop="mini = !mini">
                                <v-icon>chevron_left</v-icon>
                            </v-btn>
                        </v-list-tile-action>
                    </v-list-tile>
                </v-list>
            </v-toolbar>
            <v-list class="pt-0" dense>
                <v-divider></v-divider>
                <v-list-tile v-for="item in items" :key="item.title" @click="handle">
                    <v-list-tile-action>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-navigation-drawer>
    <v-toolbar color="indigo" dark fixed app>
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <v-toolbar-title>Application</v-toolbar-title>
    </v-toolbar>
    <v-content>
        <v-container fluid fill-height>
            <v-layout
                    justify-center
                    align-center
            >
                <v-flex text-xs-center>
                    <v-tooltip left>
                        <v-btn icon large :href="source" target="_blank" slot="activator">
                            <v-icon large>code</v-icon>
                        </v-btn>
                        <span>Source</span>
                    </v-tooltip>
                </v-flex>
            </v-layout>
        </v-container>
    </v-content>
        <v-navigation-drawer
                fixed
                v-model="drawer"
                app
                :mini-variant.sync="mini"
                mini-variant-width = 48
                width = 200
                right
        >
            <v-list dense>
                <v-list-tile avatar @click="handle">
                    <v-list-tile-action>
                        <v-icon >home</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>Home</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
                <v-list-tile avatar @click="handle">
                    <v-list-tile-action>
                        <v-icon>contact_mail</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>Contact</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-navigation-drawer>

    <v-footer color="indigo" app inset>
        <span class="white--text">&copy; 2017</span>
    </v-footer>
    </v-app>
    </div>
</template>

<script>
export default {
    name: 'home',
    data () {
        return {
            mini: true,
            drawer: null,
            items: [
                { title: 'Home', icon: 'dashboard' },
                { title: 'About', icon: 'question_answer' }
            ]
        }
    },
    methods: {
        handle () {

        }
    }
}
</script>

<style scoped>

</style>
