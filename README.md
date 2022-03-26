### Problemas encontrados no decorrer da implementação

Ao Tentarmos importar lib react-apexcharts (Para Construção de Gráficos) no ambiente next, enfrentamos um problema ao dar um refresh na página. Segue um exemplo do erro

```
Server Error
ReferenceError: window is not defined

This error happened while generating the page. Any console logs will be displayed in the terminal window.

```

Para resolver isso precisamos que ele seja importado essa lib somente no Client-Side. Mudamos a seguinte importação abaixo:
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
