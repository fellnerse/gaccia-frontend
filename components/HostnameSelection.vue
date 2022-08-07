<template>
  <div>
    <div class="text-h3">Hostname selection</div>
    <span class="text-body-1">Please enter the hostname of your node here</span>
    <br>
    <span class="text-body-2">i.e. <span class="font-weight-bold">coffee.local</span>
        <br>
      ⚠️ Make sure you can reach your node with this url ⚠️
        <br>
      You can also enter an IP address like this: <span class="font-weight-bold">192.168.0.101</span>
      </span>
    <v-form v-model="hostnameIsValid">
      <v-text-field
        v-model="hostnameInput"
        label="coffee.local / 192.168.0.104"
        :rules="hostnameRules"
        append-icon="mdi-arrow-right"
        required
        @keydown.enter.prevent="enterHostname"
        @click:append="enterHostname"
      >
      </v-text-field>
    </v-form>
  </div>
</template>
<script>
export default {
  name: "HostnameSelection",
  data(){
    return{
      hostnameInput: "",
      hostnameRules: [
        value => !!value || "Required.",
        value => /\S+\.\S+|\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/g.test(value) || "Wrong format"
      ],
      hostnameIsValid: false
    }
  },
  methods:{
    enterHostname() {
      if (this.hostnameIsValid) {
        this.storeToken("hostname", this.hostnameInput);
        this.$store.commit("hostname/setHostname", this.hostnameInput)
      }
    },
    storeToken(name, token) {
      if (process.client) {
        localStorage.setItem(name, token);
      }
    },
  }
};
</script>
