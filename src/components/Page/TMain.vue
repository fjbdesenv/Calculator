<template>
  <main class="container-main">
    <div class="container-display" :class="{ off: !ligado }">
      {{ conteudoDisplay.join(" ") }}
    </div>

    <div class="container-buttons">
      <template v-for="(opcao, index) in opcoes" :key="index">
        <TButton
          @ligar="ligar"
          @desligar="desligar"
          @calcular="calcular"
          @numero="numero"
          @operador="operador"
          @ponto="ponto"
          :tipo="opcao.tipo"
          :texto="`${opcao.texto}`"
        />
      </template>
    </div>
  </main>
</template>


<script setup lang="ts">
import TButton from "../TButton.vue";
import { Opcao, Operador } from "@/types";
import { Calculadora } from "@/classes";
import { ref, computed } from "vue";

const ligado = ref(false);
const conteudoDisplay = ref<string[]>([]);
const novoNumero = ref(true);
const valorNumeroAtual = ref("");

const opcoes: Opcao[] = [
  { tipo: "ligar", texto: "ON" },
  { tipo: "desligar", texto: "OFF" },
  { tipo: "calcular", texto: "=" },
  { tipo: "numero", texto: "1" },
  { tipo: "numero", texto: "2" },
  { tipo: "numero", texto: "3" },
  { tipo: "numero", texto: "4" },
  { tipo: "numero", texto: "5" },
  { tipo: "numero", texto: "6" },
  { tipo: "numero", texto: "7" },
  { tipo: "numero", texto: "8" },
  { tipo: "numero", texto: "9" },
  { tipo: "numero", texto: "0" },
  { tipo: "ponto", texto: "," },
  { tipo: "operador", texto: "+" },
  { tipo: "operador", texto: "-" },
  { tipo: "operador", texto: "*" },
  { tipo: "operador", texto: "/" },
];

const calculadora = ref(new Calculadora());

/* Funções */
function ligar() {
  calculadora.value.limpar();
  conteudoDisplay.value = ["0"];
  valorNumeroAtual.value = "0";
  novoNumero.value = true;
  ligado.value = true;
}

function desligar() {
  conteudoDisplay.value = [""];
  valorNumeroAtual.value = "";
  ligado.value = false;
}

function calcular() {
  if (ligado.value) {
    try {
      const resultado = calculadora.value.calcular();
      calculadora.value.limpar();
      calculadora.value.numeros.push(resultado);

      conteudoDisplay.value = [resultado.toString()];
      valorNumeroAtual.value = resultado.toString();
    } catch (error) {
      console.error(error);
      conteudoDisplay.value = ["Formula inválida"];
    }
  }
}

function ponto() {
  if (ligado.value && !valorNumeroAtual.value.includes(".")) {
    valorNumeroAtual.value = valorNumeroAtual.value + ".";
  }
}

function numero(numero: string) {
  if (ligado.value) {
    if (valorNumeroAtual.value == "0") {
      valorNumeroAtual.value = numero;
      conteudoDisplay.value = [];
    }

    if (novoNumero.value) {
      valorNumeroAtual.value = numero;
      calculadora.value.numeros.push(parseFloat(valorNumeroAtual.value));
      conteudoDisplay.value.push(valorNumeroAtual.value);
      novoNumero.value = false;
    } else {
      valorNumeroAtual.value = valorNumeroAtual.value + numero;

      const pNumeros =
        calculadora.value.numeros.length > 0
          ? calculadora.value.numeros.length - 1
          : 0;
      const pdisplay =
        conteudoDisplay.value.length > 0 ? conteudoDisplay.value.length - 1 : 0;

      console.log("pNumeros", pNumeros, "pdisplay", pdisplay);

      conteudoDisplay.value[pdisplay] = valorNumeroAtual.value;
      calculadora.value.numeros[pNumeros] = parseFloat(valorNumeroAtual.value);
    }
  }
}

function operador(operador: Operador) {
  if (ligado.value) {
    calculadora.value.operadores.push(operador);
    conteudoDisplay.value.push(operador);
    valorNumeroAtual.value = "";
    novoNumero.value = true;
  }
}
</script>


<style lang="scss"  scoped>
.container-main {
  background-color: #eee;

  border: 3px solid #ddd;
  border-radius: 7px;

  padding: 10px;

  box-shadow: -2.5px -2.5px 2.5px 2.5px #bbb;

  max-width: 600px;
  max-height: 600px;
}

.container-display {
  color: red;
  background-color: #fff;

  font-size: 1.5rem;
  font-weight: 600;

  border-radius: 7.5px;
  border: 2px solid #ddd;

  min-height: 40px;
  margin: 10px;
  padding: 12px 15px;

  box-shadow: -1px -1px 1px 1px #bbb;

  text-align: right;
}

.container-buttons {
  background-color: #ddd;

  border-radius: 7.5px;

  min-height: 160px;
  margin: 10px;
  padding: 15px;

  box-shadow: -1px -1px 1px 1px #bbb;
}

.off {
  background-color: #eee;
}
</style>