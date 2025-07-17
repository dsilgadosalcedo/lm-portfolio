"use client";

import { useState, useRef, useEffect } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, X, User, Camera } from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

export const PhotoUpload = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const generateUploadUrl = useMutation(api.mutations.generateUploadUrl);
  const updateItem = useMutation(api.mutations.updatePortfolioItem);
  const createItem = useMutation(api.mutations.createPortfolioItem);
  const deleteFile = useMutation(api.mutations.deleteFile);
  const deleteItem = useMutation(api.mutations.deletePortfolioItem);
  
  // Get current profile photo
  const profilePhoto = useQuery(api.queries.getItemsByCategory, { category: "profile-photo" });
  const currentPhoto = profilePhoto?.[0];
  
  // Get file URL if we have a storage ID
  const fileUrl = useQuery(
    api.queries.getFileUrl,
    currentPhoto?.imageUrl && currentPhoto.imageUrl.trim() !== "" ? { storageId: currentPhoto.imageUrl } : "skip"
  );

  // Check if fileUrl is valid
  const isValidFileUrl = fileUrl && fileUrl !== "skip" && typeof fileUrl === "string";
  
  // Loading state - show loading when fetching data OR when uploading
  const isLoading = profilePhoto === undefined || (currentPhoto?.imageUrl && currentPhoto.imageUrl.trim() !== "" && fileUrl === undefined) || isUploading;

  // Global drag and drop handlers
  useEffect(() => {
    const handleGlobalDrag = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
    };

    const handleGlobalDragEnter = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(true);
    };

    const handleGlobalDragLeave = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      // Only set dragActive to false if we're leaving the window
      if (e.clientX <= 0 || e.clientY <= 0 || e.clientX >= window.innerWidth || e.clientY >= window.innerHeight) {
        setDragActive(false);
      }
    };

    const handleGlobalDrop = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);
      
      const file = e.dataTransfer?.files?.[0];
      if (file && file.type.startsWith('image/')) {
        handleUpload(file);
      }
    };

    // Add global event listeners
    document.addEventListener('dragenter', handleGlobalDragEnter);
    document.addEventListener('dragover', handleGlobalDrag);
    document.addEventListener('dragleave', handleGlobalDragLeave);
    document.addEventListener('drop', handleGlobalDrop);

    // Cleanup
    return () => {
      document.removeEventListener('dragenter', handleGlobalDragEnter);
      document.removeEventListener('dragover', handleGlobalDrag);
      document.removeEventListener('dragleave', handleGlobalDragLeave);
      document.removeEventListener('drop', handleGlobalDrop);
    };
  }, []);

  const handleUpload = async (file: File) => {
    if (!file) return;
    
    setIsUploading(true);
    try {
      // Delete old image if it exists
      if (currentPhoto?.imageUrl && currentPhoto.imageUrl.trim() !== "") {
        try {
          await deleteFile({ storageId: currentPhoto.imageUrl });
        } catch (error) {
          console.warn("Error deleting old image:", error);
          // Continue with upload even if deletion fails
        }
      }
      
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

  const removePhoto = async () => {
    if (!currentPhoto) return;
    
    try {
      // Delete file from storage if it exists
      if (currentPhoto.imageUrl && currentPhoto.imageUrl.trim() !== "") {
        try {
          await deleteFile({ storageId: currentPhoto.imageUrl });
        } catch (error) {
          console.warn("Error deleting file from storage:", error);
          // Continue with removal even if file deletion fails
        }
      }
      
      // Delete the entire portfolio item from the database
      await deleteItem({ id: currentPhoto._id });
    } catch (error) {
      console.error("Error removing photo:", error);
      alert("Error removing photo. Please try again.");
    }
  };

  return (
    <>
      {/* Global drag overlay */}
      {dragActive && (
        <div className="fixed inset-0 bg-primary/20 border-4 border-dashed border-primary z-50 flex items-center justify-center">
          <div className="bg-background p-8 rounded-lg shadow-lg text-center">
            <Upload className="w-16 h-16 text-primary mx-auto mb-4" />
            <p className="text-lg font-medium">Suelta la imagen aquí</p>
            <p className="text-sm text-muted-foreground">La imagen se subirá automáticamente</p>
          </div>
        </div>
      )}

      <Card className="mb-6 rounded-4xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Camera className="w-5 h-5" />
            Foto de Perfil
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center gap-4">
            {/* Hidden file input */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />
            
            {/* Current Photo Display - Clickable */}
            {isLoading ? (
              <div className="w-32 h-32 rounded-full bg-muted flex items-center justify-center border-4 border-dashed border-border">
                <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              </div>
            ) : isValidFileUrl ? (
              <div className="relative">
                <div className="group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                  <img
                    src={fileUrl}
                    alt="Profile"
                    className="w-32 h-32 rounded-full object-cover border-4 border-border transition-all group-hover:opacity-80 group-hover:scale-105"
                    onError={(e) => {
                      console.error("Error loading image:", e);
                      // Hide the image container on error
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 rounded-full bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                    <Upload className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
                
                {/* Remove button */}
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      size="sm"
                      variant="destructive"
                      className="absolute -top-2 -right-2 rounded-full w-8 h-8 p-0 z-10"
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
                      <AlertDialogCancel className="hover:bg-transparent">Cancelar</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={removePhoto}
                        className="bg-red-300 hover:bg-red-400"
                      >
                        Eliminar
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            ) : (
              <div 
                className="w-32 h-32 rounded-full bg-muted flex items-center justify-center border-4 border-dashed border-border cursor-pointer hover:border-primary/50 transition-colors group"
                onClick={() => fileInputRef.current?.click()}
              >
                <User className="w-12 h-12 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
            )}

            {/* Upload instructions */}
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                Haz clic en la imagen o arrastra una imagen aquí
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                PNG, JPG, GIF hasta 5MB
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}; 