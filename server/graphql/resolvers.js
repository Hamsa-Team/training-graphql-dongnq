const { signup, login } = require('../function/resolvers/auth.resolver');
const { getEmployees, crawlEmployees } = require('../function/resolvers/employee.resolver');

module.exports = {
    Query: {
        employees: async (_, args, context) => getEmployees(context)
    },
    Mutation: {
        register: async (_, { user }, context) => signup({ user }, context),
        login: async (_, { user }, context) => login({ user }, context),
        crawlEmployees: async (_, args, context) => crawlEmployees(context)
    }
}