// управление состояние пользователя
import mutations from './mutations'

const user = {
    state: {
        sessionToken: '', // ключ запроса
        tokenTime: '', // время получения токена
        userToken: '' // токен пользователя
    },
    mutations: mutations
}

export default user
