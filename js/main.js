let app = new Vue({
    el: '#app',
    data: {
        product: "Socks",
        selectedVariant: 0,
        onSale: true,
        brand: "Vue Mastery",
        altText: "A pair of socks",
        details: ['80% cotton', '20% polyester', 'Gender-neutral'],
        variants: [
            {
                variantId: 2234,
                variantColor: 'green',
                variantImage: "src/assets/vmSocks-green-onWhite.jpg",
                variantQuantity: 10
            },
            {
                variantId: 2235,
                variantColor: 'blue',
                variantImage: "src/assets/vmSocks-blue-onWhite.jpg",
                variantQuantity: 0
            }
        ],
        cart: 0,
        sizes: ['S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
        link: "https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=socks",
    },
    methods: {
        addToCart() {
            this.cart += 1
        },
        delFromCart() {
            if(this.cart > 0)
            { this.cart -= 1}
        },
        updateProduct(index) {
            this.selectedVariant = index;
            console.log(index);
        },


    },

    computed: {
        title() {
            return this.brand + ' ' + this.product;
        },

        inStock(){
            return this.variants[this.selectedVariant].variantQuantity
        },

        image() {
            return this.variants[this.selectedVariant].variantImage;
        },
        sale() {
            return this.brand + ' ' + this.product + 's currently holding a sale';
        }


    }

})
