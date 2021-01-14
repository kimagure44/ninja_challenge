<template>
  <div class="container is-fluid my-5">
    <div class="columns">
      <div class="column">
        <div class="buttons is-justify-content-flex-end">
          <button class="button is-success" data-action="POST" @click="showModal">NEW USER</button>
          <button class="button is-success" data-action="PUT" @click="showModal">PUT</button>
          <button class="button is-danger" data-action="DELETE" @click="showModal">DELETE</button>
        </div>
      </div>
      <div class="column is-one-fifth">
        <div class="field">
          <div class="control">
            <input
              type="number"
              class="input"
              placeholder="USER ID"
              v-model="userId"
              @keydown.enter="getUsers"
              @keyup.delete="getUsers"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="columns custom-table my-5">
      <div class="column">
        <ninja-table :table-records="results" />
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
            <input type="text" class="input" placeholder="John" v-model="form.firstname" />
          </div>
          <div class="field">
            <span>Last name</span>
            <input type="text" class="input" placeholder="Smith" v-model="form.lastname" />
          </div>
          <div class="field">
            <span>Email</span>
            <input type="email" class="input" placeholder="john.smith@example.com" v-model="form.email" />
          </div>
          <div class="field">
            <span>First name</span>
            <input type="date" class="input" placeholder="1980-01-23" v-model="form.birthDate" />
          </div>
          <div class="field">
            <span>First name</span>
            <input type="text" class="input" placeholder="Lindenstraße 89" v-model="form.address.street" />
          </div>
          <div class="field">
            <span>First name</span>
            <input type="text" class="input" placeholder="Freiburg im Breisgau" v-model="form.address.city" />
          </div>
          <div class="field">
            <span>First name</span>
            <input type="text" class="input" placeholder="DE" v-model="form.address.country" />
          </div>
          <div class="field">
            <span>First name</span>
            <input type="text" class="input" placeholder="42030" v-model="form.address.postalcode" />
          </div>
        </form>
      </template>
    </ninja-modal>
  </div>
</template>

<script>
import NinjaModal from '@/components/NinjaModal.vue'
import NinjaTable from '@/components/NinjaTable.vue'

export default {
  name: 'Home',
  data () {
    return {
      results: [],
      userId: '',
      modal: {
        show: false,
        title: ''
      },
      form: {
        firstname: '',
        lastname: '',
        email: '',
        birthDate: '',
        address: {
          street: '',
          city: '',
          country: '',
          postalcode: ''
        }
      }
    }
  },
  methods: {
    async getUsers (evt) {
      const deleteCall = ['Backspace', 'Delete'].includes(evt?.key)
      const deleteEnter = ['Enter'].includes(evt?.key)
      if ((deleteCall && this.userId.length === 0) || !evt?.key || deleteEnter) {
        const url = `${this.$apiService.BASEURL}/users/${this.userId || ''}`
        this.results = await this.$apiService.get(url)
      }
    },
    showModal (evt) {
      const hasAction = evt.currentTarget?.dataset?.action || false
      if (hasAction === 'POST') {
        this.modal.title = 'NEW USER'
      }
      if (hasAction === 'PUT') {
        this.modal.title = 'MODIFY USER'
      }
      if (hasAction === 'DELETE') {
        this.modal.title = 'DELETE USER'
      }
      this.modal.show = hasAction && !this.modal.show
    },
    acceptModal (evt) {
      debugger
    }
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
