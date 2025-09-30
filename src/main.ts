/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from "@/plugins";

// Components
import App from "./App.vue";

// Composables
import { createApp } from "vue";

// Styles
import "unfonts.css";
import axios from "axios";

const app = createApp(App);

registerPlugins(app);

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

app.mount("#app");
