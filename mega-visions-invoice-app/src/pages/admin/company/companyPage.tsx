import { Link, useParams } from "react-router-dom";
import { storeApi } from "../../../redux/api";
import { Edit } from "lucide-react";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

function CompanyPage() {
  const { id } = useParams();
  const {
    data: company,
    isLoading,
    error,
  } = storeApi.useGetSingeCompanyQuery(id);
  console.log(company);

  return (
    <section className="">
      {/* Header */}
      {/* Header */}
      <div className="flex flex-col items-start gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-6xl font-medium text-gray-700">Company: {id}</h2>
        </div>
        {/* Breacdcrumb */}
        <div className="breadcrumbs text-sm">
          <ul>
            <li>
              <a
                href="/admin/company"
                className="link link-hover text-gray-400"
              >
                Company List
              </a>
            </li>
            <li>Company: {id}</li>
          </ul>
        </div>
      </div>
      {/* Main */}
      <div className="mt-5">
        {isLoading ? (
          <div className="flex w-auto border rounded-md mx-auto h-auto py-5 items-center justify-center">
            <span className="loading loading-infinity loading-lg"></span>
            Loading Company Data...
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
          <div className="overflow-x-auto">
            <div className="flex items-center justify-between gap-4">
              <table className="table w-full">
                <thead>
                  <tr>
                    <th className="text-left">Name</th>
                    <th className="text-left">Telephone</th>
                    <th className="text-left">Location</th>
                    <th className="text-left">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="text-left">{company?.name}</td>
                    <td className="text-left">+233 {company?.telephone}</td>
                    <td className="text-left">{company?.location}</td>
                    <td className="text-left flex items-center gap-4">
                      <button className="">
                        <Link to={`/admin/company/edit-company/${id}`}>
                          <Edit size={20} />
                        </Link>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default CompanyPage;
