<template>
  <div id="data-list-list-view" class="data-list-container">
    <div v-if="initProgress" class="w-100 mt-5 mb-5">
      <vs-progress indeterminate color="primary"></vs-progress>
    </div>

    <!--Coordinates-->
    <Coordinates :isSidebarActive="showCoordinatesSidebar"
                 @closeSidebar="showCoordinatesSidebar = false"
                 :travel="sidebarData"/>

    <vs-table v-model="selected" ref="table" pagination :max-items="itemsPerPage" search
              :data="list">
      <div slot="header" class="flex flex-wrap-reverse items-center flex-grow justify-between">

        <div class="flex flex-wrap-reverse items-center data-list-btn-container">
          <!-- Action - dropdown -->
          <vs-dropdown vs-trigger-click class="dd-actions cursor-pointer mr-4 mb-4">

            <div
                class="p-4 shadow-drop rounded-lg d-theme-dark-bg cursor-pointer flex items-center justify-center text-lg font-medium w-32 w-full">
              <span class="mr-2">Acciones</span>
              <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4"/>
            </div>

            <vs-dropdown-menu>
              <vs-dropdown-item @click="exportToExcel">
                            <span class="flex items-center">
                              <feather-icon icon="DownloadIcon" svgClasses="h-4 w-4" class="mr-2"/>
                              <span>Exportar</span>
                            </span>
              </vs-dropdown-item>
            </vs-dropdown-menu>
          </vs-dropdown>
        </div>

        <div class="flex flex-wrap-reverse items-center data-list-btn-container">
          <!-- Items per page -->
          <vs-dropdown vs-trigger-click class="cursor-pointer mb-4 mr-4 items-per-page-handler">
            <div
                class="p-4 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium">
            <span class="mr-2">{{
                currentPage * itemsPerPage - (itemsPerPage - 1)
              }} - {{ list.length - currentPage * itemsPerPage > 0 ? currentPage * itemsPerPage : list.length }} de {{
                queriedItems
              }}</span>
              <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4"/>
            </div>
            <vs-dropdown-menu>

              <vs-dropdown-item @click="itemsPerPage=10">
                <span>10</span>
              </vs-dropdown-item>
              <vs-dropdown-item @click="itemsPerPage=20">
                <span>20</span>
              </vs-dropdown-item>
              <vs-dropdown-item @click="itemsPerPage=30">
                <span>30</span>
              </vs-dropdown-item>
              <vs-dropdown-item @click="itemsPerPage=40">
                <span>40</span>
              </vs-dropdown-item>
            </vs-dropdown-menu>
          </vs-dropdown>
        </div>
      </div>

      <template slot="thead">
        <vs-th sort-key="name">Usuario</vs-th>
        <vs-th sort-key="user">Usuario</vs-th>
        <vs-th sort-key="createdAt">Fecha de Inicio</vs-th>
        <vs-th sort-key="stopAt">Fecha de Fin</vs-th>
        <vs-th sort-key="type">Tipo</vs-th>
        <vs-th sort-key="state">Estado</vs-th>
        <vs-th>Acciones</vs-th>
      </template>

      <template slot-scope="{data}">
        <tbody>
        <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
          <vs-td>
            <p class="product-name font-medium truncate">{{ tr.user.displayName }}</p>
          </vs-td>

          <vs-td>
            <p class="product-name font-medium truncate">@{{ tr.user.userName }}</p>
          </vs-td>

          <vs-td>
            <p class="product-name font-medium truncate">{{ tr.createdAt | date(true) }} {{
                tr.createdAt | time(true)
              }}</p>
          </vs-td>

          <vs-td>
            <p class="product-name font-medium truncate">{{ tr.stopAt | date(true) }} {{ tr.stopAt | time(true) }}</p>
          </vs-td>

          <vs-td>
            <p v-if="tr.type === 'events'" class="product-name font-medium truncate">Eventos</p>
            <p v-else-if="tr.type === 'list'" class="product-name font-medium truncate">Listas</p>
            <p v-else-if="tr.type === 'destination'" class="product-name font-medium truncate">Destinos</p>
          </vs-td>

          <vs-td>
            <vs-chip color="green" v-if="tr.state">Activo</vs-chip>
            <vs-chip color="red" v-else>Finalizado</vs-chip>
          </vs-td>

          <vs-td class="whitespace-no-wrap">
            <feather-icon class="mr-2" icon="MapPinIcon" svgClasses="w-5 h-5 hover:text-primary stroke-current"
                          @click.stop="sidebarData = tr, showCoordinatesSidebar= true"></feather-icon>
          </vs-td>
        </vs-tr>
        </tbody>
      </template>
    </vs-table>
  </div>
</template>

<script>

import { db } from '@/firebase/firebaseConfig'
import Coordinates from "@/views/travels/Coordinates"

const _ = require('lodash')

export default {
  name: 'ClientsList',
  components: { Coordinates },
  data () {
    return {
      itemsPerPage: 20,
      isMounted: false,
      list: [],
      initProgress: false,
      selected: null,
      filter: false,

      // Data Sidebar
      showCoordinatesSidebar: false,
      sidebarData: {},

      // Export
      fileName: '',
      formats: ['xlsx', 'csv', 'txt'],
      cellAutoWidth: true,
      selectedFormat: 'xlsx'
    }
  },
  async created () {
    try {
      //Get travels
      this.initProgress = true
      const querySnap = await db.collectionGroup('travels')
          .orderBy('createdAt', 'desc')
          .limit(100)
          .get()
      querySnap.forEach((doc) => {
        let user = {
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt.toDate(),
          stopAt: doc.data().stopAt ? doc.data().stopAt.toDate() : null
        }
        this.list.push(user)
      })
    } catch (e) {
      console.log(e)
      this.$vs.notify({
        color: 'warning',
        title: '¡Oh no!',
        text: 'Hubo un error.'
      })
    } finally {
      this.initProgress = false
    }
  },
  mounted () {
    this.isMounted = true
  },
  computed: {
    currentPage () {
      if (this.isMounted) {
        return this.$refs.table.currentx
      }
      return 0
    },
    queriedItems () {
      return this.$refs.table ? this.$refs.table.queriedResults.length : this.list.length
    }
  },
  methods: {
    exportToExcel () {
      const headerTitle = ['Nombre', 'Email', 'Usuario', 'Fecha de registro', 'Estado']
      const headerVal = ['displayName', 'email', 'userName', 'createdAt', 'state']
      import('@/vendor/Export2Excel').then(excel => {
        const list = _.cloneDeep(this.list)
        const data = this.formatJson(headerVal, list)
        excel.export_json_to_excel({
          header: headerTitle,
          data,
          filename: this.fileName,
          autoWidth: this.cellAutoWidth,
          bookType: this.selectedFormat
        })
        this.clearFields()
      })
    },
    clearFields () {
      this.filename = ''
      this.cellAutoWidth = true
      this.selectedFormat = 'xlsx'
    },
    formatJson (filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        // Add col name which needs to be translated
        // if (j === 'timestamp') {
        //   return parseTime(v[j])
        // } else {
        //   return v[j]
        // }

        return v[j]
      }))
    }
  }
}
</script>

<style lang="scss">
#data-list-list-view {
  .vs-con-table {

    /*
      Below media-queries is fix for responsiveness of action buttons
      Note: If you change action buttons or layout of this page, Please remove below style
    */
    @media (max-width: 689px) {
      .vs-table--search {
        margin-left: 0;
        max-width: unset;
        width: 100%;

        .vs-table--search-input {
          width: 100%;
        }
      }
    }

    @media (max-width: 461px) {
      .items-per-page-handler {
        display: none;
      }
    }

    @media (max-width: 341px) {
      .data-list-btn-container {
        width: 100%;

        .dd-actions,
        .btn-add-new {
          width: 100%;
          margin-right: 0 !important;
        }
      }
    }

    .product-name {
      max-width: 23rem;
    }

    .vs-table--header {
      display: flex;
      flex-wrap: wrap;
      margin-left: 1.5rem;
      margin-right: 1.5rem;

      > span {
        display: flex;
        flex-grow: 1;
      }

      .vs-table--search {
        padding-top: 0;

        .vs-table--search-input {
          padding: 0.9rem 2.5rem;
          font-size: 1rem;

          & + i {
            left: 1rem;
          }

          &:focus + i {
            left: 1rem;
          }
        }
      }
    }

    .vs-table {
      border-collapse: separate;
      border-spacing: 0 1.3rem;
      padding: 0 1rem;

      tr {
        box-shadow: 0 4px 20px 0 rgba(0, 0, 0, .05);

        td {
          padding: 10px;

          &:first-child {
            border-top-left-radius: .5rem;
            border-bottom-left-radius: .5rem;
          }

          &:last-child {
            border-top-right-radius: .5rem;
            border-bottom-right-radius: .5rem;
          }
        }

        td.td-check {
          padding: 20px !important;
        }
      }
    }

    .vs-table--thead {
      th {
        padding-top: 0;
        padding-bottom: 0;

        .vs-table-text {
          text-transform: uppercase;
          font-weight: 600;
        }
      }

      th.td-check {
        padding: 0 15px !important;
      }

      tr {
        background: none;
        box-shadow: none;
      }
    }

    .vs-table--pagination {
      justify-content: center;
    }
  }
}
</style>
