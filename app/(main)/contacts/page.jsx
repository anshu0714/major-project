"use client";

import { useConvexQuery } from "@/hooks/use-convex-query";
import { api } from "@/convex/_generated/api";
import React, { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";
import { Button } from "@/components/ui/button";
import { Plus, Users, User, PlusCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import CreateGroupModal from "./_components/create-group-modal";
import { useRouter, useSearchParams } from "next/navigation";
import { Badge } from "@/components/ui/badge";

const ContactsPage = () => {
  const [isCreateGroupModalOpen, setIsCreateGroupModalOpen] = useState(false);
  const { data, isLoading } = useConvexQuery(api.contacts.getAllContacts);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const createGroupParam = searchParams.get("createGroup");
    if (createGroupParam === "true") {
      setIsCreateGroupModalOpen(true);
      const url = new URL(window.location.href);
      url.searchParams.delete("createGroup");
      router.replace(url.pathname + url.search);
    }
  }, [searchParams, router]);

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white/80 z-50">
        <BarLoader width={200} color="#36d7b7" />
      </div>
    );
  }

  const { users, groups } = data || { users: [], groups: [] };

  return (
    <main className="container mx-auto py-10">
      <div className="mb-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          <Badge variant="outline" className="text-teal-700 bg-teal-100 mb-2">
            Your Network
          </Badge>
          <h1 className="text-4xl font-extrabold text-gray-900">
            Contacts & Groups
          </h1>
          <p className="text-gray-500 mt-2">
            Manage your friends and groups for easy expense splitting.
          </p>
        </div>
        <Button
          asChild
          size="lg"
          className="bg-teal-600 hover:bg-teal-700 text-white font-semibold shadow"
        >
          <Link href="/expenses/new">
            <PlusCircle className="mr-2 h-5 w-5" />
            Add Expense
          </Link>
        </Button>
      </div>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* People Section */}
        <Card className="flex flex-col h-full">
          <CardContent className="p-6 flex-1 flex flex-col">
            <div className="flex items-center gap-2 mb-6">
              <User className="h-5 w-5 text-teal-600" />
              <h2 className="text-xl font-bold">People</h2>
            </div>
            {users.length === 0 ? (
              <div className="flex-1 flex items-center justify-center text-gray-400">
                No contacts yet.
                <br />
                Add an expense with someone to see them here.
              </div>
            ) : (
              <ul className="flex-1 flex flex-col gap-4">
                {users.map((user) => (
                  <li key={user.id}>
                    <Link href={`/person/${user.id}`}>
                      <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-teal-50 transition cursor-pointer">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={user.imageUrl} />
                          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{user.name}</div>
                          <div className="text-xs text-gray-500">
                            {user.email}
                          </div>
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>

        {/* Create Group Card */}
        <Card className="flex flex-col items-center justify-center h-full border-dashed border-2 border-teal-300 bg-teal-50/40">
          <CardContent className="flex flex-col items-center py-12">
            <Users className="h-12 w-12 text-teal-400 mb-4" />
            <div className="text-lg font-semibold mb-2">Start a new Group</div>
            <div className="text-gray-500 mb-6 text-center">
              Organize expenses with friends, family, or roommates.
            </div>
            <Button
              onClick={() => setIsCreateGroupModalOpen(true)}
              className="bg-teal-600 hover:bg-teal-700 text-white font-bold"
              size="lg"
            >
              <Plus className="mr-2 h-5 w-5" />
              Create Group
            </Button>
          </CardContent>
        </Card>

        {/* Groups Section */}
        <Card className="flex flex-col h-full">
          <CardContent className="p-6 flex-1 flex flex-col">
            <div className="flex items-center gap-2 mb-6">
              <Users className="h-5 w-5 text-teal-600" />
              <h2 className="text-xl font-bold">Groups</h2>
            </div>
            {groups.length === 0 ? (
              <div className="flex-1 flex items-center justify-center text-gray-400">
                No groups yet.
                <br />
                Create a group to start tracking shared expenses.
              </div>
            ) : (
              <ul className="flex-1 flex flex-col gap-4">
                {groups.map((group) => (
                  <li key={group.id}>
                    <Link href={`/group/${group.id}`}>
                      <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-teal-50 transition cursor-pointer">
                        <Avatar className="h-10 w-10 bg-primary/10">
                          <AvatarFallback>
                            {group.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{group.name}</div>
                          <div className="text-xs text-gray-500">
                            {group.memberCount} members
                          </div>
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </section>

      <CreateGroupModal
        isOpen={isCreateGroupModalOpen}
        onClose={() => setIsCreateGroupModalOpen(false)}
        onSuccess={(groupId) => {
          router.push(`/group/${groupId}`);
        }}
      />
    </main>
  );
};

export default ContactsPage;
