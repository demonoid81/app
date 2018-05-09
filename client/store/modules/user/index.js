// управление состояние пользователя
import mutations from './mutations'

const user = {
    state: {
        token: '' // ключ сеанса
    },
    mutations: mutations
}

export default user
