import { useRoutes } from "react-router-dom";
import SideMenu from "../layouts/side-menu/Main";
import SimpleMenu from "../layouts/simple-menu/Main";
import TopMenu from "../layouts/top-menu/Main";
import DashboardOverview1 from "../views/dashboard-overview-1/Main";
import DashboardOverview2 from "../views/dashboard-overview-2/Main";
import DashboardOverview3 from "../views/dashboard-overview-3/Main";
import DashboardOverview4 from "../views/dashboard-overview-4/Main";
import Categories from "../views/categories/Main";
import AddProduct from "../views/add-product/Main";
import ProductList from "../views/product-list/Main";
import ProductGrid from "../views/product-grid/Main";
import TransactionList from "../views/transaction-list/Main";
import TransactionDetail from "../views/transaction-detail/Main";
import SellerList from "../views/seller-list/Main";
import SellerDetail from "../views/seller-detail/Main";
import Reviews from "../views/reviews/Main";
import Inbox from "../views/inbox/Main";
import FileManager from "../views/file-manager/Main";
import PointOfSale from "../views/point-of-sale/Main";
import Chat from "../views/chat/Main";
import Post from "../views/post/Main";
import Calendar from "../views/calendar/Main";
import CrudDataList from "../views/crud-data-list/Main";
import CrudForm from "../views/crud-form/Main";
import UsersLayout1 from "../views/users-layout-1/Main";
import UsersLayout2 from "../views/users-layout-2/Main";
import UsersLayout3 from "../views/users-layout-3/Main";
import ProfileOverview1 from "../views/profile-overview-1/Main";
import ProfileOverview2 from "../views/profile-overview-2/Main";
import ProfileOverview3 from "../views/profile-overview-3/Main";
import WizardLayout1 from "../views/wizard-layout-1/Main";
import WizardLayout2 from "../views/wizard-layout-2/Main";
import WizardLayout3 from "../views/wizard-layout-3/Main";
import BlogLayout1 from "../views/blog-layout-1/Main";
import BlogLayout2 from "../views/blog-layout-2/Main";
import BlogLayout3 from "../views/blog-layout-3/Main";
import PricingLayout1 from "../views/pricing-layout-1/Main";
import PricingLayout2 from "../views/pricing-layout-2/Main";
import InvoiceLayout1 from "../views/invoice-layout-1/Main";
import InvoiceLayout2 from "../views/invoice-layout-2/Main";
import FaqLayout1 from "../views/faq-layout-1/Main";
import FaqLayout2 from "../views/faq-layout-2/Main";
import FaqLayout3 from "../views/faq-layout-3/Main";
import Login from "../views/login/Main";
import Register from "../views/register/Main";
import ErrorPage from "../views/error-page/Main";
import UpdateProfile from "../views/update-profile/Main";
import ChangePassword from "../views/change-password/Main";
import RegularTable from "../views/regular-table/Main";
import Tabulator from "../views/tabulator/Main";
import Modal from "../views/modal/Main";
import SlideOver from "../views/slide-over/Main";
import Notification from "../views/notification/Main";
import Tab from "../views/tab/Main";
import Accordion from "../views/accordion/Main";
import Button from "../views/button/Main";
import Alert from "../views/alert/Main";
import ProgressBar from "../views/progress-bar/Main";
import Tooltip from "../views/tooltip/Main";
import Dropdown from "../views/dropdown/Main";
import Typography from "../views/typography/Main";
import Icon from "../views/icon/Main";
import LoadingIcon from "../views/loading-icon/Main";
import RegularForm from "../views/regular-form/Main";
import Datepicker from "../views/datepicker/Main";
import TomSelect from "../views/tom-select/Main";
import FileUpload from "../views/file-upload/Main";
import WysiwygEditor from "../views/wysiwyg-editor/Main";
import Validation from "../views/validation/Main";
import Chart from "../views/chart/Main";
import Slider from "../views/slider/Main";
import ImageZoom from "../views/image-zoom/Main";
import Travel from "../views/travel/Main";
import Teacher from "../views/teacher/Main";
import CreateTravel from "../views/travel/CreateTravel";
import Agreement from "../views/agreement/Main";
import CreateAgreement from "../views/agreement/CreateAgreement";
import AgreementDetail from "../views/agreement/AgreementDetail";
import Hotel from "../views/hotel/Main";
import CreateHotelProgram from "../views/hotel/CreateHotelProgram";
import Car from "../views/car/Main";
import CreateCarProgram from "../views/car/CreateCarProgram";
import TravelDetail from "../views/travel/TravelDetail";
import TumOgrenciler from "../views/teacher/TumOgrenciler";
import TumGeziler from "../views/teacher/TumGeziler"
import Ogrenci from "../views/teacher/GetStudent"
import NewStudent from "../views/teacher/NewStudent"
import SifreEkle from "../views/sifre-ekle/Main";
import OgretmenEkle from "../views/musteri-iliskileri/gezi-takip/ogretmenEkle";
import GeziFormlari from "../views/musteri-iliskileri/gezi-takip/geziFormlari";
import GeziFormu from "../views/musteri-iliskileri/gezi-takip/geziFormu";
import MakbuzOnay from "../views/muhasebe/MakbuzOnay"
import MutabakatListesi from "../views/finans/GetAllMutabakat";
import Mutabakat from "../views/finans/GetMutabakat";

const Router = () => {
  const routes = [
    {
      path: "/",
      element: <SideMenu />,
      children: [
        {
          path: "/mutabakat/:mutabakatId",
          element: <Mutabakat/>,
        },
        {
          path: "/mutabakat-listesi",
          element: <MutabakatListesi />,
        },
        {
          path: "/makbuz-onay",
          element: <MakbuzOnay />,
        },
        {
          path: "/",
          element: <DashboardOverview1 />,
        },
        {
          path: "dashboard-overview-2",
          element: <DashboardOverview2 />,
        },
        {
          path: "dashboard-overview-3",
          element: <DashboardOverview3 />,
        },
        {
          path: "dashboard-overview-4",
          element: <DashboardOverview4 />,
        },
        {
          path: "categories",
          element: <Categories />,
        },
        {
          path: "add-product",
          element: <AddProduct />,
        },
        {
          path: "product-list",
          element: <ProductList />,
        },
        {
          path: "product-grid",
          element: <ProductGrid />,
        },
        {
          path: "transaction-list",
          element: <TransactionList />,
        },
        {
          path: "transaction-detail",
          element: <TransactionDetail />,
        },
        {
          path: "seller-list",
          element: <SellerList />,
        },
        {
          path: "seller-detail",
          element: <SellerDetail />,
        },
        {
          path: "reviews",
          element: <Reviews />,
        },
        {
          path: "inbox",
          element: <Inbox />,
        },
        {
          path: "file-manager",
          element: <FileManager />,
        },
        {
          path: "point-of-sale",
          element: <PointOfSale />,
        },
        {
          path: "chat",
          element: <Chat />,
        },
        {
          path: "post",
          element: <Post />,
        },
        {
          path: "calendar",
          element: <Calendar />,
        },
        {
          path: "crud-data-list",
          element: <CrudDataList />,
        },
        {
          path: "crud-form",
          element: <CrudForm />,
        },
        {
          path: "users-layout-1",
          element: <UsersLayout1 />,
        },
        {
          path: "users-layout-2",
          element: <UsersLayout2 />,
        },
        {
          path: "users-layout-3",
          element: <UsersLayout3 />,
        },
        {
          path: "profile-overview-1",
          element: <ProfileOverview1 />,
        },
        {
          path: "profile-overview-2",
          element: <ProfileOverview2 />,
        },
        {
          path: "profile-overview-3",
          element: <ProfileOverview3 />,
        },
        {
          path: "wizard-layout-1",
          element: <WizardLayout1 />,
        },
        {
          path: "wizard-layout-2",
          element: <WizardLayout2 />,
        },
        {
          path: "wizard-layout-3",
          element: <WizardLayout3 />,
        },
        {
          path: "blog-layout-1",
          element: <BlogLayout1 />,
        },
        {
          path: "blog-layout-2",
          element: <BlogLayout2 />,
        },
        {
          path: "blog-layout-3",
          element: <BlogLayout3 />,
        },
        {
          path: "pricing-layout-1",
          element: <PricingLayout1 />,
        },
        {
          path: "pricing-layout-2",
          element: <PricingLayout2 />,
        },
        {
          path: "invoice-layout-1",
          element: <InvoiceLayout1 />,
        },
        {
          path: "invoice-layout-2",
          element: <InvoiceLayout2 />,
        },
        {
          path: "faq-layout-1",
          element: <FaqLayout1 />,
        },
        {
          path: "faq-layout-2",
          element: <FaqLayout2 />,
        },
        {
          path: "faq-layout-3",
          element: <FaqLayout3 />,
        },
        {
          path: "update-profile",
          element: <UpdateProfile />,
        },
        {
          path: "change-password",
          element: <ChangePassword />,
        },
        {
          path: "regular-table",
          element: <RegularTable />,
        },
        {
          path: "tabulator",
          element: <Tabulator />,
        },
        {
          path: "modal",
          element: <Modal />,
        },
        {
          path: "slide-over",
          element: <SlideOver />,
        },
        {
          path: "notification",
          element: <Notification />,
        },
        {
          path: "tab",
          element: <Tab />,
        },
        {
          path: "accordion",
          element: <Accordion />,
        },
        {
          path: "button",
          element: <Button />,
        },
        {
          path: "alert",
          element: <Alert />,
        },
        {
          path: "progress-bar",
          element: <ProgressBar />,
        },
        {
          path: "tooltip",
          element: <Tooltip />,
        },
        {
          path: "dropdown",
          element: <Dropdown />,
        },
        {
          path: "typography",
          element: <Typography />,
        },
        {
          path: "icon",
          element: <Icon />,
        },
        {
          path: "loading-icon",
          element: <LoadingIcon />,
        },
        {
          path: "regular-form",
          element: <RegularForm />,
        },
        {
          path: "datepicker",
          element: <Datepicker />,
        },
        {
          path: "tom-select",
          element: <TomSelect />,
        },
        {
          path: "file-upload",
          element: <FileUpload />,
        },
        {
          path: "wysiwyg-editor",
          element: <WysiwygEditor />,
        },
        {
          path: "validation",
          element: <Validation />,
        },
        {
          path: "chart",
          element: <Chart />,
        },
        {
          path: "slider",
          element: <Slider />,
        },
        {
          path: "image-zoom",
          element: <ImageZoom />,
        },
        // new routes
        {
          path: "/seyahat-formlari",
          element: <Travel />,
        },
        {
          path:"/ogretmen-formlari",
          element: <Teacher/>
        },
        {
          path: "/tum-geziler",
          element: <TumGeziler/>
        },
        {
          path: "/tum-ogrenciler/:geziId",
          element: <TumOgrenciler/>,
        },
        {
          path: "/ogrenci/:studentId",
          element: <Ogrenci/>,
        },
        {
          path: "/yeni-ogrenci/:geziId",
          element: <NewStudent/>,
        },
        {
          path: "/ogretmen-sifre-olustur/:phoneNumber",
          element: <SifreEkle />,
        },
        {
          path: "/ogretmen-ekle/:geziId",
          element: <OgretmenEkle />,
        },
        {
          path:"/gezi-formlari",
          element:<GeziFormlari/>
        },
        {
          path:"/gezi-formu/:formId",
          element:<GeziFormu/>
        },
        // {
        //   path: "/seyahat-formu-olustur",
        //   element: <CreateTravel />,
        // },
        {
          path: "/seyahat-formu-duzenle/:formId",
          element: <TravelDetail />,
        },
        //
        {
          path: "/mutakabat-formlari",
          element: <Agreement />,
        },
        {
          path: "/mutakabat-formu-olustur",
          element: <CreateAgreement />,
        },
        {
          path: "/mutakabat-formu-duzenle/:formId",
          element: <AgreementDetail />,
        },
        {
          path: "/otel-programlari",
          element: <Hotel />,
        },
        {
          path: "/otel-programi-olustur",
          element: <CreateHotelProgram />,
        },
        //
        {
          path: "/arac-programlari",
          element: <Car />,
        },
        {
          path: "/arac-programi-olustur",
          element: <CreateCarProgram />,
        },
        {
          path: "/profil",
          element: <ProfileOverview2 />,
        },
      ],
    },
    {
      path: "/simple-menu",
      element: <SimpleMenu />,
      children: [
        {
          path: "dashboard-overview-1",
          element: <DashboardOverview1 />,
        },
        {
          path: "dashboard-overview-2",
          element: <DashboardOverview2 />,
        },
        {
          path: "dashboard-overview-3",
          element: <DashboardOverview3 />,
        },
        {
          path: "dashboard-overview-4",
          element: <DashboardOverview4 />,
        },
        {
          path: "categories",
          element: <Categories />,
        },
        {
          path: "add-product",
          element: <AddProduct />,
        },
        {
          path: "product-list",
          element: <ProductList />,
        },
        {
          path: "product-grid",
          element: <ProductGrid />,
        },
        {
          path: "transaction-list",
          element: <TransactionList />,
        },
        {
          path: "transaction-detail",
          element: <TransactionDetail />,
        },
        {
          path: "seller-list",
          element: <SellerList />,
        },
        {
          path: "seller-detail",
          element: <SellerDetail />,
        },
        {
          path: "reviews",
          element: <Reviews />,
        },
        {
          path: "inbox",
          element: <Inbox />,
        },
        {
          path: "file-manager",
          element: <FileManager />,
        },
        {
          path: "point-of-sale",
          element: <PointOfSale />,
        },
        {
          path: "chat",
          element: <Chat />,
        },
        {
          path: "post",
          element: <Post />,
        },
        {
          path: "calendar",
          element: <Calendar />,
        },
        {
          path: "crud-data-list",
          element: <CrudDataList />,
        },
        {
          path: "crud-form",
          element: <CrudForm />,
        },
        {
          path: "users-layout-1",
          element: <UsersLayout1 />,
        },
        {
          path: "users-layout-2",
          element: <UsersLayout2 />,
        },
        {
          path: "users-layout-3",
          element: <UsersLayout3 />,
        },
        {
          path: "profile-overview-1",
          element: <ProfileOverview1 />,
        },
        {
          path: "profile-overview-2",
          element: <ProfileOverview2 />,
        },
        {
          path: "profile-overview-3",
          element: <ProfileOverview3 />,
        },
        {
          path: "wizard-layout-1",
          element: <WizardLayout1 />,
        },
        {
          path: "wizard-layout-2",
          element: <WizardLayout2 />,
        },
        {
          path: "wizard-layout-3",
          element: <WizardLayout3 />,
        },
        {
          path: "blog-layout-1",
          element: <BlogLayout1 />,
        },
        {
          path: "blog-layout-2",
          element: <BlogLayout2 />,
        },
        {
          path: "blog-layout-3",
          element: <BlogLayout3 />,
        },
        {
          path: "pricing-layout-1",
          element: <PricingLayout1 />,
        },
        {
          path: "pricing-layout-2",
          element: <PricingLayout2 />,
        },
        {
          path: "invoice-layout-1",
          element: <InvoiceLayout1 />,
        },
        {
          path: "invoice-layout-2",
          element: <InvoiceLayout2 />,
        },
        {
          path: "faq-layout-1",
          element: <FaqLayout1 />,
        },
        {
          path: "faq-layout-2",
          element: <FaqLayout2 />,
        },
        {
          path: "faq-layout-3",
          element: <FaqLayout3 />,
        },
        {
          path: "change-password",
          element: <ChangePassword />,
        },
        {
          path: "regular-table",
          element: <RegularTable />,
        },
        {
          path: "tabulator",
          element: <Tabulator />,
        },
        {
          path: "modal",
          element: <Modal />,
        },
        {
          path: "slide-over",
          element: <SlideOver />,
        },
        {
          path: "notification",
          element: <Notification />,
        },
        {
          path: "tab",
          element: <Tab />,
        },
        {
          path: "accordion",
          element: <Accordion />,
        },
        {
          path: "button",
          element: <Button />,
        },
        {
          path: "alert",
          element: <Alert />,
        },
        {
          path: "progress-bar",
          element: <ProgressBar />,
        },
        {
          path: "tooltip",
          element: <Tooltip />,
        },
        {
          path: "dropdown",
          element: <Dropdown />,
        },
        {
          path: "typography",
          element: <Typography />,
        },
        {
          path: "icon",
          element: <Icon />,
        },
        {
          path: "loading-icon",
          element: <LoadingIcon />,
        },
        {
          path: "regular-form",
          element: <RegularForm />,
        },
        {
          path: "datepicker",
          element: <Datepicker />,
        },
        {
          path: "tom-select",
          element: <TomSelect />,
        },
        {
          path: "file-upload",
          element: <FileUpload />,
        },
        {
          path: "wysiwyg-editor",
          element: <WysiwygEditor />,
        },
        {
          path: "validation",
          element: <Validation />,
        },
        {
          path: "chart",
          element: <Chart />,
        },
        {
          path: "slider",
          element: <Slider />,
        },
        {
          path: "image-zoom",
          element: <ImageZoom />,
        },
      ],
    },
    {
      path: "/top-menu",
      element: <TopMenu />,
      children: [
        {
          path: "dashboard-overview-1",
          element: <DashboardOverview1 />,
        },
        {
          path: "dashboard-overview-2",
          element: <DashboardOverview2 />,
        },
        {
          path: "dashboard-overview-3",
          element: <DashboardOverview3 />,
        },
        {
          path: "dashboard-overview-4",
          element: <DashboardOverview4 />,
        },
        {
          path: "categories",
          element: <Categories />,
        },
        {
          path: "add-product",
          element: <AddProduct />,
        },
        {
          path: "product-list",
          element: <ProductList />,
        },
        {
          path: "product-grid",
          element: <ProductGrid />,
        },
        {
          path: "transaction-list",
          element: <TransactionList />,
        },
        {
          path: "transaction-detail",
          element: <TransactionDetail />,
        },
        {
          path: "seller-list",
          element: <SellerList />,
        },
        {
          path: "seller-detail",
          element: <SellerDetail />,
        },
        {
          path: "reviews",
          element: <Reviews />,
        },
        {
          path: "inbox",
          element: <Inbox />,
        },
        {
          path: "file-manager",
          element: <FileManager />,
        },
        {
          path: "point-of-sale",
          element: <PointOfSale />,
        },
        {
          path: "chat",
          element: <Chat />,
        },
        {
          path: "post",
          element: <Post />,
        },
        {
          path: "calendar",
          element: <Calendar />,
        },
        {
          path: "crud-data-list",
          element: <CrudDataList />,
        },
        {
          path: "crud-form",
          element: <CrudForm />,
        },
        {
          path: "users-layout-1",
          element: <UsersLayout1 />,
        },
        {
          path: "users-layout-2",
          element: <UsersLayout2 />,
        },
        {
          path: "users-layout-3",
          element: <UsersLayout3 />,
        },
        {
          path: "profile-overview-1",
          element: <ProfileOverview1 />,
        },
        {
          path: "profile-overview-2",
          element: <ProfileOverview2 />,
        },
        {
          path: "profile-overview-3",
          element: <ProfileOverview3 />,
        },
        {
          path: "wizard-layout-1",
          element: <WizardLayout1 />,
        },
        {
          path: "wizard-layout-2",
          element: <WizardLayout2 />,
        },
        {
          path: "wizard-layout-3",
          element: <WizardLayout3 />,
        },
        {
          path: "blog-layout-1",
          element: <BlogLayout1 />,
        },
        {
          path: "blog-layout-2",
          element: <BlogLayout2 />,
        },
        {
          path: "blog-layout-3",
          element: <BlogLayout3 />,
        },
        {
          path: "pricing-layout-1",
          element: <PricingLayout1 />,
        },
        {
          path: "pricing-layout-2",
          element: <PricingLayout2 />,
        },
        {
          path: "invoice-layout-1",
          element: <InvoiceLayout1 />,
        },
        {
          path: "invoice-layout-2",
          element: <InvoiceLayout2 />,
        },
        {
          path: "faq-layout-1",
          element: <FaqLayout1 />,
        },
        {
          path: "faq-layout-2",
          element: <FaqLayout2 />,
        },
        {
          path: "faq-layout-3",
          element: <FaqLayout3 />,
        },
        {
          path: "update-profile",
          element: <UpdateProfile />,
        },
        {
          path: "change-password",
          element: <ChangePassword />,
        },
        {
          path: "regular-table",
          element: <RegularTable />,
        },
        {
          path: "tabulator",
          element: <Tabulator />,
        },
        {
          path: "modal",
          element: <Modal />,
        },
        {
          path: "slide-over",
          element: <SlideOver />,
        },
        {
          path: "notification",
          element: <Notification />,
        },
        {
          path: "tab",
          element: <Tab />,
        },
        {
          path: "accordion",
          element: <Accordion />,
        },
        {
          path: "button",
          element: <Button />,
        },
        {
          path: "alert",
          element: <Alert />,
        },
        {
          path: "progress-bar",
          element: <ProgressBar />,
        },
        {
          path: "tooltip",
          element: <Tooltip />,
        },
        {
          path: "dropdown",
          element: <Dropdown />,
        },
        {
          path: "typography",
          element: <Typography />,
        },
        {
          path: "icon",
          element: <Icon />,
        },
        {
          path: "loading-icon",
          element: <LoadingIcon />,
        },
        {
          path: "regular-form",
          element: <RegularForm />,
        },
        {
          path: "datepicker",
          element: <Datepicker />,
        },
        {
          path: "tom-select",
          element: <TomSelect />,
        },
        {
          path: "file-upload",
          element: <FileUpload />,
        },
        {
          path: "wysiwyg-editor",
          element: <WysiwygEditor />,
        },
        {
          path: "validation",
          element: <Validation />,
        },
        {
          path: "chart",
          element: <Chart />,
        },
        {
          path: "slider",
          element: <Slider />,
        },
        {
          path: "image-zoom",
          element: <ImageZoom />,
        },
      ],
    },
    {
      path: "/giris-yap",
      element: <Login />,
    },
    {
      path: "/kayit-ol",
      element: <Register />,
    },
    {
      path: "/gizlilik-sozlesmesi",
      element: <Register />,
    },
    {
      path: "/error-page",
      element: <ErrorPage />,
    },
    {
      path: "*",
      element: <ErrorPage />,
    },

    // new routes
    // {
    //   path: "/seyahat-formlari",
    //   element: <TravelForms />,
    // },
    {
      path: "/seyahat-formu-olustur",
      element: <CreateTravel />,
    },
    // {
    //   path: "/seyahat-formu-duzenle/:formId",
    //   element: <TravelDetail />,
    // },
  ];

  return useRoutes(routes);
};

export default Router;
