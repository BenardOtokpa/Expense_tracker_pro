

const userDashboard = (req, res) => {

res.status(200).json({
    status:"Success",
    message: "Welcome to User Dashboeard!"
})
}


module.exports = userDashboard