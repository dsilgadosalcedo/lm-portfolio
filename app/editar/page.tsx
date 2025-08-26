"use client";

import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Edit,
  Save,
  X,
  Trash2,
  Plus,
  ArrowLeft,
  LogOut,
  Linkedin,
  Mail,
  MessageCircle,
  User,
  Briefcase,
  Code,
  Building2,
  FileText,
} from "lucide-react";
import { ConvexPortfolioItem } from "@/lib/convex.mapper";
import type { Id } from "@/convex/_generated/dataModel";
import { PhotoUpload } from "@/components/photo-upload";
import Link from "next/link";
import { useUser, SignOutButton, SignedIn } from "@clerk/nextjs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Label } from "@/components/ui/label";

// Categories that have multiple items and need ordering
const MULTI_ITEM_CATEGORIES = [
  "service-dev-item",
  "service-business-item",
  "experience",
];

// Function to get category color
const getCategoryColor = (category: string) => {
  const colorMap: Record<string, string> = {
    linkedin: "bg-blue-100/20 border-blue-200/50",
    description: "bg-green-100/20 border-green-200/50",
    email: "bg-purple-100/20 border-purple-200/50",
    "profile-photo": "bg-pink-100/20 border-pink-200/50",
    whatsapp: "bg-emerald-100/20 border-emerald-200/50",
    experience: "bg-orange-100/20 border-orange-200/50",
    "service-dev-title": "bg-indigo-100/20 border-indigo-200/50",
    "service-dev-item": "bg-cyan-100/20 border-cyan-200/50",
    "service-business-title": "bg-amber-100/20 border-amber-200/50",
    "service-business-item": "bg-lime-100/20 border-lime-200/50",
  };

  return colorMap[category] || "bg-gray-100/20 border-gray-200/50";
};

// Function to get category icon
const getCategoryIcon = (category: string) => {
  const iconMap: Record<
    string,
    React.ComponentType<React.SVGProps<SVGSVGElement>>
  > = {
    linkedin: Linkedin,
    description: FileText,
    email: Mail,
    "profile-photo": User,
    whatsapp: MessageCircle,
    experience: Briefcase,
    "service-dev-title": Code,
    "service-dev-item": Code,
    "service-business-title": Building2,
    "service-business-item": Building2,
  };

  return iconMap[category] || FileText;
};

export default function EditarPage() {
  const { user } = useUser();
  const items = useQuery(api.queries.getAllPortfolioItems);
  const updateItem = useMutation(api.mutations.updatePortfolioItem);
  const deleteItem = useMutation(api.mutations.deletePortfolioItem);
  const createItem = useMutation(api.mutations.createPortfolioItem);

  const [editingId, setEditingId] = useState<Id<"portfolio_lm"> | null>(null);
  const [editForm, setEditForm] = useState({
    content: "",
    order: 0,
  });
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newItemForm, setNewItemForm] = useState({
    category: "",
    content: "",
    order: 0,
  });
  const [selectedTable, setSelectedTable] = useState<string>("");

  // Filter items by category groups
  const contactItems = items
    ? items.filter((item) =>
        ["description", "email", "linkedin", "whatsapp"].includes(item.category)
      )
    : [];

  const serviceDevItems = items
    ? items.filter((item) =>
        ["service-dev-title", "service-dev-item"].includes(item.category)
      )
    : [];

  const serviceBusinessItems = items
    ? items.filter((item) =>
        ["service-business-title", "service-business-item"].includes(
          item.category
        )
      )
    : [];

  const experienceItems = items
    ? items.filter((item) => item.category === "experience")
    : [];

  const handleEdit = (item: ConvexPortfolioItem) => {
    setEditingId(item._id as Id<"portfolio_lm">);
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
      const item = items?.find((i) => i._id === id);
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

  const handleAddItem = async () => {
    try {
      const createData: {
        category: string;
        content: string;
        order?: number;
      } = {
        category: newItemForm.category,
        content: newItemForm.content,
      };

      // Only include order if the category needs it
      if (MULTI_ITEM_CATEGORIES.includes(newItemForm.category)) {
        createData.order = newItemForm.order;
      }

      await createItem(createData);
      setIsAddDialogOpen(false);
      setNewItemForm({ category: "", content: "", order: 0 });
      setSelectedTable("");
    } catch (error) {
      console.error("Error creating item:", error);
    }
  };

  const handleCancelAdd = () => {
    setIsAddDialogOpen(false);
    setNewItemForm({ category: "", content: "", order: 0 });
    setSelectedTable("");
  };

  const shouldShowOrder = (category: string) => {
    return MULTI_ITEM_CATEGORIES.includes(category);
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <Link href="/">
            <Button variant="ghost" size="icon" className="md:size-10">
              <ArrowLeft size={14} />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Editar Portafolio</h1>
        </div>

        <div className="flex items-center gap-2">
          {user && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Bonjour{user.firstName && `, ${user.firstName}!`}</span>
            </div>
          )}
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Agregar Nuevo Elemento</DialogTitle>
                <DialogDescription>
                  Completa los campos para agregar un nuevo elemento al
                  portafolio.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                {selectedTable !== "experience" && (
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="category" className="text-right">
                      Categoría
                    </Label>
                    <Select
                      value={newItemForm.category}
                      onValueChange={(value) =>
                        setNewItemForm({ ...newItemForm, category: value })
                      }
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Seleccionar categoría" />
                      </SelectTrigger>
                      <SelectContent>
                        {selectedTable === "contact" && (
                          <>
                            <SelectItem value="linkedin">LinkedIn</SelectItem>
                            <SelectItem value="description">
                              Descripción
                            </SelectItem>
                            <SelectItem value="email">Email</SelectItem>
                            <SelectItem value="whatsapp">WhatsApp</SelectItem>
                          </>
                        )}
                        {selectedTable === "service-dev" && (
                          <>
                            <SelectItem value="service-dev-title">
                              Servicios Dev - Título
                            </SelectItem>
                            <SelectItem value="service-dev-item">
                              Servicios Dev - Item
                            </SelectItem>
                          </>
                        )}
                        {selectedTable === "service-business" && (
                          <>
                            <SelectItem value="service-business-title">
                              Servicios Business - Título
                            </SelectItem>
                            <SelectItem value="service-business-item">
                              Servicios Business - Item
                            </SelectItem>
                          </>
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                )}
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="content" className="text-right">
                    Contenido
                  </Label>
                  <Input
                    id="content"
                    value={newItemForm.content}
                    onChange={(e) =>
                      setNewItemForm({
                        ...newItemForm,
                        content: e.target.value,
                      })
                    }
                    className="col-span-3"
                    placeholder="Ingresa el contenido..."
                  />
                </div>
                {MULTI_ITEM_CATEGORIES.includes(newItemForm.category) && (
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="order" className="text-right">
                      Orden
                    </Label>
                    <Input
                      id="order"
                      type="number"
                      value={newItemForm.order}
                      onChange={(e) =>
                        setNewItemForm({
                          ...newItemForm,
                          order: parseInt(e.target.value) || 0,
                        })
                      }
                      className="col-span-3"
                      placeholder="0"
                    />
                  </div>
                )}
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={handleCancelAdd}>
                  Cancelar
                </Button>
                <Button
                  onClick={handleAddItem}
                  disabled={!newItemForm.category || !newItemForm.content}
                >
                  Agregar
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <SignedIn>
            <SignOutButton>
              <Button
                variant="outline"
                size="icon"
                className="md:size-10 hover:bg-transparent"
              >
                <LogOut className="w-4 h-4" />
              </Button>
            </SignOutButton>
          </SignedIn>
        </div>
      </div>

      {/* Photo Upload Section */}
      <PhotoUpload />

      {!items ? (
        <Card className="rounded-4xl">
          <CardContent className="p-8 text-center">
            <p className="text-muted-foreground">Cargando...</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {/* Contact Information Table */}
          <Card className="rounded-4xl">
            <CardHeader className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5" />
                Información de Contacto ({contactItems.length})
              </CardTitle>
              <Button
                size="sm"
                className="bg-green-600 hover:bg-green-700 rounded-full"
                onClick={() => {
                  setIsAddDialogOpen(true);
                  setSelectedTable("contact");
                  setNewItemForm({ category: "", content: "", order: 0 });
                }}
              >
                <Plus className="w-4 h-4 mr-1" /> Agregar Item
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-52 shrink-0">Categoría</TableHead>
                    <TableHead className="w-flex">Contenido</TableHead>
                    <TableHead className="w-24 shrink-0"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {contactItems.map((item) => (
                    <TableRow key={item._id} className="group">
                      <TableCell>
                        <Badge
                          className={`${getCategoryColor(
                            item.category
                          )} text-white font-semibold flex items-center gap-1`}
                        >
                          {(() => {
                            const IconComponent = getCategoryIcon(
                              item.category
                            );
                            return <IconComponent className="w-3 h-3" />;
                          })()}
                          {item.category}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {editingId === item._id ? (
                          <Input
                            value={editForm.content}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) =>
                              setEditForm({
                                ...editForm,
                                content: e.target.value,
                              })
                            }
                            className="w-full "
                          />
                        ) : (
                          <div
                            className="max-w-xs truncate"
                            title={item.content}
                          >
                            {item.content}
                          </div>
                        )}
                      </TableCell>
                      <TableCell>
                        {editingId === item._id ? (
                          <div className="flex gap-2">
                            <Button
                              size="icon"
                              variant="ghost"
                              className="md:size-10"
                              onClick={() => handleSave(item._id)}
                            >
                              <Save size={14} />
                            </Button>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="md:size-10"
                              onClick={handleCancel}
                            >
                              <X size={14} />
                            </Button>
                          </div>
                        ) : (
                          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            <Button
                              size="icon"
                              variant="ghost"
                              className="md:size-10"
                              onClick={() => handleEdit(item)}
                            >
                              <Edit size={14} />
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button
                                  size="icon"
                                  variant="ghost"
                                  className="text-red-400 hover:text-red-500 md:size-10"
                                >
                                  <Trash2 size={14} />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>
                                    ¿Estás seguro?
                                  </AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Esta acción no se puede deshacer. Se
                                    eliminará permanentemente este elemento del
                                    portafolio.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>
                                    Cancelar
                                  </AlertDialogCancel>
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
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Service Dev Table */}
          <Card className="rounded-4xl">
            <CardHeader className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Code className="w-5 h-5" />
                Servicios de Desarrollo ({serviceDevItems.length})
              </CardTitle>
              <Button
                size="sm"
                className="bg-green-600 hover:bg-green-700 rounded-full"
                onClick={() => {
                  setIsAddDialogOpen(true);
                  setSelectedTable("service-dev");
                  setNewItemForm({
                    category: "service-dev-item",
                    content: "",
                    order: 0,
                  });
                }}
              >
                <Plus className="w-4 h-4 mr-1" /> Agregar Item
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-52 shrink-0">Categoría</TableHead>
                    <TableHead className="w-flex">Contenido</TableHead>
                    {serviceDevItems.some((item) =>
                      shouldShowOrder(item.category)
                    ) && <TableHead className="w-24 shrink-0">Orden</TableHead>}
                    <TableHead className="w-24 shrink-0"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {serviceDevItems.map((item) => (
                    <TableRow key={item._id} className="group">
                      <TableCell>
                        <Badge
                          className={`${getCategoryColor(
                            item.category
                          )} text-white font-semibold flex items-center gap-1`}
                        >
                          {(() => {
                            const IconComponent = getCategoryIcon(
                              item.category
                            );
                            return <IconComponent className="w-3 h-3" />;
                          })()}
                          {item.category}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {editingId === item._id ? (
                          <Input
                            value={editForm.content}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) =>
                              setEditForm({
                                ...editForm,
                                content: e.target.value,
                              })
                            }
                            className="w-full "
                          />
                        ) : (
                          <div
                            className="max-w-xs truncate"
                            title={item.content}
                          >
                            {item.content}
                          </div>
                        )}
                      </TableCell>
                      <TableCell>
                        {shouldShowOrder(item.category) && (
                          <>
                            {editingId === item._id ? (
                              <Input
                                type="number"
                                value={editForm.order}
                                onChange={(
                                  e: React.ChangeEvent<HTMLInputElement>
                                ) =>
                                  setEditForm({
                                    ...editForm,
                                    order: parseInt(e.target.value) || 0,
                                  })
                                }
                                className="w-10"
                              />
                            ) : (
                              item.order || ""
                            )}
                          </>
                        )}
                      </TableCell>
                      <TableCell>
                        {editingId === item._id ? (
                          <div className="flex gap-2">
                            <Button
                              size="icon"
                              variant="ghost"
                              className="md:size-10"
                              onClick={() => handleSave(item._id)}
                            >
                              <Save size={14} />
                            </Button>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="md:size-10"
                              onClick={handleCancel}
                            >
                              <X size={14} />
                            </Button>
                          </div>
                        ) : (
                          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            <Button
                              size="icon"
                              variant="ghost"
                              className="md:size-10"
                              onClick={() => handleEdit(item)}
                            >
                              <Edit size={14} />
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button
                                  size="icon"
                                  variant="ghost"
                                  className="text-red-400 hover:text-red-500 md:size-10"
                                >
                                  <Trash2 size={14} />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>
                                    ¿Estás seguro?
                                  </AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Esta acción no se puede deshacer. Se
                                    eliminará permanentemente este elemento del
                                    portafolio.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>
                                    Cancelar
                                  </AlertDialogCancel>
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
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Service Business Table */}
          <Card className="rounded-4xl">
            <CardHeader className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Building2 className="w-5 h-5" />
                Servicios de Negocio ({serviceBusinessItems.length})
              </CardTitle>
              <Button
                size="sm"
                className="bg-green-600 hover:bg-green-700 rounded-full"
                onClick={() => {
                  setIsAddDialogOpen(true);
                  setSelectedTable("service-business");
                  setNewItemForm({
                    category: "service-business-item",
                    content: "",
                    order: 0,
                  });
                }}
              >
                <Plus className="w-4 h-4 mr-1" /> Agregar Item
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-52 shrink-0">Categoría</TableHead>
                    <TableHead className="w-flex">Contenido</TableHead>
                    {serviceBusinessItems.some((item) =>
                      shouldShowOrder(item.category)
                    ) && <TableHead className="w-24 shrink-0">Orden</TableHead>}
                    <TableHead className="w-24 shrink-0"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {serviceBusinessItems.map((item) => (
                    <TableRow key={item._id} className="group">
                      <TableCell>
                        <Badge
                          className={`${getCategoryColor(
                            item.category
                          )} text-white font-semibold flex items-center gap-1`}
                        >
                          {(() => {
                            const IconComponent = getCategoryIcon(
                              item.category
                            );
                            return <IconComponent className="w-3 h-3" />;
                          })()}
                          {item.category}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {editingId === item._id ? (
                          <Input
                            value={editForm.content}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) =>
                              setEditForm({
                                ...editForm,
                                content: e.target.value,
                              })
                            }
                            className="w-full "
                          />
                        ) : (
                          <div
                            className="max-w-xs truncate"
                            title={item.content}
                          >
                            {item.content}
                          </div>
                        )}
                      </TableCell>
                      <TableCell>
                        {shouldShowOrder(item.category) && (
                          <>
                            {editingId === item._id ? (
                              <Input
                                type="number"
                                value={editForm.order}
                                onChange={(
                                  e: React.ChangeEvent<HTMLInputElement>
                                ) =>
                                  setEditForm({
                                    ...editForm,
                                    order: parseInt(e.target.value) || 0,
                                  })
                                }
                                className="w-10"
                              />
                            ) : (
                              item.order || ""
                            )}
                          </>
                        )}
                      </TableCell>
                      <TableCell>
                        {editingId === item._id ? (
                          <div className="flex gap-2">
                            <Button
                              size="icon"
                              variant="ghost"
                              className="md:size-10"
                              onClick={() => handleSave(item._id)}
                            >
                              <Save size={14} />
                            </Button>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="md:size-10"
                              onClick={handleCancel}
                            >
                              <X size={14} />
                            </Button>
                          </div>
                        ) : (
                          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            <Button
                              size="icon"
                              variant="ghost"
                              className="md:size-10"
                              onClick={() => handleEdit(item)}
                            >
                              <Edit size={14} />
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button
                                  size="icon"
                                  variant="ghost"
                                  className="text-red-400 hover:text-red-500 md:size-10"
                                >
                                  <Trash2 size={14} />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>
                                    ¿Estás seguro?
                                  </AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Esta acción no se puede deshacer. Se
                                    eliminará permanentemente este elemento del
                                    portafolio.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>
                                    Cancelar
                                  </AlertDialogCancel>
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
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Experience Table */}
          <Card className="rounded-4xl">
            <CardHeader className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="w-5 h-5" />
                Experiencia ({experienceItems.length})
              </CardTitle>
              <Button
                size="sm"
                className="bg-green-600 hover:bg-green-700 rounded-full"
                onClick={() => {
                  setIsAddDialogOpen(true);
                  setSelectedTable("experience");
                  setNewItemForm({
                    category: "experience",
                    content: "",
                    order: 0,
                  });
                }}
              >
                <Plus className="w-4 h-4 mr-1" /> Agregar Item
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-52 shrink-0">Categoría</TableHead>
                    <TableHead className="w-flex">Contenido</TableHead>
                    {experienceItems.some((item) =>
                      shouldShowOrder(item.category)
                    ) && <TableHead className="w-24 shrink-0">Orden</TableHead>}
                    <TableHead className="w-24 shrink-0"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {experienceItems.map((item) => (
                    <TableRow key={item._id} className="group">
                      <TableCell>
                        <Badge
                          className={`${getCategoryColor(
                            item.category
                          )} text-white font-semibold flex items-center gap-1`}
                        >
                          {(() => {
                            const IconComponent = getCategoryIcon(
                              item.category
                            );
                            return <IconComponent className="w-3 h-3" />;
                          })()}
                          {item.category}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {editingId === item._id ? (
                          <Input
                            value={editForm.content}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) =>
                              setEditForm({
                                ...editForm,
                                content: e.target.value,
                              })
                            }
                            className="w-full "
                          />
                        ) : (
                          <div
                            className="max-w-xs truncate"
                            title={item.content}
                          >
                            {item.content}
                          </div>
                        )}
                      </TableCell>
                      <TableCell>
                        {shouldShowOrder(item.category) && (
                          <>
                            {editingId === item._id ? (
                              <Input
                                type="number"
                                value={editForm.order}
                                onChange={(
                                  e: React.ChangeEvent<HTMLInputElement>
                                ) =>
                                  setEditForm({
                                    ...editForm,
                                    order: parseInt(e.target.value) || 0,
                                  })
                                }
                                className="w-10"
                              />
                            ) : (
                              item.order || ""
                            )}
                          </>
                        )}
                      </TableCell>
                      <TableCell>
                        {editingId === item._id ? (
                          <div className="flex gap-2">
                            <Button
                              size="icon"
                              variant="ghost"
                              className="md:size-10"
                              onClick={() => handleSave(item._id)}
                            >
                              <Save size={14} />
                            </Button>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="md:size-10"
                              onClick={handleCancel}
                            >
                              <X size={14} />
                            </Button>
                          </div>
                        ) : (
                          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            <Button
                              size="icon"
                              variant="ghost"
                              className="md:size-10"
                              onClick={() => handleEdit(item)}
                            >
                              <Edit size={14} />
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button
                                  size="icon"
                                  variant="ghost"
                                  className="text-red-400 hover:text-red-500 md:size-10"
                                >
                                  <Trash2 size={14} />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>
                                    ¿Estás seguro?
                                  </AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Esta acción no se puede deshacer. Se
                                    eliminará permanentemente este elemento del
                                    portafolio.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>
                                    Cancelar
                                  </AlertDialogCancel>
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
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
