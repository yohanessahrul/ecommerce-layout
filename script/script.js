new Vue({
    el: '#app',
    data: {
        nama: 'Yohanes',
        products: [
            {
                id: 1,
                img: 'https://m.media-amazon.com/images/I/81umq0wVUjL._SX480_.jpg',
                title: 'Vans Classic Slip-On™ Core Classics',
                price: 956000,
                stock: 3
            },
            {
                id: 2,
                img: 'https://m.media-amazon.com/images/I/81w1BKwqwfL._SX480_.jpg',
                title: 'Vans Old Skool',
                price: 1200000,
                stock: 2
            },
            {
                id: 3,
                img: 'https://m.media-amazon.com/images/I/81ky27v27+L._SX480_.jpg',
                title: 'Vans Kids Classic Slip-On',
                price: 756000,
                stock: 7
            },
            {
                id: 4,
                img: 'https://m.media-amazon.com/images/I/81djUT1G7WL._SX480_.jpg',
                title: 'Vans Classic Slip-On',
                price: 1336000,
                stock: 5
            },
            {
                id: 5,
                img: 'https://m.media-amazon.com/images/I/81umq0wVUjL._SX480_.jpg',
                title: 'Vans Abal-abal',
                price: 656000,
                stock: 4
            }
        ],
        carts: []
    }, methods: {
        addCart: function(val) {
            let status = false
            // const idx = this.carts.indexOf(val.id)
            // console.log(idx)
            if (this.carts.length >= 1) {
                //filter
                console.log('==================>', this.products)
                console.log(val.id)
                this.carts.filter((cart) => {
                    if (cart.id === val.id) {
                        cart.qty += 1
                        cart.price += val.price
                        this.products[val.id-1].stock -= 1
                        status = true
                    }
                })

                if (status == false) {
                console.log(val.id)
                this.products[val.id-1].stock -= 1
                    let obj = {
                        id: val.id,
                        img: val.img,
                        title: val.title,
                        price: val.price,
                        qty: 1
                    }
                    this.carts.push(obj)
                }
            } else {
                // console.log(cart.id)
                console.log('==================>', this.products)
                console.log(val.id)
                this.products[val.id-1].stock -= 1
                let obj = {
                    id: val.id,
                    img: val.img,
                    title: val.title,
                    price: val.price,
                    qty: 1
                }
                this.carts.push(obj)
            }
        },
        deleteChart: function(index,cartId) {
            console.log(index, cartId)
            this.products[cartId-1].stock += this.carts[index].qty
            this.carts.splice(index,1)
        }
    }, computed: {
        cartnya: function() {
            console.log(this.carts)
            return this.carts
        }
    }, filters: {
        sumPrice: function(price) {
            return 'Rp ' + price.toLocaleString()
        }
    }
})