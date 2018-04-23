Vue.component('product-list', {
  template: `
  
  <div class="row hot-list">
    <div class="col-12 col-sm-12 col-md-3"  v-for="product,index in products" :key="product._id">
      <div class="card" >
        <a href="#">
            <img class="card-img-top" v-bind:src="product.image"  alt="Card image cap">
        </a>
        <div class="card-body">
            <a href="#">
                <h5 class="card-title">{{ product.name}}</h5>
            </a>
            <p class="card-text"> {{ product.price }} <span>Stock: {{ product.stock }}</span></p>
            <input type="button" value="Buy" class="btn btn-sm btn-primary btn-buy disable" v-on:click="addCart(product, index)" v-if="product.stock >= 1">
        </div>
      </div>
    </div>
  </div>
  `,
  data: function () {
    return {
      products: [],
      carts: [],
      sepatus: [],
    }
  },
  created: function() {
      axios.get('http://localhost:3000/products/list')
      .then(response => {
          console.log(response.data.data)
          let data = response.data.data
          data.forEach(productList => {
              this.products.push(productList)
          });
      })
      .catch(err => {
          res.send(err)
      })
  },
  methods: {
    addCart: function(val, index) {
        let status = false
        console.log(val)
        
        if (this.carts.length >= 1) {
            // console.log('VAL ID =>',val._id)
            this.carts.filter((cart) => {
                // console.log('==> ', val.stock)
                if (cart.id === val._id) {
                    cart.qty += 1
                    cart.price += val.price
                    this.products[index].stock -= 1
                    status = true
                }
            })

            if (status == false) {
            console.log(val._id)
            this.products[index].stock -= 1
                let obj = {
                    id: val._id,
                    img: val.urlimage,
                    title: val.name,
                    price: val.price,
                    qty: 1
                }
                this.carts.push(obj)
            }
        } else {
            console.log(val._id)
            // console.log(cart.id)
            // console.log('==================>', this.products)
            // console.log(val.id)
            this.products[index].stock -= 1
            let obj = {
                id: val._id,
                img: val.urlimage,
                title: val.name,
                price: val.price,
                qty: 1
            }
            this.carts.push(obj)
        }
    },
    deleteChart: function(index,id,qty) {
        this.products.forEach(product => {
            if(product._id == id){
                product.stock += qty
                this.carts.splice(index,1)
            }
        })
    },
    sumPrice: function(price) {
        return 'Rp ' + price.toLocaleString()
    }
  }
})