'use client';

interface TableProps<T> {
  readonly columns: readonly string[]; // Encabezados de las columnas
  readonly data: readonly T[];         // Datos de las filas
  readonly renderRow: (item: T, index: number) => React.ReactNode; // Cómo renderizar cada fila
}

export default function Table<T>({ columns, data, renderRow }: TableProps<T>) {
  return (
    <div className="mt-6 relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className=" w-full text-base text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className=" text-sm text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {columns.map((column) => (
              <th
                key={column}
                className="px-6 py-3"
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
          {data.map((item, index) => (
            <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              {renderRow(item, index)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
