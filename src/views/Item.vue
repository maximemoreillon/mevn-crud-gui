<template>
  <v-card>

    <v-toolbar flat>

      <v-btn
        icon
        exact
        :to="{name: 'items'}">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>

      <v-toolbar-title>Item</v-toolbar-title>
    </v-toolbar>
    <v-divider/>

    <template v-if="item">
      <v-card-text>
        <v-row
          v-for="(property, index) in properties"
          :key="`property_${index}`">
          <v-col>
            <v-text-field
              :label="property.text"
              v-model="item[property.value]"/>
          </v-col>
        </v-row>
      </v-card-text>
    </template>


  </v-card>
</template>

<script>
import properties from '@/item_properties.js'

export default {
  name: 'Item',
  data(){
    return {
      item: null,
      loading: false,
      properties,
    }
  },
  mounted(){
    this.get_item()
  },
  methods: {
    get_item(){
      this.loading = true
      const url = `${process.env.VUE_APP_API_URL}/items/${this.item_id}`
      this.axios.get(url)
      .then( ({data}) => {
        this.item = data
      })
      .catch( (error) => {
        alert('error')
        console.error(error)
      })
      .finally( () => { this.loading = false })
    }
  },
  computed:{
    item_id(){
      return this.$route.params._id
    }
  }
}
</script>
