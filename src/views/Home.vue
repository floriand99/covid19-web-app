<template>
  <div>
    <div
      v-if="data.length == 0"
      class="w-100 d-flex justify-content-center align-items-center"
      style="height: 100vh;"
    >
      <svg
        class="spinner"
        fill="#999"
        xmlns="http://www.w3.org/2000/svg"
        width="50"
        height="50"
        viewBox="0 0 24 24"
      >
        <path
          d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm8 12c0 4.418-3.582 8-8 8s-8-3.582-8-8 3.582-8 8-8 8 3.582 8 8zm-19 0c0-6.065 4.935-11 11-11v2c-4.962 0-9 4.038-9 9 0 2.481 1.009 4.731 2.639 6.361l-1.414 1.414.015.014c-2-1.994-3.24-4.749-3.24-7.789z"
        />
      </svg>
    </div>
    <div class="home" v-else>
      <svg
        @click="scrollTop()"
        class="bg-dark p-2 scroll-top shadow rounded"
        fill="white"
        xmlns="http://www.w3.org/2000/svg"
        width="50"
        height="50"
        viewBox="0 0 24 24"
      >
        <path
          d="M11.574 3.712c.195-.323.662-.323.857 0l9.37 15.545c.2.333-.039.757-.429.757l-18.668-.006c-.385 0-.629-.422-.428-.758l9.298-15.538zm.429-2.483c-.76 0-1.521.37-1.966 1.111l-9.707 16.18c-.915 1.523.182 3.472 1.965 3.472h19.416c1.783 0 2.879-1.949 1.965-3.472l-9.707-16.18c-.446-.741-1.205-1.111-1.966-1.111z"
        />
      </svg>
      <div class="container col-lg-9 mt-5 py-4">
        <h1 class="text-center text-secondary">CORONAVIRUS INFORMATION</h1>
        <div class="row mt-5">
          <div class="col-lg-4 mb-lg-5 mb-4">
            <div
              class="alert alert-info py-4 h-100 d-flex align-items-center justify-content-center text-center"
            >
              <div>
                <h5 class="text-secondary">Confirmed</h5>
                <h1 class="text-info">
                  {{ global.confirmed.toLocaleString("en-US") }}
                </h1>
              </div>
            </div>
          </div>
          <div class="col-lg-4 mb-lg-5 mb-4">
            <div
              class="alert alert-success py-4 h-100 d-flex align-items-center justify-content-center text-center"
            >
              <div>
                <h5 class="text-secondary">Recovered</h5>
                <h1 class="text-success">
                  {{ global.recovered.toLocaleString("en-US") }}
                </h1>
              </div>
            </div>
          </div>
          <div class="col-lg-4 mb-lg-5 mb-4">
            <div
              class="alert alert-danger py-4 h-100 d-flex align-items-center justify-content-center text-center"
            >
              <div>
                <h5 class="text-secondary">Deaths</h5>
                <h1 class="text-danger">
                  {{ global.deaths.toLocaleString("en-US") }}
                </h1>
              </div>
            </div>
          </div>
        </div>
        <input
          type="text"
          name=""
          placeholder="Search any country"
          :value="query"
          @input="e => (query = e.target.value)"
          class="w-100 shadow border-0 py-3 px-4"
        />
        <CountriesTable :data="searchResults" :codes="codes"></CountriesTable>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import CountriesTable from ".././components/CountriesTable";
export default {
  name: "Home",
  components: {
    CountriesTable
  },
  data() {
    return {
      global: {},
      data: [],
      searchResults: [],
      codes: [],
      query: ""
    };
  },
  created() {
    // console.log(this.$store.state.countries)
    const urls = [
      // global data
      "https://covid2019-api.herokuapp.com/v2/total",
      // country data
      "https://covid2019-api.herokuapp.com/v2/current",
      // get country codes in order to get flags
      "https://raw.githubusercontent.com/xxxdepy/simple-country-dial-codes/master/country-calling-codes.min.json"
    ];
    Promise.all(urls.map(item => fetch(item)))
      .then(responses => Promise.all(responses.map(res => res.json())))
      .then(res => {
        this.global = res[0].data;
        this.data = res[1].data;
        this.searchResults = res[1].data;
        // get country codes in order to get the flags
        this.codes = res[2];
      });
    // fetch('https://raw.githubusercontent.com/xxxdepy/simple-country-dial-codes/master/country-calling-codes.min.json')
    //   .then(res => res.json())
    //   .then(res => {
    //     console.log(res)
    //   })
  },
  methods: {
    scrollTop() {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  },
  watch: {
    query() {
      if (this.query.length > 1) {
        let arr = this.data.filter(item =>
          item.location.toLowerCase().includes(this.query)
        );
        this.searchResults = arr;
      } else {
        this.searchResults = this.data;
      }
    }
  }
};
</script>

<style type="text/css">
.scroll-top {
  z-index: 2;
}
</style>
