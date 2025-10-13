import mongoose from "mongoose";

const blacklistTokenSchema = new mongoose.Schema({
    token: {type: String, required: true, unique: true},
    createdAt: {type: Date, default: Date.now, expiresIn: 86400}
});

const blacklistTokenModel = mongoose.models.blacklistToken || mongoose.model("blacklistToken", blacklistTokenSchema);

export default blacklistTokenModel;