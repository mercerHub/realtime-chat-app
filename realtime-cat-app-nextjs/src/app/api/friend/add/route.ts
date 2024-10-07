import dbConnect from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/options";
import { getServerSession, User } from "next-auth";
import UserModel from "@/model/User";
import mongoose from "mongoose";
import FriendRequestsModel from "@/model/FriendRequests";

export async function POST(request: NextRequest) {
    await dbConnect();
    console.log("Database connected successfully");

    const session = await getServerSession(authOptions);
    console.log("Session data:", session);

    if (!session) {
        return NextResponse.json({
            message: 'You need to be signed in to add a friend',
            success: false,
        }, { status: 401 });
    }

    try {
        const body = await request.json(); // Parse request body
        console.log("Request body:", body);

        const { email } = body;
        const { user } = session;

        if (user.email === email) {
            console.log("User is trying to add themselves as a friend.");
            return NextResponse.json({
                message: 'You cannot add yourself as a friend',
                success: false,
            }, { status: 400 });
        }

        const isUserInDataBase:any = await UserModel.findOne({ email }).select('-password');
        console.log("Friend found in database:", isUserInDataBase);

        const userId = new mongoose.Types.ObjectId(user._id);
        const currentUser = await UserModel.findById(userId).select('-password');
        console.log("Current user found:", currentUser?.friends);

        if (isUserInDataBase) {
            if (currentUser && currentUser.friends.includes(isUserInDataBase._id)) {
                console.log("User is already a friend.");
                return NextResponse.json({
                    message: 'User is already a friend',
                    success: false,
                }, { status: 400 });
            }
            else{
                const friendRequestExists = await FriendRequestsModel.findOne({sender: user._id, receiver: isUserInDataBase._id});
                if(friendRequestExists){
                    console.log("Friend request already exists.");
                    return NextResponse.json({
                        message: 'Friend request already exists',
                        success: false,
                    }, { status: 400 });
                }
                const friendRequest = new FriendRequestsModel({
                    sender: user._id,
                    receiver: isUserInDataBase._id,
                    status: 'pending',
                })

                const savedFriendRequest = await friendRequest.save();
                console.log("Friend request saved:", savedFriendRequest);
                return NextResponse.json({
                    message: 'Friend request sent',
                    success: true,
                    savedFriendRequest,
                }, { status: 200})
            }
        }
        else {
            return NextResponse.json({
                message: 'User not found',
                success: false,
            }, { status: 404 });
        }

        

    } catch (error: any) {
        console.error("Error:", error);
        return NextResponse.json({
            message: 'Something went wrong',
            error: error.message,
            success: false,
        }, { status: 500 });
    }
}
