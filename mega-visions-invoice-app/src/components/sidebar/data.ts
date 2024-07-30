import {
  company,
  customers,
  employees,
  home,
  invoice,
  product,
  profile,
  sales,
} from "../../assets/svgs";

export const NAVLINKS = [
  {
    title: "Dashboard",
    icon: home,
    href: "/admin/dashboard",
    hasSubMenu: false,
  },
  {
    title: "Company",
    icon: company,
    href: "/admin/company",
    hasSubmenu: true,
    subMenu: [
      {
        title: "Company",
        href: "/admin/company",
      },
      {
        title: "Add Company",
        href: "/admin/company/add-company",
      },
    ],
  },
  {
    title: "Invoice",
    icon: invoice,
    href: "/admin/invoice",
    hasSubmenu: true,
    subMenu: [
      {
        title: "Invoice",
        href: "/admin/invoice",
      },
      {
        title: "Add Invoice",
        href: "/admin/invoice/add-invoice",
      },
    ],
  },
  {
    title: "Sales Department",
    icon: sales,
    href: "/admin/sales-department",
    hasSubmenu: true,
    subMenu: [
      {
        title: "Sales Department",
        href: "/admin/sales-department",
      },
      {
        title: "Add Sales Department",
        href: "/admin/sales-department/add-sales",
      },
    ],
  },
  {
    title: "Products",
    icon: product,
    href: "/admin/product",
    hasSubmenu: true,
    subMenu: [
      {
        title: "Products",
        href: "/admin/product",
      },
      {
        title: "Add Product",
        href: "/admin/product/add-product",
      },
    ],
  },
  {
    title: "Employees",
    icon: employees,
    href: "/admin/employee",
    hasSubmenu: true,
    subMenu: [
      {
        title: "Employees",
        href: "/admin/employee",
      },
      {
        title: "Add Employee",
        href: "/admin/employee/add-employee",
      },
    ],
  },
  {
    title: "Customer",
    icon: customers,
    href: "/admin/customer",
    hasSubmenu: true,
    subMenu: [
      {
        title: "Customers",
        href: "/admin/customer",
      },
      {
        title: "Add Customer",
        href: "/admin/customer/add-customer",
      },
    ],
  },
  {
    title: "Profile",
    icon: profile,
    href: "/admin/profile",
    hasSubmenu: false,
  },
];
