const axios = require('axios');

exports.getEmployees = async (context) => {
    return await context.db.collection('employees').find().toArray();
}

exports.crawlEmployees = async (context) => {
    let res = await axios.get('http://dummy.restapiexample.com/api/v1/employees');
    const data = res.data.data;
    data.map(employee => {
        context.db.collection('employees').updateOne(
            employee,
            { $set: employee },
            { upsert: true }
        )
    })
    return await context.db.collection('employees').find({}).toArray();
}
