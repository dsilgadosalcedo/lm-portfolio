"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ServiceEditForm {
  content: string;
  description: string;
  order: number;
}

interface EditServiceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  form: ServiceEditForm;
  onFormChange: (form: ServiceEditForm) => void;
  onSubmit: () => void;
  onCancel: () => void;
}

export function EditServiceDialog({
  open,
  onOpenChange,
  form,
  onFormChange,
  onSubmit,
  onCancel,
}: EditServiceDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[720px]">
        <DialogHeader>
          <DialogTitle>Editar Servicio</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex items-center gap-4">
            <Label htmlFor="service-content" className="text-right w-24">
              Contenido
            </Label>
            <Input
              id="service-content"
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
          <div className="flex items-center gap-4">
            <Label htmlFor="service-description" className="text-right w-24">
              Descripción
            </Label>
            <Input
              id="service-description"
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
          <div className="flex items-center gap-4">
            <Label htmlFor="service-order" className="text-right w-24">
              Orden
            </Label>
            <Input
              id="service-order"
              type="number"
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
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
          <Button onClick={onSubmit}>Guardar cambios</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
