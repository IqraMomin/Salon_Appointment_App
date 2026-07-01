const User = require("../models/User");
const StaffProfile = require("../models/StaffProfile");

const createStaff = async (req, res) => {

    try {

        const {

            userId,

            specialization,

            experience,

            bio

        } = req.body;

        const user = await User.findByPk(userId);

        if (!user) {

            return res.status(404).json({

                success:false,

                message:"User not found."

            });

        }

        if(user.role !== "STAFF"){

            return res.status(400).json({

                success:false,

                message:"User is not a staff member."

            });

        }

        const profile = await StaffProfile.create({

            userId,

            specialization,

            experience,

            bio

        });

        res.status(201).json({

            success:true,

            message:"Staff profile created successfully.",

            profile

        });

    }

    catch(error){

        console.log(error);

        res.status(500).json({

            success:false,

            message:"Internal Server Error"

        });

    }

}


const getAllStaff = async (req, res) => {

    try {

        const staff = await StaffProfile.findAll({

            include: [
                {
                    model: User,
                    attributes: ["id", "name", "email", "phone"]
                },
                {
                    model: Service,
                    through: {
                        attributes: []
                    }
                }
            ]

        });

        res.status(200).json({

            success: true,

            count: staff.length,

            staff

        });

    }

    catch (error) {

        console.log(error);

        res.status(500).json({

            success: false,

            message: "Internal Server Error"

        });

    }

};

const getStaffById = async (req, res) => {

    try {

        const staff = await StaffProfile.findByPk(req.params.id, {

            include: [

                {
                    model: User,
                    attributes: ["id", "name", "email", "phone"]
                },

                {
                    model: Service,
                    through: {
                        attributes: []
                    }
                }

            ]

        });

        if (!staff) {

            return res.status(404).json({

                success: false,

                message: "Staff not found."

            });

        }

        res.status(200).json({

            success: true,

            staff

        });

    }

    catch (error) {

        console.log(error);

        res.status(500).json({

            success: false,

            message: "Internal Server Error"

        });

    }

};

const updateStaff = async (req, res) => {

    try {

        const staff = await StaffProfile.findByPk(req.params.id);

        if (!staff) {

            return res.status(404).json({

                success: false,

                message: "Staff not found."

            });

        }

        await staff.update(req.body);

        res.status(200).json({

            success: true,

            message: "Staff updated successfully.",

            staff

        });

    }

    catch (error) {

        console.log(error);

        res.status(500).json({

            success: false,

            message: "Internal Server Error"

        });

    }

};


const deleteStaff = async (req, res) => {

    try {

        const staff = await StaffProfile.findByPk(req.params.id);

        if (!staff) {

            return res.status(404).json({

                success: false,

                message: "Staff not found."

            });

        }

        await staff.destroy();

        res.status(200).json({

            success: true,

            message: "Staff deleted successfully."

        });

    }

    catch (error) {

        console.log(error);

        res.status(500).json({

            success: false,

            message: "Internal Server Error"

        });

    }

};

const assignServices = async (req, res) => {

    try {

        const { staffId, serviceIds } = req.body;

        const staff = await StaffProfile.findByPk(staffId);

        if (!staff) {

            return res.status(404).json({

                success: false,

                message: "Staff not found."

            });

        }

        await staff.setServices(serviceIds);

        res.status(200).json({

            success: true,

            message: "Services assigned successfully."

        });

    }

    catch (error) {

        console.log(error);

        res.status(500).json({

            success: false,

            message: "Internal Server Error"

        });

    }

};

module.exports={

    createStaff,getAllStaff,getStaffById,
    updateStaff,deleteStaff,assignServices


}