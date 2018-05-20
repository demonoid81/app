<template>
<div class="login" @keydown.enter="handleSubmit">
    <div class="login-con">
        <v-card style="background: white">
            <v-container fluid elevation-20>
                <v-layout row wrap>
                    <v-flex lg12 >
                        <v-text-field
                                v-model="login"
                                :rules="[rules.required]"
                                :label='$i18n.translate("login")'
                                class="login-tip"
                        ></v-text-field>
                    </v-flex>
                    <v-flex lg12 class="login-tip">
                        <v-text-field
                                v-model="password"
                                :rules="[rules.required]"
                                :label='$i18n.translate("password")'
                                :append-icon="noVisible ? 'visibility' : 'visibility_off'"
                                :append-icon-cb="() => (noVisible = !noVisible)"
                                :type="noVisible ? 'password' : 'text'"
                                class="login-tip"
                        >
                        </v-text-field>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-card>
    </div>
</div>
</template>

<script>
import requests from '@/components/login/graphql'

import fun from '@/components/login'
export default {
    name: 'login',
    data () {
        return {
            sessionToken: '',
            login: '',
            password: '',
            noVisible: true,
            custom: true,
            rules: {
                required: (value) => !!value || this.$i18n.translate('required') + '.'
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
        this.$apollo
            .query({
                query: requests.getToken
            })
            .then(response => {
                // save user token to localstorage
                console.log('token: ' + response.data.loginToken)
            })
    }
}
</script>

<style lang="less">
    @import './login.less';
</style>
