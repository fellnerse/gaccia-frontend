<template>
  <v-app dark>
    <v-app-bar fixed app>
      <v-img
        max-height="64"
        max-width="64"
        contain
        src="https://clevercoffee.de/wp-content/uploads/2020/12/CleverCoffee_Logo_Menu.png"
      ></v-img>
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-btn icon @click.stop="rightDrawer = !rightDrawer">
        <v-icon>mdi-menu</v-icon>
      </v-btn>
    </v-app-bar>
    <v-navigation-drawer class="mt-16" v-model="rightDrawer" :right="true" temporary fixed>
      <v-list>
        <v-list-item >
          <v-list-item-action>
            <v-icon light> mdi-close </v-icon>
          </v-list-item-action>
          <v-list-item-title>Close</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data() {
    return {
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/',
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire',
        },
      ],
      rightDrawer: false,
      title: 'Beschder Espresso',
    }
  },
}
</script>
