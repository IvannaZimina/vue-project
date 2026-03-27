<script setup>
import { PulseLoader } from 'vue-spinner';
import { reactive, onMounted } from 'vue';
import { useRoute, RouterLink, useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import BackButton from '@/components/BackButton.vue';
import axios from 'axios';
import { DEFAULT_PRODUCT_IMAGE, normalizeProductImage } from '@/utils/productImage';

const route = useRoute();
const router = useRouter();
const toast = useToast();
const productId = route.params.id;

const state = reactive({
  product: {
    title: '',
    description: '',
    category: '',
    image: '',
    price: 0,
    rating: {
      rate: 0,
      count: 0,
    },
  },
  isLoading: true,
});

const deleteProduct = async () => {
  try {
    const confirmDelete = window.confirm('Are you sure you want to delete this product?');
    if (!confirmDelete) return;

    await axios.delete(`/api/products/${productId}`);
    toast.success('Product deleted successfully');
    router.push('/products');
  } catch (error) {
    console.error('Error deleting product:', error);
    toast.error('Product was not deleted');
  }
};

const getProductImage = (imageUrl) => normalizeProductImage(imageUrl);

const handleImageError = (event) => {
  event.target.src = DEFAULT_PRODUCT_IMAGE;
};

onMounted(async () => {
  try {
    const response = await axios.get(`/api/products/${productId}`)
    state.product = response.data
  } catch (error) {
    console.error('Error fetching product:', error)
  } finally {
    state.isLoading = false
  }
})
</script>

<template>
    <BackButton />
    <section v-if="!state.isLoading" class="bg-indigo-50">
      <div class="container m-auto py-10 px-6">
        <div class="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
          <main>
            <div
              class="bg-white p-6 rounded-lg shadow-md text-center md:text-left"
            >
              <div class="text-gray-500 mb-4 capitalize">{{ state.product.category }}</div>
              <h1 class="text-3xl font-bold mb-4">{{ state.product.title }}</h1>
              <div
                class="text-gray-500 mb-4 flex align-middle items-baseline justify-center md:justify-start"
              >
                <i
                  class="pi pi-star-fill text-orange-700 mr-2"
                ></i>
                <p class="text-orange-700">{{ state.product.rating.rate }} / 5 ({{ state.product.rating.count }} reviews)</p>
              </div>
            </div>

            <div class="bg-white p-6 rounded-lg shadow-md mt-6">
              <h3 class="text-indigo-800 text-lg font-bold mb-3">Product Photo</h3>
              <div class="mb-6 flex justify-center">
                <img
                  :src="getProductImage(state.product.image)"
                  :alt="state.product.title"
                  class="w-[150px] h-[150px] object-contain"
                  @error="handleImageError"
                />
              </div>

              <h3 class="text-indigo-800 text-lg font-bold mb-6">
                Product Description
              </h3>

              <p class="mb-4">
                {{ state.product.description }}
              </p>

              <h3 class="text-indigo-800 text-lg font-bold mb-2">Price</h3>

              <p class="mb-4">${{ Number(state.product.price).toFixed(2) }}</p>
            </div>
          </main>

          <!-- Sidebar -->
          <aside>
            <!-- Product Info -->
            <div class="bg-white p-6 rounded-lg shadow-md">
              <h3 class="text-xl font-bold mb-6">Product Info</h3>

              <h2 class="text-2xl">Category</h2>

              <p class="my-2 capitalize">
                {{ state.product.category }}
              </p>

              <hr class="my-4" />

              <h3 class="text-xl">Average Rating:</h3>

              <p class="my-2 bg-indigo-100 p-2 font-bold">
                {{ state.product.rating.rate }} / 5
              </p>

              <h3 class="text-xl">Reviews Count:</h3>

              <p class="my-2 bg-indigo-100 p-2 font-bold">{{ state.product.rating.count }}</p>
            </div>

            <div class="bg-white p-6 rounded-lg shadow-md mt-6">
              <h3 class="text-xl font-bold mb-6">Manage Product</h3>
              <RouterLink
                :to="`/products/edit/${state.product.id}`"
                class="bg-indigo-500 hover:bg-indigo-600 text-white text-center font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
                >Edit Product</RouterLink>
              <button
                @click="deleteProduct"
                class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
              >
                Delete Product
              </button>
            </div>
          </aside>
        </div>
      </div>
    </section>
    <div v-else class="text-center text-gray-500 py-6">
      <PulseLoader :loading="state.isLoading" color="#4A90E2" size="15px" />
    </div>

</template>