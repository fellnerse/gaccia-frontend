<template>
  <v-app>
    <v-app-bar fixed app>
      <v-img
        max-height="64"
        max-width="64"
        contain
        src="https://clevercoffee.de/wp-content/uploads/2020/12/CleverCoffee_Logo_Menu.png"
      ></v-img>
      <v-toolbar-title class="mr-4" v-text="title"></v-toolbar-title>
      <v-spacer />
      <div v-show="hostname" class="mr-1">
        <div>
        <span>Hostname:</span>
          <br>
        <span>{{ hostname }}</span>
        </div>
      </div>
      <div>
        <v-btn @click="emptyLocalStorage">empty</v-btn>
      </div>
      <v-btn v-show="$nuxt.$vuetify.breakpoint.smAndDown" icon @click.stop="rightDrawer = !rightDrawer">
        <v-icon>mdi-menu</v-icon>
      </v-btn>
    </v-app-bar>
    <v-navigation-drawer v-model="rightDrawer" class="mt-16" :right="true" temporary fixed>
      <v-list>
        <v-list-item>
          <v-list-item-action>
            <v-icon light> mdi-close</v-icon>
          </v-list-item-action>
          <v-list-item-title>Close</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <Nuxt />
    </v-main>
    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: "DefaultLayout",
  data() {
    return {
      fixed: false,
      items: [
        {
          icon: "mdi-apps",
          title: "Welcome",
          to: "/"
        },
        {
          icon: "mdi-chart-bubble",
          title: "Inspire",
          to: "/inspire"
        }
      ],
      rightDrawer: false,
      title: "Beschder Espresso"
    };
  },
  computed: {
    hostname() {
      return this.$store.state.hostname.value;
    }
  },
  methods:{
    emptyLocalStorage() {
      this.$store.commit("hostname/empty")
    },
  }
};
</script>
