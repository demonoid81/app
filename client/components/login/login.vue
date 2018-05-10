<template>
<div class="login" @keydown.enter="handleSubmit">
    <div class="login-con">

        <v-card style="background: white">
            <v-container fluid elevation-20>
                <v-layout row wrap>
                    <v-flex lg12 >
                        <v-text-field
                                v-model="title"
                                :rules="[rules.required]"
                                label="Title"
                                counter
                                max="25"
                                class="login-tip"
                        ></v-text-field>
                    </v-flex>
                    <v-flex lg12 class="login-tip">
                        <v-text-field
                                v-model="email"
                                :rules="[rules.required, rules.email]"
                                label="E-mail"
                                class="login-tip"
                        ></v-text-field>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-card>
    </div>
</div>
</template>

<script>
import { request } from '@/components/login/graphql'
import fun from '@/components/login'
export default {
    name: 'login',
    data () {
        return {
            sessionToken: '',
            title: '',
            email: '',
            rules: {
                required: (value) => !!value || 'Required.',
                email: (value) => {
                    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                    return pattern.test(value) || 'Invalid e-mail.'
                }
            }
        }
    },
    apollo: {
        getSessionToken () {
            return {
                query: request.getToken
            }
        }
    },
    methods: {
        handleSubmit () {
            // todo login
            console.log('login')
        }
    },
    mounted () {
        // this.$store.commit('putSessionToken', {
        //     sessionToken: this.$apollo.queries.getSessionToken(),
        //     tokenTime: new Date().getTime()
        // })
    }
}
</script>

<style lang="less">
    @import './login.less';
</style>
