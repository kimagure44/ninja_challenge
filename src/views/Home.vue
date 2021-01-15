<template>
  <div class="container is-fluid my-5">
    <div class="columns">
      <div class="column">
        <div class="buttons is-justify-content-flex-end">
          <button class="button is-success" data-action="POST" @click="showModal">
            <font-awesome-icon icon="plus" /><span class="mx-3">New User</span>
          </button>
        </div>
      </div>
      <div class="column is-one-quarter">
        <div class="field">
          <div class="control">
            <input
              type="number"
              class="input"
              placeholder="Search by User ID"
              v-model="filterUserID"
              @keydown.enter="getUsers"
              @keyup.delete="getUsers"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="columns custom-table my-5">
      <div class="column">
        <ninja-table
          :table-data="table.data"
          :table-columns="table.columns"
          @row-action="showModal"
        />
      </div>
    </div>
    <ninja-modal :show-modal.sync="modal.show" @accept-modal="acceptModal">
      <template v-slot:modal-header>
        {{ modal.title }}
      </template>
      <template v-slot:modal-body>
        <form ref="form">
          <div class="field">
            <span>First name</span>
            <input type="text" class="input" placeholder="John" v-model="form.firstname" :disabled="deleteForm" />
          </div>
          <div class="field">
            <span>Last name</span>
            <input type="text" class="input" placeholder="Smith" v-model="form.lastname" :disabled="deleteForm" />
          </div>
          <div class="field">
            <span>Email</span>
            <input type="email" class="input" placeholder="john.smith@example.com" v-model="form.email" :disabled="deleteForm" />
          </div>
          <div class="field">
            <span>First name</span>
            <input type="date" class="input" placeholder="1980-01-23" v-model="form.birthDate" :disabled="deleteForm" />
          </div>
          <div class="field">
            <span>First name</span>
            <input type="text" class="input" placeholder="Lindenstraße 89" v-model="form.addressStreet" :disabled="deleteForm" />
          </div>
          <div class="field">
            <span>First name</span>
            <input type="text" class="input" placeholder="Freiburg im Breisgau" v-model="form.addressCity" :disabled="deleteForm" />
          </div>
          <div class="field">
            <span>First name</span>
            <input type="text" class="input" placeholder="DE" v-model="form.addressCountry" :disabled="deleteForm" />
          </div>
          <div class="field">
            <span>First name</span>
            <input type="text" class="input" placeholder="42030" v-model="form.addressPostalcode" :disabled="deleteForm" />
          </div>
        </form>
      </template>
    </ninja-modal>
  </div>
</template>

<script>
import NinjaModal from '@/components/NinjaModal.vue'
import NinjaTable from '@/components/NinjaTable.vue'
import { DataUser } from '@/models/dataUser'
export default {
  name: 'Home',
  data () {
    return {
      table: {
        columns: [
          { name: 'ACTIONS' },
          { name: 'ID' },
          { name: 'FIRSTNAME' },
          { name: 'LASTNAME' },
          { name: 'EMAIL' },
          { name: 'BIRTHDATE' },
          { name: 'ADDR.ID' },
          { name: 'STREET' },
          { name: 'CITY' },
          { name: 'COUNTRY' },
          { name: 'POSTAL CODE' }
        ],
        data: []
      },
      deleteForm: false,
      filterUserID: '',
      modal: {
        show: false,
        title: ''
      },
      form: {
        firstname: '',
        lastname: '',
        email: '',
        birthDate: '',
        addressStreet: '',
        addressPostalcode: '',
        addressCountry: '',
        addressCity: ''
      }
    }
  },
  methods: {
    async GET (id = '') {
      const url = `${this.$apiService.BASEURL}/users/${this.filterUserID || id || ''}`
      const result = await this.$apiService.get(url)
      return result.map(item => {
        const newObject = {}
        Object.entries(item).forEach(everyItem => {
          if (typeof everyItem[1] === 'object') {
            Object.entries(everyItem[1]).forEach(item => {
              const capitalize = (text) => `${text.charAt(0).toUpperCase()}${text.slice(1)}`
              const key = `${everyItem[0]}${capitalize(item[0])}`
              newObject[[key]] = item[1]
            })
          } else {
            newObject[everyItem[0]] = everyItem[1]
          }
        })
        return newObject
      })
    },
    async getUsers (evt) {
      const deleteCall = ['Backspace', 'Delete'].includes(evt?.key)
      const deleteEnter = ['Enter'].includes(evt?.key)
      if ((deleteCall && this.filterUserID.length === 0) || !evt?.key || deleteEnter) {
        this.table.data = await this.GET()
      }
    },
    showModal (evt) {
      const hasAction = evt.currentTarget?.dataset?.action || false
      const id = evt.currentTarget?.dataset?.id || 0
      if (hasAction === 'POST') {
        this.deleteForm = false
        this.modal.title = 'NEW USER'
      }
      if (hasAction === 'PUT') {
        this.actionPUT(id)
      }
      if (hasAction === 'DELETE') {
        this.actionDELETE(id)
      }
      this.modal.show = hasAction && !this.modal.show
    },
    async parseApi2Front (id) {
      const [userData] = await this.GET(id)
      const model = new DataUser(userData)
      this.$set(this, 'form', model)
    },
    actionDELETE (id) {
      this.parseApi2Front(id)
      this.deleteForm = true
      this.modal.title = `DELETE USER WITH ID: ${id}`
    },
    actionPUT (id) {
      this.parseApi2Front(id)
      this.deleteForm = false
      this.modal.title = `MODIFY USER WITH ID: ${id}`
    },
    acceptModal (evt) {}
  },
  mounted () {
    this.getUsers()
  },
  components: {
    NinjaModal,
    NinjaTable
  }
}
</script>
