"use client";

import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Edit, Save, X, Trash2, Plus } from "lucide-react";
import { ConvexPortfolioItem } from "@/lib/convex.mapper";
import type { Id } from "@/convex/_generated/dataModel";
import { PhotoUpload } from "@/components/photo-upload";

// Categories that have multiple items and need ordering
const MULTI_ITEM_CATEGORIES = [
  "service-dev-item",
  "service-business-item", 
  "experience"
];

export default function EditarPage() {
  const items = useQuery(api.queries.getAllPortfolioItems);
  const updateItem = useMutation(api.mutations.updatePortfolioItem);
  const deleteItem = useMutation(api.mutations.deletePortfolioItem);
  
  const [editingId, setEditingId] = useState<Id<"portfolio_lm"> | null>(null);
  const [editForm, setEditForm] = useState({
    content: "",
    order: 0,
  });

  const handleEdit = (item: ConvexPortfolioItem) => {
    setEditingId(item._id as Id<'portfolio_lm'>);
    setEditForm({
      content: item.content,
      order: item.order || 0,
    });
  };

  const handleSave = async (id: Id<"portfolio_lm">) => {
    try {
      const updateData: {
        id: Id<"portfolio_lm">;
        content: string;
        order?: number;
      } = {
        id,
        content: editForm.content,
      };
      
      // Only include order if the category needs it
      const item = items?.find(i => i._id === id);
      if (item && MULTI_ITEM_CATEGORIES.includes(item.category)) {
        updateData.order = editForm.order;
      }
      
      await updateItem(updateData);
      setEditingId(null);
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  const handleDelete = async (id: Id<"portfolio_lm">) => {
    if (confirm("¿Estás seguro de que quieres eliminar este elemento?")) {
      try {
        await deleteItem({ id });
      } catch (error) {
        console.error("Error deleting item:", error);
      }
    }
  };

  const handleCancel = () => {
    setEditingId(null);
  };

  const shouldShowOrder = (category: string) => {
    return MULTI_ITEM_CATEGORIES.includes(category);
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Editar Portafolio</h1>
        <Button className="bg-green-600 hover:bg-green-700">
          <Plus className="w-4 h-4 mr-2" />
          Agregar Item
        </Button>
      </div>
      
      {/* Photo Upload Section */}
      <PhotoUpload />
      
      {!items ? (
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-muted-foreground">Cargando...</p>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Elementos del Portafolio ({items.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-border">
                <thead>
                  <tr className="bg-muted">
                    <th className="p-3 text-left border border-border">Categoría</th>
                    <th className="p-3 text-left border border-border">Contenido</th>
                    {items.some(item => shouldShowOrder(item.category)) && (
                      <th className="p-3 text-left border border-border">Orden</th>
                    )}
                    <th className="p-3 text-left border border-border">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {items?.map((item) => (
                    <tr key={item._id} className="border-b border-border hover:bg-muted/50">
                      <td className="p-3 border border-border">
                        <Badge variant="secondary">{item.category}</Badge>
                      </td>
                      <td className="p-3 border border-border">
                        {editingId === item._id ? (
                          <Textarea
                            value={editForm.content}
                            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setEditForm({ ...editForm, content: e.target.value })}
                            className="w-full min-h-[60px]"
                          />
                        ) : (
                          <div className="max-w-xs truncate" title={item.content}>
                            {item.content}
                          </div>
                        )}
                      </td>
                      <td className="p-3 border border-border">
                      {shouldShowOrder(item.category) && (
                        <> 
                          {editingId === item._id ? (
                            <Input
                              type="number"
                              value={editForm.order}
                              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditForm({ ...editForm, order: parseInt(e.target.value) || 0 })}
                              className="w-20"
                            />
                          ) : (
                            item.order || ""
                          )}
                        </>
                      )}
                      </td>
                      <td className="p-3 border border-border">
                        {editingId === item._id ? (
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              onClick={() => handleSave(item._id)}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              <Save className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={handleCancel}
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                        ) : (
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleEdit(item)}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="text-red-600 hover:text-red-700"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Esta acción no se puede deshacer. Se eliminará permanentemente este elemento del portafolio.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => handleDelete(item._id)}
                                    className="bg-red-600 hover:bg-red-700"
                                  >
                                    Eliminar
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
} 