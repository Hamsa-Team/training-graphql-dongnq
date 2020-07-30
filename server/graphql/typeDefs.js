const { gql } = require('apollo-server');
const typeDefs = gql`
    type Employee {
        id: Int,
        employee_name: String,
        employee_age: Int,
        employee_salary: Int,
        profile_image: String
    }
    type User {
        username: String,
        password: String,
        email: String
    }
    input UserInput { 
        username: String,
        password: String,
        email: String
    }
    type Query {
        employees: [Employee]
    }
    type Mutation {
        register(user: UserInput): User
        login(user: UserInput): User
        crawlEmployees: [Employee]
  }
`;

module.exports = typeDefs