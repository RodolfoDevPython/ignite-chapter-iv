### Problemas encontrados no decorrer da implementação

Ao importar lib react-apexcharts (Para Construção de Gráficos) no ambiente next, enfrentamos um problema ao dar um refresh na página. Segue um exemplo do erro

```
Server Error
ReferenceError: window is not defined

This error happened while generating the page. Any console logs will be displayed in the terminal window.

```

Para resolver isso, precisamos que essa lib importada somente no Client-Side. Segue o exemplo do código com a importação incorreta:
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
