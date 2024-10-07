import mongoose, {Schema,Document} from "mongoose";

interface FriendRequests extends Document {
    sender: string;
    receiver: string;
    status: string;
}

const FriendRequestsSchema: Schema<FriendRequests> = new Schema({
    sender: {
        type: String,
        required: true
    },
    receiver: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected'],
        default: 'pending',
        required: true
    }
},{timestamps: true});

const FriendRequestsModel = mongoose.models.FriendRequests as mongoose.Model<FriendRequests> || mongoose.model<FriendRequests>('FriendRequests', FriendRequestsSchema);

export default FriendRequestsModel;