<template>
  <div>
    <div class="table mt-4" v-if="data.length > 0">
      <div
        class="table-data w-100 py-3 shadow-sm my-3 px-3"
        v-for="country in data"
        :key="country.location"
      >
        <div class="row">
          <div class="col-lg-4 col-12 my-lg-0 my-2">
            <img
              :src="
                `https://www.countryflags.io/${getFlag(
                  country.location
                )}/shiny/24.png`
              "
            />
            <span class="ml-2 font-weight-bold">{{ country.location }}</span>
          </div>
          <div class="col-lg-2 col-6">
            <small style="color: #999;">Confirmed</small><br />
            <span>{{ country.confirmed.toLocaleString("en-US") }}</span>
          </div>
          <div class="col-lg-2 col-6">
            <small style="color: #999;">Deaths</small><br />
            <span>{{ country.deaths.toLocaleString("en-US") }}</span>
          </div>
          <div class="col-lg-2 col-6">
            <small style="color: #999;">Recovered</small><br />
            <span>{{ country.recovered.toLocaleString("en-US") }}</span>
          </div>
          <div class="col-lg-2 col-6">
            <small style="color: #999;">Active</small><br />
            <span>{{ country.active.toLocaleString("en-US") }}</span>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <h1 class="lead py-4">No results...</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: "CountriesTable",
  props: ["data", "codes"],
  methods: {
    getFlag(country) {
      console.log(country);
      if (country == "US") return "us";
      let _country = this.$props.codes.find(item =>
        item.name.includes(country)
      );
      if (_country) return _country.code;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
