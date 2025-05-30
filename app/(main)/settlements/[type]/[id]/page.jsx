"use client";

import { useParams, useRouter } from "next/navigation";
import { api } from "@/convex/_generated/api";
import { useConvexQuery } from "@/hooks/use-convex-query";
import { BarLoader } from "react-spinners";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ArrowLeft, Users, Wallet } from "lucide-react";
import SettlementForm from "../../components/settlement-form";

export default function SettlementPage() {
  const params = useParams();
  const router = useRouter();
  const { type, id } = params;

  const { data, isLoading } = useConvexQuery(
    api.settlements.getSettlementData,
    {
      entityType: type,
      entityId: id,
    }
  );

  if (isLoading) {
    return (
      <div className="container mx-auto py-12">
        <BarLoader width={"100%"} color="#36d7b7" />
      </div>
    );
  }

  const handleSuccess = () => {
    if (type === "user") {
      router.push(`/person/${id}`);
    } else if (type === "group") {
      router.push(`/groups/${id}`);
    }
  };

  return (
    <div className="container mx-auto py-8 max-w-lg">
      <Button
        variant="outline"
        size="sm"
        className="mb-6"
        onClick={() => router.back()}
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back
      </Button>

      <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 mb-8">
        <div className="flex items-center justify-center rounded-md bg-teal-100 p-3 h-16 w-16">
          <Wallet className="h-6 w-6 text-teal-600" />
        </div>
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">
            Record Settlement
          </h1>
          <p className="text-muted-foreground mt-1">
            {type === "user"
              ? `Settling up with ${data?.counterpart?.name}`
              : `Settling up in ${data?.group?.name}`}
          </p>
        </div>
      </div>

      <Card className="bg-white rounded-xl shadow-sm">
        <CardHeader className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 pb-4">
          <div className="flex items-center justify-center rounded-md bg-muted/20 p-2">
            {type === "user" ? (
              <Avatar className="h-10 w-10">
                <AvatarImage src={data?.counterpart?.imageUrl} />
                <AvatarFallback>
                  {data?.counterpart?.name?.charAt(0) || "?"}
                </AvatarFallback>
              </Avatar>
            ) : (
              <div className="p-2">
                <Users className="h-6 w-6 text-primary" />
              </div>
            )}
          </div>
          <CardTitle className="text-lg font-semibold">
            {type === "user" ? data?.counterpart?.name : data?.group?.name}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <SettlementForm
            entityType={type}
            entityData={data}
            onSuccess={handleSuccess}
          />
        </CardContent>
      </Card>
    </div>
  );
}
