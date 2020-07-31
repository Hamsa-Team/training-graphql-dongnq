import React, { useState, useEffect, useCallback } from 'react';
import { gql } from '@apollo/client';
import { useQuery, useMutation } from '@apollo/react-hooks';

const GET_EMPLOYEES = gql`
    query {
        employees {
            employee_name
            employee_age
            employee_salary
            profile_image
        }
    }
`;

const CRAWL_EMPLOYEES = gql`
    mutation crawlEmployees {
        crawlEmployees {
            employee_name
            employee_age
            employee_salary
            profile_image

        }
    }
`;

const Employees = () => {
    const [employees, setEmployees] = useState([]);
    const [crawlEmployees, { data: crawlData }] = useMutation(CRAWL_EMPLOYEES);
    const { loading, error, data: employessData } = useQuery(GET_EMPLOYEES);
    useEffect(() => {
        if (employessData) {
            setEmployees(employessData.employees);
        }
        if (crawlData) {
            setEmployees(crawlData.crawlEmployees);
        }
    })

    const crawlEmployeesData = useCallback(
        () => crawlEmployees()
        , [],
    )

    const renderEmployees = () => {
        if (employees && employees.length > 0) {
            return employees.map((employee, index) => {
                return (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{employee.employee_name}</td>
                        <td>{employee.employee_age}</td>
                        <td>{employee.employee_salary}</td>
                    </tr>
                )
            })
        } else {
            return (
                <tr>
                    <td>no data</td>
                </tr>
            )
        }
    }

    return (
        <div>
            <button onClick={crawlEmployeesData}>Crawl Employees</button>
            <table>
                <thead>
                    <tr>
                        <th>Index</th>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Salary</th>
                    </tr>
                </thead>
                <tbody>
                    {renderEmployees()}
                </tbody>
            </table>
        </div>
    )
}

export default Employees;