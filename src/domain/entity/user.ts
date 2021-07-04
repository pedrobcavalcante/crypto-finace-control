import UserConfig from "./user-config";

export default class User {
    constructor(
        public name: string,
        public userConfig: UserConfig
    ) { }
}

