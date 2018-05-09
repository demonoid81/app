const mutations = {
    putSessionToken (state, args) {
        // Сохраняем ключь запроса
        state.sessionToken.push(args.sessionToken)
        // сохраняем дату получения ключа
        state.tokenTime.push(args.tokenTime)
    }

}

export default mutations
