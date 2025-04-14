<template>
    <div class="auth-container">
      <router-view /> <!-- This will render the login/signup form -->
    </div>
  </template>
  
  <style scoped>
  .auth-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f0f2f5;
  }
  </style>
  