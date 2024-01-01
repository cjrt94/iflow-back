import { db } from '@/firebase/firebaseConfig'

const getQuote = {
  methods: {
    async getQuote (id) {
      const doc = await db.collection('quotes').doc(id).get()
      if (doc.exists) {
        return {
          id: doc.id,
          code: doc.data().code,
          client: doc.data().client,
          contact: doc.data().contact,
          address: doc.data().address,
          currency: doc.data().currency,
          total: doc.data().total,
          igv: doc.data().igv,
          subTotal: doc.data().subTotal,
          products: doc.data().products,
          createdAt: doc.data().createdAt.toDate(),
          roundingType: doc.data().roundingType,
          paymentMethod: doc.data().paymentMethod,
          igvType: doc.data().igvType,
          link: doc.data().link,
          user: doc.data().user
        }
      } else {
        return null
      }
    }
  }
}

export default getQuote
