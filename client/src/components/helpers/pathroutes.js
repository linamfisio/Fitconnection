const pathroutes = {
  ADMIN: "/admin",
  CLIENT: "/clientinfo",
  INSTRUCTOR: "/instructors",
  CATEGORY: "/categories",
  CREATEDINST: "/createinstructor",
  MODIFY: "/modifycategory/:id",
  MODIFYINST: "/modifyinstructor/:id",
  HOME: "/",
  DETAIL: "/detail/:id",
  FORM: "/create",
  ERROR: "/*",
  PRODUCT: "/product",
  SHOPPINGCART: "/shopping",
  SERVICE: "/services",
  REGISTER: "/register",
  STORE: "/store",
  USER_PROFILE: "/userprofile",
  LOGIN: "/login",
  ADMINCATEGORY: "/admin/category",
  ADMINCATEGORYCREATE: "/admin/category/create",
  ADMINCATEGORYMODIFY: "admin/category/modify/:id",
  ADMININSTRUCTOR: "/admin/instructor",
  ADMININSTRUCTORCREATE: "/admin/instructor/create",
  ADMININSTRUCTORMODIFY: "/admin/instructor/modify/:id",
  CREATE_PRODUCT: "/admin/product/create",
  MODIFY_PRODUCT: "/admin/product/modify/:id",
  ADMINPRODUCT: "/admin/product/",
  ADMINCLIENT: "/admin/client/",
  ADMINCLIENTPROFILE: "/admin/client/modifyinfo/:id",
  GYM_INFO: "admin/gimnasio/",
};
export default pathroutes;
