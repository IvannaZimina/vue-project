<script setup>
import Hero from '@/components/Hero.vue';
import HomeCards from '@/components/HomeCards.vue';
import ProductListings from '@/components/ProductListings.vue';

</script>

<template>
  <Hero />
  <HomeCards />
  <ProductListings :limit="3" :showButtons="true" />
</template>