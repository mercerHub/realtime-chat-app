import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { CircleUser } from 'lucide-react'

interface Props {}
interface Friend {
    id: string
    name: string
}

const friends: Friend[] = [
    {
        id: '1',
        name: 'John Doe',
    },
    {
        id: '2',
        name: 'Jane Doe',
    },
    {
        id: '3',
        name: 'John Smith',
    },
    {
        id: '4',
        name: 'Jane Smith',
    },
]

function FriendsCard(props: Props) {
    const {} = props
    const pathname = usePathname()

    return (
        <div className="col-span-1 h-full">
            <Card className="h-full bg-zinc-100">
                <CardHeader>
                    <CardTitle className="text-2xl">Friends</CardTitle>
                    <CardDescription>List of your friends</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col">
                    {friends.map((friend) => (
                        <div
                            key={friend.id}
                            className="flex items-center justify-between"
                        >
                            <Link
                                href={`/dashboard/${friend.id}`}
                                className={`w-full rounded-sm h-[50px] flex gap-4 items-center border-b-2 px-4 text-gray-800 ${
                                    pathname === `/dashboard/${friend.id}`
                                        ? 'bg-gray-50 font-medium'
                                        : 'bg-white'
                                }`}
                            >
                                <CircleUser/>
                                {friend.name}
                            </Link>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>
    )
}

export default FriendsCard
