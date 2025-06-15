import { Sidebar, TopMenu } from "@/components";
import Link from "next/link";

export default function DashboardLayout({
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Main Layout content - Contenido principal del Layout */}
      <div className="ml-auto mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%] min-h-screen">
        <TopMenu />

        <div className="px-6 pt-6">
          <div className="flex gap-8">
            {/* Tarjeta principal */}
            <div className="flex-1 border-l-4 border-r-4 border-green-200 rounded-2xl bg-white/90 shadow-lg p-8 min-h-[40vh] flex flex-col items-center justify-center">
              <h2 className="text-2xl font-bold text-green-700 mb-4 flex items-center gap-2">
                <span role="img" aria-label="libro">
                  📖
                </span>{" "}
                Bienvenido/a
              </h2>
              <p className="text-lg text-gray-700 text-center mb-6 max-w-md">
                Explora y administra tu biblioteca de manera sencilla. Aquí puedes
                ver el catálogo, gestionar géneros y controlar los préstamos.
              </p>
              <Link
                href="/dashboard/genres"
                className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-full transition mb-2 shadow"
              />
                Ver géneros
              <a
                href="/dashboard/cars"
                className="bg-green-100 hover:bg-green-200 text-green-700 font-semibold py-2 px-6 rounded-full transition shadow"
              >
                Ver libros
              </a>
            </div>
            {/* Tarjeta de libros prestados del mismo tamaño */}
            <div className="flex-1 border-l-4 border-r-4 border-blue-200 rounded-2xl bg-white/90 shadow-lg p-8 min-h-[40vh] flex flex-col items-center justify-center">
              <h2 className="text-2xl font-bold text-blue-700 mb-4 flex items-center gap-2">
                <span role="img" aria-label="prestamo">
                  📚
                </span>{" "}
                Libros prestados
              </h2>
              <ul className="w-full max-w-xs space-y-3">
                <li className="flex items-center justify-between bg-blue-50 rounded-lg px-4 py-2 shadow-sm">
                  <span className="font-medium text-blue-800">El Principito</span>
                  <span className="text-xs text-blue-500">
                    Devuelve: 30/05/2025
                  </span>
                </li>
                <li className="flex items-center justify-between bg-blue-50 rounded-lg px-4 py-2 shadow-sm">
                  <span className="font-medium text-blue-800">
                    Cien años de soledad
                  </span>
                  <span className="text-xs text-blue-500">
                    Devuelve: 02/06/2025
                  </span>
                </li>
                <li className="flex items-center justify-between bg-blue-50 rounded-lg px-4 py-2 shadow-sm">
                  <span className="font-medium text-blue-800">1984</span>
                  <span className="text-xs text-blue-500">
                    Devuelve: 10/06/2025
                  </span>
                </li>
              </ul>
              <button className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-full transition shadow">
                Ver todos los préstamos
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
