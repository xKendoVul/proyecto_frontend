"use client";

export default function HomePage() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center p-6 overflow-hidden font-sans">
      {/* Fondo con imagen desenfocada */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(12px) brightness(0.7)",
        }}
        aria-hidden="true"
      />

      {/* Contenido principal */}
      <div className="relative z-10 bg-white/40 backdrop-blur-md rounded-xl shadow-2xl p-10 max-w-2xl w-full flex flex-col items-center">
        <h1 className="text-5xl font-extrabold text-green-800 mb-4 text-center leading-tight drop-shadow-sm tracking-tight">
          📚 ¡Bienvenid@ al Bibliotecario! 📚
        </h1>
        <p className="text-lg text-gray-900 mb-8 text-center font-medium">
          Descubre un mundo de libros para todos los gustos. Explora, aprende y
          déjate inspirar por nuestras colecciones.
        </p>

        {/* Botón estilizado */}
        <a
          href="/dashboard"
          className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-3 px-10 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        >
          📖 Panel de administración
        </a>

        {/* Imagen decorativa de libros */}
        <img
          src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=600&q=80"
          alt="Libros"
          className="rounded-lg shadow-md mt-6 w-full max-w-xs"
        />

        {/* Footer */}
        <footer className="mt-6 text-sm text-gray-800 font-medium">
          © 2025 Todos los derechos reservados.
        </footer>
      </div>
    </main>
  );
}
