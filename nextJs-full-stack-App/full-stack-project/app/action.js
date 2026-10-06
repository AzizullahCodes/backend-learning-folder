'use server'

import axios from "axios";

const fetchAllNewUseres = async () => {
    try {
        const res = await axios.get(
            'http://localhost:3000/api/test/fetch/allusers'
        );

        console.log(res.data);

        return res.data;
    } catch (error) {
        console.log('error in actions.js file....', error);
        return null;
    }
}

export { fetchAllNewUseres };