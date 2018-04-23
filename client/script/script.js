new Vue({
    el: '#app',
    data: {
        nama: 'Yohanes',
        sepatus: [],
        products: [],
        carts: []
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
    }, computed: {
        cartnya: function() {
            console.log(this.carts)
            return this.carts
        },
        priceValue: function(index) {
            return this.carts.price
        }
    }, filters: {
        
    }
})