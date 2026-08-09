import { Bell, EllipsisVertical, Search, SquarePen } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import Avatar from "../ui/Avatar";
import ChatCard from "./ChatCard";
import Input from "../ui/Input";
import { useAuth } from "../../hooks/useAuth";
import { getUserDetails } from "../../services/auth.service";
import ChatItem from "./ChatItem";
import { searchUsers } from "../../services/auth.service";
import {
  getAllConversation,
  getConversation,
} from "../../services/conversation.service";

const LeftSidebar = ({
  conversations,
  selectedConversation,
  onSelectChat,
  onStartChat,
}) => {
  const { user } = useAuth();
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // for searching
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);

  const handleSearch = async (e) => {
    const value = e.target.value;

    setSearch(value);

    if (!value.trim()) {
      setSearchResults([]);
      return;
    }
    try {
      setSearchLoading(true);
      const res = await searchUsers(value);

      console.log("serach res.data.data:", res.data);

      setSearchResults(res.data.message);
    } catch (err) {
      console.log("search err", err);
      setSearchResults([]);
    } finally {
      setSearchLoading(false);
    }
  };

  return (
    <aside
      className="
      
        h-screen
        w-[280px]
        shrink-0

        border-r
        border-border

        bg-surface

        flex
        flex-col
      "
    >
      <div
        className="
          flex
          items-center
          justify-between

          border-b
          border-border

          px-5
          py-4
        "
      >
        <div className="flex items-center gap-3">
          <Avatar src={user?.avatar} name={user?.name} size="lg" />

          <div>
            <p className="text-sm text-text-muted">{user?.username}</p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button className="rounded-lg p-2 transition hover:bg-background">
            <Bell size={20} />
          </button>

          <button className="rounded-lg p-2 transition hover:bg-background">
            <SquarePen size={20} />
          </button>

          <button className="rounded-lg p-2 transition hover:bg-background">
            <EllipsisVertical size={20} />
          </button>
        </div>
      </div>

      <div className="p-4">
        <Input
          name="search"
          value={search}
          onChange={handleSearch}
          placeholder="Search users..."
          leftIcon={<Search size={18} />}
        />
      </div>

      <div
        className="
          flex-1
          overflow-y-auto
          px-2
          pb-2
        "
      >
        <div className="flex-1 overflow-y-auto px-2 pb-2">
          {search.trim() ? (
            <>
              {searchLoading && (
                <p className="p-3 text-sm text-text-muted">Searching...</p>
              )}

              {!searchLoading && searchResults.length === 0 && (
                <p className="p-3 text-sm text-text-muted">No users found</p>
              )}

              {!searchLoading &&
                searchResults.map((user) => (
                  <div
                    key={user._id}
                    className="flex items-center gap-3 rounded-xl p-3 hover:bg-background"
                  >
                    <Avatar src={user.avatar} name={user.name} />

                    <div className="min-w-0 flex-1">
                      <p className="truncate font-medium">{user.name}</p>

                      <p className="truncate text-sm text-text-muted">
                        @{user.username}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        console.log("chat button clicked");

                        onStartChat(user);
                      }}
                      className="rounded-lg bg-primary px-3 py-2 text-sm text-white"
                    >
                      Chat
                    </button>
                  </div>
                ))}
            </>
          ) : (
            conversations.map((chat) => (
              <ChatCard
                key={chat._id}
                chat={chat}
                active={selectedConversation?._id === chat._id}
                onClick={() => onSelectChat(chat)}
              />
            ))
          )}
        </div>
      </div>
    </aside>
  );
};

export default LeftSidebar;
