<template>

    <div
            style="max-width: 400px; margin: auto;"
    >
        <v-container
                fluid
                style="min-height: 0;"
                grid-list-lg
        >
            <v-form v-model="valid" ref="form" lazy-validation @submit.native.prevent="submit">
                <v-card>
                    <v-card-title primary-title>
                        <div>
                            <h3 class="headline mb-0">Welcome!</h3>
                        </div>
                    </v-card-title>
                    <v-card-text>
                        <v-text-field
                                label="Name"
                                v-model="fields.username.value"
                                :rules="fields.username.rules"
                                :error-messages="fields.username.errors"
                                required
                        ></v-text-field>
                        <v-text-field
                                label="Password"
                                type="password"
                                v-model="fields.password.value"
                                :rules="fields.password.rules"
                                :error-messages="fields.password.errors"
                                required
                        ></v-text-field>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn
                                color="primary"
                                type="submit"
                                :disabled="!valid"
                                :loading="loading"
                        >Login
                        </v-btn>
                        error message?
                    </v-card-actions>
                </v-card>
            </v-form>
        </v-container>
    </div>
</template>
<script>
  import {mapActions} from 'vuex';
  import Api from '@/Api.js';

  export default {
    data() {
      return {
        valid: true,
        loading: false,
        fields: {

          username: {
            value: '',
            rules: [
              v => !!v || 'Name is required',
              v => (v && v.length <= 10) || 'Name must be less than 10 characters'
            ],
            errors: []
          },
          password: {
            value: '',
            rules: [
              v => !!v || 'Password is required',
              v => (v && v.length >= 10) || 'Password must be at least 6 characters'
            ],
            errors: []
          }
        }
      };
    },
    mixins: [Api],
    methods: {
      ...mapActions(['login', 'errorMessage']),
      submit() {
        this.loading = true;
        this.resetFieldErrors();

        this
          .login(this.fieldsData())
          .then(({data, ok, status, statusText}) => {
            if (status === 422) {
              this.handleValidationErrors(data);
            } else {
              this.handleResponseError(data, status, statusText);
            }
          })
          .catch(error => {
            console.log(error);
            if (error instanceof TypeError) {
              // failed connecting to server
            } else {
              // failed decoding json
            }
          })
          .finally(() => {
            this.loading = false;
          });
      }
    }
  };
</script>