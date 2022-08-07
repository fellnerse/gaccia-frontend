<template>
  <div>
    <v-form>
      <v-text-field>Stuff</v-text-field>
    </v-form>
    <v-btn :loading="loading" @click="setPIDStatus(1)">enable PID</v-btn>
    <v-btn :loading="loading" @click="setPIDStatus(0)">disable PID</v-btn>
    <v-switch
      v-model="PIDStatus"
      :loading="loading"
      :label="`Switch 1: ${PIDStatus}`"
    ></v-switch>
    {{errorMessage}}
  </div>
</template>

<script>
import { RequestStatus } from "~/code/enums";

export default {
  name: "NodeSettings",
  data(){
    return{
      RequestStatus,
      requestStatus:RequestStatus.SUCCESSFUL,
    }
  },
  computed: {
    loading(){
      return this.$store.state.settings.requestState === RequestStatus.RUNNING
    },
    errorMessage(){
      return this.$store.state.settings.errorMessage
    },
    PIDStatus: {
      get() {
        return this.$store.state.settings.PIDStatus;
      },
      async set(){
        await this.setPIDStatus();
      }
    }
  },
  methods: {
    setPIDStatus() {
      this.$store.dispatch("settings/togglePIDStatus")
    },
  }
};
</script>

<style scoped>

</style>
