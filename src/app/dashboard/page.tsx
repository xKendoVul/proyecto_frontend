"use client"

import { useRouter } from "next/navigation";

export default function DashboardLayout({
}: {
  children: React.ReactNode;
}) {

  const router = useRouter()

  return (
    <>
      {/* Main Layout content - Contenido principal del Layout */}
      <div className="ml-auto mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%] min-h-screen">
        <div className="px-6 pt-6">
            {/* Tarjeta de libros prestados del mismo tamaño */}
            <div className="flex-1 border-l-4 border-r-4 border-blue-200 rounded-2xl bg-white/90 shadow-lg p-8 min-h-[40vh] flex flex-col items-center justify-center">
              <h2 className="text-2xl font-bold text-blue-700 mb-4 flex items-center gap-2">
                <span role="img" aria-label="prestamo">
                  📚
                </span>{" "}
                Libros prestados
              </h2>
              <button onClick={() => router.push('dashboard/loans')} className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-full transition shadow">
                Ver todos los préstamos
              </button>
            </div>
          </div>
        </div>
    </>
  );
}
