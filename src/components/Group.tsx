import { useState } from 'react'
import { Group as GroupType, User } from './types'
import "./Group.css"

interface GroupProps {
    group: GroupType;
}

export const Group: React.FC<GroupProps> = ({ group }) => {

    const [showFriends, setShowFriends] = useState(false)

    const toggleFriends = () => {
        setShowFriends((click) => !click)
    }

    return (
        <div className="group">
            <h2>{group.name}</h2>
            {group.avatar_color && <div className='group__avatar' style={{ backgroundColor: group.avatar_color }}></div>}
            <p>{group.closed ? "Закрытая" : "Открытая"} группа.</p>
            <p>Подписчиков: {group.members_count}</p>
            <p>
                Друзей в группе:{" "}
                <button onClick={toggleFriends}>
                    {group.friends ? group.friends.length : 0}
                </button>
            </p>
            {showFriends && group.friends && group.friends.length > 0 && (
                <div>
                    <h3>Друзья:</h3>
                    <ul>
                        {group.friends.map((friend: User, index: number) => (
                            <li key={index}>{`${friend.first_name} ${friend.last_name}`}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}
