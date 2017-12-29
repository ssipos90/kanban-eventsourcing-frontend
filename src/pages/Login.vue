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
                                v-model="username.value"
                                :rules="username.rules"
                                :error-messages="username.errors"
                                required
                        ></v-text-field>
                        <v-text-field
                                label="Password"
                                type="password"
                                v-model="password.value"
                                :rules="password.rules"
                                :error-messages="username.errors"
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
                    </v-card-actions>
                </v-card>
            </v-form>
        </v-container>
    </div>
</template>
<script>
  import {mapActions} from 'vuex';
  import {ValidationError, ServiceError} from '@/api';

  export default {
    data() {
      return {
        valid: true,
        loading: false,
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
      };
    },
    methods: {
      ...mapActions(['login']),
      submit() {
        this.loading = true;
        this.username.errors = [];
        this.password.errors = [];
        this
          .login({
            username: this.username.value,
            password: this.password.value
          })
          .catch(e => {
            console.log(e);
            if (e instanceof ValidationError) {
              // TODO do the cha cha
            } else if (e instanceof ServiceError) {

            }
            this.username.errors = [];
            this.password.errors = [];
          })
          .then(() => {
            this.loading = false;
          });
      }
    }
  };
</script>