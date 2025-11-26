"use client";

import { useState } from "react";
import { useAuthActions } from "@convex-dev/auth/react";
import { useRouter } from "next/navigation";
import { AlertCircleIcon, LoaderPinwheelIcon } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SignUpPage() {
  const { signIn } = useAuthActions();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const result = await signIn("password", {
        username: formData.username,
        password: formData.password,
        flow: "signUp",
      });

      if (result.signingIn) {
        // After successful sign-up, go straight to the editor
        router.push("/editar");
      } else {
        setError(
          "Error al crear la cuenta. Por favor, verifica los datos ingresados."
        );
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Error al crear la cuenta. Por favor, verifica los datos ingresados."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <div className="bg-accent relative mx-auto w-96 rounded-[2.4rem] p-2">
        <div className="from-background to-background/97 bg-primary border-primary/30 space-y-4 rounded-4xl border bg-gradient-to-b px-8 py-12">
          <h1 className="mb-10 text-center text-xl font-bold">
            Crear cuenta
          </h1>

          <div className="flex items-center justify-center">
            <form onSubmit={handleSubmit} className="w-full space-y-5">
              <div>
                <Label htmlFor="username" className="mb-2">
                  Usuario
                </Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="mi-usuario"
                  value={formData.username}
                  onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                  }
                  disabled={isLoading}
                  required
                  autoComplete="username"
                />
                {error && (
                  <Alert variant="destructive" className="mt-2">
                    <AlertCircleIcon />
                    <AlertDescription className="whitespace-nowrap">
                      {error}
                    </AlertDescription>
                  </Alert>
                )}
              </div>

              <div>
                <Label htmlFor="password" className="mb-2">
                  Contraseña
                </Label>
                <Input
                  id="password"
                  type="password"
                  autoComplete="new-password"
                  placeholder="●●●●●●●●"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  disabled={isLoading}
                  required
                />
                {error && (
                  <Alert variant="destructive" className="mt-2">
                    <AlertCircleIcon />
                    <AlertDescription className="whitespace-nowrap">
                      {error}
                    </AlertDescription>
                  </Alert>
                )}
              </div>

              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? (
                  <LoaderPinwheelIcon className="animate-spin" />
                ) : (
                  "Crear cuenta"
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}


