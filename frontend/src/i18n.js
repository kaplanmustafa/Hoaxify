import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { register } from "timeago.js";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translations: {
        "Sign Up": "Sign Up",
        "Password mismatch": "Password mismatch",
        Username: "Username",
        "Display Name": "Display Name",
        Password: "Password",
        "Password Repeat": "Password Repeat",
        Login: "Login",
        Logout: "Logout",
        Users: "Users",
        Next: "next >",
        Previous: "< previous",
        "Load Failure": "Load Failure",
        "User Not Found!": "User Not Found!",
        Edit: "Edit",
        "Change Display Name": "Change Display Name",
        Save: "Save",
        Cancel: "Cancel",
        "My Profile": "My Profile",
        "Post Hoax...": "Post Hoax...",
        "There are no hoaxes": "There are no hoaxes",
        "Load Old Hoaxes": "Load Old Hoaxes",
        "There are new hoaxes": "There are new hoaxes",
        "Delete Hoax": "Delete Hoax",
        "Are you sure to delete hoax?": "Are you sure to delete hoax?",
        "Delete My Account": "Delete My Account",
        "Are you sure to delete your account?":
          "Are you sure to delete your account?",
      },
    },
    tr: {
      translations: {
        "Sign Up": "Kaydol",
        "Password mismatch": "Şifreler eşleşmiyor",
        Username: "Kullanıcı Adı",
        "Display Name": "Tercih Edilen İsim",
        Password: "Şifre",
        "Password Repeat": "Şifre Tekrar",
        Login: "Giriş Yap",
        Logout: "Çıkış",
        Users: "Kullanıcılar",
        Next: "sonraki >",
        Previous: "< önceki",
        "Load Failure": "Liste alınamadı",
        "User Not Found!": "Kullanıcı Bulunamadı!",
        Edit: "Düzenle",
        "Change Display Name": "Görünür İsminizi Değiştirin",
        Save: "Kaydet",
        Cancel: "İptal",
        "My Profile": "Hesabım",
        "Post Hoax...": "Hoax Paylaş...",
        "There are no hoaxes": "Hoax bulunamadı",
        "Load Old Hoaxes": "Geçmiş Hoaxları Yükle",
        "There are new hoaxes": "Yeni Hoaxlar var",
        "Delete Hoax": `Hoax'u Sil`,
        "Are you sure to delete hoax?": `Hoax'u silmek istediğinizden emin misiniz?`,
        "Delete My Account": "Hesabımı Sil",
        "Are you sure to delete your account?":
          "Hesabınızı silmek istediğinizden emin misiniz?",
      },
    },
  },
  fallbackLng: "en", // hata durumunda dil ne olsun
  ns: ["translations"],
  defaultNS: "translations",
  keySeparator: false,
  interpolation: {
    escapeValue: false,
    formatSeparator: ",",
  },
  react: {
    wait: true,
  },
});

const timeagoTR = (number, index) => {
  return [
    ["az önce", "şimdi"],
    ["%s saniye önce", "%s saniye içinde"],
    ["1 dakika önce", "1 dakika içinde"],
    ["%s dakika önce", "%s dakika içinde"],
    ["1 saat önce", "1 saat içinde"],
    ["%s saat önce", "%s saat içinde"],
    ["1 gün önce", "1 gün içinde"],
    ["%s gün önce", "%s gün içinde"],
    ["1 hafta önce", "1 hafta içinde"],
    ["%s hafta önce", "%s hafta içinde"],
    ["1 ay önce", "1 ay içinde"],
    ["%s ay önce", "%s ay içinde"],
    ["1 yıl önce", "1 yıl içinde"],
    ["%s yıl önce", "%s yıl içinde"],
  ][index];
};
register("tr", timeagoTR);

export default i18n;
