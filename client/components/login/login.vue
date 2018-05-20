<template>
<div class="login" @keydown.enter="handleSubmit">
    <div class="login-con">
        <v-card style="background: white">
            <v-container fluid elevation-20>
                <v-layout row wrap>
                    <v-flex lg12 >
                        <v-text-field
                                v-model="username"
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
import utils from '@/components/login'
export default {
    name: 'login',
    data () {
        return {
            sessionToken: '',
            username: '',
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
            this.$apollo
                .mutate({
                    mutation: requests.LOGIN_USER,
                    variables: {
                        login: this.login,
                        password: this.password
                    }
                })
                .then(response => {
                    // сохраним пользовательский токен в sessionStorage
                    sessionStorage.setItem('userToken', response.data.login)

                    // перейдем на главную старницу
                    this.$router.push({
                        name: 'main'
                    })
                })
                .catch((error) => {
                    // Error
                    console.error(error)
                })
        }
    },
    mounted () {
        // запрос на токен для аутентификации
        this.$apollo
            .query({
                query: requests.GET_TOKEN
            })
            .then(response => {
                // todo работа с токеном
                console.log('token: ' + response.data.loginToken)
            })
    }
}
</script>

<style lang="less">
    @import './login.less';
</style>
