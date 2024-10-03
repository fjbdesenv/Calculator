import { Operador } from "../types/Operador";

export interface ICalculadora {
    operadores: Operador[];
    numeros: number[];

    pegarOperador(index:number): Operador | undefined;
    pegarNumero(index:number): number | undefined;

    deletarOperador(index:number, count?: number): boolean;
    deletarNumero(index:number, count?: number): boolean;

    adicionarNumeroPosicaoInicial(numero: number): void;

    calcularOperacao(): number;
    calcular(): number;

    limpar(): void;
}