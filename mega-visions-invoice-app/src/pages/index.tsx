import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  useLocation,
} from "react-router-dom";
import Layout from "./layout";
import MainErrorBoundary from "../components/errors/errorBoundary";
import Login from "./auth/login";
import AuthLayout from "./auth";
import Dashboard from "./admin/dashboard";
import Company from "./admin/company/company";
import AddCompany from "./admin/company/addCompany";
import CompanyPage from "./admin/company/companyPage";
import EditCompany from "./admin/company/editCompany";
import Invoice from "./admin/invoice/invoice";
import AddInvoice from "./admin/invoice/addInvoice";
import InvoicePage from "./admin/invoice/invoicePage";
import EditInvoice from "./admin/invoice/editInvoice";
import InvoiceLayout from "./admin/invoice";
import ProductLayout from "./admin/product";
import SalesLayout from "./admin/sales-department";
import Sales from "./admin/sales-department/sales";
import AddSales from "./admin/sales-department/addSales";
import SalesPage from "./admin/sales-department/salesPage";
import EditSales from "./admin/sales-department/editSales";
import EmployeeLayout from "./admin/employee";
import Employee from "./admin/employee/employee";
import AddEmployee from "./admin/employee/addEmployee";
import EmployeePage from "./admin/employee/employeePage";
import EditEmployee from "./admin/employee/editEmployee";
import CustomerLayout from "./admin/customer";
import Customer from "./admin/customer/customer";
import AddCustomer from "./admin/customer/addCustomer";
import CustomerPage from "./admin/customer/customerPage";
import EditCustomer from "./admin/customer/editCustomer";
import AddProduct from "./admin/product/addProduct";
import ProductPage from "./admin/product/productPage";
import EditProduct from "./admin/product/editProduct";
import AdminLayout from "./admin";
import Product from "./admin/product/product";
import Profile from "./auth/profile";
import { useAuth } from "../utils/useAuth";
import toast from "react-hot-toast";
import CompanyLayout from "./admin/company";
//Authentication - (Protected Route)
type ProtectedRouteProps = {
  children: React.ReactNode;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const isAuthenticated = useAuth();
  const location = useLocation();
  if (!isAuthenticated) {
    toast.error("You need to login to access this page!");
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }
  return <>{children}</>;
};

const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      {/* Admin Pages */}
      <Route
        path="admin"
        lazy={async () => {
          const { AdminLayout } = await import("./admin");
          return AdminLayout;
        }}
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        {/* Dashboard */}
        <Route
          path="dashboard"
          lazy={async () => {
            const { Dashboard } = await import("./admin/dashboard");
            return Dashboard;
          }}
          element={<Dashboard />}
        />
        {/* Company */}
        <Route
          path="company"
          lazy={async () => {
            const { CompanyLayout } = await import("./admin/company");
            return CompanyLayout;
          }}
          element={<CompanyLayout />}
        >
          <Route index element={<Company />} />
          <Route path="add-company" element={<AddCompany />} />
          <Route path="company/:id" element={<CompanyPage />} />
          <Route path="edit-company/:id" element={<EditCompany />} />
        </Route>
        {/* Invoice */}
        <Route
          path="invoice"
          lazy={async () => {
            const { InvoiceLayout } = await import("./admin/invoice");
            return InvoiceLayout;
          }}
          element={<InvoiceLayout />}
        >
          <Route index element={<Invoice />} />
          <Route path="add-invoice" element={<AddInvoice />} />
          <Route path="invoice/:id" element={<InvoicePage />} />
          <Route path="edit-invoice/:id" element={<EditInvoice />} />
        </Route>
        {/* Product */}
        <Route
          path="product"
          lazy={async () => {
            const { ProductLayout } = await import("./admin/product");
            return ProductLayout;
          }}
          element={<ProductLayout />}
        >
          <Route index element={<Product />} />
          <Route path="add-product" element={<AddProduct />} />
          <Route path="product/:id" element={<ProductPage />} />
          <Route path="edit-product/:id" element={<EditProduct />} />
        </Route>
        {/* Sales-department */}
        <Route
          path="sales-department"
          lazy={async () => {
            const { SalesLayout } = await import("./admin/sales-department");
            return SalesLayout;
          }}
          element={<SalesLayout />}
        >
          <Route index element={<Sales />} />
          <Route path="add-sales" element={<AddSales />} />
          <Route path="sales/:id" element={<SalesPage />} />
          <Route path="edit-sales/:id" element={<EditSales />} />
        </Route>
        {/* Employee */}
        <Route
          path="employee"
          lazy={async () => {
            const { EmployessLayout } = await import("./admin/employee");
            return EmployessLayout;
          }}
          element={<EmployeeLayout />}
        >
          <Route index element={<Employee />} />
          <Route path="add-employee" element={<AddEmployee />} />
          <Route path="employee/:id" element={<EmployeePage />} />
          <Route path="edit-employee/:id" element={<EditEmployee />} />
        </Route>
        {/* Customer */}
        <Route
          path="customer"
          lazy={async () => {
            const { CustomerLayout } = await import("./admin/customer");
            return CustomerLayout;
          }}
          element={<CustomerLayout />}
        >
          <Route index element={<Customer />} />
          <Route path="add-customer" element={<AddCustomer />} />
          <Route path="customer/:id" element={<CustomerPage />} />
          <Route path="edit-customer/:id" element={<EditCustomer />} />
        </Route>
        {/* Profile */}
        <Route path="/admin/profile" element={<Profile />} />
      </Route>
      {/* Authentication pages */}
      <Route
        path="auth"
        element={
          <MainErrorBoundary>
            <AuthLayout />
          </MainErrorBoundary>
        }
      >
        <Route path="login" element={<Login />} />
      </Route>
    </Route>
  )
);

export default routes;
