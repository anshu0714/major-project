"use client";

import { useRouter } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ExpenseForm from "./components/expense-form";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { WalletCards } from "lucide-react";

export default function NewExpensePage() {
  const router = useRouter();

  return (
    <div className="container max-w-3xl mx-auto py-8">
      {/* Modern, clean header */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 mb-8">
        <div className="flex items-center justify-center rounded-md bg-teal-100 p-3 h-16 w-16">
          <WalletCards className="h-6 w-6 text-teal-600" />
        </div>
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">
            New Expense
          </h1>
          <p className="text-muted-foreground mt-1">
            Record a new expense to split with others
          </p>
        </div>
      </div>

      {/* Card with clean tabs and content */}
      <Card className="bg-white rounded-xl shadow-sm">
        <Tabs defaultValue="individual" className="w-full">
          <CardHeader>
            <CardTitle className="sr-only">Expense Type</CardTitle>
            <TabsList className="grid w-full grid-cols-2 bg-gray-100 rounded-lg">
              <TabsTrigger value="individual">Individual</TabsTrigger>
              <TabsTrigger value="group">Group</TabsTrigger>
            </TabsList>
          </CardHeader>
          <CardContent className="pt-6">
            <TabsContent value="individual" className="focus-visible:ring-0">
              <ExpenseForm
                type="individual"
                onSuccess={(id) => router.push(`/person/${id}`)}
              />
            </TabsContent>
            <TabsContent value="group" className="focus-visible:ring-0">
              <ExpenseForm
                type="group"
                onSuccess={(id) => router.push(`/group/${id}`)}
              />
            </TabsContent>
          </CardContent>
        </Tabs>
      </Card>
    </div>
  );
}
