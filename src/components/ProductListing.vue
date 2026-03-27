<script setup>
import { RouterLink } from 'vue-router'
import { defineProps, ref, computed } from 'vue'
import { DEFAULT_PRODUCT_IMAGE, normalizeProductImage } from '@/utils/productImage';

const props = defineProps({
  product: Object,
})

const showFullDescription = ref(false)

const toggleFullDescription = () => {
  showFullDescription.value = !showFullDescription.value
}

const truncatedDescription = computed(() => {
  let description = props.product.description
  if (!showFullDescription.value) {
    description = description.substring(0, 100) + '...'
  }
  return description
})

const imageSrc = computed(() => normalizeProductImage(props.product.image));

const handleImageError = (event) => {
  event.target.src = DEFAULT_PRODUCT_IMAGE;
};
</script>

<template>
  <div class="bg-white rounded-xl shadow-md relative">
    <div class="p-4">
      <div class="mb-6">
        <div class="text-gray-600 my-2 capitalize">{{ product.category }}</div>
        <h3 class="text-xl font-bold">{{ product.title }}</h3>
      </div>

      <div class="mb-4 flex justify-center">
        <img
          :src="imageSrc"
          :alt="product.title"
          class="w-20 h-20 object-contain"
          @error="handleImageError"
        />
      </div>

      <div class="mb-5">
        <div>{{ truncatedDescription }}</div>
        <button
          class="text-indigo-500 hover:text-indigo-600 mb-5"
          @click="toggleFullDescription"
        >
          {{ showFullDescription ? 'Show Less' : 'Show More' }}
        </button>
      </div>

      <h3 class="text-indigo-500 mb-2">${{ Number(product.price).toFixed(2) }}</h3>

      <div class="border border-gray-100 mb-5"></div>

      <div class="flex flex-col lg:flex-row justify-between mb-4">
        <div class="text-orange-700 mb-3">
          <i class="pi pi-tag text-orange-700"></i>
          {{ product.rating?.rate }} / 5 ({{ product.rating?.count }} reviews)
        </div>
        <RouterLink
          :to="'/products/' + product.id"
          class="h-[36px] bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg text-center text-sm"
        >
          View Product
        </RouterLink>
      </div>
    </div>
  </div>
</template>
