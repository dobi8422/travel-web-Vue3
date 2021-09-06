/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const app = Vue.createApp({
  data () {
    return {
      data: [],
      locations: [],
      currentPage: 0,
      currentLocation: '',
      pages: 0,
      pagination: 12
    }
  },
  computed: {
    filterData () {
      let items = []
      const tempData = []
      const vm = this
      // select location
      if (vm.currentLocation !== '') {
        items = vm.data.filter(item => item.Zone === vm.currentLocation)
      } else {
        items = vm.data
      }
      // pagination
      items.forEach((item, index) => {
        if (index % vm.pagination === 0) {
          tempData.push([])
        } // tempData = ( [], [], [])
        const page = parseInt(index / vm.pagination)
        tempData[page].push(item)
      })
      vm.pages = tempData.length
      vm.currentPage = 0
      return tempData
    }
  },
  created () {
    const vm = this
    axios.get('https://raw.githubusercontent.com/hexschool/KCGTravel/master/datastore_search.json').then((res) => {
      vm.data = res.data.result.records
      // 將地區不重複的值取出來
      const locations = new Set() // 使用 ES6 中的 set() 取出唯一值
      this.data.forEach(item => { locations.add(item.Zone) })
      this.locations = Array.from(locations)
    })
  }
})

/* Vue網頁開發工具 */
app.config.debug = true
app.config.devtools = true

app.mount('#app')
