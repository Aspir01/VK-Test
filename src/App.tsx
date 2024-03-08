import { useState, useEffect } from 'react'
import { Group } from './components/Group'
import { GetGroupsResponse, Group as GroupType } from './components/types';
import GroupsData from "./groups.json";

const App: React.FC = () => {
  const [groups, setGroups] = useState<GroupType[]>([])
  const [loading, setLoading] = useState(true);
  const [hasFriendsFilter, setHasFriendsFilter] = useState(false);
  const [privacyFilter, setPrivacyFilter] = useState("all");
  const [avatarColorFilter, setAvatarColorFilter] = useState("all");

  useEffect(() => {
    setTimeout(() => {
      const response: GetGroupsResponse = GroupsData as GetGroupsResponse;
      if (response.result === 1 && response.data) {
        setGroups(response.data)
        setLoading(false)
      } else {
        console.error("Ошибка, данные не получены")
        setGroups([])
        setLoading(false)
      }
    }, 1000)
  }, [])

  const applyFilters = () => {
    let filteredGroups = GroupsData.data;

    if (privacyFilter !== "all") {
      filteredGroups = filteredGroups.filter(group => group.closed === (privacyFilter === "closed"));
    }

    if (avatarColorFilter !== "all") {
      filteredGroups = filteredGroups.filter(group => group.avatar_color === avatarColorFilter);
    }

    if (hasFriendsFilter) {
      filteredGroups = filteredGroups.filter(group => group.friends && group.friends.length > 0);
    }

    setGroups(filteredGroups);
  };

  return (
    <div className="App">
      <div className='filter'>
        <label>
          <p>Приватность:</p>
          <select value={privacyFilter} onChange={(e) => setPrivacyFilter(e.target.value)}>
            <option value="all">Все</option>
            <option value="closed">Закрытая</option>
            <option value="open">Открытая</option>
          </select>
        </label>
        <label>
          <p>Цвет аватарки:</p>
          <select value={avatarColorFilter} onChange={(e) => setAvatarColorFilter(e.target.value)}>
            <option value="all">Любой</option>
            <option value="red">Красная</option>
            <option value="blue">Синяя</option>
            <option value="green">Зеленая</option>
          </select>
        </label>
        <label>
          <p>Есть друзья в группе:</p>
          <input type="checkbox" checked={hasFriendsFilter} onChange={() => setHasFriendsFilter(!hasFriendsFilter)} />
        </label>
        <button onClick={applyFilters}>Применить</button>
      </div>
      {loading ? (
        <p>Загрузка...</p>
      ) : (
        <div className='group__list'>
          {groups.map((group: GroupType, index: number) => (
            <Group key={index} group={group} />
          ))}
        </div>
      )
      }
    </div>
  );
}

export default App