import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    await dbConnect();

    try {
        const body = await request.json(); // Parse request body

        const { username, email, password } = body;

        console.log(body);

        // Check if the user already exists
        const user = await UserModel.findOne({$or: [{ username }, { email }]});

        if (user) {
            return NextResponse.json({ error: 'User already exists !!!' }, { status: 400 });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user
        const newUser = new UserModel({
            username,
            email,
            password: hashedPassword,
        });

        // Save the new user to the database
        const savedUser = await newUser.save();
        console.log(savedUser);

        // Return success response
        return NextResponse.json({
            message: 'User created successfully',
            success: true,
            savedUser,
        }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({
            message: 'User creation failed',
            error: error.message,
            success: false,
        }, { status: 500 });
    }
}
