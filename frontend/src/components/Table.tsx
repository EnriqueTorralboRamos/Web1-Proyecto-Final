'use client';

interface TableProps<T> {
  readonly columns: readonly string[]; // Encabezados de las columnas
  readonly data: readonly T[];         // Datos de las filas
  readonly renderRow: (item: T, index: number) => React.ReactNode; // Cómo renderizar cada fila
}

export default function Table<T>({ columns, data, renderRow }: TableProps<T>) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            {columns.map((column) => (
              <th
                key={column}
                className="px-4 py-2 text-left text-sm font-medium text-gray-700"
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {data.map((item, index) => (
            <tr key={index} className="hover:bg-gray-50">
              {renderRow(item, index)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
