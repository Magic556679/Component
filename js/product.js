import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.0.9/vue.esm-browser.js';

let productModal = null;
let delProductModal = null;
const apiUrl = 'https://vue3-course-api.hexschool.io/api';
const apiPath = 'wu9zo4s';

createApp({
    data(){
        return{
            products: [],
            isNew: false,
            pagination: {},
            tempProduct: {
                imagesUrl: [],
            },
        }
    },
    mounted() {
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
        axios.defaults.headers.common.Authorization = token;
        this.getData();
    },
    methods: { 
        getData(page = 1) {
            axios.get(`${apiUrl}/${apiPath}/admin/products?page=${page}`)
            .then((res) => {
                if (res.data.success) {
                    const { products, pagination } = res.data;
                    this.products = products;
                    this.pagination = pagination;                    
                }
            });
        },
        openModal(isNew, item){
          if(isNew === 'new') {
              this.isNew = true;
              this.tempProduct = {};
              // productModal.show();
              this.$refs.productModal.openModal();
          }else if(isNew === 'edit'){
              this.isNew = false;
              this.tempProduct = { ...item };
              // productModal.show();
              this.$refs.productModal.openModal();
          }else if(isNew === 'delete'){
              this.tempProduct = { ...item };
              // delProductModal.show();
              this.$refs.delProductModal.openModal()
          }
      },
    },
    
})
.component('pagination', {
  template: '#pagination',
  props: ['pages'],
  methods: {
    emitPages(item) {
      this.$emit('emit-pages', item);
    },
  },
})
.component('productModal', { 
  template: '#productModal',
  props: {
    product: {
      type: Object,
      default() {
        return { 
          imagesUrl: [],
        }
      }
    },
    isNew: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      // modal: '',
      productModal:'',
    };
  },
  mounted() {
    // productModal = new bootstrap.Modal(document.getElementById('productModal'), {
    //   keyboard: false,
    //   backdrop: 'static'
    // });
    this.productModal = new bootstrap.Modal(this.$refs.modal2);

  },
  methods: {
    updateProduct() {
      let api = `${apiUrl}/${apiPath}/admin/product`;
      let httpMethod = 'post';
      if (!this.isNew) {
        api = `${apiUrl}/${apiPath}/admin/product/${this.product.id}`;
        httpMethod = 'put';
      }

      axios[httpMethod](api, { data: this.product }).then((res) => {
        if(res.data.success){
          alert(res.data.message);
          this.hideModal();
          this.$emit('update');
        } else {
          alert(res.data.message);
        }
      }).catch((error) => {
        console.log(error)
      });
    },
    createImages() {
      this.product.imagesUrl = [];
      this.product.imagesUrl.push('');
    },
    openModal() {
      this.productModal.show();
      // productModal.show();
    },
    hideModal() {
      this.productModal.hide();
      // productModal.hide();
    },
  },
})

.component('delProductModal', {
  template: '#delProductModal',
  props: ['item'],
  data() {
    return {
      // modal: '',
      delProductModal:'',
    };
  },
  mounted() {
    // delProductModal = new bootstrap.Modal(document.getElementById('delProductModal'), {
    //   keyboard: false,
    //   backdrop: 'static',
    // });
    this.delProductModal = new bootstrap.Modal(this.$refs.modal);
    
  },
  methods: {
    delProduct() {
      axios.delete(`${apiUrl}/${apiPath}/admin/product/${this.item.id}`).then((res) => {
        if(res.data.success){
          alert(res.data.message);
          this.hideModal();
          this.$emit('update');
        } else {
          alert(res.data.message);
        }
      }).catch((error) => {
        console.log(error);
      });
    },
    openModal() {
      // delProductModal.show();
      this.delProductModal.show();
    },
    hideModal() {
      this.delProductModal.hide();
      // delProductModal.hide();
    },
  },
})

.mount('#app')


