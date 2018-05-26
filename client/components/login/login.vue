<template>
<div class="login" @keydown.enter="handleSubmit">
    <div class="login-con">
        <v-card style="background: white">
                <v-form ref="form" v-model="valid" lazy-validation>
                    <v-flex xs10 offset-xs1 >
                        <v-text-field
                        v-model="username"
                        :rules="[rules.required]"
                        :label='$i18n.translate("login")'
                        class="login-tip"
                        ></v-text-field>
                    </v-flex>
                    <v-flex xs10 offset-xs1 >
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
                    <v-flex text-xs-center>
                        <v-btn :disabled="!valid" @click="handleSubmit">
                        submit
                        </v-btn>
                    </v-flex>
                    <v-flex xs12 text-xs-center flexbox>
                        <span class="caption">Введите имя пользователя и пароль</span>
                    </v-flex>
                </v-form>
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
            valid: false,
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
                        username: this.username,
                        password: this.password
                    }
                })
                .then(response => {
                    // сохраним пользовательский токен в sessionStorage
                    sessionStorage.setItem('userToken', response.data.userToken)

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
