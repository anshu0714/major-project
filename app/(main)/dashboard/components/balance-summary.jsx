import { ArrowDownCircle, ArrowUpCircle } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";
import React from "react";

const BalanceSummary = ({ balances }) => {
  if (!balances) return null;

  const { youAreOwedBy, youOwe } = balances.oweDetails;

  const renderOwedSection = () => (
    <section className="mb-6">
      <header className="flex items-center mb-2">
        <ArrowUpCircle className="h-4 w-4 text-teal-500 mr-2" />
        <h3 className="text-sm font-medium">Owed to You</h3>
      </header>
      <ul className="space-y-2">
        {youAreOwedBy.map((person) => (
          <li key={person.userId}>
            <Link
              href={`/person/${person.userId}`}
              className="flex items-center justify-between p-2 rounded-md hover:bg-muted transition-colors"
            >
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={person.imageUrl} />
                  <AvatarFallback>{person.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <span className="text-sm">{person.name}</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );

  const renderOwingSection = () => (
    <section className="mb-6">
      <header className="flex items-center mb-2">
        <ArrowDownCircle className="h-4 w-4 text-red-500 mr-2" />
        <h3 className="text-sm font-medium">You Owe</h3>
      </header>
      <ul className="space-y-2">
        {youOwe.map((person) => (
          <li key={person.userId}>
            <Link
              href={`/person/${person.userId}`}
              className="flex items-center justify-between p-2 rounded-md hover:bg-muted transition-colors"
            >
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={person.imageUrl} />
                  <AvatarFallback>{person.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <span className="text-sm">{person.name}</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );

  const renderSettled = () => (
    <div className="py-6 text-center">
      <p className="text-muted-foreground">You're all settled up!</p>
    </div>
  );

  return (
    <div className="space-y-4">
      {youAreOwedBy.length > 0 && renderOwedSection()}
      {youOwe.length > 0 && renderOwingSection()}
      {youAreOwedBy.length === 0 && youOwe.length === 0 && renderSettled()}
    </div>
  );
};

export default BalanceSummary;
