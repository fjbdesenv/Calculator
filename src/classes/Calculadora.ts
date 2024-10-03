import { Operador } from "../types/Operador";
import { ICalculadora } from "../interfaces/ICalculadora";
import { OPERACAO } from "../enum/Operacao";

export class Calculadora implements ICalculadora {
    operadores: Operador[] = [];
    numeros: number[] = [];

    pegarOperador(index: number): Operador | undefined {
        return this.operadores[index];
    }

    pegarNumero(index: number): number | undefined {
        return this.numeros[index];
    }

    deletarOperador(index: number): boolean {
        if (!this.pegarOperador(index))
            return false;

        this.operadores.splice(index, 1);
        return true;
    }

    deletarNumero(index: number): boolean {
        if (!this.pegarOperador(index))
            return false;

        this.numeros.splice(index, 1);
        return true;
    }

    adicionarNumeroPosicaoInicial(numero: number): void {
        this.numeros.unshift(numero);
    }

    executarOpercao(numero1: number, numero2: number, operador: Operador): number {
        
        if (OPERACAO.SUBTRACAO === operador) return numero1 - numero2;
        else if (OPERACAO.SOMA === operador) return numero1 + numero2;
        else if (OPERACAO.DIVISAO === operador) return numero1 / numero2;
        else if (OPERACAO.MULTIPLICACAO === operador) return numero1 * numero2;
        else throw Error('Operador inválido!');
    }
    
    calcularOperacao(): number {
        const operador = this.pegarOperador(0);
        const numero1 = this.pegarNumero(0);
        const numero2 = this.pegarNumero(1);

        if (!operador) throw Error('Operador não informado!');
        if (!numero1) throw Error('Primeiro número da operação não informado!');
        if (!numero2) throw Error('Segundo número da operação não informado!');

        const retorno = this.executarOpercao(numero1, numero2, operador);

        this.deletarNumero(0);
        this.deletarNumero(0);
        this.deletarOperador(0);

        this.adicionarNumeroPosicaoInicial(retorno);

        return retorno;
    }

    calcular(): number {
        while (this.operadores.length > 0)
            this.calcularOperacao();

        return this.pegarNumero(0) || 0;
    }

    limpar() {
        this.numeros = [];
        this.operadores = [];
    }
}