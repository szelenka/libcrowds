<template>
  <card-base :title="title" :description="description">
    <pybossa-form
      id="register"
      submit-text="Sign up"
      :form="form"
      :next="next"
      @success="onSuccess">
      <div
        slot="top"
        v-if="auth.facebook || auth.twitter || auth.google">
        <p class="lead text-center">
          Sign up with
        </p>
        <oauth-buttons
          :facebook="auth.facebook"
          :google="auth.google"
          :twitter="auth.twitter"
          :next="next">
        </oauth-buttons>
        <p class="lead text-center mt-2 mb-1">
          or
        </p>
      </div>
      <div slot="footer-left">
        <p class="mb-0 mr-3">
          <small>
            By signing up you are agreeing to the
            <nuxt-link
              :to="{
                name: 'help-tos'
              }">
              Terms of Service
            </nuxt-link>
            and the
            <nuxt-link
              :to="{
                name: 'help-privacy'
              }">
              Privacy Policy.
            </nuxt-link>
          </small>
        </p>
      </div>
    </pybossa-form>
  </card-base>
</template>

<script>
import { handleHashedFlashes } from '@/mixins/handleHashedFlashes'
import { metaTags } from '@/mixins/metaTags'
import localConfig from '@/local.config'
import PybossaForm from '@/components/forms/PybossaForm'
import OauthButtons from '@/components/buttons/Oauth'
import CardBase from '@/components/cards/Base'

export default {
  layout: 'container',

  mixins: [ handleHashedFlashes, metaTags ],

  data () {
    return {
      title: 'Register',
      description: `Sign up for a new ${localConfig.brand} account.`
    }
  },

  asyncData ({ query, redirect, app, error }) {
    return Promise.all([
      app.$axios.$get('/account/register'),
      app.$axios.$get('/account/signin')
    ]).then(([registrationData, signinData]) => {
      const next = query.next || '/'

      // Redirect if already signed in
      if (signinData.next === '/') {
        redirect(next)
      }

      return {
        next: next,
        form: {
          endpoint: '/account/register',
          method: 'post',
          model: registrationData.form,
          schema: {
            fields: [
              {
                model: 'name',
                label: 'Username',
                type: 'input',
                inputType: 'text',
                hint: 'Choose a username'
              },
              {
                model: 'fullname',
                label: 'Full name',
                type: 'input',
                inputType: 'text',
                hint: 'Your full name'
              },
              {
                model: 'email_addr',
                label: 'Email',
                type: 'input',
                inputType: 'email',
                autocomplete: 'email',
                placeholder: 'you@example.com',
                hint: 'Your email address'
              },
              {
                model: 'password',
                label: 'Password',
                type: 'input',
                inputType: 'password',
                hint: 'Choose a password'
              },
              {
                model: 'confirm',
                label: 'Confirm Password',
                type: 'input',
                inputType: 'password',
                hint: 'Confirm your password'
              }
            ]
          }
        },
        auth: signinData.auth
      }
    }).catch(err => {
      this.$nuxt.error(err)
    })
  },

  components: {
    PybossaForm,
    OauthButtons,
    CardBase
  },

  methods: {
    /**
     * Show alert if confirmation is required.
     * @param {Object} data
     *   The response.
     */
    onSuccess (data) {
      if (data.status === 'sent') {
        this.$swal({
          title: 'Confirm your email',
          text: 'To complete your registration please click the ' +
            'confirmation link in the email that we just sent you',
          type: 'success'
        }).catch(err => {
          if (typeof err === 'object' && err.hasOwnProperty('dismiss')) {
            this.$nuxt.error(err)
          }
        })
      }
    }
  }
}
</script>
