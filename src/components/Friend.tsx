import { User } from "./types"

interface FriendProps {
    friend: User
}

export const Friend: React.FC<FriendProps> = ({ friend }) => {
    return (
        <div className="friend" >
            <p>{`${friend.first_name} ${friend.last_name}`}</p>
        </div>
    )
}
