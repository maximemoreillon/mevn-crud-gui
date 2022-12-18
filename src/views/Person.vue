<template>
  <v-card
    :loading="loading">

    <v-toolbar flat>

      <v-btn
        icon
        exact
        :to="{name: 'persons'}">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>

      <v-toolbar-title>Person</v-toolbar-title>

      <v-spacer />
      <v-btn
        icon
        :loading="updating"
        @click="update_person()">
        <v-icon>mdi-content-save</v-icon>
      </v-btn>
      <v-btn
        icon
        :loading="deleting"
        color="#c00000"
        @click="delete_person()">
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </v-toolbar>
    <v-divider/>

    <template v-if="loading">
      <v-card-text class="text-center">
        <v-progress-circular indeterminate />
      </v-card-text>
    </template>

    <template v-if="person">
      <v-card-text>
        <v-row>
          <v-col>
            <v-text-field
              label="Name"
              v-model="person.name"/>
          </v-col>
          <v-col>
            <v-text-field
              label="Age"
              type="number"
              v-model="person.age"/>
          </v-col>
        </v-row>
      </v-card-text>
    </template>

    <v-snackbar
      :color="snackbar.color"
      v-model="snackbar.show" >
      {{ snackbar.text }}

      <template v-slot:action="{ attrs }">
        <v-btn
          dark
          icon
          v-bind="attrs"
          @click="snackbar.show = false" >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>


  </v-card>
</template>

<script>

export default {
  name: 'Person',
  data(){
    return {
      person: null,
      loading: false,
      updating: false,
      deleting: false,
      snackbar: {
        show: false,
        text: null,
        color: null,
      }
    }
  },
  mounted(){
    this.get_person()
  },
  methods: {
    get_person(){
      this.person = null
      this.loading = true
      const url = `/persons/${this.person_id}`
      this.axios.get(url)
      .then( ({data}) => {
        this.person = data
      })
      .catch( (error) => {
        alert('error')
        console.error(error)
      })
      .finally( () => { this.loading = false })
    },
    delete_person(){
      if(!confirm(`Delete person ${this.person_id}?`)) return
      this.deleting = true
      const url = `/persons/${this.person_id}`
      this.axios.delete(url)
      .then( () => {
        this.$router.push({name: 'persons'})
      })
      .catch( (error) => {
        alert('error')
        console.error(error)
      })
      .finally( () => { this.deleting = false })
    },
    update_person(){
      this.updating = true
      const url = `/persons/${this.person_id}`
      this.axios.patch(url, this.person)
      .then( () => {
        this.snackbar.show = true
        this.snackbar.text = 'Person updated'
        this.snackbar.color = 'success'
      })
      .catch( (error) => {
        alert('error')
        console.error(error)
      })
      .finally(() => {
        this.updating = false
      })
    }

  },
  computed:{
    person_id(){
      return this.$route.params._id
    }
  }
}
</script>
