<template>
  <vx-card title="Contenido">
    <p>Aquí se puede modificar la información más relevante de la página.</p>

    <div v-if="initProgress" style="margin-top: 1rem; width: 100%">
      <vs-progress indeterminate color="primary"></vs-progress>
    </div>
    <div class="mt-5">
      <div class="vx-row mb-6">
        <div class="vx-col w-1/3">
          <vs-input v-validate="'required'"
                    v-model.number="five.limit"
                    disabled
                    name="fiveLimit" class="w-full" label="Límite de Premio de 5 Soles"/>
          <span class="text-danger text-sm"
                v-show="errors.has('fiveLimit')">{{ errors.first('fiveLimit') }}</span>
        </div>
        <div class="vx-col w-1/3">
          <vs-input v-validate="'required'"
                    disabled="true"
                    v-model="five.quantity"
                    name="fiveQuantity" class="w-full" label="Usos de Premio de 5 Soles"/>
          <span class="text-danger text-sm"
                v-show="errors.has('fiveQuantity')">{{ errors.first('fiveQuantity') }}</span>
        </div>
        <div class="vx-col w-1/3">
          <vs-input v-validate="'required'"
                    disabled="true"
                    v-model="five.redeemed"
                    name="fiveRedeemed" class="w-full" label="Canjes de Premio de 5 Soles"/>
          <span class="text-danger text-sm"
                v-show="errors.has('fiveRedeemed')">{{ errors.first('fiveRedeemed') }}</span>
        </div>
      </div>
      <div class="vx-row mb-6">
        <div class="vx-col w-1/3">
          <vs-input v-validate="'required'"
                    v-model.number="ten.limit"
                    disabled
                    name="tenLimit" class="w-full" label="Límite de Premio de 10 Soles"/>
          <span class="text-danger text-sm"
                v-show="errors.has('tenLimit')">{{ errors.first('tenLimit') }}</span>
        </div>
        <div class="vx-col w-1/3">
          <vs-input v-validate="'required'"
                    v-model="ten.quantity"
                    disabled="true"
                    name="tenQuantity" class="w-full" label="Usos de Premio de 10 Soles"/>
          <span class="text-danger text-sm"
                v-show="errors.has('tenQuantity')">{{ errors.first('tenQuantity') }}</span>
        </div>
        <div class="vx-col w-1/3">
          <vs-input v-validate="'required'"
                    disabled="true"
                    v-model="ten.redeemed"
                    name="tenRedeemed" class="w-full" label="Canjes de Premio de 10 Soles"/>
          <span class="text-danger text-sm"
                v-show="errors.has('tenRedeemed')">{{ errors.first('tenRedeemed') }}</span>
        </div>
      </div>
      <div class="vx-row mb-6">
        <div class="vx-col w-1/3">
          <vs-input v-validate="'required'"
                    disabled
                    v-model.number="twenty.limit"
                    name="twentyLimit" class="w-full" label="Límite de Premio de 20 Soles"/>
          <span class="text-danger text-sm"
                v-show="errors.has('twentyLimit')">{{ errors.first('twentyLimit') }}</span>
        </div>
        <div class="vx-col w-1/3">
          <vs-input v-validate="'required'"
                    v-model="twenty.quantity"
                    disabled="true"
                    name="twentyQuantity" class="w-full" label="Usos de Premio de 20 Soles"/>
          <span class="text-danger text-sm"
                v-show="errors.has('twentyQuantity')">{{ errors.first('twentyQuantity') }}</span>
        </div>
        <div class="vx-col w-1/3">
          <vs-input v-validate="'required'"
                    disabled="true"
                    v-model="twenty.redeemed"
                    name="twentyRedeemed" class="w-full" label="Canjes de Premio de 20 Soles"/>
          <span class="text-danger text-sm"
                v-show="errors.has('twentyRedeemed')">{{ errors.first('twentyRedeemed') }}</span>
        </div>
      </div>
      <div class="vx-row mb-6">
        <div class="vx-col w-1/3">
          <vs-input v-validate="'required'"
                    v-model.number="fifty.limit"
                    disabled
                    name="fiftyLimit" class="w-full" label="Límite de Premio de 50 Soles"/>
          <span class="text-danger text-sm"
                v-show="errors.has('fiftyLimit')">{{ errors.first('fiftyLimit') }}</span>
        </div>
        <div class="vx-col w-1/3">
          <vs-input v-validate="'required'"
                    v-model="fifty.quantity"
                    disabled="true"
                    name="fiftyQuantity" class="w-full" label="Usos de Premio de 50 Soles"/>
          <span class="text-danger text-sm"
                v-show="errors.has('fiftyQuantity')">{{ errors.first('fiftyQuantity') }}</span>
        </div>
        <div class="vx-col w-1/3">
          <vs-input v-validate="'required'"
                    disabled="true"
                    v-model="twenty.redeemed"
                    name="fiftyRedeemed" class="w-full" label="Canjes de Premio de 50 Soles"/>
          <span class="text-danger text-sm"
                v-show="errors.has('fiftyRedeemed')">{{ errors.first('fiftyRedeemed') }}</span>
        </div>
      </div>
      <div class="vx-row mb-6">
        <div class="vx-col w-1/3">
          <vs-input v-validate="'required'"
                    v-model.number="hundred.limit"
                    disabled
                    name="hundredLimit" class="w-full" label="Límite de Premio de 100 Soles"/>
          <span class="text-danger text-sm"
                v-show="errors.has('hundredLimit')">{{ errors.first('hundredLimit') }}</span>
        </div>
        <div class="vx-col w-1/3">
          <vs-input v-validate="'required'"
                    disabled="true"
                    v-model="hundred.quantity"
                    name="hundredQuantity" class="w-full" label="Usos de Premio de 100 Soles"/>
          <span class="text-danger text-sm"
                v-show="errors.has('hundredQuantity')">{{ errors.first('hundredQuantity') }}</span>
        </div>
        <div class="vx-col w-1/3">
          <vs-input v-validate="'required'"
                    disabled="true"
                    v-model="hundred.redeemed"
                    name="hundredRedeemed" class="w-full" label="Canjes de Premio de 100 Soles"/>
          <span class="text-danger text-sm"
                v-show="errors.has('hundredRedeemed')">{{ errors.first('hundredRedeemed') }}</span>
        </div>
      </div>
      <div class="vx-row mb-6">
        <div class="vx-col w-1/3">
          <vs-input v-validate="'required'"
                    disabled
                    v-model.number="tv.limit"
                    name="tvLimit" class="w-full" label="Límite de Premio de TV"/>
          <span class="text-danger text-sm"
                v-show="errors.has('tvLimit')">{{ errors.first('tvLimit') }}</span>
        </div>
        <div class="vx-col w-1/3">
          <vs-input v-validate="'required'"
                    v-model="tv.quantity"
                    disabled="true"
                    name="tvQuantity" class="w-full" label="Usos de Premio de TV"/>
          <span class="text-danger text-sm"
                v-show="errors.has('tvQuantity')">{{ errors.first('tvQuantity') }}</span>
        </div>
        <div class="vx-col w-1/3">
          <vs-input v-validate="'required'"
                    disabled="true"
                    v-model="tv.redeemed"
                    name="tvRedeemed" class="w-full" label="Canjes de Premio de 100 Soles"/>
          <span class="text-danger text-sm"
                v-show="errors.has('tvRedeemed')">{{ errors.first('tvRedeemed') }}</span>
        </div>
      </div>
      <div class="mb-6">
        <vs-textarea v-model="local" rows="10" v-validate="'required'" label="Locales"></vs-textarea>
      </div>
      <vs-td>
        <span class="mb-2 block">Finalizar campaña</span>
        <vs-switch v-model="campaignHasEnded"/>
      </vs-td>
      <div class="flex mt-6 flex-wrap items-center" slot="footer">
        <vs-button class="mr-6" @click="submitData" :disabled="!isFormValid || progress">Guardar</vs-button>
        <div v-if="progress" style="margin-top: 1rem; width: 100%">
          <vs-progress indeterminate color="primary"></vs-progress>
        </div>
      </div>
    </div>
  </vx-card>
</template>

<script>
import trimString from '../mixins/trimString'

import {auth, db, FieldValue} from '@/firebase/firebaseConfig'

export default {
  name: 'Content',
  mixins: [
    trimString
  ],
  data () {
    return {
      prizes: null,
      progress: false,
      initProgress: false,
      five: {},
      ten: {},
      twenty: {},
      fifty: {},
      hundred: {},
      tv: {},
      campaignHasEnded: false,
      local: null
    }
  },
  /**
   * Get data on firestore
   * @returns {Promise<void>}
   */
  async created () {
    try {
      this.initProgress = true
      // Get prizes
      this.prizes = new Map()
      const querySnap = await db.collection('prizes').get()
      querySnap.forEach((doc) => {
        this.prizes.set(doc.id, {
          id: doc.id,
          ...doc.data()
        })
      })
      this.five = this.prizes.get("5")
      this.ten = this.prizes.get("10")
      this.twenty = this.prizes.get("20")
      this.fifty = this.prizes.get("50")
      this.hundred = this.prizes.get("100")
      this.tv = this.prizes.get("TV")
      // End

      const doc = await db.collection('content').doc('JpH0Eblkn0UlYTu8hOC3').get()
      if (doc.exists) {
        this.campaignHasEnded = doc.data().campaignHasEnded
        this.local = doc.data().local
      }
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
  computed: {
    isFormValid () {
      return !this.errors.any()
    }
  },
  methods: {
    /**
     *  Save data in firestore
     */
    async submitData () {
      try {
        const result = await this.$validator.validateAll()
        if (result) {
          this.progress = true

          // Five
          await db.collection('prizes').doc('5').update({
            ...this.five,
            updatedAt: FieldValue.serverTimestamp(),
            uid: auth.currentUser.uid
          })
          //

          // Ten
          await db.collection('prizes').doc('10').update({
            ...this.ten,
            updatedAt: FieldValue.serverTimestamp(),
            uid: auth.currentUser.uid
          })
          //

          // Twenty
          await db.collection('prizes').doc('20').update({
            ...this.twenty,
            updatedAt: FieldValue.serverTimestamp(),
            uid: auth.currentUser.uid
          })
          //

          // Fifty
          await db.collection('prizes').doc('50').update({
            ...this.fifty,
            updatedAt: FieldValue.serverTimestamp(),
            uid: auth.currentUser.uid
          })
          //

          // Hundred
          await db.collection('prizes').doc('100').update({
            ...this.hundred,
            updatedAt: FieldValue.serverTimestamp(),
            uid: auth.currentUser.uid
          })
          //

          // Campaign state
          await db.collection('content').doc('JpH0Eblkn0UlYTu8hOC3').update({
            campaignHasEnded: this.campaignHasEnded,
            local: this.local,
            updatedAt: FieldValue.serverTimestamp(),
            uid: auth.currentUser.uid
          })
          //

          this.progress = false
          this.$vs.notify({
            color: 'success',
            title: 'Contenido',
            text: 'Contenido modificado correctamente.'
          })
        }
      } catch (e) {
        this.$vs.notify({
          color: 'warning',
          title: '¡Oh no!',
          text: 'Hubo un error.'
        })
      }
    }
  }
}
</script>
