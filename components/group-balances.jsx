"use client";
import { useConvexQuery } from "@/hooks/use-convex-query";
import { api } from "@/convex/_generated/api";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowUpCircle, ArrowDownCircle, CheckCircle2 } from "lucide-react";

export function GroupBalances({ balances }) {
  const { data: currentUser } = useConvexQuery(api.users.getCurrentUser);

  if (!balances?.length || !currentUser) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
        <CheckCircle2 className="h-8 w-8 mb-2" />
        <span>No balance information available</span>
      </div>
    );
  }

  const me = balances.find((b) => b.id === currentUser._id);
  if (!me) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
        <CheckCircle2 className="h-8 w-8 mb-2" />
        <span>You’re not part of this group</span>
      </div>
    );
  }

  const userMap = Object.fromEntries(balances.map((b) => [b.id, b]));

  const owedByMembers = me.owedBy
    .map(({ from, amount }) => ({ ...userMap[from], amount }))
    .sort((a, b) => b.amount - a.amount);

  const owingToMembers = me.owes
    .map(({ to, amount }) => ({ ...userMap[to], amount }))
    .sort((a, b) => b.amount - a.amount);

  const isAllSettledUp =
    me.totalBalance === 0 &&
    owedByMembers.length === 0 &&
    owingToMembers.length === 0;

  return (
    <div className="flex flex-col gap-6">
      {/* Your Balance Card */}
      <div className="flex flex-col items-center bg-teal-50 rounded-xl py-6 px-4 shadow-sm">
        <span className="text-sm text-muted-foreground mb-1">Your balance</span>
        <span
          className={`text-3xl font-bold ${
            me.totalBalance > 0
              ? "text-teal-600"
              : me.totalBalance < 0
              ? "text-red-600"
              : "text-gray-700"
          }`}
        >
          {me.totalBalance > 0
            ? `+₹${me.totalBalance.toFixed(2)}`
            : me.totalBalance < 0
            ? `-₹${Math.abs(me.totalBalance).toFixed(2)}`
            : "₹0.00"}
        </span>
        <span className="text-sm text-muted-foreground mt-1">
          {me.totalBalance > 0
            ? "You are owed money"
            : me.totalBalance < 0
            ? "You owe money"
            : "You are all settled up"}
        </span>
      </div>

      {/* Settled Up */}
      {isAllSettledUp ? (
        <div className="flex flex-col items-center py-6">
          <CheckCircle2 className="h-7 w-7 text-teal-600 mb-2" />
          <span className="text-muted-foreground font-medium">
            Everyone is settled up!
          </span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Owed to you */}
          {owedByMembers.length > 0 && (
            <div className="bg-white rounded-xl p-4 shadow-sm border border-teal-100">
              <div className="flex items-center mb-4">
                <ArrowUpCircle className="h-5 w-5 text-teal-600 mr-2" />
                <span className="font-semibold text-teal-700">Owed to you</span>
              </div>
              <div className="space-y-3">
                {owedByMembers.map((member) => (
                  <div
                    key={member.id}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={member.imageUrl} />
                        <AvatarFallback>
                          {member.name?.charAt(0) ?? "?"}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{member.name}</span>
                    </div>
                    <span className="inline-block rounded-full px-3 py-1 text-sm font-semibold bg-teal-50 text-teal-700">
                      ₹{member.amount.toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* You owe */}
          {owingToMembers.length > 0 && (
            <div className="bg-white rounded-xl p-4 shadow-sm border border-red-100">
              <div className="flex items-center mb-4">
                <ArrowDownCircle className="h-5 w-5 text-red-600 mr-2" />
                <span className="font-semibold text-red-700">You owe</span>
              </div>
              <div className="space-y-3">
                {owingToMembers.map((member) => (
                  <div
                    key={member.id}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={member.imageUrl} />
                        <AvatarFallback>
                          {member.name?.charAt(0) ?? "?"}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{member.name}</span>
                    </div>
                    <span className="inline-block rounded-full px-3 py-1 text-sm font-semibold bg-red-50 text-red-700">
                      ₹{member.amount.toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
