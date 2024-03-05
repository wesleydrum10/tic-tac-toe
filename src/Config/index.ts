import packageJson from "../../package.json"
const {VITE_APP_PUBLIC_URL} = import.meta.env

export default {
  appVersion: packageJson.version,
  isProduction: import.meta.env.MODE === "production",
  env: import.meta.env.DEV,
  publicUrl: {
    url: VITE_APP_PUBLIC_URL,
  },
};
