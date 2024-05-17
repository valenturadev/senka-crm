import { atom } from "recoil";

function getRolesFromLocalStorage() {
  const user = JSON.parse(localStorage.getItem('user'));
  const roles = user?.role
  return roles || [];
}

function filterSideMenuByRoles() {
  const roles = getRolesFromLocalStorage();
  let filteredMenu = [];

  if (roles.includes('is_customer_relations')) {
    filteredMenu = filteredMenu.concat(sideMenuData.filter(item => item.title === "Müşteri İlişkileri"));
  }
  if (roles.includes("is_operation_team")) {
    filteredMenu = filteredMenu.concat(sideMenuData.filter(item => item.title === "Operasyon Ekibi"));
  }
  if (roles.includes("is_finance_team")) {
    filteredMenu = filteredMenu.concat(sideMenuData.filter(item => item.title === "Finans"));
  }
  if (roles.includes("is_teacher")) {
    filteredMenu = filteredMenu.concat(sideMenuData.filter(item => item.title === "Öğretmen"));
  }
  if (roles.includes("is_normal_user")) {
    filteredMenu = filteredMenu.concat(sideMenuData.filter(item => item.title === "Normal Kullanıcı"));
  }
  if (roles.includes("is_web_team")) {
    filteredMenu = filteredMenu.concat(sideMenuData.filter(item => item.title === "Web Kontrolcü"));
  }
  if (roles.includes("is_muhasebe")) {
    filteredMenu = filteredMenu.concat(sideMenuData.filter(item => item.title === "Muhasebe"));
  }
  if (roles.includes("is_admin")) {
    filteredMenu = filteredMenu.concat(sideMenuData.filter(item => item.title === "Admin"));
  }

  return filteredMenu;
}

const sideMenuData = [
  {
    icon: "Home",
    title: "Ana Sayfa",
    pathname: "/",
  },
  {
    icon: "Plane",
    title: "Müşteri İlişkileri",
    subMenu: [
      {
        icon: "",
        title: "Seyahatler",
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
        icon: "",
        title: "Geziler",
        subMenu: [
          {
            icon: "",
            pathname: "/gezi-formlari",
            title: "Gezi Formları",
          },
        ],
      },
      {
        icon: "",
        pathname: "/finans-mutabakat",
        title: "Finans-Mutabakat",
      },
    ],
  },
  {
    icon: "Bell",
    title: "Operasyon Ekibi",
    subMenu: [
      {
        icon: "",
        pathname: "/mutabakat-formlari",
        title: "Mutabakat Formları",
      },
      {
        icon: "",
        pathname: "/geziler",
        title: "Geziler",
      },
    ],
  },
  {
    icon: "Columns",
    title: "Normal Kullanıcı",
    subMenu: [
      {
        icon: "",
        pathname: "/tum-ogrencilerim",
        title: "Tüm Öğrencilerim",
      },
    ],
  },
  {
    icon: "Bookmark",
    title: "Öğretmen",
    subMenu: [
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
      }, {
        icon: "",
        pathname: "/muhasebe-mutabakat-formlari/",
        title: "Mutabakat Formları",
      },
    ],
  },
  {
    icon: "Codepen",
    title: "Finans",
    subMenu: [
      {
        icon: "",
        pathname: "/mutabakat-listesi",
        title: "Mutabakat listesi",
      },
    ],
  },
  {
    icon: "Server",
    title: "Web Kontrolcü",
    subMenu: [
      {
        icon: "",
        pathname: "/web-gezi-formlari",
        title: "Gezi Formları",
      },
      {
        icon: "",
        pathname: "/web-mutabakat-formlari",
        title: "Mutabakat Formları",
      }
    ],
  },
  {
    icon: "Mic",
    title: "Admin",
    subMenu: [
      {
        icon: "",
        pathname: "/tum-kullanicilar/",
        title: "Tüm Kullanıcılar",
      },
      {
        icon: "",
        pathname: "/rol-atama",
        title: "Rol Atama",
      },
      {
        icon: "",
        pathname: "/okul-ekle",
        title: "Okul Ekle",
      },
      {
        icon: "",
        pathname: "/otel-ekle",
        title: "Otel Ekle",
      },
      {
        icon: "",
        pathname: "/restoran-ekle",
        title: "Restoran Ekle",
      },
      {
        icon: "",
        pathname: "/rehber-ekle",
        title: "Rehber Ekle",
      }
    ],
  },
  "devider",
  {
    icon: "User",
    pathname: "/profil",
    title: "Profil",
  },
]

const filteredSideMenu = filterSideMenuByRoles();

// Recoil atomunu oluşturun
const sideMenu = atom({
  key: "sideMenu",
  default: {
    menu: filteredSideMenu,
  },
});

export { sideMenu };