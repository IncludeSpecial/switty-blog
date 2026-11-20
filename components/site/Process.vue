<script setup lang="ts">
import { steps } from '~/data/site'
</script>

<template>
  <section id="process" class="section light">
    <div class="wrap">
      <div class="section-head">
        <p class="kicker">Процесс</p>
        <h2>Как работаю</h2>
      </div>
      <ol class="steps">
        <li v-for="(step, index) in steps" :key="step" class="step">
          <div class="step-num">{{ String(index + 1).padStart(2, '0') }}</div>
          <p>{{ step }}</p>
        </li>
      </ol>
    </div>
  </section>
</template>
