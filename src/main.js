import Vue from 'vue'
import App from './App.vue'
// Firebase
import '@/firebase/firebaseConfig'

// Vuesax Component Framework
import Vuesax from 'vuesax'
import 'material-icons/iconfont/material-icons.css' //Material Icons
import 'vuesax/dist/vuesax.css' // Vuesax
Vue.use(Vuesax)

// axios
import axios from 'axios'

Vue.prototype.$http = axios

// Theme Configurations
import '../themeConfig.js'

// ACL
import acl from './acl/acl'

// Globally Registered Components
import './globalComponents.js'

// Styles: SCSS
import './assets/scss/main.scss'

// Tailwind
import '@/assets/css/main.css'

// Vue Router
import router from './router'

// Vuex Store
import store from './store/store'

// i18n
import i18n from './i18n/i18n'

// Vuexy Admin Filters
import './filters/filters'

// Clipboard
import VueClipboard from 'vue-clipboard2'

Vue.use(VueClipboard)

// VeeValidate
import VeeValidate from 'vee-validate'

const attributesAr = {
    name: 'nombre',
    price: 'precio',
    purchasePrice: 'precio de compra',
    category: 'categoria',
    brand: 'marca',
    description: 'descripción',
    department: 'departamento',
    province: 'provincia',
    district: 'distrito',
    address: 'dirección',
    businessName: 'razón social',
    model: 'modelo',
    licensePlate: 'placa',
    typeDocument: 'tipo de documento',
    document: 'documento',
    motive: 'motivo',
    warehouseIn: 'almacén de ingreso',
    warehouseOut: 'almacén de salida',
    merchant: 'mercaderista',
    phone: 'teléfono',
    gloss: 'glosa',
    dateOfIssue: 'fecha de emisión',
    endDate: 'fecha de vencimiento',
    number: 'número',
    provider: 'provevedor',
    applyIgv: 'afecto a igv',
    base: 'base imponible',
    unaffected: 'inafecto',
    account: 'cuenta',
    cost: 'centro de costo',
    paymentMethod: 'forma de pago',
    paymentDate: 'fecha de pago',
    constDetract: 'número de constancia',
    detractionId: 'id de detracción',
    constPayment: 'número de costancia',
    typeInvoice: 'tipo de comprobante',
    inputInvoice: 'ingreso con factura',
    inputTicket: 'ingreso con boleta',
    outputInvoice: 'gastos con factura',
    outputTicket: 'gastos con boletas',
    outputReceipt: 'gastos con recibos',
    outputSC: 'gastos sin comprobantes',
    date: 'fecha',
    warehouse: 'local',
    observation: 'observación',
    quantity: 'cantidad',
    directedTo: 'dirigido a',
    currency: 'moneda',
    type: 'tipo',
    product: 'producto',
    segment: 'segmento',
    client: 'cliente',
    vehicle: 'vehículo',
    lastName: 'apellidos',
    kindOfDeal: 'tipo de trato',
    typeOfContact: 'tipo de contacto',
    contact: 'contacto',
    igvType: 'tipo de igv',
    roundingType: 'tipo de redondeo',
    delivery: 'forma de entrega',
    offerValidity: 'validez de oferta',
    driverName: 'nombre de conductor',
    driverDocument: 'documento de conductor',
    regimeType: 'tipo de regimen',
    numberPart: 'número de parte',
    month: 'mes',
    year: 'año',
    paymentGateway: 'pasarela de pago'
}

Vue.use(VeeValidate, {
    dictionary: {
        es: { attributes: attributesAr }
    }
})

// Translate validations
import {Validator} from 'vee-validate'
import es_validator from 'vee-validate/dist/locale/es'

Validator.localize('es', es_validator)

// Vuejs - Vue wrapper for hammerjs
import {VueHammer} from 'vue2-hammer'

Vue.use(VueHammer)

// PrismJS
import 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'

// Feather font icon
require('./assets/css/iconfont.css')

// Vselect
import vSelect from 'vue-select'

Vue.component('v-select', vSelect)

// Vue select css
// Note: In latest version you have to add it separately
// import 'vue-select/dist/vue-select.css';

Vue.config.productionTip = false

new Vue({
    router,
    store,
    i18n,
    acl,
    render: h => h(App)
}).$mount('#app')
