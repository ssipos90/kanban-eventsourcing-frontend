<template>
    <v-app id="inspire">
        <v-navigation-drawer
                v-show="isLoggedIn"
                :mini-variant="drawerRight"
                fixed
                clipped
                app
        >
            <v-list dense>
                <v-list-tile v-for="menuItem in menu" :key="menuItem.to.name" :to="menuItem.to">
                    <v-list-tile-action>
                        <v-icon v-text="menuItem.icon"></v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title v-text="menuItem.label"></v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-navigation-drawer>

        <v-toolbar
                v-if="isLoggedIn"
                dark
                fixed
                app
                clipped-left
        >
            <v-toolbar-side-icon @click.stop="drawerRight = !drawerRight"></v-toolbar-side-icon>
            <v-toolbar-title>Kanban</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn color="blue-grey" subheading>@{{ getUser.username }}</v-btn>
            <v-btn color="red" icon @click.prevent="logout">
                <v-icon>exit_to_app</v-icon>
            </v-btn>
        </v-toolbar>

        <v-content>
            <router-view></router-view>
        </v-content>
        <v-snackbar v-if="message !== undefined" :timeout="message.timeout" v-model="message.show" :color="message.color">
            <div v-text="message.text"></div>
        </v-snackbar>

        <v-footer app fixed dark class="white--text">
            <span>Vuetify</span>
            <v-spacer></v-spacer>
            <span>&copy; 2017</span>
        </v-footer>
    </v-app>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex';

  export default {
    data: () => ({
      drawerRight: true,
      menu: [
        {
          to: {name: 'projects'},
          icon: 'people',
          label: 'Teams'
        }
      ]
    }),
    methods: {
      ...mapActions(['logout'])
    },
    computed: {
      ...mapGetters([
        'getUser',
        'isLoggedIn',
        'message'
      ])
    },
    watch: {
      isLoggedIn(v) {
        this.$router.push({
          name: v === true ? 'home' : 'login'
        });
      }
    }
  };
</script>
