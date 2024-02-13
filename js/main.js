Vue.component('product', {
    props: {
        premium: {
            type: Boolean,
            required: true
        }
    },

    template: `
   <div class="product">
    <div class="product">
        <div class="product-image">
            <img :src="image" :alt="altText"/>
        </div>
        <div class="product-info">
            <h1>{{ title }}</h1>
            <span v-if="onSale">Sale!</span>
            <p v-if="inStock">In stock</p>
            <p v-else :class="{ fontthrough: !inStock }">Out of Stock</p>
            <product-details :details="details"></product-details>
           
            <a v-bind:href="link">More products like this</a>
            <p v-if="onSale">{{ sale }}</p>
            <div
                    class="color-box"
                    v-for="(variant, index) in variants"
                    :key="variant.variantId"
                    :style="{ backgroundColor:variant.variantColor }"
                    @mouseover="updateProduct(index)"
            ></div>
            <ul>
                <li v-for="size in sizes">{{ size }}</li>
            </ul>




            <button
                   v-on:click="addToCart"
                   :disabled="!inStock"
                   :class="{ disabledButton: !inStock }"
           >
               Add to cart
           </button>

            <button v-on:click="delFromCart">Remove from cart</button>
            <p>Shipping: {{ shipping }}</p>





    </div>

</div>
   </div>
 `,
    data() {
        return {
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
            sizes: ['S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
            link: "https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=socks",
        }

    },
    methods: {
        addToCart() {
            this.$emit("add-to-cart", this.variants[this.selectedVariant].variantId);
        },
        delFromCart() {
            if (this.$parent.cart && this.$parent.cart.length > 0) {
                this.$emit("remove-from-cart", this.variants[this.selectedVariant].variantId);
            }
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
        },
        shipping() {
            if (this.premium) {
                return "Free";
            } else {
                return 2.99
            }
        }

    }
})



Vue.component('product-details', {
    props: {
        details: {
            type: Array,
            required: true
        }
    },
    template:`
        <ul>
            <li v-for="detail in details">{{ detail }}</li>
        </ul>`,
    data() {
        return {}
    },
    methods: {
    },
    computed: {}
})



let app = new Vue({
    el: '#app',
    data: {
        premium: true,
        cart: []
    },
    methods: {
        updateCart(id) {
            this.cart.push(id);
        },
        removeFromCart(id) {
            const index = this.cart.indexOf(id);
            if (index !== -1) {
                this.cart.pop(id);
            }
        }
    }
})

