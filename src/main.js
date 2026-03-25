// Import main stylesheet with Tailwind CSS directives
import './assets/main.css'

// Import Vue application factory function
import { createApp } from 'vue'

// Import PrimeIcons for icon library support
import 'primeicons/primeicons.css'

// Import root application component
import App from './App.vue'

// Create and mount the Vue application instance
const app = createApp(App)

// Mount the app to the target DOM element with id 'app'
app.mount('#app')
