<template>
  <div class="container is-fluid my-5">
    <div class="columns">
      <div class="column">
        <div class="buttons is-justify-content-flex-end">
          <button class="button is-success" data-action="GET" @click="refreshTable">
            <font-awesome-icon icon="sync-alt" /><span class="mx-3">Update List</span>
          </button>
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
              @keydown.enter="searchUser"
              @keyup.delete="searchUser"
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
    <ninja-modal :show-modal.sync="modal.show">
      <template v-slot:modal-header>
        {{ modal.title }}
      </template>
      <template v-slot:modal-body>
        <div class="field">
          <span>First name</span>
          <input
            type="text"
            :class="['input', validations.inputFirstname ? '' : 'is-danger']"
            placeholder="John"
            v-model="form.firstname"
            :disabled="disabledForm"
          />
        </div>
        <div class="field">
          <span>Last name</span>
          <input
            type="text"
            :class="['input', validations.inputLastname ? '' : 'is-danger']"
            placeholder="Smith"
            v-model="form.lastname"
            :disabled="disabledForm"
          />
        </div>
        <div class="field">
          <span>Email</span>
          <input
            type="email"
            :class="['input', validations.inputEmail ? '' : 'is-danger']"
            placeholder="john.smith@example.com"
            v-model="form.email"
            :disabled="disabledForm"
          />
        </div>
        <div class="field">
          <span>Birth Date</span>
          <input
            type="date"
            :class="['input', validations.inputBirthDate ? '' : 'is-danger']"
            placeholder="1980-01-23"
            v-model="form.birthDate"
            :disabled="disabledForm"
          />
        </div>
        <div class="field">
          <span>Street</span>
          <input
            type="text"
            :class="['input', validations.inputAddressStreet ? '' : 'is-danger']"
            placeholder="Lindenstraße 89"
            v-model="form.addressStreet"
            :disabled="disabledForm"
          />
        </div>
        <div class="field">
          <span>City</span>
          <input
            type="text"
            :class="['input', validations.inputAddressCity ? '' : 'is-danger']"
            placeholder="Freiburg im Breisgau"
            v-model="form.addressCity"
            :disabled="disabledForm"
          />
        </div>
        <div class="field">
          <span>Country</span>
          <div class="select">
            <select
              v-model="form.addressCountry"
              :class="['input', validations.inputAddressCountry ? '' : 'is-danger']"
              placeholder="DE"
              :disabled="disabledForm"
            >
              <option disabled selected>Select a country</option>
              <option
                v-for="(country, index) in listCountries"
                :key="index"
                :value="country.alpha2Code"
                :title="country.name"
              >
                {{ country.name }} ({{ country.alpha2Code }})
              </option>
            </select>
          </div>
        </div>
        <div class="field">
          <span>Postal code</span>
          <input
            type="number"
            :class="['input', validations.inputAddressPostalcode ? '' : 'is-danger']"
            placeholder="42030"
            v-model="form.addressPostalcode"
            :disabled="disabledForm"
          />
        </div>
      </template>
      <template v-slot:modal-footer>
        <button class="button is-success" @click="saveEditDeleteModal" v-text="actionSaveDeleteText" />
        <button class="button is-danger" @click="hideModal">Close</button>
      </template>
    </ninja-modal>
    <ninja-notification
      :show-notification.sync="showNotification"
      :notification-message="notificationMessage"
      :type-notification="typeNotification"
    />
  </div>
</template>

<script>
import NinjaModal from '@/components/ninjaModal.vue'
import NinjaTable from '@/components/ninjaTable.vue'
import NinjaNotification from '@/components/ninjaNotification.vue'
import { DataUser, DataUserResetValidations } from '@/models/dataUser'
import { Utils } from '@/utils/utils'

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
      disabledForm: false,
      filterUserID: '',
      currentVerb: '',
      listCountries: [],
      notificationMessage: '',
      showNotification: false,
      typeNotification: '',
      actionSaveDeleteText: '',
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
      },
      validations: {
        inputFirstname: true,
        inputLastname: true,
        inputEmail: true,
        inputBirthDate: true,
        inputAddressStreet: true,
        inputAddressCity: true,
        inputAddressCountry: true,
        inputAddressPostalcode: true
      }
    }
  },
  methods: {
    async apiQuery (verb, params = {}) {
      try {
        if (!verb) {
          throw new Error('It is necessary to indicate a verb')
        }
        const url = new URL(`${this.$apiService.BASE_URL}/users/`)
        Object.keys(params).forEach(key => { url.searchParams.append(key, JSON.stringify(params[key])) })
        return await this.$apiService.call(url, verb, params)
      } catch (err) {
        console.log(err)
      }
    },
    formatData (data) {
      try {
        return data.map(item => {
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
      } catch (err) {
        console.log('Error Format Data')
      }
    },
    async getFilterUserId (id = null) {
      const params = id || this.filterUserID ? { userId: parseInt(id) || parseInt(this.filterUserID) } : null
      const response = await this.apiQuery('GET', { ...params })
      if (response.Code >= 400) {
        this.executeNotify(true, response.Description, 'danger')
        return []
      } else {
        return this.formatData(response)
      }
    },
    executeNotify (show, message, type) {
      this.notificationMessage = message
      this.showNotification = show
      this.typeNotification = type
    },
    refreshTable () {
      this.filterUserID = ''
      this.searchUser()
    },
    async searchUser (evt) {
      const deleteCall = ['Backspace', 'Delete'].includes(evt?.key)
      const deleteEnter = ['Enter'].includes(evt?.key)
      if ((deleteCall && this.filterUserID.length === 0) || !evt?.key || deleteEnter) {
        this.table.data = await this.getFilterUserId()
      }
    },
    updateModel (userData = {}) {
      const model = new DataUser(userData)
      this.$set(this, 'form', model)
    },
    hideModal () {
      this.modal.show = false
    },
    showModal (evt) {
      const hasAction = evt.currentTarget?.dataset?.action || false
      const id = evt.currentTarget?.dataset?.id || 0
      this.resetModal()
      if (hasAction === 'POST') {
        this.modal.title = `NEW USER [ID => ${this.table.data.length + 1}]`
        this.actionSaveDeleteText = 'Save'
      }
      if (hasAction === 'PUT') {
        this.modifyUser(id)
        this.modal.title = `MODIFY USER [ID => ${id}]`
        this.actionSaveDeleteText = 'Save'
      }
      if (hasAction === 'DELETE') {
        this.modifyUser(id)
        this.modal.title = `DELETE USER [ID => ${id}]`
        this.actionSaveDeleteText = 'Delete'
      }
      this.currentVerb = hasAction
      this.disabledForm = this.currentVerb === 'DELETE'
      this.modal.show = hasAction && !this.modal.show
    },
    async modifyUser (id) {
      const [response] = await this.getFilterUserId(id)
      response.id = parseInt(id)
      this.updateModel(response)
    },
    async saveEditDeleteModal (evt) {
      const isValidForm = this.formValidation()
      if (isValidForm) {
        this.form.birthDate = Utils.dateFormat(this.form.birthDate)
        const params = this.currentVerb === 'DELETE' ? { userId: parseInt(this.form.id) } : { form: this.form }
        const response = await this.apiQuery(this.currentVerb, params)
        if (response.Code < 400) {
          this.hideModal()
          this.refreshTable()
        }
        this.executeNotify(true, response.Description, response.Code >= 400 ? 'danger' : 'success')
      }
    },
    async getCountries () {
      this.listCountries = await this.$apiService.call(this.$apiService.COUNTRIES_URL, 'get')
    },
    resetModal () {
      this.updateModel()
      this.resetValidations()
    },
    formValidation () {
      this.validations.inputFirstname = !Utils.isEmpty(this.form.firstname)
      this.validations.inputLastname = !Utils.isEmpty(this.form.lastname)
      this.validations.inputEmail = !Utils.isEmpty(this.form.email) && Utils.isEmail(this.form.email)
      this.validations.inputBirthDate = !Utils.isEmpty(this.form.birthDate)
      this.validations.inputAddressStreet = !Utils.isEmpty(this.form.addressStreet)
      this.validations.inputAddressCity = !Utils.isEmpty(this.form.addressCity)
      this.validations.inputAddressCountry = !Utils.isEmpty(this.form.addressCountry)
      this.validations.inputAddressPostalcode = !Utils.isEmpty(this.form.addressPostalcode)
      return Object.values(this.validations).every(i => i === true)
    },
    resetValidations () {
      this.validations = new DataUserResetValidations()
    }
  },
  mounted () {
    this.getCountries()
    this.searchUser()
  },
  components: {
    NinjaModal,
    NinjaTable,
    NinjaNotification
  }
}
</script>
<style scoped lang="scss">
.select {
  width: 100%;
}
</style>
