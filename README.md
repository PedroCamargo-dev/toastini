# Toastini 🍸

Um componente de toast (notificação) elegante, customizável e leve para React, com suporte a temas e classes CSS.

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
- 🎨 Totalmente customizável via classes CSS (compatível com Tailwind CSS e outras bibliotecas)
- 🌙 Suporte nativo a tema claro e escuro
- 📱 Responsivo e com acessibilidade
- 🦾 Totalmente tipado com TypeScript

## 🚀 Uso Básico

### Exemplo 1: Toast Básico

```tsx
import React from 'react'
import { ToastProvider, ContainerToasts, toast } from 'toastini'
import 'toastini/dist/index.css'

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

### Exemplo 2: Toast com Customização de Classe CSS

```tsx
import React from 'react'
import { ToastProvider, ContainerToasts, toast } from 'toastini'
import 'toastini/dist/index.css'
import './custom-toast.css' 

function App() {
  const showToast = () => {
    toast.success('Operação realizada com sucesso!', {
      className: 'my-custom-toast', 
    })
  }

  return (
    <ToastProvider>
      <button onClick={showToast}>Mostrar Toast</button>
      <ContainerToasts 
        className="custom-toast-container"
        titleClassName="custom-toast-title" 
      />
    </ToastProvider>
  )
}

export default App
```

## 🛠️ API

O componente `ContainerToasts` é o recipiente que mostra todos os toasts ativos.

```tsx
import { ContainerToasts } from 'toastini'
import 'toastini/dist/index.css'

return (
  <ToastProvider>
    <ContainerToasts
      autoClose={5000}
      closeOnClick={true}
      draggable={true}
      newestOnTop={false}
      limit={5}
      margin={16}
      className="custom-toast"
      wrapperClassName="custom-wrapper"
      itemClassName="custom-item"
      iconClassName="custom-icon"
      contentClassName="custom-content"
      titleClassName="custom-title"
      descriptionClassName="custom-description"
      closeButtonClassName="custom-close"
    />
  </ToastProvider>
)
```

### Propriedades do Componente ContainerToasts

| Propriedade  | Tipo           | Padrão    | Descrição                                                     |
| ------------ | -------------- | --------- | ------------------------------------------------------------- |
| autoClose    | number\|boolean | 5000      | Tempo em ms para fechar ou `false` para desativar             |
| closeOnClick | boolean        | true      | Fechar ao clicar no toast                                     |
| draggable    | boolean        | true      | Arrastar para dispensar                                        |
| newestOnTop  | boolean        | false     | Adicionar novos toasts no topo                                |
| limit        | number         | undefined | Limite de toasts exibidos                                     |
| margin       | number         | 16        | Margem entre os toasts                                        |

### Classes CSS Personalizáveis

| Propriedade           | Descrição                                  |
| --------------------- | ------------------------------------------ |
| className             | Classe para o container principal do toast |
| iconClassName         | Classe para o ícone                        |
| contentClassName      | Classe para o container de conteúdo        |
| titleClassName        | Classe para o título                       |
| descriptionClassName  | Classe para a descrição                    |
| closeButtonClassName  | Classe para o botão de fechar              |
| wrapperClassName      | Classe para o wrapper externo              |
| itemClassName         | Classe para o item individual do toast     |

## 📢 Funções de Toast

```js
// Toast básico
toast.show({
  title: 'Título',
  description: 'Descrição detalhada',
  type: 'success',
  position: 'top-right',
  autoClose: 3000,
  className: 'custom-toast',
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
  titleClassName: 'font-bold',
  descriptionClassName: 'text-sm',
})

// Remover toasts
toast.remove(id)
toast.removeAll()
```

## 🎨 Customização com CSS

### Usando com Tailwind CSS

Toastini funciona perfeitamente com Tailwind CSS:

```tsx
<ContainerToasts
  className="bg-white dark:bg-gray-800 shadow-lg"
  iconClassName="text-blue-500"
  titleClassName="text-lg font-bold"
  descriptionClassName="text-gray-600 dark:text-gray-300"
  closeButtonClassName="hover:bg-gray-200 dark:hover:bg-gray-700"
/>
```

### Criando seu Próprio Toast

Você pode usar o componente BaseToast para criar seus próprios componentes de toast personalizados:

```tsx
import { BaseToast } from 'toastini'

function MyCustomToast() {
  return (
    <BaseToast
      title="Título personalizado"
      description="Minha descrição"
      icon={<MyIcon />}
      className="my-custom-toast"
      onClose={() => console.log('Fechado')}
    />
  )
}
```

### Variáveis CSS

Toastini usa variáveis CSS que você pode sobrescrever para personalizar facilmente os toasts:

```css
:root {
  /* Tema claro (valores de exemplo) */
  --toast-success-bg: #f0fff4;
  --toast-success-border: #c6f6d5;
  --toast-success-text: #276749;
  
  /* Outras variáveis: error, info, warning, default... */
}

[data-theme="dark"] {
  /* Tema escuro (valores de exemplo) */
  --toast-success-bg: rgba(39, 103, 73, 0.3);
  --toast-success-border: #276749;
  --toast-success-text: #c6f6d5;
  
  /* Outras variáveis para o tema escuro... */
}
```

## 📝 Licença

[MIT](LICENSE)

## 👤 Autor

Pedro Camargo ([@PedroCamargo-dev](https://github.com/PedroCamargo-dev))