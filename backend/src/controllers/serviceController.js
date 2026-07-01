const Service = require("../models/Service");
const { Op } = require("sequelize");


const createService = async (req, res) => {
    try {

        const {
            serviceName,
            description,
            duration,
            price,
            category,
            image,
            isAvailable
        } = req.body;

        if (
            !serviceName ||
            !description ||
            !duration ||
            !price ||
            !category
        ) {
            return res.status(400).json({
                success: false,
                message: "Please provide all required fields."
            });
        }

        const service = await Service.create({
            serviceName,
            description,
            duration,
            price,
            category,
            image,
            isAvailable
        });

        res.status(201).json({
            success: true,
            message: "Service created successfully.",
            service
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }
};


const getAllServices = async (req, res) => {

    try {

        const {
            page = 1,
            limit = 5,
            search = "",
            category
        } = req.query;

        const where = {};

        if (search) {
            where.serviceName = {
                [Op.like]: `%${search}%`
            };
        }

        if (category) {
            where.category = category;
        }

        const services = await Service.findAndCountAll({

            where,

            limit: Number(limit),

            offset: (page - 1) * limit,

            order: [["createdAt", "DESC"]]

        });

        res.status(200).json({

            success: true,

            totalServices: services.count,

            totalPages: Math.ceil(services.count / limit),

            currentPage: Number(page),

            services: services.rows

        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }

};
const getServiceById = async (req, res) => {
    try {

        const service = await Service.findByPk(req.params.id);

        if (!service) {
            return res.status(404).json({
                success: false,
                message: "Service not found."
            });
        }

        res.status(200).json({
            success: true,
            service
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }
};

//Update The Service

const updateService = async (req, res) => {
    try {

        const service = await Service.findByPk(req.params.id);

        if (!service) {
            return res.status(404).json({
                success: false,
                message: "Service not found."
            });
        }

        await service.update(req.body);

        res.status(200).json({
            success: true,
            message: "Service updated successfully.",
            service
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }
};

//Delete A Service

const deleteService = async (req, res) => {
    try {

        const service = await Service.findByPk(req.params.id);

        if (!service) {
            return res.status(404).json({
                success: false,
                message: "Service not found."
            });
        }

        await service.destroy();

        res.status(200).json({
            success: true,
            message: "Service deleted successfully."
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }
};

module.exports = {
    createService,getAllServices,
    getServiceById,updateService,
    deleteService
};