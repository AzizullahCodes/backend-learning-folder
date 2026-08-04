// Data store
let fruits = ['apple', 'banana', 'grapes'];

// Controller 1
const greetUser = async (req, res) => {
    return res.status(200).send({
        message: 'node module is running'
    });
};

// Controller 2
const fruitApi = async (req, res) => {
    return res.status(200).send({
        status: true,
        message: 'fruit api created successfully',
        data: fruits
    });
};

export { greetUser, fruitApi };