<template>
  <button class="button" @click="enviarEvento">
    {{ texto }}
  </button>
</template>


<script setup lang="ts">
import { OpcaoTexto, OpcaoTipo } from "@/types/Opcao";
import { defineProps, defineEmits } from "vue";

const props = defineProps<{ tipo: OpcaoTipo; texto: OpcaoTexto }>();
const emits = defineEmits(
  new Array<OpcaoTipo>(
    "ligar",
    "desligar",
    "calcular",
    "numero",
    "operador",
    "ponto"
  )
);

function enviarEvento() {
  emits(props.tipo, props.texto);
}
</script>


<style lang="scss" scoped>
.button {
  font-weight: 600;
  background-color: #ddd;
  color: #000;

  border-radius: 4px;

  padding: 10px;
  margin: 5px;

  height: 20%;
  width: 30%;

  box-shadow: -1px -1px 1px 1px #bbb;
}

.button:hover {
  color: #fff;
  background-color: #888;
}

@media screen and (max-width: 480px) {
  .button {
    width: 20%;
  }
}

@media screen and (max-width: 350px) {
  .button {
    width: 18%;
    font-size: 0.8rem;

    padding: 2px;
  }
}
</style>