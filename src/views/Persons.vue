<template>
  <v-card>

    <v-toolbar flat>
      <v-toolbar-title>Persons</v-toolbar-title>
      <v-spacer />
      <CreatePersonDialog />
    </v-toolbar>

    <v-divider/>

    <v-card-text>
      <v-table>
        <thead>
          <tr>
            <th class="text-left">Name</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="person in persons" :key="person._id">
            <td>
              <RouterLink :to="{ name: 'person', params: { _id: person._id } }">
                {{ person.name }}
              </RouterLink>
            </td>
          </tr>
        </tbody>
      </v-table>
    </v-card-text>

  </v-card>
</template>

<script>
import CreatePersonDialog from '@/components/CreatePersonDialog.vue'

export default {
  name: 'Persons',
  components: {
    CreatePersonDialog
  },
  data(){
    return {
      loading: false,
      persons: [],
      total: 0,
      options: {},
      headers: [
        {text: 'Name', value: 'name'},
        {text: 'Age', value: 'age'},
      ],
    }
  },
  mounted(){
    this.get_persons()
  },
  watch: {
    options: {
        handler () {
          this.get_persons()
        },
        deep: true,
      },
  },
  methods: {
    async get_persons(){

      this.loading = true
      const url = `/persons`
      const params = { limit: 0 }

      try {
        const { data: { total, items } } = await this.axios.get(url, { params })
        this.total = total
        this.persons = items
      } catch (error) {
        alert('Failed to get items')
        console.error(error)
      } finally {
        this.loading = false
      }

    },
    row_clicked({_id}){
      this.$router.push({name: 'person', params: {_id}})
    },
  }
}
</script>
