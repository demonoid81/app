<template>
<div class="login" @keydown.enter="handleSubmit">
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
