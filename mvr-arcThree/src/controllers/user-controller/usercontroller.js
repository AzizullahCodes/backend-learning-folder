//user-controller.js
import UserModal from "../../modals/user-modal/user-modal.js"
//controller 1 

const gretting = (req,res)=>{
    res.status(200).send({
        status : true,
        message : 'welcome you to node js server side'
    })

}

//save new user controller 
const makeNewUser = async (req, res) => {
    try {
        const { email } = req.body || {};

        if (!email) {
            return res.status(400).send({
                status: false,
                message: 'Email is required'
            });
        }

        let isUserExisted = await UserModal.findOne({ email });
        if (isUserExisted) {
            return res.status(400).send({
                status: false,
                message: 'User with this email already exists'
            });
        }

        const saveUser = new UserModal(req.body);
        const savingUser = await saveUser.save();

        return res.status(201).send({
            status: true,
            message: 'User saved successfully',
            data: savingUser
        });
    } catch (error) {
        console.error('Error while storing new user:', error);
        return res.status(500).send({
            status: false,
            message: 'Internal server error',
            error: error.message // Expose exact error message during debugging
        });
    }
};

export {gretting ,makeNewUser}



// const makeNewUser = async (req, res) => {
//     try {
//         const { email } = req.body || {};

//         if (!email) {
//             return res.status(400).send({
//                 status: false,
//                 message: 'Email is required'
//             });
//         }

//         let isUserExisted = await UserModal.findOne({ email });
//         if (isUserExisted) {
//             return res.status(400).send({
//                 status: false,
//                 message: 'User with this email already exists'
//             });
//         }

//         const saveUser = new UserModal(req.body);
//         const savingUser = await saveUser.save();

//         return res.status(201).send({
//             status: true,
//             message: 'User saved successfully',
//             data: savingUser
//         });
//     } catch (error) {
//         console.error('Error while storing new user:', error);
//         return res.status(500).send({
//             status: false,
//             message: 'Internal server error',
//             error: error.message // Expose exact error message during debugging
//         });
//     }
// };