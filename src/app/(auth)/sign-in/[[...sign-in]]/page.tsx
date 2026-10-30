import { SignIn } from "@clerk/nextjs";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense>
      <main className="h-screen flex items-center justify-center">
        <SignIn />
      </main>
    </Suspense>
  );
}
