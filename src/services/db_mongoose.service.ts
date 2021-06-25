import { Schema, model, Model, connect } from 'mongoose';

interface IUser extends Document {
    email: string;
    firstName: string;
    lastName: string;
}

const UserSchema: Schema = new Schema({
    email: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true }
});

const User: Model<IUser> = model('User', UserSchema);
(async function () {
    await connect('mongodb://localhost:27017/cripto-finance-control', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    const user: IUser = await User.create({
        email: 'bill@microsoft.com',
        firstName: 'Bill',
        lastName: 'Gates'
    });

    console.log('Done', user.email);
})();