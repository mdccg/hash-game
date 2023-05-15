# tic-tac-toe

## Sumário

- [tic-tac-toe](#tic-tac-toe)
  - [Sumário](#sumário)
  - [_To-do list_](#to-do-list)
  - [Motivação](#motivação)
  - [Pilha de tecnologia](#pilha-de-tecnologia)
  - [Como rodar](#como-rodar)
    - [Pré-requisitos](#pré-requisitos)
    - [Passo a passo](#passo-a-passo)

## _To-do list_

- ~~Seletor de dificuldade~~
- ~~Seletor de textura~~
- ~~Adicionar uma _hitbox_ para o hífen na pontuação~~
- ~~Destacar a combinação vencedora antes de resetar o tabuleiro~~
- ~~Substituir o `alert` por uma mensagem mais robusta~~
- ~~Adicionar o tamanho de todos os ícones no arquivo `theme.ts`~~
- ~~Colocar um timer~~
- ~~Tela do histórico~~
- ~~Adicionar _tileset_ do Leandro~~
- Arrumar uma _splash screen_ melhor
- Substituir as três cores principais por uma constante e uma função HSL

## Motivação

Este app consiste no jogo da velha para dispositivos móveis.

Com duas opções de jogo, "Dois jogadores" e "Contra a Máquina", o usuário pode escolher o modo que melhor se adequa às suas necessidades. No modo "Dois jogadores", você pode jogar contra um amigo ou membro da família em uma partida rápida ou longa, intercalando as jogadas até que um dos jogadores vença ou ocorra um empate. É possível reiniciar ou começar uma nova partida sempre que quiser. Já no modo "Contra a Máquina", o jogador irá testar suas habilidades de estratégia e raciocínio contra o computador. São três níveis de dificuldade: fácil, médio e difícil. No nível fácil, a máquina comete erros aleatórios, proporcionando uma partida mais simples e casual. O nível médio amplia a capacidade de raciocínio da máquina, tornando a partida mais desafiadora. E no nível difícil, a máquina utiliza algoritmos mais elaborados, exigindo do jogador maior habilidade e estratégia para vencer.

O aplicativo também conta com uma interface amigável e intuitiva, permitindo ao usuário iniciar uma nova partida ou reiniciar a atual. As estatísticas das partidas anteriores são exibidas na tela principal, incluindo o número de vitórias, derrotas e empates. Essas informações não são salvas, mas apenas referentes às partidas realizadas enquanto o aplicativo estiver aberto. Foram utilizadas técnicas de programação aprendidas em sala, garantindo a estabilidade e funcionalidade do aplicativo em diferentes tipos de dispositivos móveis.

Este foi o terceiro repositório de código apresentado no [Curso Superior de TSI](https://www.ifms.edu.br/campi/campus-aquidauana/cursos/graduacao/sistemas-para-internet/sistemas-para-internet) do IFMS como requisito para obtenção da nota parcial das atividades da unidade curricular Programação para Dispositivos Móveis I.

| [&larr; Repositório anterior](https://github.com/mdccg/minesweeper-mobile) | [Próximo repositório &rarr;]([#](https://github.com/mdccg/weather-app)) |
|-|-|

## Pilha de tecnologia

| Papel | Tecnologia |
|-|-|
| Ambiente de execução | [Node](https://nodejs.org/en/) |
| Plataforma | [Expo](https://expo.dev/) | 
| Linguagem de programação | [TypeScript](https://www.typescriptlang.org/) |
| Front-end | [React Native](https://reactnative.dev/) |

Os créditos pelas mídias disponibilizadas estão disponíveis [aqui](./assets/README.md).

<!-- Adicionar galeria aqui -->

## Como rodar

### Pré-requisitos

- [Node](https://nodejs.org/en/download/);
- [Yarn](https://yarnpkg.com/) (opcional);
- Dispositivo móvel:
  - [Expo Go](https://expo.dev/client).

### Passo a passo

1. Clone o repositório de código em sua máquina;
   
2. Abra um shell de comando de sua preferência (prompt de comando, PowerShell, terminal _etc_.);
   
3. Instale as dependências do projeto através do seguinte comando:

```console
$ npm install
```

Caso esteja utilizando o gerenciador de pacotes Yarn, execute o seguinte comando como alternativa:

```console
$ yarn
```

4. Execute o seguinte comando para iniciar o app:

Para npm:

```console
$ npm run start
```

Para Yarn:

```console
$ yarn start
```

5. Uma vez iniciado, aparecerá um QR Code. Você deve escaneá-lo com o aplicativo [Expo Go](https://expo.dev/client), disponível para Android e iOS;

6. Como alternativa, você pode executar o app no seu navegador, pressionando o atalho `w`. Entretanto, alguns módulos podem não funcionar na versão web do app.
