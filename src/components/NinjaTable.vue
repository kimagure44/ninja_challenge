<template>
  <div class="table-container">
    <table class="table is-bordered is-fullwidth is-striped is-narrow is-hoverable">
      <thead>
        <tr>
          <th>ID</th>
          <th>FIRSTNAME</th>
          <th>LASTNAME</th>
          <th>EMAIL</th>
          <th>BIRTHDATE</th>
          <th>STREET</th>
          <th>CITY</th>
          <th>COUNTRY</th>
          <th>POSTAL CODE</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="record in tableRecords" :key="`record-${record.id}`">
          <td v-text="record.id" />
          <td v-text="record.firstname" />
          <td v-text="record.lastname" />
          <td v-text="record.email" />
          <td v-text="record.birthDate" />
          <td v-text="record.address.street" />
          <td v-text="record.address.city" />
          <td v-text="record.address.country" />
          <td v-text="record.address.postalcode" />
        </tr>
        <tr v-if="hasRecords">
          <td colspan="9" class="mx-3 is-justify-content-center">
            <div class="text-center">No record found</div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'ninja-table',
  props: {
    tableRecords: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    hasRecords () {
      return this.tableRecords.length === 0
    }
  }
}
</script>

<style scoped lang="scss">
.custom-table {
  box-shadow: 0 0 10px 2px rgba(0,0,0,.2);
  overflow: auto;
  margin: 0;
  .text-center {
    text-align: center;
  }
  .table-container {
    border: 1px solid #dddddd;
    overflow-y: scroll;
    max-height: 80vh;
  }
  .column {
    padding: 0;
  }
  thead {
    tr {
      th {
        position: sticky;
        top: -1px;
        background: #ffffff;
        box-shadow: 0 3px 9px 1px rgba(0,0,0,.1);
      }
    }
  }
}
</style>
