### Ferramentas usadas no projeto

#### [react-hook-form](https://react-hook-form.com/get-started#Quickstart)

#### [yup](https://react-hook-form.com/get-started#SchemaValidation)

### Problemas encontrados no decorrer da implementação

Ao importar lib react-apexcharts (Para Construção de Gráficos) no ambiente next, enfrentamos um problema ao dar um refresh na página. Segue um exemplo do erro

```
Server Error
ReferenceError: window is not defined

This error happened while generating the page. Any console logs will be displayed in the terminal window.

```

Para resolver isso, precisamos que essa lib seja importada somente no Client-Side. Segue o exemplo do código com a importação incorreta:
```jsx
import Chart from "react-apexcharts";
```
Fazendo essa nova mudança de importação usando o dynamic com ssr=false, fica claro para o next que deve ser importado essa lib somente no client-side. Segue o exemplo abaixo:
```jsx
import dynamic from "next/dynamic";
const Chart = dynamic( () => import("react-apexcharts"), {
    ssr: false
})  
```

### Trabalhando com Controlled components / Uncontrolled components

Controlled components _> Link(https://pt-br.reactjs.org/docs/forms.html#controlled-components)

Uncontrolled components -> Link(https://pt-br.reactjs.org/docs/uncontrolled-components.html)


### Encaminhamento de Ref

Para fazer um reencaminhamento de Ref Link(https://pt-br.reactjs.org/docs/forwarding-refs.html)

### Criando Formularios de forma Uncontrolled
Usamos a biblioteca "react-hook-form" Link(https://react-hook-form.com/get-started)


### Data Fetching e cache Local


Ferramentas -> React Query -> Ele usa uma estratégia de cache chamada stale while revalidate (obsoleto enquanto revalida) e também usa essa estratégia de [Window Focus Refetching](https://react-query.tanstack.com/guides/window-focus-refetching)


Por padrão o React Query deixa as nossas querys fica de forma obsoleta(com status stale) essa forma faz com que ele faça uma nova request para obter os dados já que os dados já estão obsoletos e precisar ser atualizados.

As Querys tem os seguintes status

- Fresh
- Fetching
- Stale
- Inactive

Obs: Usaremos o MirageJs para fazer uma api fake