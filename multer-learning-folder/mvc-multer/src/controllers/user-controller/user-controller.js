 const uploadFile = (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send({
                status: false,
                message: 'No file uploaded or file type invalid'
            });
        }

        res.status(200).send({
            status: true,
            message: 'File uploaded successfully',
            file: req.file
        });
    } catch (error) {
        res.status(400).send({
            status: false,
            message: error.message
        });
    }
};
export default uploadFile;