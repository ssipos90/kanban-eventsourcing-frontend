<template>
    <v-app id="inspire">
        <v-navigation-drawer
                v-if="isLoggedIn"
                fixed
                :mini-variant="drawerRight"
                right
                clipped
                app
        >
            <v-list dense>
                <v-list-tile>
                    <v-list-tile-action>
                        <v-icon>edit</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>Do the cha cha</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-navigation-drawer>

        <v-toolbar
                v-if="isLoggedIn"
                dark
                fixed
                app
                clipped-right
        >
            <v-toolbar-title>Toolbar</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
                <v-btn color="blue-grey" subheading>@{{ getUser.username }}</v-btn>
            </v-toolbar-items>
            <v-toolbar-side-icon @click.stop="drawerRight = !drawerRight"></v-toolbar-side-icon>
        </v-toolbar>

        <v-content>
            <router-view></router-view>
        </v-content>

        <v-footer dark class="white--text" app>
            <span>Vuetify</span>
            <v-spacer></v-spacer>
            <span>&copy; 2017</span>
        </v-footer>
    </v-app>
</template>

<script>
  import {mapGetters} from 'vuex';

  export default {
    data: () => ({
      drawerRight: true
    }),
    computed: {
      ...mapGetters([
        'getUser',
        'isLoggedIn'
      ])
    }
  };
</script>
