import { atom } from "recoil";

// Local storage'den rolleri çekmek için bir fonksiyon
function getRolesFromLocalStorage() {
  const user = JSON.parse(localStorage.getItem('user'));
  const roles = user?.role
  console.log(roles)
  return roles || [];
}

// Rollerinize göre yan menüyü filtrelemek için bir fonksiyon
function filterSideMenuByRoles(roles) {
  let filteredMenu = [];

  // Rollerinize göre yan menüyü filtreleyin
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
    filteredMenu = filteredMenu.concat(sideMenuData.filter(item => item.title === "Normal"));
  }
  if (roles.includes("is_web_team")) {
    filteredMenu = filteredMenu.concat(sideMenuData.filter(item => item.title === "Web Kontrolcü"));
  }
  if (roles.includes("is_muhasebe")) {
    filteredMenu = filteredMenu.concat(sideMenuData.filter(item => item.title === "Muhasebe"));
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
    icon: "Columns",
    title: "Normal Kullanıcı",
    subMenu: [
      {
        icon: "",
        pathname: "/sozlesme-onay",
        title: "Sözleşme Onay",
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
  {
    icon: "Server",
    title: "Web Kontrolcü",
    subMenu: [
      {
        icon: "",
        title: "Geziler",
        subMenu: [
          {
            icon: "",
            pathname: "/gezi-formlari",
            title: "Gezi Formları",
          },
        ]
      },
      {
        icon: "",
        title: "Mutabakat Formları",
        subMenu: [
          {
            icon: "",
            pathname: "/mutabakat-formlari",
            title: "Mutabakat Formları",
          }
        ]
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

const filteredMenuCustomerRelations = sideMenuData.filter(item => item.title === "Müşteri İlişkileri");
const filteredMenuOperationTeam = sideMenuData.filter(item => item.title === "Operasyon Ekibi");
const filteredMenuFinanceTeam = sideMenuData.filter(item => item.title === "Finans");
const filteredMenuTeacher = sideMenuData.filter(item => item.title === "Öğretmen");
const filteredMenuNormalUser = sideMenuData.filter(item => item.title === "Normal");
const filteredMenuWebTeam = sideMenuData.filter(item => item.title === "Web Kontrolcü");
const filteredMenuMuhasebe = sideMenuData.filter(item => item.title === "Muhasebe");

// Local storage'den rolleri al
const userRoles = getRolesFromLocalStorage();

// Yan menüyü rollerinize göre filtreleyin
const filteredSideMenu = filterSideMenuByRoles(userRoles);

// Recoil atomunu oluşturun
const sideMenu = atom({
  key: "sideMenu",
  default: {
    menu: filteredSideMenu,
  },
});

export { sideMenu };