import React from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";
import { Users, PlusCircle } from "lucide-react";

// Custom group card with a different layout
const GroupCard = ({ group }) => {
  const balance = group.balance || 0;
  const balanceColor = balance > 0 ? "text-teal-500" : "text-red-600";
  const balanceSign = balance > 0 ? "+" : balance < 0 ? "-" : "";
  const hasBalance = balance !== 0;

  return (
    <div className="group relative overflow-hidden rounded-xl border border-gray-200 hover:border-primary/50 transition-all">
      <Link href={`/group/${group.id}`} className="block p-4">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Avatar className="h-10 w-10 rounded-xl  flex items-center justify-center">
              <AvatarFallback className="font-medium">
                {group.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1 border border-gray-200">
              <Users className="h-3 w-3 text-muted-foreground" />
            </div>
          </div>
          <div className="flex-1">
            <h3 className="font-medium">{group.name}</h3>
            <p className="text-xs text-muted-foreground">
              {group.members.length} members
            </p>
          </div>
          {hasBalance && (
            <div className={`text-sm font-medium ${balanceColor}`}>
              {balanceSign}₹{Math.abs(balance).toFixed(2)}
            </div>
          )}
        </div>
      </Link>
    </div>
  );
};

// Empty state with a different layout and call-to-action
const EmptyGroups = () => (
  <div className="py-12 text-center rounded-xl bg-muted/10 border border-dashed border-muted">
    <p className="text-muted-foreground mb-2">No groups yet</p>
    <p className="text-sm text-muted-foreground mb-4">
      Start tracking shared expenses by creating your first group
    </p>
    <Link
      href="/contacts?createGroup=true"
      className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
    >
      <PlusCircle className="h-4 w-4" />
      Create Group
    </Link>
  </div>
);

const GroupList = ({ groups }) => {
  if (!groups || groups.length === 0) {
    return <EmptyGroups />;
  }

  return (
    <div className="grid gap-4">
      {groups.map((group) => (
        <GroupCard key={group.id} group={group} />
      ))}
    </div>
  );
};

export default GroupList;
