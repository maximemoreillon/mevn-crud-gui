<template>
    <v-card>
      <v-card-title>CRUD example</v-card-title>
      <v-card-text>
        An example front-end for a basic CRUD REST API
      </v-card-text>
      <v-list dense>
        <v-list-item>
          <v-list-item-content>
            <div class="caption">Version</div>
            <div>{{version}}</div>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-list>
        <v-list-item>
          <v-list-item-content>
            <div class="caption">API URL</div>
            <div>{{api_url}}</div>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-list>
        <v-list-item>
          <v-list-item-content>
            <div class="caption">API version</div>
            <div>{{api_version}}</div>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card>
</template>

<script>
import pjon from '@/../package.json'
export default {
  name: 'Info',
  data(){
    return {
      version: pjon.version,
      api_url: process.env.VUE_APP_API_URL,
      api_version: 'unknown',
    }
  },
  mounted(){
    this.get_api_version()
  },
  methods: {
    get_api_version(){
      this.axios.get(this.api_url)
      .then(({data}) => this.api_version = data.version)
      .catch(error => {console.error(error)})
    }
  }

}
</script>
