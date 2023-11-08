import Joi from "joi";

export const registerUserValidation = Joi.object({
    email: Joi.string().email().required().max(200).messages({
        'any.required': 'Email tidak boleh kosong',
        'string.email': 'Email anda tidak valid'
    }),
    name: Joi.string().required().max(100),
    imgUrl: Joi.string().optional().max(200),
    gender: Joi.string().optional().max(100),
    password: Joi.string().required().min(6).max(100).messages({
        'any.required': 'Password tidak boleh kosong',
        'string.min': 'Password minimal harus 6 karakter',
    }),
    // confirmPassword: Joi.string().required().valid(Joi.ref('password')).messages({
    //     'any.required': 'Konfirmasi password tidak boleh kosong',
    //     'any.only': 'Password anda tidak cocok dengan konfirmasi'
    // }),
});

export const loginUserValidation = Joi.object({
    email: Joi.string().email().required().max(200).messages({
        'any.required': 'Email tidak boleh kosong',
        'string.email': 'Email anda tidak valid'
    }),
    password: Joi.string().required().min(6).max(100).messages({
        'any.required': 'Password tidak boleh kosong',
        'string.min': 'Password minimal harus 6 karakter',
    }),
})

export const getUserValidation = Joi.string().email().required().max(200);

export const updateUserValidation = Joi.object({
    name: Joi.string().optional().max(100),
    password: Joi.string().optional().min(6).max(100).messages({
        'string.min': 'Password minimal harus 6 karakter',
    }),
    imgUrl: Joi.string().optional().max(200),
    gender: Joi.string().optional().max(100),
    
});