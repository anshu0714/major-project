import { SignUp } from "@clerk/nextjs";
import React from "react";

const SignUpPage = () => {
  return (
    <div className="flex flex-col items-center">
      <h2 className="text-3xl font-bold text-teal-500 mb-2 tracking-tight">
        Join Splitzy!
      </h2>
      <p className="text-slate-500 mb-8 text-base">
        Create an account to start managing your group expenses.
      </p>
      <SignUp
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

export default SignUpPage;
