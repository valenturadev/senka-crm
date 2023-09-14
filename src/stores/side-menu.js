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
    icon: "Anchor",
    title: "Gezi Takip",
    subMenu: [
      {
        icon: "",
        pathname: "/ogretmen-ekle",
        title: "Öğretmen Ekle",
      },
      {
        icon: "",
        pathname: "/gezi-formlari",
        title: "Gezi Formları",
      },
    ],
  },
  {
    icon: "Award",
    title: "Finans",
    subMenu: [
      {
        icon: "",
        pathname: "/seyahat-formlari",
        title: "Mutabakat Formları",
      },
    ],
  },
  {
    icon: "Bell",
    title: "Operasyon Ekibi",
    subMenu: [
      {
        icon: "",
        pathname: "/seyahat-formlari",
        title: "Mutabakat Formları",
      },
    ],
  },
  {
    icon: "Bookmark",
    title: "Öğretmen",
    subMenu: [
      {
        icon: "",
        pathname: "/ogretmen-sifre-olustur/:phoneNumber",
        title: "Şifre Ekleme",
      },

      {
        icon: "",
        pathname: "/tum-geziler",
        title: "Geziler",
      },
    ],
  },

  {
    icon: "Briefcase",
    title: "Muhasebe",
    subMenu: [
      {
        icon: "",
        pathname: "/makbuz-onay/",
        title: "Makbuz onay",
      },
    ],
  },
  {
    icon: "Codepen",
    title: "Finans",
    subMenu: [
      {
        icon: "",
        pathname: "/mutabakat-listesi/",
        title: "Mutabakat listesi",
      },
    ],
  },
  /* {
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
  }, */
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
