export default function PaginaPrincipal() {
  return (
    <div className="bg-white flex flex-col items-center justify-center gap-5 h-full w-full">
      <img className="mx-auto max-h-full" src="/images/logo-elecciones2025.png" alt="Logo elecciones" />
      <p className="text-gray-600 text-lg text-center max-lg:text-sm">
        Complete los filtros para mostrar la información
      </p>
    </div>
  );
}
