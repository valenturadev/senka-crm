import { atom } from "recoil";

function getRolesFromLocalStorage() {
  const user = JSON.parse(localStorage.getItem('user'));
  const roles = user?.role
  console.log(roles)
  return roles || [];
}

function filterSideMenuByRoles(roles) {
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

const userRoles = getRolesFromLocalStorage();

const filteredSideMenu = filterSideMenuByRoles(userRoles);

// Recoil atomunu oluşturun
const sideMenu = atom({
  key: "sideMenu",
  default: {
    menu: filteredSideMenu,
  },
});

export { sideMenu };