import { Button } from '@/components/ui/button';
import { Curso } from '@/services/api';

interface CourseTableProps {
  courses: Curso[];
  onEdit: (course: Curso) => void;
  onDelete: (id: string) => void;
  isLoading?: boolean;
}

export function CourseTable({ courses, onEdit, onDelete, isLoading }: CourseTableProps) {
  if (isLoading) return <p>Cargando cursos...</p>;
  if (!courses?.length) return <p>No hay cursos disponibles.</p>;

  return (
    <table className="min-w-full mt-4 border-collapse border border-gray-300">
      <thead className="bg-slate-100">
        <tr>
          <th className="px-4 py-2 border">Nombre</th>
          <th className="px-4 py-2 border">Descripción</th>
          <th className="px-4 py-2 border">Fecha Inicio</th>
          <th className="px-4 py-2 border">Fecha Fin</th>
          <th className="px-4 py-2 border">Activo</th>
          <th className="px-4 py-2 border">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {courses.map((course: Curso) => (
          <tr key={course.id}>
            <td className="px-4 py-2 border">{course.nombre}</td>
            <td className="px-4 py-2 border">{course.descripcion}</td>
            <td className="px-4 py-2 border">{course.fecha_inicio}</td>
            <td className="px-4 py-2 border">{course.fecha_fin}</td>
            <td className="px-4 py-2 border">{course.activo ? 'Sí' : 'No'}</td>
            <td className="px-4 py-2 border space-x-2">
              <Button variant="secondary" onClick={() => onEdit(course)}>
                Editar
              </Button>
              <Button variant="destructive" onClick={() => onDelete(course.id)}>
                Eliminar
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
