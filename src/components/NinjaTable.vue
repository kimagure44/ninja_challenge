<template>
  <div class="table-container">
    <table class="table is-bordered is-fullwidth is-striped is-narrow is-hoverable">
      <thead>
        <tr>
          <th
            v-for="column in tableColumns"
            :key="`column-${column.name}`"
            v-text="column.name"
          />
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(record, indexRecord) in tableData"
          :key="`record-${indexRecord}`"
        >
          <td>
            <div class="is-flex">
              <button class="button is-success is-small" data-action="PUT" @click="sendAction" :data-id="record.id">
                <font-awesome-icon icon="edit" />
              </button>
              <button class="button is-danger is-small" data-action="DELETE" @click="sendAction" :data-id="record.id">
                <font-awesome-icon icon="trash" />
              </button>
            </div>
          </td>
          <td
            v-for="(column, indexColumn) in record"
            :key="`record-${indexRecord}-column-${indexColumn}`"
            v-text="column"
          />
        </tr>
        <tr v-if="hasRecords">
          <td colspan="10" class="mx-3 is-justify-content-center">
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
    tableData: {
      type: Array,
      default: () => []
    },
    tableColumns: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    hasRecords () {
      return this.tableData.length === 0
    }
  },
  methods: {
    sendAction (action) {
      this.$emit('row-action', action)
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
        z-index: 1;
      }
    }
  }
}
</style>
