import firebase from 'firebase/app'
import 'firebase/auth'
import router from '@/router'

export default {
  loginAttempt ({ dispatch }, payload) {

    // New payload for login action
    const newPayload = {
      userDetails: payload.userDetails,
      notify: payload.notify,
      closeAnimation: payload.closeAnimation
    }

    // If remember_me is enabled change firebase Persistence
    if (!payload.checkbox_remember_me) {

      // Change firebase Persistence
      firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)

        // If success try to login
        .then(function () {
          dispatch('login', newPayload)
        })

        // If error notify
        .catch(function (err) {

          // Close animation if passed as payload
          if (payload.closeAnimation) payload.closeAnimation()

          payload.notify({
            time: 2500,
            title: 'Error',
            text: err.message,
            iconPack: 'feather',
            icon: 'icon-alert-circle',
            color: 'danger'
          })
        })
    } else {
      // Try to login
      dispatch('login', newPayload)
    }
  },
  login ({ commit, state, dispatch }, payload) {

    // If user is already logged in notify and exit
    if (state.isUserLoggedIn()) {
      // Close animation if passed as payload
      if (payload.closeAnimation) payload.closeAnimation()

      payload.notify({
        title: 'Login Attempt',
        text: 'You are already logged in!',
        iconPack: 'feather',
        icon: 'icon-alert-circle',
        color: 'warning'
      })

      return false
    }

    // Try to sigin
    firebase.auth().signInWithEmailAndPassword(payload.userDetails.email, payload.userDetails.password)
      .then(async (result) => {
        console.log(result.user)
        await firebase.auth().currentUser.getIdTokenResult(true).then(async (idToken) => {
          console.log(idToken.claims)
          // eslint-disable-next-line no-constant-condition
          if (idToken.claims.admin || idToken.claims.editor) {

            // Set FLAG username update required for updating username
            let isUsernameUpdateRequired = false

            // if username is provided and updateUsername FLAG is true
            // set local username update FLAG to true
            // try to update username
            if (payload.updateUsername && payload.userDetails.displayName) {
              isUsernameUpdateRequired = true
              dispatch('updateUsername', {
                user: result.user,
                username: payload.userDetails.displayName,
                notify: payload.notify,
                isReloadRequired: true
              })
            }

            // Close animation if passed as payload
            if (payload.closeAnimation) payload.closeAnimation()

            // if username update is not required
            // just reload the page to get fresh data
            // set new user data in localstorage
            if (!isUsernameUpdateRequired) {
              router.push(router.currentRoute.query.to || '/')
              if (idToken.claims.admin) {
                result.user.providerData[0].userRole = 'admin'
              } else if (idToken.claims.editor) {
                result.user.providerData[0].userRole = 'editor'
              }
              commit('UPDATE_USER_INFO',{
                displayName: firebase.auth().currentUser.displayName,
                email: firebase.auth().currentUser.email,
                phone: firebase.auth().currentUser.phoneNumber,
                userRole: idToken.claims.admin ? 'admin' : 'editor'
              }, { root: true })
            }
          } else {
            await firebase.auth().signOut()
            payload.closeAnimation()
            payload.notify({
              time: 2500,
              title: 'Error',
              text: 'Permisos insuficientes',
              iconPack: 'feather',
              icon: 'icon-alert-circle',
              color: 'danger'
            })
          }
        })
      }, (err) => {
        // Close animation if passed as payload
        if (payload.closeAnimation) payload.closeAnimation()

        payload.notify({
          time: 2500,
          title: 'Error',
          text: err.message,
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'danger'
        })
      })
  }
}
