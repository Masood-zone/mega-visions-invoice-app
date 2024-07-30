import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "../../assets/styles/ag-grid-theme.css";
import { storeApi } from "../../redux/api";
import CellComponent from "./cell-component";

const DataGrid: React.FC = () => {
  const {
    data: companyData,
    isLoading,
    error,
  } = storeApi.useGetAllCompaniesQuery({});

  const [rowData, setRowData] = useState<any[]>([]);
  const [gridApi, setGridApi] = useState<any>(null);
  const [gridColumnApi, setGridColumnApi] = useState<any>(null);
  const [paginationPageSize, setPaginationPageSize] = useState<number>(10);

  const columnDefs = [
    { headerName: "ID", field: "id", flex: 1 },
    { headerName: "Name", field: "name", flex: 1 },
    { headerName: "Telephone", field: "telephone", flex: 2 },
    { headerName: "Location", field: "location", flex: 1 },
    {
      cellRenderer: CellComponent,
      sortable: false,
      flex: 1,
      filter: false,
    },
  ];

  const defaultColDef = {
    sortable: true,
    filter: true,
  };

  useEffect(() => {
    setRowData(companyData);
    if (companyData?.length < 10) {
      setPaginationPageSize(10);
    } else {
      setPaginationPageSize(companyData?.length);
    }
  }, [companyData, paginationPageSize, isLoading, error]);

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

export default DataGrid;
