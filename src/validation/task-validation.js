import Joi from "joi";

export const createTaskValidation = Joi.object({
    title: Joi.string().required().max(190).messages({
        'any.required': 'Title tidak boleh kosong'
    }),
    todoText: Joi.string().required().messages({
        'any.required': 'Todo Text tidak boleh kosong'
    }),
    time: Joi.string().required().max(100).messages({
        'any.required': 'Time tidak boleh kosong'
    }),
    category: Joi.string().optional().max(100),
    isDone: Joi.bool().optional()
})

export const getTaskValidation = Joi.number().positive().required();

export const updateTaskValidation = Joi.object({
    id: Joi.number().min(1).positive().required(),
    title: Joi.string().optional().max(190),
    todoText: Joi.string().optional(),
    time: Joi.string().optional().max(100),
    category: Joi.string().optional().max(100),
    isDone: Joi.bool().optional()
});
