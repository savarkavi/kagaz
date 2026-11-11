import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import { Suspense } from "react";
import { Button } from "../ui/button";

const Header = () => {
  return (
    <header className="flex fixed top-0 w-full justify-end items-center px-4 py-1 gap-4 border-b">
      <div className="max-w-5xl mx-auto w-full flex items-center justify-between">
        <div className="relative w-12 h-12">
          <Image
            src="/placeholder-logo.svg"
            alt="logo"
            fill
            className="object-contain"
          />
        </div>
        <Suspense>
          <Show when="signed-out">
            <div className="flex items-center gap-4">
              <SignInButton>
                <Button variant="outline">Sign In</Button>
              </SignInButton>
              <SignUpButton>
                <Button>Sign Up</Button>
              </SignUpButton>
            </div>
          </Show>
          <Show when="signed-in">
            <UserButton />
          </Show>
        </Suspense>
      </div>
    </header>
  );
};

export default Header;
