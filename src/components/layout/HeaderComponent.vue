<template>
  <div id="header-container">
    <div id="header-logo-container">
      <a href="/clothing-and-apparels/?p=1" class="logo-link">
        <img src="@/assets/logo.png" id="logo-img" alt="Logo" />
      </a>
    </div>
    <div id="header-navbar">
      <ul id="navbar-container">
        <li id="navbar-item"><router-link to="/footwear/?p=1">FOOTWEAR</router-link></li>
        <li id="navbar-item"><router-link to="/clothing-and-apparels/?p=1">CLOTHING</router-link></li>
        <li id="navbar-item"><router-link to="/home-furnishing/?p=1">HOME & LIVING</router-link></li>
        <li id="navbar-item"><router-link to="/personal-care/?p=1">PERSONAL CARE</router-link></li>
        <li id="navbar-item"><router-link to="/toys-and-games/?p=1">TOYS AND GAMES</router-link></li>
        <li id="navbar-item"><router-link to="/accessories/?p=1">ACCESSORIES</router-link></li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  setup() {

    return {};
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/globals.scss";

#logo-img{
  width: 53px;
  height: 36px; 
}

#header-container {
  z-index: 100;
  display: flex;
  position: fixed;
  flex-direction: row;
  max-height: $header-height;
  min-height: $header-height;
  width: 100%;
  top: 0;
  left: 0;
  background:white;
  align-items: center;
  font-weight: 700;
}
#navbar-container {
  display: flex;
  flex-direction: row;
  
}
#navbar-item {
  padding: 0 17px;
}
#header-logo-container {
  width: 53px;
  height: 36px; 
  margin-left: 4%;
}
#header-navbar{
  margin:0 0 0 3.5%;
}
</style>
