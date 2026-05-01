function DataTable({ columns, data }) {
  return (
    <table className="w-full bg-white shadow rounded">
      <thead>
        <tr className="bg-gray-200">
          {columns.map((col) => (
            <th key={col.accessor} className="p-2">
              {col.header}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {data.map((row, index) => (
          <tr key={index} className="border-t text-center">
            {columns.map((col) => (
              <td key={col.accessor} className="p-2">
                {col.cell ? col.cell(row) : row[col.accessor]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default DataTable;