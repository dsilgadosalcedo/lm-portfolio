"use client";

import { useState, useRef } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, X, User, Camera } from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import Image from "next/image";

export const PhotoUpload = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const generateUploadUrl = useMutation(api.mutations.generateUploadUrl);
  const updateItem = useMutation(api.mutations.updatePortfolioItem);
  const createItem = useMutation(api.mutations.createPortfolioItem);
  
  // Get current profile photo
  const profilePhoto = useQuery(api.queries.getItemsByCategory, { category: "profile-photo" });
  const currentPhoto = profilePhoto?.[0];
  
  // Get file URL if we have a storage ID
  const fileUrl = useQuery(
    api.queries.getFileUrl,
    currentPhoto?.imageUrl ? { storageId: currentPhoto.imageUrl } : "skip"
  );

  const handleUpload = async (file: File) => {
    if (!file) return;
    
    setIsUploading(true);
    try {
      // Generate upload URL
      const uploadUrl = await generateUploadUrl();
      
      // Upload file to Convex storage
      const result = await fetch(uploadUrl, {
        method: "POST",
        headers: { "Content-Type": file.type },
        body: file,
      });
      
      if (!result.ok) {
        throw new Error("Upload failed");
      }
      
      const { storageId } = await result.json();
      
      // Update or create profile photo item
      if (currentPhoto) {
        // Update existing profile photo
        await updateItem({
          id: currentPhoto._id,
          imageUrl: storageId,
        });
      } else {
        // Create new profile photo item
        await createItem({
          category: "profile-photo",
          content: "Profile Photo",
          imageUrl: storageId,
          order: 1,
        });
      }
      
    } catch (error) {
      console.error("Error uploading photo:", error);
      alert("Error uploading photo. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleUpload(file);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleUpload(file);
    }
  };

  const removePhoto = async () => {
    if (!currentPhoto) return;
    
    try {
      await updateItem({
        id: currentPhoto._id,
        imageUrl: "",
      });
    } catch (error) {
      console.error("Error removing photo:", error);
      alert("Error removing photo. Please try again.");
    }
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Camera className="w-5 h-5" />
          Foto de Perfil
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center gap-4">
          {/* Current Photo Display */}
          {fileUrl ? (
            <div className="relative">
              <Image
                src={fileUrl}
                alt="Profile"
                width={128}
                height={128}
                className="w-32 h-32 rounded-full object-cover border-4 border-border"
              />
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    size="sm"
                    variant="destructive"
                    className="absolute -top-2 -right-2 rounded-full w-8 h-8 p-0"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>¿Eliminar foto?</AlertDialogTitle>
                    <AlertDialogDescription>
                      ¿Estás seguro de que quieres eliminar la foto de perfil actual?
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={removePhoto}
                      className="bg-red-600 hover:bg-red-700"
                    >
                      Eliminar
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          ) : (
            <div className="w-32 h-32 rounded-full bg-muted flex items-center justify-center border-4 border-dashed border-border">
              <User className="w-12 h-12 text-muted-foreground" />
            </div>
          )}

          {/* Upload Area */}
          <div
            className={`w-full max-w-md p-6 border-2 border-dashed rounded-lg text-center transition-colors ${
              dragActive
                ? "border-primary bg-primary/5"
                : "border-border hover:border-primary/50"
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />
            
            <div className="flex flex-col items-center gap-2">
              <Upload className="w-8 h-8 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">
                  {isUploading ? "Subiendo..." : "Arrastra una imagen aquí o"}
                </p>
                <Button
                  variant="link"
                  className="p-0 h-auto text-sm"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                >
                  selecciona un archivo
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                PNG, JPG, GIF hasta 5MB
              </p>
            </div>
          </div>

          {isUploading && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              Subiendo imagen...
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}; 