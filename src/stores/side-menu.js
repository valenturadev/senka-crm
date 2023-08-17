import { atom } from "recoil";

const sideMenuData = [
  {
    icon: "Home",
    title: "Ana Sayfa",
    pathname: "/",
  },
  {
    icon: "Plane",
    title: "Seyahat",
    subMenu: [
      {
        icon: "",
        pathname: "/seyahat-formlari",
        title: "Seyahat Formları",
      },
      {
        icon: "",
        pathname: "/seyahat-formu-olustur",
        title: "Seyahat Formu Oluştur",
      },
    ],
  },
  {
    icon: "Book",
    title: "Mutakabat",
    subMenu: [
      {
        icon: "",
        pathname: "/mutakabat-formlari",
        title: "Mutakabat Formları",
      }
    ],
  },
  {
    icon: "Car",
    title: "Araç",
    subMenu: [
      {
        icon: "",
        pathname: "/arac-programlari",
        title: "Araç Programları",
      },
      {
        icon: "",
        pathname: "/arac-programi-olustur",
        title: "Araç Programı Oluştur",
      },
    ],
  },
  {
    icon: "Building",
    title: "Otel",
    subMenu: [
      {
        icon: "",
        pathname: "/otel-programlari",
        title: "Otel Programları",
      },
      {
        icon: "",
        pathname: "/otel-programi-olustur",
        title: "Otel Programı Oluştur",
      },
    ],
  },
  // tabulator
  "devider",
  {
    icon: "User",
    pathname: "/profil",
    title: "Profil",
  },
]

const filteredMenuCustomerRelations = sideMenuData
const filteredMenuElse = sideMenuData.filter(item => item.title !== "Seyahat");

const sideMenu = atom({
  key: "sideMenu",
  default: {
    menu: filteredMenuCustomerRelations,
  },
});

export { sideMenu };
