import { AgGridReact } from "ag-grid-react";
import { useEffect, useState } from "react";
import "../../assets/styles/ag-grid-theme.css";

interface DataGridProps {
  rowData: any[];
  columnDefs: any[];
  defaultColDef?: any;
}

const Table: React.FC<DataGridProps> = ({
  rowData,
  columnDefs,
  defaultColDef,
}) => {
  const [gridApi, setGridApi] = useState<any>(null);
  const [gridColumnApi, setGridColumnApi] = useState<any>(null);
  const [paginationPageSize, setPaginationPageSize] = useState<number>(10);

  useEffect(() => {
    if (rowData?.length < 10) {
      setPaginationPageSize(10);
    } else {
      setPaginationPageSize(rowData?.length);
    }
  }, [rowData, paginationPageSize]);

  const onGridReady = (params: any) => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
  };

  return (
    <div style={{ width: "100%" }} className="mt-8 h-[450px]">
      <div style={{ height: "100%" }} className="w-full">
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          pagination={true}
          paginationPageSize={paginationPageSize}
          onGridReady={onGridReady}
        />
      </div>
    </div>
  );
};
export default Table;
