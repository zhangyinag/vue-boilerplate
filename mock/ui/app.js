let http = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 1000 * 5
})

let vm = new Vue({
  el: '#app',
  data: {
    collectionNames: [],
    currentCollection: null,
    expr: `this.getCollection('_session').find({})`,
    loading: false
  },
  computed: {
    keys: function () {
      if (!this.currentCollection || !this.currentCollection.data) return []
      const set = new Set()
      this.currentCollection.data.forEach(v => {
        Object.keys(v).forEach(w => {
          set.add(w)
        })
      })
      set.delete('meta')
      return Array.from(set)
    }
  },
  methods: {
    changeCollection: function (name) {
      this.loading = true
      getCollection(name).then(data => {
        this.currentCollection = Object.assign({data: data}, {name: name})
      }).finally(() => {
        this.loading = false
      })
    },
    exec: function () {
      if (!this.expr) return
      this.loading = true
      exec(this.expr).then(data => {
        this.currentCollection = Object.assign({data: data}, {name: null})
      }).finally(() => {
        this.loading = false
      })
    }
  }
})

getCollectionNames().then(data => {
  vm.collectionNames = data || []
})

// api
function getCollectionNames () {
  return http.get('/_session/collections').then(transResp)
}

function getCollection (name) {
  return http.get(`/_session/collection?name=${name}`).then(transResp)
}

function exec (expr) {
  return http.post(`/_session/exec`, {expr: expr}).then(transResp)
}

function transResp (data) {
  return data.data.data
}
