"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { BarLoader } from "react-spinners";
import { ArrowLeft, ArrowLeftRight, PlusCircle, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ExpenseList } from "@/components/expense-list";
import { GroupBalances } from "@/components/group-balances";
import { GroupMembers } from "@/components/group-members";
import { SettlementList } from "@/components/settlements-list";
import { api } from "@/convex/_generated/api";
import { useConvexQuery } from "@/hooks/use-convex-query";

export default function GroupPage() {
  const params = useParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("expenses");

  const { data, isLoading } = useConvexQuery(api.groups.getGroupExpenses, {
    groupId: params.id,
  });

  if (isLoading) {
    return (
      <div className="container mx-auto py-12">
        <BarLoader width="100%" color="#36d7b7" />
      </div>
    );
  }

  const group = data?.group;
  const members = data?.members || [];
  const expenses = data?.expenses || [];
  const settlements = data?.settlements || [];
  const balances = data?.balances || [];
  const userLookupMap = data?.userLookupMap || {};

  return (
    <div className="container max-w-5xl mx-auto py-8">
      {/* Top Section: Group Info and Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-8">
        {/* Group Info */}
        <div className="flex items-center gap-4">
          <div className="bg-teal-100 p-4 rounded-2xl flex items-center justify-center shadow-sm">
            <Users className="h-10 w-10 text-teal-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-1">{group?.name}</h1>
            <div className="text-muted-foreground text-base">
              {group?.description && <span>{group.description} • </span>}
              <span>{members.length} members</span>
            </div>
          </div>
        </div>
        {/* Actions */}
        <div className="flex gap-3 mt-2 sm:mt-0">
          <Button asChild variant="outline" className="shadow-sm">
            <Link href={`/settlements/group/${params.id}`}>
              <ArrowLeftRight className="mr-2 h-5 w-5" />
              Settle Up
            </Link>
          </Button>
          <Button asChild className="bg-teal-600 hover:bg-teal-700 shadow-sm">
            <Link href={`/expenses/new`}>
              <PlusCircle className="mr-2 h-5 w-5" />
              Add Expense
            </Link>
          </Button>
        </div>
      </div>

      {/* Overview: Balances & Members */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="md:col-span-2 bg-white rounded-xl shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">Group Balances</CardTitle>
          </CardHeader>
          <CardContent>
            <GroupBalances balances={balances} />
          </CardContent>
        </Card>
        <Card className="bg-white rounded-xl shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">Members</CardTitle>
          </CardHeader>
          <CardContent>
            <GroupMembers members={members} />
          </CardContent>
        </Card>
      </div>

      {/* Main Card: Expenses & Settlements Tabs */}
      <Card className="bg-white rounded-xl shadow-sm">
        <CardHeader className="pb-0">
          <Tabs
            defaultValue="expenses"
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="w-full flex bg-teal-50 rounded-lg p-1">
              <TabsTrigger
                value="expenses"
                className="flex-1 data-[state=active]:bg-white data-[state=active]:shadow data-[state=active]:text-teal-700"
              >
                Expenses ({expenses.length})
              </TabsTrigger>
              <TabsTrigger
                value="settlements"
                className="flex-1 data-[state=active]:bg-white data-[state=active]:shadow data-[state=active]:text-teal-700"
              >
                Settlements ({settlements.length})
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent className="pt-6">
          <Tabs
            defaultValue="expenses"
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsContent value="expenses">
              <ExpenseList
                expenses={expenses}
                showOtherPerson={true}
                isGroupExpense={true}
                userLookupMap={userLookupMap}
              />
            </TabsContent>
            <TabsContent value="settlements">
              <SettlementList
                settlements={settlements}
                isGroupSettlement={true}
                userLookupMap={userLookupMap}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
