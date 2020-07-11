<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style>
body {
  background-color: #f9f9f9;
  color: #444;
  font-size: 16px;
  font-family: Poppins;
}
.scroll-top {
  position: fixed;
  bottom: 15px;
  opacity: 0.8;
  right: 15px;
  z-index: 1;
  cursor: pointer;
}
.spinner {
  animation-name: spin;
  animation-duration: 0.8s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}

.table-data:nth-child(even) {
  background-color: white;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
