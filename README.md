# Toastini

Um componente de toast (notificação) elegante, customizável e fácil de usar para React.

## 📦 Instalação

```bash
# npm
npm install toastini

# yarn
yarn add toastini

# pnpm
pnpm add toastini
```

## ✨ Recursos

- 🌈 Múltiplos tipos de toast: success, error, info, warning, default
- 🧩 Posicionamento flexível: top-left, top-center, top-right, bottom-left, bottom-center, bottom-right
- 🔄 Arrastar para dispensar (draggable)
- ⏱️ Fechamento automático configurável
- 🎨 Totalmente customizável via styled-components
- 🌙 Suporte a tema claro e escuro
- 📱 Responsivo
- 🦾 Totalmente tipado com TypeScript

## 🚀 Uso Básico

### Exemplo 1: Toast Básico

```tsx
import React from 'react'
import { ToastProvider, ContainerToasts, toast } from 'toastini'

function App() {
  const showToast = () => {
    toast.success('Operação realizada com sucesso!')
  }

  return (
    <ToastProvider>
      <button onClick={showToast}>Mostrar Toast</button>
      <ContainerToasts />
    </ToastProvider>
  )
}

export default App
```

### Exemplo 2: Toast Simples com Customização de Tema

```tsx
import React from 'react'
import { ToastProvider, ContainerToasts, toast, IThemeToast } from 'toastini'

function App() {
  const myCustomTheme: IThemeToast = {
    colors: {
      success: {
        background: '#e0ffe0',
        border: '#00ff00',
        text: '#006600',
      },
    },
  }

  const showToast = () => {
    toast.success('Operação realizada com sucesso!')
  }

  return (
    <ToastProvider customTheme={myCustomTheme}>
      <button onClick={showToast}>Mostrar Toast</button>
      <ContainerToasts />
    </ToastProvider>
  )
}

export default App
```

## 🛠️ API

O componente `ContainerToasts` é o recipiente que mostra todos os toasts ativos.

```tsx
import { ContainerToasts } from 'toastini'

return (
  <ToastProvider>
    <ContainerToasts
      autoClose={5000}
      closeOnClick={true}
      draggable={true}
      newestOnTop={false}
      limit={5}
      margin={16}
    />
  </ToastProvider>
)
```

## Propriedades

| Propriedade  | Tipo           | Padrão    | Descrição                                                         |
| ------------ | -------------- | --------- | ----------------------------------------------------------------- |
| autoClose    | number-boolean | 5000      | Tempo em ms para fechar automaticamente ou `false` para desativar |
| closeOnClick | boolean        | true      | Fechar ao clicar no toast                                         |
| draggable    | boolean        | true      | Arrastar para dispensar                                           |
| newestOnTop  | boolean        | false     | Adicionar novos toasts no topo                                    |
| limit        | number         | undefined | Limite de toasts exibidos                                         |
| margin       | number         | 16        | Margem entre os toasts                                            |

## Funções de Toast

```js
// Toast básico
toast.show({
  title: 'Título',
  description: 'Descrição detalhada',
  type: 'success',
  position: 'top-right',
  autoClose: 3000,
})

// Helpers para tipos específicos
toast.success('Operação realizada com sucesso!')
toast.error('Ocorreu um erro!')
toast.info('Informação')
toast.warning('Atenção')
toast.default('Mensagem padrão')

// Com opções adicionais
toast.success('Título', {
  description: 'Descrição detalhada',
  position: 'bottom-center',
  autoClose: false,
})

// Remover toasts
toast.remove(id)
toast.removeAll()
```

## 🎨 Customização

### Estilos Personalizados

Você pode customizar cada parte do toast:

```tsx
<ContainerToasts
  toastContainerWrapperStyle={{ padding: '20px' }}
  iconWrapperStyle={{ marginRight: '12px' }}
  contentWrapperStyle={{ fontFamily: 'Arial' }}
  titleContentStyle={{ fontSize: '18px' }}
  descriptionContentStyle={{ opacity: '0.8' }}
  closeButtonStyle={{ background: 'transparent' }}
  toastWrapperStyle={{ maxWidth: '400px' }}
  toastItemWrapperStyle={{ marginBottom: '10px' }}
/>
```

📝 Licença

[MIT](LICENSE)

👤 Autor
Pedro Camargo ([@PedroCamargo-dev](https://github.com/PedroCamargo-dev))
