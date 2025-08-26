"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AddItemForm {
  category: string;
  content: string;
  description: string;
  order: number;
}

interface AddItemDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedTable: string;
  form: AddItemForm;
  onFormChange: (form: AddItemForm) => void;
  onSubmit: () => void;
  onCancel: () => void;
  shouldShowDescription: (category: string) => boolean;
  multiItemCategories: string[];
}

export function AddItemDialog({
  open,
  onOpenChange,
  selectedTable,
  form,
  onFormChange,
  onSubmit,
  onCancel,
  shouldShowDescription,
  multiItemCategories,
}: AddItemDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={
          selectedTable === "service-dev" ||
          selectedTable === "service-business"
            ? "sm:max-w-[720px]"
            : "sm:max-w-[425px]"
        }
      >
        <DialogHeader>
          <DialogTitle>Agregar Nuevo Elemento</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {selectedTable !== "experience" && (
            <div className="flex items-center gap-4">
              <Label htmlFor="category" className="text-right flex w-24">
                Categoría
              </Label>
              <Select
                value={form.category}
                onValueChange={(value) =>
                  onFormChange({ ...form, category: value })
                }
              >
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="Seleccionar categoría" />
                </SelectTrigger>
                <SelectContent>
                  {selectedTable === "contact" && (
                    <>
                      <SelectItem value="linkedin">LinkedIn</SelectItem>
                      <SelectItem value="description">Descripción</SelectItem>
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
          <div className="flex items-center gap-4">
            <Label htmlFor="content" className="text-right flex w-24">
              Contenido
            </Label>
            <Input
              id="content"
              className="flex-1"
              value={form.content}
              onChange={(e) =>
                onFormChange({
                  ...form,
                  content: e.target.value,
                })
              }
              placeholder="Ingresa el contenido..."
            />
          </div>
          {shouldShowDescription(form.category) && (
            <div className="flex items-center gap-4">
              <Label htmlFor="description" className="text-right w-24">
                Descripción
              </Label>
              <Input
                id="description"
                className="flex-1"
                value={form.description}
                onChange={(e) =>
                  onFormChange({
                    ...form,
                    description: e.target.value,
                  })
                }
                placeholder="Ingresa la descripción..."
              />
            </div>
          )}
          {multiItemCategories.includes(form.category) && (
            <div className="flex items-center gap-4">
              <Label htmlFor="order" className="text-right flex w-24">
                Orden
              </Label>
              <Input
                id="order"
                type="number"
                className="flex-1"
                value={form.order}
                onChange={(e) =>
                  onFormChange({
                    ...form,
                    order: parseInt(e.target.value) || 0,
                  })
                }
                placeholder="0"
              />
            </div>
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
          <Button onClick={onSubmit} disabled={!form.category || !form.content}>
            Agregar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
