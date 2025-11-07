# Livraria Horizonte - Protótipo HTML/CSS/JS

Este é um protótipo de baixa fidelidade para a reestruturação da arquitetura de informação do e-commerce de livros "Livraria Horizonte".

Protótipo criado com fins educacionais para apresentação de projeto em cadeira de Interfaces Digitais UX/UI.

## Características do Protótipo

### Tecnologias Utilizadas
- **HTML5** - Estrutura semântica e acessível
- **CSS3** - Estilos responsivos com variáveis CSS e Flexbox/Grid
- **JavaScript Vanilla** - Funcionalidades interativas sem dependências

### Funcionalidades Implementadas

#### 1. Navegação Melhorada
- **Header fixo** com busca centralizada
- **Menu de navegação** com dropdowns para subcategorias
- **Breadcrumbs** para orientação do usuário
- **Navegação por SPA** (Single Page Application) simulada

#### 2. Arquitetura de Informação Reestruturada
- **Categorização hierárquica** clara e intuitiva
- **Sistema de rotulagem** consistente e descritivo
- **Filtros robustos** por categoria, preço e avaliação
- **Ordenação múltipla** (relevância, preço, avaliação, título)

#### 3. Páginas Principais
- **Página Inicial** - Hero section, categorias em destaque, livros recomendados
- **Listagem de Livros** - Grid responsivo com filtros laterais
- **Detalhes do Livro** - Informações completas, ações de compra, livros relacionados

#### 4. Funcionalidades de E-commerce
- **Carrinho de compras** com contador dinâmico
- **Lista de desejos** com persistência visual
- **Sistema de avaliações** com estrelas
- **Notificações** de ações do usuário

#### 5. Design Responsivo
- **Mobile-first** approach
- **Breakpoints** para tablet e desktop
- **Componentes flexíveis** que se adaptam a diferentes telas
- **Navegação otimizada** para touch

### Melhorias Implementadas

#### Problemas da Arquitetura Anterior Resolvidos:
1. **Categorização confusa** → Hierarquia clara e intuitiva
2. **Navegação complexa** → Menu simplificado com dropdowns organizados
3. **Busca ineficiente** → Campo de busca proeminente e funcional
4. **Filtros limitados** → Sistema robusto de filtros e ordenação
5. **Falta de orientação** → Breadcrumbs e feedback visual constante

#### Critérios de UX/UI Aplicados:
1. **Clareza** - Rótulos descritivos, feedback visual, orientação constante
2. **Consistência** - Padrões visuais e comportamentais uniformes
3. **Acessibilidade** - Semântica HTML, ARIA labels, navegação por teclado
4. **Performance** - CSS otimizado, JavaScript eficiente, carregamento rápido

## Como Executar

- Abra o arquivo `index.html` diretamente no navegador

## Estrutura de Arquivos

```
livrariaHorizonte/
├── script/ 
|     └── scripts.js    # Funcionalidades JavaScript
├── styles/ 
|     └── styles.css    # Estilos CSS
├── templates/
|     └── index.html    # Página principal
└── README.md           # Este arquivo
```

## Funcionalidades Demonstradas

### 1. Navegação
- Clique no logo ou "Início" para voltar à página inicial
- Clique em "Todos os Livros" para ver o catálogo completo
- Use os dropdowns do menu para navegar por categorias
- Clique nas categorias da página inicial para filtrar livros

### 2. Busca e Filtros
- Digite no campo de busca (funcionalidade simulada)
- Use os filtros laterais na página de livros
- Experimente diferentes ordenações
- Ajuste a faixa de preço com o slider

### 3. Interações com Produtos
- Clique em um livro para ver os detalhes
- Adicione livros ao carrinho (contador atualiza)
- Adicione/remova da lista de desejos (ícone muda)
- Veja livros relacionados na página de detalhes

### 4. Responsividade
- Redimensione a janela do navegador
- Teste em diferentes dispositivos
- Observe como o layout se adapta

## Dados Simulados

O protótipo utiliza dados simulados em JavaScript para demonstrar as funcionalidades:
- 6 livros de exemplo com diferentes categorias
- 6 categorias principais
- Sistema de avaliações e preços
- Funcionalidades de carrinho e wishlist

## Próximos Passos

Para uma implementação completa, seria necessário:

1. **Backend Integration**
   - API REST para produtos, categorias, usuários
   - Sistema de autenticação
   - Processamento de pagamentos

2. **Banco de Dados**
   - Catálogo de produtos
   - Gestão de usuários
   - Histórico de pedidos

3. **Funcionalidades Avançadas**
   - Busca com autocomplete
   - Recomendações personalizadas
   - Sistema de reviews
   - Gestão de estoque

4. **Otimizações**
   - Lazy loading de imagens
   - Cache de dados
   - SEO otimizado
   - Analytics e tracking

## Considerações Técnicas

### Performance
- CSS otimizado com variáveis para consistência
- JavaScript modular e eficiente
- Imagens substituídas por emojis para prototipagem rápida

### Acessibilidade
- Estrutura HTML semântica
- Labels apropriados para formulários
- Navegação por teclado funcional
- Contraste adequado de cores

### Manutenibilidade
- Código bem documentado
- Separação clara de responsabilidades
- Padrões consistentes de nomenclatura
- Estrutura modular e escalável

