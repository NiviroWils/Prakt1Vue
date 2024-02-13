let eventBus = new Vue()
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
<product-tabs :reviews="reviews"></product-tabs>




    </div>

</div>
   </div>
 `,
    data() {
        return {
            reviews: [],
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

Vue.component('product-review', {
    template: `
   <form class="review-form" @submit.prevent="onSubmit">
   <p v-if="errors.length">
 <b>Please correct the following error(s):</b>
 <ul>
   <li v-for="error in errors">{{ error }}</li>
 </ul>
</p>

 <p>
   <label for="name">Name:</label>
   <input id="name" v-model="name" placeholder="name">
 </p>

 <p>
   <label for="review">Review:</label>
   <textarea id="review" v-model="review"></textarea>
 </p>

 <p>
   <label for="rating">Rating:</label>
   <select id="rating" v-model.number="rating">
     <option>5</option>
     <option>4</option>
     <option>3</option>
     <option>2</option>
     <option>1</option>
   </select>
 </p>
 <p>
            <label for="recommend">Would you recommend this product?</label><br>
            <input type="radio" id="yes" value="yes" v-model="recommendation"> <label for="yes">Yes</label><br>
            <input type="radio" id="no" value="no" v-model="recommendation"> <label for="no">No</label>
        </p>
 <p>
   <input type="submit" value="Submit"> 
 </p>

</form>


 `,
        data() {
            return {
                name: null,
                review: null,
                rating: null,
                errors: [],
                recommendation: null,
            }
        },

    methods:{
        onSubmit() {
            this.errors = [];

            if (!this.name) this.errors.push("Name required.")
            if (!this.review) this.errors.push("Review required.")
            if (!this.rating) this.errors.push("Rating required.")
            if (!this.recommendation) this.errors.push("Recommendation required.")

            if (this.errors.length === 0) {
                let productReview = {
                    name: this.name,
                    review: this.review,
                    rating: this.rating,
                    recommendation: this.recommendation
                };
                eventBus.$emit('review-submitted', productReview)

                this.name = null
                this.review = null
                this.rating = null
                this.recommendation = null
            }
        },

    }



})

Vue.component('product-tabs', {
    props: {
        reviews: {
            type: Array,
            required: false
        }
    },

        template: `
     <div>   
       <ul>
         <span class="tab"
               :class="{ activeTab: selectedTab === tab }"
               v-for="(tab, index) in tabs"
               @click="selectedTab = tab"
         >{{ tab }}</span>
       </ul>
       <div v-show="selectedTab === 'Reviews'">
         <p v-if="!reviews.length">There are no reviews yet.</p>
         <ul>
           <li v-for="review in reviews">
           <p>{{ review.name }}</p>
           <p>Rating: {{ review.rating }}</p>
           <p>{{ review.review }}</p>
           </li>
         </ul>
       </div>
       <div v-show="selectedTab === 'Make a Review'">
         <product-review></product-review>
       </div>
     </div>
`,
    data() {
        return {
            tabs: ['Reviews', 'Make a Review'],
            selectedTab: 'Reviews'  // устанавливается с помощью @click
        }
    },
    mounted() {
        eventBus.$on('review-submitted', productReview => {
            this.reviews.push(productReview)
        })
    },
})




let app = new Vue({
    el: '#app',
    data: {
        premium: true,
        cart: [],
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
        },
        addReview(productReview) {
            this.reviews.push(productReview)
        }

    }
})

