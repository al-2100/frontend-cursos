export const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export interface Curso {
  id: string;
  nombre: string;
  descripcion?: string;
  fecha_inicio: string;
  fecha_fin: string;
  activo: boolean;
}

const username = process.env.NEXT_PUBLIC_API_USERNAME;
const password = process.env.NEXT_PUBLIC_API_PASSWORD;
const authHeader = {
  Authorization: 'Basic ' + btoa(`${username}:${password}`),
};

// Obtener la lista de cursos
export async function getCursos(): Promise<Curso[]> {
  const res = await fetch(`${BASE_URL}/api/cursos/`, {
    headers: {
      'Content-Type': 'application/json',
      ...authHeader,
    },
  });
  if (!res.ok) {
    throw new Error('Error al obtener cursos');
  }
  return res.json();
}

// Crear un curso
export async function createCurso(data: Partial<Curso>): Promise<Curso> {
  const res = await fetch(`${BASE_URL}/api/cursos/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...authHeader,
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    throw new Error('Error al crear curso');
  }
  return res.json();
}

// Actualizar un curso
export async function updateCurso(id: string, data: Partial<Curso>): Promise<Curso> {
  const res = await fetch(`${BASE_URL}/api/cursos/${id}/`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...authHeader,
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    throw new Error('Error al actualizar curso');
  }
  return res.json();
}

// Eliminar un curso
export async function deleteCurso(id: string): Promise<void> {
  const res = await fetch(`${BASE_URL}/api/cursos/${id}/`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      ...authHeader,
    },
  });
  if (!res.ok) {
    throw new Error('Error al eliminar curso');
  }
}