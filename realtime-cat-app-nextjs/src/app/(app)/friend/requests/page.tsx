import { authOptions } from '@/app/api/auth/[...nextauth]/options'
import dbConnect from '@/lib/dbConnect'
import FriendRequestsModel from '@/model/FriendRequests'
import UserModel from '@/model/User'
import { User } from 'lucide-react'
import { getServerSession } from 'next-auth'
import React from 'react'

interface Props {}

async function Page(props: Props) {
    dbConnect();
    const {} = props
    const session = await getServerSession(authOptions);
    const user = session?.user;
    const friendRequests = await FriendRequestsModel.find({receiver: user?._id});
    const friendNames:String[] = await Promise.all(friendRequests.map(async (request) => {
        const {username} = await UserModel.findById(request.sender);
        return username;
    }));
    console.log(friendNames);

    return (
        <>
        {friendNames.map((name,indx) => (<div key={indx}>{name}</div>))}
        </>
    )
}

export default Page
