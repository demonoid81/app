// управление состояние пользователя
const mutations = require('./mutations')

const user = {
    state: {
        token : '', // ключ сеанса
    },
    mutations : mutations,
}

export default user
