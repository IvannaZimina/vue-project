<script setup>
import { reactive } from 'vue';
import { useToast } from 'vue-toastification';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { normalizeProductImage } from '@/utils/productImage';

const router = useRouter();
const toast = useToast();

const form = reactive({
  title: '',
  price: '',
  category: '',
  image: '',
  description: '',
});

const handleSubmit = async () => {
  const newProduct = {
    title: form.title,
    price: Number(form.price),
    category: form.category,
    image: normalizeProductImage(form.image),
    description: form.description,
    rating: {
      rate: 0,
      count: 0,
    },
  };

  try {
    const response = await axios.post('/api/products', newProduct);
    toast.success('Product added successfully');
    router.push(`/products/${response.data.id}`);
  } catch (error) {
    console.error('Error adding product:', error);
    toast.error('Product was not added');
  }
};
</script>

<template>
  <section class="bg-indigo-50">
    <div class="container m-auto max-w-2xl py-24">
      <div class="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
        <form @submit.prevent="handleSubmit">
          <h2 class="text-3xl text-center font-semibold mb-6">Add Product</h2>

          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2">Product Title</label>
            <input
              type="text"
              id="title"
              name="title"
              v-model="form.title"
              class="border rounded w-full py-2 px-3 mb-2"
              placeholder="e.g. Cotton T-Shirt"
              required
            />
          </div>

          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2">Category</label>
            <input
              type="text"
              id="category"
              name="category"
              v-model="form.category"
              class="border rounded w-full py-2 px-3"
              placeholder="e.g. men's clothing"
              required
            />
          </div>

          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2">Price</label>
            <input
              type="number"
              step="0.01"
              min="0"
              id="price"
              name="price"
              v-model="form.price"
              class="border rounded w-full py-2 px-3"
              placeholder="e.g. 49.99"
              required
            />
          </div>

          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2">Image URL</label>
            <input
              type="url"
              id="image"
              name="image"
              v-model="form.image"
              class="border rounded w-full py-2 px-3"
              placeholder="https://example.com/image.jpg"
              required
            />
          </div>

          <div class="mb-4">
            <label for="description" class="block text-gray-700 font-bold mb-2">Description</label>
            <textarea
              id="description"
              name="description"
              class="border rounded w-full py-2 px-3"
              rows="4"
              placeholder="Product description"
              v-model="form.description"
              required
            ></textarea>
          </div>

          <div>
            <button
              class="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>
