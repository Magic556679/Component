import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.0.9/vue.esm-browser.js';

createApp({

  data() {
    return {
      // url:'https://vue3-course-api.hexschool.io/',
      // path:'wu9zo4s',
      // emailInput:document.querySelector('#username'),
      // pwInput:document.querySelector('#password'),
      // loginBtn:document.querySelector('#login'),
      user: {
        username:'',
        password:''
      }
    }
  },
  methods: {
    login() {
      // const api = `${this.url}admin/signin`;
      const api = 'https://vue3-course-api.hexschool.io/admin/signin';
      axios.post(api, this.user)
        .then((res) => {
          const token = res.data.token;
          const expired = res.data.expired;
          document.cookie = `hexToken=${token}; expires=${new Date(expired)}`;
          if(res.data.success == true){
              window.location.href='product.html';
          }else if(res.data.success == false){
              alert('請重新輸入');
          } 
      }).catch((error)=>{
        console.log(error);
      });
    }
  }

}).mount('#app');
// const app = {
//   data() {
//     return {
//       url:'https://vue3-course-api.hexschool.io/',
//       path:'wu9zo4s',
//       // emailInput:document.querySelector('#username'),
//       // pwInput:document.querySelector('#password'),
//       // loginBtn:document.querySelector('#login'),
//       user: {
//         username:'',
//         password:''
//       }
//     }
//   },
//   methods: {
//     login() {
//       const api = `${this.url}admin/signin`;
//       axios.post(api, this.user)
//         .then((res) => {
//           const token = res.data.token;
//           const expired = res.data.expired;
//           document.cookie = `hexToken=${token}; expires=${new Date(expired)}`;
//           if(res.data.success == true){
//               window.location.href='product.html';
//           }else if(res.data.success == false){
//               alert('請重新輸入');
//           } 
//       }).catch((error)=>{
//         console.log(error);
//       });
//     }
//   }
// }
// Vue.createApp(app).mount('#app');

