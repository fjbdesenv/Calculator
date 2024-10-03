export type Opcao = { tipo: OpcaoTipo, texto: OpcaoTexto };
export type OpcaoTipo = 
    'ligar' 
    | 'desligar' 
    | 'calcular' 
    | 'numero' 
    | 'operador' 
    | 'ponto';
export type OpcaoTexto = 
    'ON' 
    | 'OFF' 
    | '=' 
    | '1' 
    | '2' 
    | '3' 
    | '4' 
    | '5' 
    | '6' 
    | '7' 
    | '8' 
    | '9' 
    | '0' 
    | ',' 
    | '+' 
    | '-' 
    | '*' 
    | '/';