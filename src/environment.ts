import dotenv from 'dotenv';

dotenv.config();
console.log(process.env.APP_NAME);

export default class EnvVariables {
    static app_name = process.env.APP_NAME;
}