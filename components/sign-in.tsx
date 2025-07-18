"use client"

import * as Clerk from "@clerk/elements/common"
import * as SignIn from "@clerk/elements/sign-in"
import { AlertCircleIcon, LoaderPinwheelIcon } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function SignInPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <div className="bg-accent relative mx-auto w-96 rounded-[2.4rem] p-2">
        <div className="from-background to-background/97 bg-primary border-primary/30 space-y-4 rounded-4xl border bg-gradient-to-b px-8 py-12">
          <h1 className="mb-10 text-center text-xl font-bold">Iniciar sesión</h1>

          <div className="flex items-center justify-center">
            <SignIn.Root>
              <Clerk.Loading>
                {(isGlobalLoading: boolean) => (
                  <SignIn.Step name="start" className="w-full space-y-5">
                    <Clerk.Field name="identifier">
                      <Clerk.Label asChild>
                        <Label className="mb-2">Usuario</Label>
                      </Clerk.Label>
                      <Clerk.Input
                        placeholder="mi-usuario"
                        type="identifier"
                        asChild
                        disabled={isGlobalLoading}
                        required
                        value="im-linda"
                      >
                        <Input />
                      </Clerk.Input>

                      <Clerk.FieldError className="absolute -bottom-20 left-1/2 flex w-fit -translate-x-1/2">
                        {({ message }) => (
                          <Alert variant="destructive">
                            <AlertCircleIcon />
                            <AlertDescription className="whitespace-nowrap">
                              {message}
                            </AlertDescription>
                          </Alert>
                        )}
                      </Clerk.FieldError>
                    </Clerk.Field>

                    <Clerk.Field name="password">
                      <Clerk.Label asChild>
                        <Label className="mb-2">Contraseña</Label>
                      </Clerk.Label>
                      <Clerk.Input
                        type="password"
                        autoComplete="password"
                        placeholder="●●●●●●●●"
                        asChild
                        disabled={isGlobalLoading}
                        required
                      >
                        <Input />
                      </Clerk.Input>
                      <Clerk.FieldError className="absolute -bottom-20 left-1/2 flex w-fit -translate-x-1/2">
                        {({ message }) => (
                          <Alert variant="destructive">
                            <AlertCircleIcon />
                            <AlertDescription className="whitespace-nowrap">
                              {message}
                            </AlertDescription>
                          </Alert>
                        )}
                      </Clerk.FieldError>
                    </Clerk.Field>

                    <SignIn.Action submit asChild disabled={isGlobalLoading}>
                      <Button disabled={isGlobalLoading} className="w-full">
                        {isGlobalLoading ? (
                          <LoaderPinwheelIcon className="animate-spin" />
                        ) : (
                          "Iniciar sesión"
                        )}
                      </Button>
                    </SignIn.Action>
                  </SignIn.Step>
                )}
              </Clerk.Loading>
            </SignIn.Root>
          </div>
        </div>
      </div>
    </main>
  )
}
