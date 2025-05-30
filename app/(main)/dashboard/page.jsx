"use client";
import { api } from "@/convex/_generated/api";
import { useConvexQuery } from "@/hooks/use-convex-query";
import { BarLoader } from "react-spinners";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  PlusCircle,
  Users,
  ChevronRight,
  TrendingUp,
  TrendingDown,
  Wallet,
} from "lucide-react";
import Link from "next/link";
import GroupList from "./components/group-list";
import ExpenseSummary from "./components/expense-summary";
import BalanceSummary from "./components/balance-summary";

export default function Dashboard() {
  const { data: balances, isLoading: balancesLoading } = useConvexQuery(
    api.dashboard.getUserBalances
  );
  const { data: groups, isLoading: groupsLoading } = useConvexQuery(
    api.dashboard.getUserGroups
  );
  const { data: totalSpent, isLoading: totalSpentLoading } = useConvexQuery(
    api.dashboard.getTotalSpent
  );
  const { data: monthlySpending, isLoading: monthlySpendingLoading } =
    useConvexQuery(api.dashboard.getMonthlySpending);

  const isLoading =
    balancesLoading ||
    groupsLoading ||
    totalSpentLoading ||
    monthlySpendingLoading;
  if (isLoading) {
    return (
      <div className="container mx-auto py-12">
        <BarLoader width={"100%"} color="#36d7b7" />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 space-y-8">
      {/* Dashboard Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-6 py-6">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
          Welcome back!
        </h1>
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

      {/* Balance overview cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Balance Card */}
        <Card className="rounded-xl shadow bg-gradient-to-br from-teal-50 via-white to-white border-1">
          <CardHeader className="flex flex-row items-center gap-3 pb-2">
            <Wallet className="h-6 w-6 text-teal-600" />
            <CardTitle className="text-base font-semibold text-teal-700">
              Total Balance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {balances?.totalBalance > 0 ? (
                <span className="text-teal-600">
                  +₹{balances?.totalBalance.toFixed(2)}
                </span>
              ) : balances?.totalBalance < 0 ? (
                <span className="text-red-600">
                  -₹{Math.abs(balances?.totalBalance).toFixed(2)}
                </span>
              ) : (
                <span>₹0.00</span>
              )}
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {balances?.totalBalance > 0
                ? "You are owed money"
                : balances?.totalBalance < 0
                  ? "You owe money"
                  : "All settled up!"}
            </p>
          </CardContent>
        </Card>

        {/* You are owed Card */}
        <Card className="rounded-xl shadow bg-gradient-to-br from-teal-50 via-white to-white border-1">
          <CardHeader className="flex flex-row items-center gap-3 pb-2">
            <TrendingUp className="h-6 w-6 text-green-500" />
            <CardTitle className="text-base font-semibold text-green-600">
              You are owed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">
              ₹{balances?.youAreOwed.toFixed(2)}
            </div>
            <p className="text-xs text-gray-500 mt-1">
              From {balances?.oweDetails?.youAreOwedBy?.length || 0} people
            </p>
          </CardContent>
        </Card>

        {/* You owe Card */}
        <Card className="rounded-xl shadow bg-gradient-to-br from-red-50 via-white to-white border-1">
          <CardHeader className="flex flex-row items-center gap-3 pb-2">
            <TrendingDown className="h-6 w-6 text-red-500" />
            <CardTitle className="text-base font-semibold text-red-600">
              You owe
            </CardTitle>
          </CardHeader>
          <CardContent>
            {balances?.oweDetails?.youOwe?.length > 0 ? (
              <>
                <div className="text-3xl font-bold text-red-600">
                  ₹{balances?.youOwe.toFixed(2)}
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  To {balances?.oweDetails?.youOwe?.length || 0} people
                </p>
              </>
            ) : (
              <>
                <div className="text-3xl font-bold text-gray-700">₹0.00</div>
                <p className="text-xs text-gray-500 mt-1">
                  You don't owe anyone
                </p>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column: Expense Summary & Monthly Snapshot */}
        <div className="lg:col-span-2 space-y-8 shadow border-1 rounded-xl">
          <ExpenseSummary
            monthlySpending={monthlySpending}
            totalSpent={totalSpent}
          />
        </div>

        {/* Right column: Balance Details & Groups */}
        <div className="space-y-8">
          {/* Balance Details */}
          <Card className="rounded-xl shadow bg-white border border-gray-200">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-teal-700 font-semibold">
                  Balance Details
                </CardTitle>
                <Button
                  variant="link"
                  asChild
                  className="p-0 text-teal-600 hover:underline"
                >
                  <Link href="/contacts">
                    View all <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <BalanceSummary balances={balances} />
            </CardContent>
          </Card>

          {/* Groups */}
          <Card className="rounded-xl shadow bg-white border border-gray-200">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-teal-700 font-semibold">
                  Your Groups
                </CardTitle>
                <Button
                  variant="link"
                  asChild
                  className="p-0 text-teal-600 hover:underline"
                >
                  <Link href="/contacts">
                    View all <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <GroupList groups={groups} />
            </CardContent>
            <CardFooter>
              <Button
                variant="outline"
                asChild
                className="w-full border-teal-600 text-teal-700 hover:bg-teal-50"
              >
                <Link href="/contacts?createGroup=true">
                  <Users className="mr-2 h-4 w-4" />
                  Create New Group
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
