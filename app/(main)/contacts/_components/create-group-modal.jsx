import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useConvexMutation, useConvexQuery } from "@/hooks/use-convex-query";
import { api } from "@/convex/_generated/api";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { UserPlus, X } from "lucide-react";
import { toast } from "sonner";

const groupSchema = z.object({
  name: z.string().min(1, "Group Name is required"),
  description: z.string().optional(),
});

const CreateGroupModal = ({ isOpen, onClose, onSuccess }) => {
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [commandOpen, setCommandOpen] = useState(false);

  const { data: currentUser } = useConvexQuery(api.users.getCurrentUser);
  const { data: searchResults, isLoading: isSearching } = useConvexQuery(
    api.users.searchUsers,
    { query: searchQuery }
  );
  const createGroup = useConvexMutation(api.contacts.createGroup);

  const addMember = (user) => {
    if (!selectedMembers.some((m) => m.id === user.id)) {
      setSelectedMembers([...selectedMembers, user]);
    }
    setCommandOpen(false);
  };

  const removeMember = (userId) => {
    setSelectedMembers(selectedMembers.filter((m) => m.id !== userId));
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(groupSchema),
    defaultValues: { name: "", description: "" },
  });

  const handleClose = () => {
    reset();
    setSelectedMembers([]);
    onClose();
  };

  const onSubmit = async (data) => {
    try {
      const memberIds = selectedMembers?.map((member) => member.id);
      const groupId = await createGroup.mutate({
        name: data.name,
        description: data.description,
        members: memberIds,
      });
      toast.success("Group created successfully!");
      handleClose();
      if (onSuccess) onSuccess(groupId);
    } catch (error) {
      toast.error("Failed to create group: " + error.message);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-lg p-0 overflow-hidden">
        <DialogHeader className="bg-teal-50 px-6 py-4 border-b">
          <DialogTitle className="text-teal-600 text-2xl">
            Create a New Group
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Card-like form body */}
          <div className="px-6 py-6 space-y-6 bg-white">
            {/* Group Details */}
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="font-semibold">
                  Group Name
                </Label>
                <Input
                  id="name"
                  placeholder="Enter Group Name"
                  {...register("name")}
                  className="mt-1"
                />
                {errors.name && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="description" className="font-semibold">
                  Description <span className="text-gray-400">(optional)</span>
                </Label>
                <Textarea
                  id="description"
                  placeholder="Enter Group Description"
                  {...register("description")}
                  className="mt-1"
                />
              </div>
            </div>

            {/* Members Section */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <Label className="font-semibold">Members</Label>
                <Popover open={commandOpen} onOpenChange={setCommandOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="flex items-center gap-1 text-xs border border-teal-600"
                    >
                      <UserPlus className="h-4 w-4" />
                      Add Member
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="p-0 w-72"
                    align="end"
                    side="bottom"
                  >
                    <Command>
                      <CommandInput
                        placeholder="Search by name or email..."
                        value={searchQuery}
                        onValueChange={setSearchQuery}
                      />
                      <CommandList>
                        <CommandEmpty>
                          {searchQuery.length < 2 ? (
                            <p className="py-3 px-4 text-sm text-center text-muted-foreground">
                              Type at least 2 characters to search
                            </p>
                          ) : isSearching ? (
                            <p className="py-3 px-4 text-sm text-center text-muted-foreground">
                              Searching...
                            </p>
                          ) : (
                            <p className="py-3 px-4 text-sm text-center text-muted-foreground">
                              No Users Found
                            </p>
                          )}
                        </CommandEmpty>
                        <CommandGroup heading="Users">
                          {searchResults?.map((user) => (
                            <CommandItem
                              key={user.id}
                              value={user.name + user.email}
                              onSelect={() => addMember(user)}
                            >
                              <div className="flex items-center gap-2">
                                <Avatar className="h-7 w-7">
                                  <AvatarImage src={user.imageUrl} />
                                  <AvatarFallback>
                                    {user.name?.charAt(0) || "?"}
                                  </AvatarFallback>
                                </Avatar>
                                <div className="flex flex-col">
                                  <span className="text-sm">{user.name}</span>
                                  <span className="text-xs text-muted-foreground">
                                    {user.email}
                                  </span>
                                </div>
                              </div>
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
              {/* Members Avatars */}
              <div className="flex flex-wrap items-center gap-x-2 gap-y-2 py-2">
                {currentUser && (
                  <Badge
                    variant="secondary"
                    className="px-3 py-1 flex items-center gap-2 bg-teal-50 border-teal-600 "
                  >
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={currentUser.imageUrl} />
                      <AvatarFallback>
                        {currentUser.name?.charAt(0) || "?"}
                      </AvatarFallback>
                    </Avatar>
                    <span>{currentUser.name} (You)</span>
                  </Badge>
                )}
                {selectedMembers.map((member) => (
                  <Badge
                    key={member.id}
                    variant="secondary"
                    className="px-3 py-1 flex items-center gap-2 bg-teal-50 "
                  >
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={member.imageUrl} />
                      <AvatarFallback>
                        {member.name?.charAt(0) || "?"}
                      </AvatarFallback>
                    </Avatar>
                    <span>{member.name}</span>
                    <button
                      type="button"
                      onClick={() => removeMember(member.id)}
                      className="ml-1 text-gray-400 hover:text-red-500"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
              {selectedMembers.length === 0 && (
                <p className="text-xs text-amber-600 mt-2">
                  Add at least one other person to the group.
                </p>
              )}
            </div>
          </div>
          {/* Footer */}
          <DialogFooter className="bg-teal-50 px-6 py-4 border-t flex items-center justify-end gap-2">
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting || selectedMembers.length === 0}
              className="bg-teal-600 text-white font-bold hover:bg-teal-700"
            >
              {isSubmitting ? "Creating..." : "Create Group"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateGroupModal;
