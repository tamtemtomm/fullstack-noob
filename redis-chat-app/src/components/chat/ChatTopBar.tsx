import React from "react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Info, X } from "lucide-react";
import { useSelectedUser } from "@/store/useSelectedUser";

const ChatTopBar = () => {
  const { selectedUser } = useSelectedUser();

  return (
    <div className="w-full h-20 flex p-4 justify-between items-center border-b">
      <div className="flex items-center gap-2">
        <Avatar className="flex justify-center items-center">
          <AvatarImage
            src={selectedUser?.image || "/placeholder.png"}
            alt="User Avatar"
            className="w-10 h-10 rounded-full object-cover"
          />
        </Avatar>
        <span className="font-medium">{selectedUser?.name}</span>
      </div>

      <div className="flex gap-2 ">
        <Info className="text-muted-foreground cursor-pointer hover:text-primary" />
        <X className="text-muted-foreground cursor-pointer hover:text-primary" />
      </div>
    </div>
  );
};

export default ChatTopBar;
