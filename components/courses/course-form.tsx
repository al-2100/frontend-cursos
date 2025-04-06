import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { FormField } from '@/components/ui/form-field';
import { Toggle } from '@/components/ui/toggle';
import { DialogFooter } from '@/components/ui/dialog';
import { Curso } from '@/services/api';

interface CourseFormData {
  nombre: string;
  descripcion: string;
  fecha_inicio: string;
  fecha_fin: string;
  activo: boolean;
}

interface CourseFormProps {
  initialData: CourseFormData;
  onSubmit: (data: CourseFormData) => void;
  isEditing: boolean;
  isSubmitting?: boolean; // nuevo prop
}

export function CourseForm({ initialData, onSubmit, isEditing, isSubmitting = false }: CourseFormProps) {
  const [formData, setFormData] = React.useState<CourseFormData>(initialData);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
      <FormField label="Nombre" htmlFor="nombre">
        <Input
          id="nombre"
          value={formData.nombre}
          onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
          required
        />
      </FormField>

      <FormField label="Descripción" htmlFor="descripcion">
        <Textarea
          id="descripcion"
          value={formData.descripcion}
          onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
        />
      </FormField>

      <div className="grid grid-cols-2 gap-4">
        <FormField label="Fecha Inicio" htmlFor="fecha_inicio">
          <Input
            id="fecha_inicio"
            type="date"
            value={formData.fecha_inicio}
            onChange={(e) => setFormData({ ...formData, fecha_inicio: e.target.value })}
            required
          />
        </FormField>

        <FormField label="Fecha Fin" htmlFor="fecha_fin">
          <Input
            id="fecha_fin"
            type="date"
            value={formData.fecha_fin}
            onChange={(e) => setFormData({ ...formData, fecha_fin: e.target.value })}
            required
          />
        </FormField>
      </div>

      <div className="flex items-center justify-between">
        <label htmlFor="activo">Activo</label>
        <Toggle
          checked={formData.activo}
          onChange={(checked) => setFormData({ ...formData, activo: checked })}
          id="activo"
          label="Activo"
        />
      </div>

      <DialogFooter>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Cargando...' : (isEditing ? 'Actualizar' : 'Crear')}
        </Button>
      </DialogFooter>
    </form>
  );
}
