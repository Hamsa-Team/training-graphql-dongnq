const { getEmployees, signup, login, crawlEmployees } = require('../function/functionResolvers');

module.exports = {
    Query: {
        employees: async () => getEmployees()
    },
    Mutation: {
        register: async (_, { user }) => signup({ user }),
        login: async (_, { user }) => login({ user }),
        crawlEmployees: async () => crawlEmployees()
    }
}