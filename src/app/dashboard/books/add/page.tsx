import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookForm } from "@/components/books/book-form";

function BookAddPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#e0e7ef] via-[#f8fafc] to-[#c7d2fe] relative overflow-hidden py-8">
      {/* Fondo decorativo moderno */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <svg
          className="absolute top-0 left-0 w-full h-full opacity-15"
          viewBox="0 0 1440 900"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <rect
            x="0"
            y="0"
            width="1440"
            height="900"
            fill="url(#lines)"
            fillOpacity="0.08"
          />
          <defs>
            <pattern
              id="lines"
              width="60"
              height="60"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M0 0L60 60ZM60 0L0 60Z"
                stroke="#64748b"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
        </svg>
      </div>
      {/* Puedes ajustar el margen superior e inferior aquí */}
      <div
        className="flex w-full items-center justify-center"
        style={{
          minHeight: "calc(100vh - 120px)",
          marginTop: "40px",
          marginBottom: "40px",
        }}
      >
        <Card className="w-full max-w-xl shadow-2xl rounded-3xl border-0 bg-white/500 backdrop-blur-lg flex flex-col items-center">
          <CardHeader
            className="bg-gradient-to-r from-indigo-200 to-blue-200 rounded-t-3xl px-10 py-8 border-b border-indigo-100 w-full flex flex-col items-center"
            style={{ marginTop: "-50px" }}
          >
            <CardTitle className="text-3xl font-extrabold text-indigo-800 tracking-wide drop-shadow flex items-center gap-2 justify-center w-full">
              <span role="img" aria-label="Libro">
                📚
              </span>
              Nuevo Registro de Libro
            </CardTitle>
            <p className="text-indigo-700 text-base text-center w-full">
              Ingresa los datos para añadir un libro a la biblioteca.
            </p>
          </CardHeader>
          <CardContent className="p-10 w-full flex flex-col items-center">
            <div className="bg-white/95 rounded-xl shadow-inner p-6 border border-indigo-100 w-full">
              <BookForm />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default BookAddPage;