'use client';

import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getCursos, createCurso, updateCurso, deleteCurso, Curso } from '@/services/api';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { CourseTable } from '@/components/courses/course-table';
import { CourseForm } from '@/components/courses/course-form';

export default function CursosPage() {
  const queryClient = useQueryClient();

  // Estado del servidor controlado por TanStack Query
  const { data: cursos, isLoading, isError } = useQuery({
    queryKey: ['cursos'],
    queryFn: getCursos,
  });

  // Mutaciones para operaciones CRUD
  const createMutation = useMutation({
    mutationFn: createCurso,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cursos'] });
      setOpen(false);
    },
  });
  
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Curso> }) =>
      updateCurso(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cursos'] });
      setOpen(false);
      setEditingCurso(null);
    },
  });
  
  const deleteMutation = useMutation({
    mutationFn: deleteCurso,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cursos'] });
    },
  });

  // Estados de UI (manejo local)
  const [open, setOpen] = useState(false);
  const [editingCurso, setEditingCurso] = useState<Curso | null>(null);
  
  const defaultFormData = {
    nombre: '',
    descripcion: '',
    fecha_inicio: '',
    fecha_fin: '',
    activo: true,
  };

  const handleOpenCreate = () => {
    setEditingCurso(null);
    setOpen(true);
  };

  const handleEdit = (curso: Curso) => {
    setEditingCurso(curso);
    setOpen(true);
  };

  const handleSubmit = (formData: any) => {
    if (editingCurso) {
      updateMutation.mutate({ id: editingCurso.id, data: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  const isSubmitting = createMutation.status === 'pending' || updateMutation.status === 'pending';

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Gestión de Cursos</h1>
      <Button onClick={handleOpenCreate}>Crear Curso</Button>

      {isError && <p className="text-red-500 mt-4">Error al cargar cursos.</p>}
      
      <CourseTable 
        courses={cursos || []} 
        onEdit={handleEdit} 
        onDelete={(id) => deleteMutation.mutate(id)} 
        isLoading={isLoading}
      />

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingCurso ? 'Editar Curso' : 'Crear Curso'}</DialogTitle>
          </DialogHeader>
          
          <CourseForm 
            initialData={editingCurso ? {
              nombre: editingCurso.nombre,
              descripcion: editingCurso.descripcion || '',
              fecha_inicio: editingCurso.fecha_inicio,
              fecha_fin: editingCurso.fecha_fin,
              activo: editingCurso.activo,
            } : defaultFormData}
            onSubmit={handleSubmit}
            isEditing={!!editingCurso}
            isSubmitting={isSubmitting} // se pasa la carga
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}