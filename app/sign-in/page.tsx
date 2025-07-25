import { Suspense } from "react";
import { SignInPage } from "@/components/sign-in"

export default function SignIn() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignInPage />
    </Suspense>
  )
}
