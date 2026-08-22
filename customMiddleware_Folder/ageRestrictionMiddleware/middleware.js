const requestFilter = (req, res, next) => {
    const age = req.query.age;
    if (!age) {
        return res.send('plz enter your age');
    }
    else if (age < 18) {
        return res.send('you are not allowed to visit this page...');
    }
    else {
        next();
    }
};

export default requestFilter;