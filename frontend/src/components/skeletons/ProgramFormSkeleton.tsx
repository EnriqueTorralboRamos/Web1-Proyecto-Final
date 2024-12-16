export default function ProgramFormSkeleton() {
    return (
      <form className="space-y-4 animate-pulse">
        {/* Mensaje de éxito o error */}
        <div className="h-4 bg-gray-300 rounded w-1/3"></div>
  
        {/* Nombre del programa */}
        <div>
          <label htmlFor="program-name" className="block text-sm font-medium text-gray-700">
            Nombre del Programa *
          </label>
          <div id="program-name" className="mt-1 h-10 bg-gray-300 rounded"></div>
        </div>
  
        {/* Selección de país */}
        <div>
          <label htmlFor="country" className="block text-sm font-medium text-gray-700">
            País *
          </label>
          <div id="country" className="mt-1 h-10 bg-gray-300 rounded"></div>
        </div>
  
        {/* Participantes */}
        <div>
          <label htmlFor="participants" className="block text-sm font-medium text-gray-700">
            Participantes (se pueden añadir más tarde)
          </label>
          <div id="participants" className="mt-1 h-10 bg-gray-300 rounded"></div>
        </div>
  
        {/* Fecha de inicio */}
        <div>
          <label htmlFor="start-date" className="block text-sm font-medium text-gray-700">
            Fecha de Inicio *
          </label>
          <div id="start-date" className="mt-1 h-10 bg-gray-300 rounded"></div>
        </div>
  
        {/* Fecha de fin */}
        <div>
          <label htmlFor="end-date" className="block text-sm font-medium text-gray-700">
            Fecha de Fin *
          </label>
          <div id="end-date" className="mt-1 h-10 bg-gray-300 rounded"></div>
        </div>
  
        {/* Botón de acción */}
        <div className="flex gap-4">
          <div className="w-full h-10 bg-gray-300 rounded"></div>
          <div className="w-full h-10 bg-gray-300 rounded"></div>
        </div>
      </form>
    );
  }
  