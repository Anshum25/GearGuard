import * as React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface UserAvatarProps {
  name?: string;
  avatar?: string;
  className?: string;
}

export function UserAvatar({ name, avatar, className }: UserAvatarProps) {
  // Generate initials from name
  const getInitials = (name: string) => {
    if (!name) return "?";
    
    return name
      .split(" ")
      .map(word => word.charAt(0).toUpperCase())
      .slice(0, 2)
      .join("");
  };

  return (
    <Avatar className={className}>
      <AvatarImage src={avatar} alt={name} />
      <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
        {getInitials(name || "")}
      </AvatarFallback>
    </Avatar>
  );
}
