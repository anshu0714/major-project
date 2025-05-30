import { SignIn } from "@clerk/nextjs";
import React from "react";

const LogInPage = () => {
  return (
    <div className="flex flex-col items-center">
      <h2 className="text-3xl font-bold text-teal-500 mb-2 tracking-tight">
          Welcome to Splitzy!
        </h2>
        <p className="text-slate-500 mb-8 text-base">
          Sign in to access your personalized dashboard.
        </p>
       <SignIn
            appearance={{
              elements: {
                headerTitle: "hidden", 
                headerSubtitle: "hidden", 
              },
            }}
          />
    </div>
  );
};

export default LogInPage;
