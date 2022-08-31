# LocalWeatherApp

Trata-se de um aplicativo em react-native que captura a localização do usuário e a partir dela consume uma API de dados climáticos.

## Stack utilizada

**Stacks:** ReactNative, Redux, TypeScript, ReactNavigation 6x

## Funcionalidades

- Verifica o clima do local (se o usuário autorizar a localização)
- Mostra os dados climáticos das próximas horas
- Mostra os dados do próximo dia e também dos próximos 5 dias

## Instalação

Para utilizar faça o clone do projeto

```bash
  https://github.com/anderllr/LocalWeatherApp.git
  cd LocalWeatherApp
```

Instale my-project com npm ou yarn

```bash
  npm install
       OU
  yarn
```

## Componentes e APIs de terceiros utilizados

- [React Native Vector Icons](https://github.com/oblador/react-native-vector-icons) --(Importante verificar documentação de instalação)
- [Moment](https://momentjs.com/)
- [Open Weather API](https://openweathermap.org/) --Necessita de criação de chave própria

## Variáveis de Ambiente

Para rodar esse projeto, você vai precisar adicionar as seguintes variáveis de ambiente no seu .env

`API_KEY` -- Essa chave você conseguirá após o seu cadastramento no site citado acima da OpenWeather

## Estrutura de arquivos

![Source Structure](https://res.cloudinary.com/fabideia/image/upload/v1661916167/samples/folder_structure_evrp79.png)

- components: onde estão os componentes reutilizáveis dentro do aplicativo;
- lib: pasta para compartilhamento de algumas funções e utilidades como (constantes, funções genéricas, tipos, etc);
- navigation: onde estão as Stacks para funcionamento da navegação do RN;
- screens: onde estão os arquivos de telas do APP;
- store: para armazenamento dos dados do Redux (configuração da store, reducers, actions, execução das apis).

## Screenshots

|                                           Current                                            |                                           Tomorrow                                            |                                           NextDays                                            |
| :------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------: |
| ![](https://res.cloudinary.com/fabideia/image/upload/v1661919716/samples/Current_p3ctz3.png) | ![](https://res.cloudinary.com/fabideia/image/upload/v1661919716/samples/Tomorrow_pet5c9.png) | ![](https://res.cloudinary.com/fabideia/image/upload/v1661919716/samples/NextDays_ckb3mx.png) |

## Autores

- [Anderson Rocha](https://github.com/anderllr)
- [Linkedin](https://www.linkedin.com/in/andersonluizrocha/)
