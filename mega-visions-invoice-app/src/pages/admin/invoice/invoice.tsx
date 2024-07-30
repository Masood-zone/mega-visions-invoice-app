import { useNavigate } from "react-router-dom";
import { storeApi } from "../../../redux/api";
import toast from "react-hot-toast";
import CellComponent from "../../../components/_tests/cell-component";
import Table from "../../../components/table";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import moment from "moment";

function Invoice() {
  const {
    data: invoiceData,
    isLoading,
    error,
  } = storeApi.useGetAllInvoiceQuery({});
  const [deleteInvoice] = storeApi.useDeleteInvoiceMutation();
  const navigate = useNavigate();
  const onEdit = (id: string) => {
    navigate(`/admin/invoice/edit-invoice/${id}`);
  };
  const onView = (id: string) => {
    navigate(`/admin/invoice/invoice/${id}`);
  };
  const onDelete = async (id: string) => {
    try {
      const res = await deleteInvoice(id).unwrap();
      if (res) {
        toast.success("Invoice deleted successfully");
      }
    } catch (error) {
      toast.error("Error deleting invoice");
    }
  };

  const columnDefs = [
    { headerName: "ID", field: "id" },
    { headerName: "Description", field: "description" },
    {
      headerName: "Date",
      field: "date",
      valueFormatter: (params: any) => {
        return moment(params?.data?.value).format("DD/MM/YYYY");
      },
    },
    { headerName: "Quantity", field: "quantity" },
    { headerName: "CustomerId", field: "customerId" },
    { headerName: "ProductId", field: "productId" },
    { headerName: "Amount", field: "amount" },
    { headerName: "Company Id", field: "companyId" },
    { headerName: "Unit Price", field: "unitPrice" },
    { headerName: "Total", field: "total" },
    {
      cellRenderer: (params: any) => (
        <CellComponent
          onDelete={onDelete}
          onEdit={onEdit}
          onView={onView}
          params={params}
        />
      ),
      sortable: false,
      filter: false,
    },
  ];

  const defaultColDef = {
    sortable: true,
    filter: true,
  };
  return (
    <section className="w-full h-full">
      {/* Header */}
      <div className="flex flex-col items-start gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-6xl font-medium text-gray-700">Invoice List</h2>
        </div>
        {/* Breacdcrumb */}
        <div className="breadcrumbs text-sm">
          <ul>
            <li>
              <a
                href="/admin/dashboard"
                className="link link-hover text-gray-400"
              >
                Home
              </a>
            </li>
            <li>Invoices</li>
          </ul>
        </div>
      </div>
      {/* Table */}
      <div>
        {isLoading ? (
          <div className="flex w-auto border rounded-md mx-auto h-auto py-5 items-center justify-center">
            <span className="loading loading-infinity loading-lg"></span>
            Loading Table Data...
          </div>
        ) : error ? (
          <div className="flex flex-col w-auto border rounded-md h-auto p-5 items-start gap-5 justify-center">
            <p className="text-lg">Opps, you encountered an error.</p>
            <p className="text-red-600">
              {(error as FetchBaseQueryError)?.status}
            </p>
            <p className="text-red-600">
              {(error as FetchBaseQueryError)?.error}
            </p>
          </div>
        ) : (
          <Table
            rowData={invoiceData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
          />
        )}
      </div>
    </section>
  );
}

export default Invoice;
