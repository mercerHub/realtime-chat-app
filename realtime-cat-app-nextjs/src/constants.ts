const domain = 'http://localhost:3000';
interface FriendInterface {
    id: string
    name: string
}

const friends: FriendInterface[] = [
    { id: '1', name: 'John Doe' },
    { id: '2', name: 'Jane Doe' },
    { id: '3', name: 'John Smith' },
    { id: '4', name: 'Jane Smith' },
]

export { 
    domain,
    friends,
    type FriendInterface
};