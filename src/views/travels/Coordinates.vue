<template>
  <vs-sidebar click-not-close position-right parent="body" default-index="1" color="primary"
              class="add-new-data-sidebar items-no-padding" spacer v-model="isSidebarActiveLocal">
    <div class="mt-6 flex items-center justify-between px-6">
      <h4>Registro de coordenadas @{{ this.travel.user.userName }}</h4>
      <feather-icon icon="XIcon" @click.stop="isSidebarActiveLocal = false" class="cursor-pointer"></feather-icon>
    </div>
    <vs-divider class="mb-0"></vs-divider>

    <component :is="scrollbarTag" class="scroll-area--data-list-add-new" :settings="settings" :key="$vs.rtl">
      <div class="p-6">
        <vs-button :disabled="progress" @click="exportToExcel" style="width: 100%">Exportar</vs-button>
        <vs-button class="mt-2" :disabled="progress" @click="openDashboard" style="width: 100%">Ver en mapa</vs-button>
        <!--Current routes-->
        <vs-table stripe pagination :max-items="15" search :data="coordinates">
          <template slot="header">
            <h4>Listado</h4>
          </template>

          <template slot="thead">
            <vs-th sort-key="order">Orden</vs-th>
            <vs-th sort-key="lat">Latitud</vs-th>
            <vs-th sort-key="lon">Longitud</vs-th>
            <vs-th sort-key="createdAt">Fecha</vs-th>
          </template>

          <template slot-scope="{data}">
            <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
              <vs-td>
                <p>{{ indextr + 1 }}</p>
              </vs-td>
              <vs-td>
                {{ tr.coordinates[0].lat }}
              </vs-td>
              <vs-td>
                {{ tr.coordinates[0].lon }}
              </vs-td>
              <vs-td>
                {{ tr.createdAt| date(true) }} {{ tr.createdAt| time(true) }}
              </vs-td>
            </vs-tr>
          </template>
        </vs-table>
      </div>
    </component>

    <div class="flex flex-wrap items-center p-6" slot="footer">
      <vs-button type="border" color="danger" @click="isSidebarActiveLocal = false">
        Cerrar
      </vs-button>
      <div v-if="progress" style="margin-top: 1rem; width: 100%">
        <vs-progress indeterminate color="primary"></vs-progress>
      </div>
    </div>
  </vs-sidebar>
</template>

<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import trimString from "../../mixins/trimString"
import { db } from '@/firebase/firebaseConfig'

const _ = require('lodash')

export default {
  name: 'Coordinates',
  props: {
    isSidebarActive: {
      type: Boolean,
      required: true
    },
    travel: {
      type: Object,
      required: true
    }
  },
  components: {
    VuePerfectScrollbar
  },
  mixins: [trimString],
  data () {
    return {
      settings: { // perfectscrollbar settings
        maxScrollbarLength: 60,
        wheelSpeed: .60
      },
      progress: false,
      coordinates: [],
      km: 0,
      // Export
      fileName: '',
      cellAutoWidth: true,
      selectedFormat: 'xlsx',
      headerTitle: ['Latitud', 'Longitud', 'Fecha'],
      activePrompt: false
    }
  },
  watch: {
    async isSidebarActive (val) {
      if (val) {
        try {
          this.progress = true
          await this.getCoordinates()
        } catch (e) {
          console.log(e)
          this.$vs.notify({
            color: 'warning',
            title: 'Coordenadas',
            text: 'Error al cargar coordenadas.'
          })
        } finally {
          this.progress = false
        }
      }
      else {
        this.coordinates = []
      }
    }
  },
  computed: {
    isSidebarActiveLocal: {
      get () {
        return this.isSidebarActive
      },
      set (val) {
        if (!val) {
          this.$emit('closeSidebar')
        }
      }
    },
    isFormValid () {
      return !this.errors.any()
    },
    scrollbarTag () {
      return this.$store.getters.scrollbarTag
    }
  },
  methods: {
    /**
     * Get coordinate for travel
     */
    async getCoordinates () {
      this.progress = true
      this.coordinates = []
      this.km = 0
      let querySnap = null
      if (this.travel.type === 'list') {
        querySnap = await db
            .collection('lists')
            .doc(this.travel.listId)
            .collection('travels')
            .doc(this.travel.id)
            .collection('coordinates')
            .orderBy('createdAt', 'asc').get()
      }
      else if (this.travel.type === 'events') {
        querySnap = await db
            .collection('groups')
            .doc(this.travel.groupId)
            .collection('events')
            .doc(this.travel.eventId)
            .collection('members')
            .doc(this.travel.memberId)
            .collection('travels')
            .doc(this.travel.id)
            .collection('coordinates')
            .orderBy('createdAt', 'asc').get()
      }
      else {
        querySnap = await db
            .collection('destinations')
            .doc(this.travel.destinationId)
            .collection('travels')
            .doc(this.travel.id)
            .collection('coordinates')
            .orderBy('createdAt', 'asc').get()
      }
      querySnap.forEach((doc) => {
        const obj = {
          id: doc.id,
          ...doc.data()
        }
        obj.createdAt = doc.data().createdAt.toDate()
        this.coordinates.push(obj)
      })
    },
    /**
     * Export to excel
     */
    exportToExcel () {
      import('@/vendor/Export2Excel').then(excel => {
        const list = _.cloneDeep(this.coordinates)
        list.forEach((l) => {
          l.lat = l.coordinates[0].lat + ""
          l.lon = l.coordinates[0].lon + ""
          l.createdAt = l.createdAt.toString()
        })
        this.fileName = "Coordenadas " + this.route.name + " (" + this.route.number + ") -" + (this.route.type === 'go' ? 'Ida' : 'Regreso')
        const data = this.formatJson(['lat', 'lon', 'createdAt'], list)
        excel.export_json_to_excel({
          header: this.headerTitle,
          data,
          filename: this.fileName,
          autoWidth: this.cellAutoWidth,
          bookType: this.selectedFormat
        })
        this.clearFields()
      })
    },
    clearFields () {
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
    },
    async openDashboard () {
      const querySnap = await db.collection('lives').where('travelId', '==', this.travel.id).get()
      let live = querySnap.docs[0]
      window.open(`https://iflowapp.live/travels/${live.id}`, '_blank')
    }
  }
}
</script>

<style lang="scss" scoped>
.add-new-data-sidebar {
  ::v-deep .vs-sidebar--background {
    z-index: 52010;
  }

  ::v-deep .vs-sidebar {
    z-index: 52010;
    width: 850px;
    max-width: 90vw;

    .img-upload {
      margin-top: 2rem;

      .con-img-upload {
        padding: 0;
      }

      .con-input-upload {
        width: 100%;
        margin: 0;
      }
    }
  }
}

.scroll-area--data-list-add-new {
  // height: calc(var(--vh, 1vh) * 100 - 4.3rem);
  height: calc(var(--vh, 1vh) * 100 - 16px - 45px - 82px);

  &:not(.ps) {
    overflow-y: auto;
  }
}
</style>
