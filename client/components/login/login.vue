<template>
<div>login</div>
</template>

<script>
import { request } from '@/components/login/graphql'
export default {
    name: 'login',
    data () {
        return {
            sessionToken: ''
        }
    },
    apollo: {
        getSessionToken () {
            return {
                query: request.getToken
            }
        }
    },
    mounted () {
        this.$store.commit('putSessionToken', {
            sessionToken: this.$apollo.queries.getSessionToken(),
            tokenTime: new Date().getTime()
        })
    }
}
</script>

<style scoped>

</style>
