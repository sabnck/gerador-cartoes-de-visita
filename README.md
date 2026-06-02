# Studio Elevatio: Business Card Generator

> A study in building a real visual tool guided by rules, where a cheap or free AI is just one of the engines and the actual intelligence lives in a layer of constraints.

**Languages:** [English](#english) · [Português (pt-BR)](#português-pt-br)

Live demo: https://studioelevatio.com/cartoesvisita/
Repository: https://github.com/sabnck/gerador-cartoes-de-visita

---

## English

### What this is

This repository is a clean, static version of a business card generator built by Studio Elevatio.

The point of the project is not to hand you a finished file. The point is to show how a real visual tool can be built with simple technology, free hosting and no backend in the first stage, while still feeling and behaving like serious software.

There is one idea that is easy to miss when you only look at the screen. This is not "HTML that an AI spat out". It is a study in building a rules-driven visual tool. The part that looks like magic does not come from an expensive model choosing the design. It comes from a layer of constraints that surrounds the generation: slots, mandatory components, zones, layers, per-layout contracts and validation after rendering. When the AI is involved, it is only one of the engines, and it can be a cheap or free model. The real intelligence is in the rules, not in the model.

### Why it was created

Most people assume that to build an online tool you need a backend, a database, authentication, an admin panel, a paid hosting plan, an expensive API and a paid AI subscription from day one.

Many tools can start as a static application instead. A static application is essentially three files: `index.html` for structure, `app.css` for the look and `app.js` for the logic. You can publish that on GitHub Pages, Cloudflare Pages, Netlify or Vercel without paying for hosting at the start. The cost can be literally zero, except for a domain if you want a custom one.

This project was created to prove that point, and to document a method that scales to many other tools (proposals, menus, résumés, flyers, quotes and more).

### The core idea: a rules system, not a random generator

This is the most important part of the project, and it is what separates a serious tool from a toy.

When someone asks an AI to "make a nice business card", the result tends to fail in predictable ways. The AI stacks elements. It treats every field as optional. It decides on its own to use the logo, the name and a couple of contacts and to drop the rest. It crowds text, lets things overflow the print area, and overlaps a decorative circle on top of a phone number. The result looks generic because it had no direction, not because the AI is stupid.

The real problem is that an AI, on its own, does not naturally understand reading flow, proportion, hierarchy, breathing room and the difference between a clean composition and a cluttered one. A good designer applies this by intuition. An AI needs to receive it as an explicit rule. And the weaker or cheaper the model is, the stronger the rules layer has to be to compensate.

So the logic of this project inverts the question.

The naive approach makes the AI think:

```text
Which nice components do I pick to assemble?
```

The correct approach makes the system think:

```text
I have all of these fields already filled in. Where does each one go,
on which side, in which zone, on which layer, without colliding,
without overflowing and without becoming unreadable?
```

The difference between the two is the difference between a component shuffler and an art director with a contract.

#### 1. Filled fields are mandatory

This is the rule that is not up for negotiation. If the user filled in the business name, person, role, slogan, description, services, phone, email, website, location and socials, all of it has to appear somewhere on the card. The generation cannot choose "I will not use this one". It can choose where to place it, on which side and with what weight, but it cannot make a field disappear.

#### 2. Front and back have clear roles

The front is identity. The back is depth.

```text
Front: logo, brand, name, role, slogan and 1 to 3 primary contacts.
Back: description, services, full contacts, location, socials and QR.
```

This keeps the front breathing and makes sure no field is left orphaned.

#### 3. Position is not free, it is by zones

The generation does not place elements "wherever it looks nice". It chooses between defined zones:

```text
top left
top right
visual center
bottom block
side rail
contact column
footer
highlight area
decorative area
```

Thinking in zones avoids clutter and keeps alignment predictable.

#### 4. Layers with priority

Every element lives on a layer, and upper layers never run over what matters below:

```text
layer 0: background
layer 1: texture, image or gradient
layer 2: decorative shapes
layer 3: logo and brand
layer 4: main text
layer 5: contacts, chips and QR
layer 6: contrast overlays
```

Practical rule: a decorative element can never sit on top of text.

#### 5. Each layout has a contract

A layout is not just a visual arrangement. It is a set of rules about what it requires and how it adapts. Example of a contract:

```text
Layout "Contact first"
  front requires: logo, brand, name, role, slogan
  back requires: phone, email, website, socials, location, services
  if the email is too long, break it after the @
  if contacts exceed N lines, use a double column or reduce the font
  never overlap the decorative circle with text
```

#### 6. Validation after generation

Rendering is not enough. After assembling, the system needs to check the result, the same way an art director reviews before delivery:

```text
did every filled field show up?
did any text leave the card area?
did any font get too small?
is the contrast within the readable minimum?
did the email break at a correct point?
are front and back balanced?
is the logo still legible?
```

If any of these checks fail, the generation redoes it or falls back to a safe layout. That step is what prevents shipping a broken card, and it is exactly what a loose AI does not do on its own.

#### Why this matters for free AI

The goal of the project is to show that you can build serious tools using free or local AI, such as LLaMA or other simpler open models running on your own machine. The AI does not need to do everything, and it does not need to be expensive. It needs to be well guided. The weaker the model, the more the rules and validation layer has to carry the work. Slots, mandatory components, text limits, layers and fallback act as skills that compensate for the model's limitations.

The same logic does not only apply to cards. It can power carousel generators, proposals, PDFs, creatives and commercial documents. The business card here is just the simplest example to demonstrate.

### What the tool does

The tool runs entirely in the browser. The user can:

- edit the card data in real time;
- switch between many layouts;
- upload a logo;
- upload a background image;
- upload an image into a side rail on some layouts;
- change the palette colors;
- generate new design variations locally;
- flip front and back;
- export a high resolution PDF;
- keep the data saved in the browser with `localStorage`.

All of this happens with no database, no login, no server of its own and no mandatory payment.

### What costs money and what can be free

Can be free: HTML, CSS and JavaScript code; GitHub as a repository; GitHub Pages or Cloudflare Pages for hosting; libraries via CDN; local storage with `localStorage`; a free AI to help plan texts, layouts and structure.

Can cost money: a custom domain; a professional email; checkout and payments; a database; serverless functions at high volume; paid external APIs; paid AI models; a CDN or hosting with very high traffic.

In this repository, checkout, Stripe, backend and private functions were removed. The version here is meant for study, GitHub Pages and adaptation.

### Project architecture

The main files are:

```text
index.html
app.css
app.js
README.md
```

`index.html` holds the page structure (top bar, side editor panel, layout buttons, card preview area, helper modals) and loads Google Fonts, `html-to-image`, `jsPDF`, `app.css` and `app.js`.

`app.css` holds the design: desktop layout, side HUD, the horizontal card, the template styles, colors via CSS variables, and the buttons, sliders, inputs and swatches. A lot of the visual magic comes from variables like `--accent`, `--surface`, `--paper`, `--text-dark`, `--text-light`, `--chip` and `--panel`, so the JavaScript swaps the palette and the CSS repaints the card.

`app.js` holds the logic: the initial state, reading the fields, rendering the layouts, image uploads, palette swapping, the local generation engine, PDF export and saving with `localStorage`.

### How it works inside

The main flow is:

1. the user edits a field in the side panel;
2. the JavaScript updates the `state` object;
3. the state is saved in `localStorage`;
4. `renderApp()` repaints the preview;
5. the active layout uses the current data;
6. the colors become CSS variables;
7. on download, `html-to-image` turns the card into an image;
8. `jsPDF` places that image into a PDF at the correct size.

This pattern works for many tools, not just business cards.

### How to build a similar tool from scratch

1. **Pick a small problem.** Start with a tool that generates something visual or useful (a business card, a proposal, a flyer, a résumé, a social card, a menu, a quote). Prove the tool helps someone before building a giant system.

2. **Define the data first.** Before the layout, list the fields. For a card it might be `businessName`, `personName`, `role`, `phone`, `email`, `website`, `location`. For a proposal it would be `clientName`, `projectName`, `objective`, `price`, `deadline`.

3. **Build the interface in HTML** with simple fields, using a `data-field` attribute to tie each input to the state:

```html
<input data-field="businessName" />
<input data-field="email" />
```

4. **Wire the fields to the state:**

```js
document.querySelectorAll("[data-field]").forEach((input) => {
  input.addEventListener("input", () => {
    state[input.dataset.field] = input.value;
    saveState();
    renderApp();
  });
});
```

5. **Make layouts into functions**, so each layout is a render function and you keep them in a list:

```js
const LAYOUTS = [
  { name: "Minimal", render: renderMinimalCard },
  { name: "Editorial", render: renderEditorialCard }
];
```

6. **Let CSS do the heavy lifting**, driving the look through variables you change from JavaScript:

```js
card.style.setProperty("--paper", state.paperColor);
card.style.setProperty("--surface", state.surfaceColor);
```

7. **Save locally** with `localStorage`, so the first version needs no database.

8. **Export with free libraries** (`html-to-image` to turn HTML into an image, `jsPDF` to generate the PDF).

9. **Publish for free** on GitHub Pages or Cloudflare Pages, with no build step if it is plain HTML.

### Exporting a print-ready PDF without black, empty or cut files

This is the step that breaks most often, and it is worth its own section. Turning a styled DOM element into an image and then into a PDF looks simple, but if you do it naively the file comes out black, transparent, empty or cropped. We hit all of these early on. The fixes were quick once we understood the causes, but you have to know they exist.

What actually goes wrong:

- **Rendering too early.** If you rasterize before the web fonts and the logo image have finished loading, the text falls back or disappears and the logo is missing. Always wait for `document.fonts.ready` and for every image `onload` before capturing.
- **The card is flipped with a 3D transform.** Our card uses a CSS flip for front and back. A rasterizer can capture the back face mirrored, blank or black because of the `transform: rotateY` and `backface-visibility`. The fix is to export from a flat clone of the face you want, with the transform removed, placed off screen, not from the live flipped element.
- **Cross origin images taint the canvas.** If the logo or background comes from another domain without CORS, the browser refuses to read the canvas and you get an empty or black result. Use same origin assets, or data URLs, or set `crossorigin` correctly.
- **Low resolution for print.** A 1x capture looks fine on screen and blurry on paper. Capture at a high scale (we use a render scale around 4 to 6) so the 85 by 55 mm card is sharp at print resolution.
- **Browser differences.** Chrome and Safari do not behave the same. Safari often returns a blank or partial image on the very first capture because it has not warmed up the layout, so a short delay or a throwaway first render before the real one solves it. Chrome is more forgiving but still needs the fonts ready promise. Test the export in both, not just the one you develop in.

A safe export sequence looks like this:

```js
async function exportCard(faceElement) {
  await document.fonts.ready;            // fonts are loaded
  await waitForImages(faceElement);      // every <img> has loaded
  const flat = faceElement.cloneNode(true);
  flat.style.transform = "none";         // remove the flip
  flat.style.position = "fixed";
  flat.style.left = "-10000px";          // off screen, still laid out
  document.body.appendChild(flat);
  const dataUrl = await htmlToImage.toPng(flat, { pixelRatio: 6 });
  flat.remove();
  const pdf = new jspdf.jsPDF({ orientation: "landscape", unit: "mm", format: [85, 55] });
  pdf.addImage(dataUrl, "PNG", 0, 0, 85, 55);
  pdf.save("cartao.pdf");
}
```

The rule of thumb: never capture the live, animated, flipped element, and never capture before fonts and images are ready. Always verify the exported file by opening it, not just by trusting that the function ran.

### Where AI fits without becoming a mandatory cost

You can use a free AI to help with planning: organizing the required fields, suggesting layout names, writing initial copy, reviewing the README, generating template ideas and improving contrast and hierarchy. But the tool does not need to call an AI in production.

In this project, the generation of variations is local: it uses rules in JavaScript to compose new layouts while respecting the system above. The "Generate design" and "Redo design" buttons each produce a new composition by choosing safe structural skeletons for the front and the back, distributing every filled field between them and shuffling a coordinated palette, so every click is a genuinely new layout and never a broken one. Mandatory fields stay mandatory, zones and layers are respected, and the result goes through validation. This avoids per click cost, avoids depending on a paid API and, above all, guarantees the output does not come out broken.

When the AI is involved, it does not receive a vague request. It receives a contract. Instead of "make a nice card", the prompt states which components exist, which are mandatory, where each block lives, which themes are allowed and what it must not do. The AI chooses a creative direction within those limits, and the system validates what comes back.

### Other tools you can build with this method

- **Commercial proposals**: fields for client, service, scope, deadline and price, exporting a proposal PDF.
- **Restaurant menus**: fields for categories, dishes, prices and a QR code, exporting a menu PDF and an image for messaging.
- **Résumés**: fields for name, role, experience, education and contacts, exporting a résumé PDF.
- **Local flyers**: fields for campaign title, offer, phone, image and validity, exporting a flyer to print.
- **Quotes**: fields for client, items, quantities and totals, exporting a quote PDF.

### How to evolve later

The static version is enough to validate the idea. When it makes sense, you can add a custom domain, a contact form, a login area, a database, payments, an admin panel, email integration, an AI via API and a project history. But that comes later. First the tool has to prove its value.

### Cautions

- Do not put private keys in the JavaScript.
- Do not put secrets in a public GitHub repository.
- If you use Stripe, use a backend or a serverless function.
- If you need to store user data, use a database and a privacy policy.
- If it is preview and local export only, `localStorage` can be enough.

### Running locally

Since it is a static project, you can open `index.html` directly in the browser. If you prefer a local server:

```bash
npx serve .
```

or:

```bash
python -m http.server 8080
```

### Summary

This tool shows that you can build something useful with HTML, CSS, JavaScript, free CDN libraries, AI as a planning aid, free hosting, no backend at the start and no per user cost in the first prototype.

But what makes the tool feel professional is not the stack. It is the rules layer. Mandatory fields, zones, layers, per-layout contracts and validation after generation are what turn a simple AI into a consistent result. The technology can be free and the model can be cheap. The quality comes from the constraints architecture, not from the luck of the model.

---

## Português (pt-BR)

### O que é isto

Este repositório é uma versão limpa e estática de um gerador de cartões de visita criado pela Studio Elevatio.

O objetivo do projeto não é entregar um arquivo pronto. O objetivo é mostrar como uma ferramenta visual de verdade pode ser construída com tecnologia simples, hospedagem gratuita e sem backend na primeira fase, e ainda assim parecer e funcionar como um software sério.

Existe uma ideia que é fácil de não perceber quando você só olha para a tela. Isto não é "um HTML que a IA cuspiu". É um estudo de construção de uma ferramenta visual guiada por regras. A parte que parece mágica não vem de um modelo caro escolhendo o design. Vem de uma camada de regras que envolve a geração: slots, componentes obrigatórios, zonas, camadas, contratos por layout e validação depois de renderizar. Quando a IA entra, ela é apenas um dos motores, e pode ser um modelo barato ou gratuito. A inteligência de verdade está nas regras, não no modelo.

### Por que foi criado

A maioria das pessoas acha que, para criar uma ferramenta online, precisa começar com backend, banco de dados, autenticação, painel administrativo, plano pago de hospedagem, API cara e assinatura de IA logo no primeiro dia.

Muitas ferramentas podem começar como aplicações estáticas. Uma aplicação estática é basicamente três arquivos: `index.html` para a estrutura, `app.css` para o visual e `app.js` para a lógica. Você pode publicar isso no GitHub Pages, Cloudflare Pages, Netlify ou Vercel sem pagar hospedagem no início. O custo pode ser literalmente zero, tirando o domínio, caso queira um próprio.

Este projeto foi criado para provar esse ponto e para documentar um método que serve para muitas outras ferramentas (propostas, cardápios, currículos, panfletos, orçamentos e mais).

### A ideia central: um sistema de regras, não um gerador aleatório

Esta é a parte mais importante do projeto, e é o que separa uma ferramenta séria de um brinquedo.

Quando alguém pede para uma IA "fazer um cartão de visita bonito", o resultado costuma falhar de formas previsíveis. A IA empilha elementos. Ela trata cada campo como opcional. Ela decide sozinha usar o logo, o nome e uns contatos e deixar o resto de fora. Ela amontoa texto, deixa coisas vazando para fora da área de impressão e encavala um círculo decorativo em cima de um telefone. O resultado parece genérico porque não teve direção, não porque a IA seja burra.

O problema real é que uma IA, sozinha, não entende naturalmente fluxo do olhar, proporção, hierarquia, respiro e a diferença entre uma composição limpa e uma poluída. Um bom designer aplica isso por intuição. Uma IA precisa receber isso como regra explícita. E quanto mais fraco ou mais barato o modelo, mais forte a camada de regras precisa ser para compensar.

Por isso a lógica deste projeto inverte a pergunta.

A abordagem ingênua faz a IA pensar:

```text
Quais componentes bonitos eu escolho para montar?
```

A abordagem correta faz o sistema pensar:

```text
Eu tenho todos estes campos já preenchidos. Onde cada um vai,
em que lado, em que zona, em que camada, sem colidir,
sem vazar e sem ficar ilegível?
```

A diferença entre as duas é a diferença entre um embaralhador de componentes e um diretor de arte com contrato.

#### 1. Campos preenchidos são obrigatórios

Esta é a regra que não se negocia. Se o usuário preencheu nome do negócio, pessoa, cargo, slogan, descrição, serviços, telefone, email, site, localização e redes, tudo isso precisa aparecer em algum lugar do cartão. A geração não pode escolher "este eu não uso". Ela pode escolher onde colocar, em que lado e com que peso, mas não pode fazer um campo desaparecer.

#### 2. Frente e verso têm papéis claros

A frente é identidade. O verso é profundidade.

```text
Frente: logo, marca, nome, cargo, slogan e de 1 a 3 contatos principais.
Verso: descrição, serviços, contatos completos, localização, redes e QR.
```

Isso mantém a frente respirando e garante que nenhum campo fique órfão.

#### 3. A posição não é livre, é por zonas

A geração não posiciona elementos "onde fica bonito". Ela escolhe entre zonas definidas:

```text
topo esquerdo
topo direito
centro visual
bloco inferior
faixa lateral
coluna de contatos
rodapé
área de destaque
área decorativa
```

Pensar em zonas evita o amontoado e mantém o alinhamento previsível.

#### 4. Camadas com prioridade

Cada elemento vive em uma camada, e as camadas de cima nunca atropelam o que importa embaixo:

```text
camada 0: fundo
camada 1: textura, imagem ou gradiente
camada 2: formas decorativas
camada 3: logo e marca
camada 4: texto principal
camada 5: contatos, chips e QR
camada 6: overlays de contraste
```

Regra prática: um elemento decorativo nunca pode ficar por cima de um texto.

#### 5. Cada layout tem um contrato

Um layout não é só um arranjo visual. É um conjunto de regras do que ele exige e de como ele se adapta. Exemplo de contrato:

```text
Layout "Contato primeiro"
  frente exige: logo, marca, nome, cargo, slogan
  verso exige: telefone, email, site, redes, localização, serviços
  se o email for muito longo, quebra depois do @
  se os contatos passarem de N linhas, usa coluna dupla ou reduz a fonte
  nunca sobrepõe o círculo decorativo ao texto
```

#### 6. Validação depois de gerar

Gerar não basta. Depois de montar, o sistema precisa conferir o resultado, da mesma forma que um diretor de arte revisa antes de entregar:

```text
todos os campos preenchidos apareceram?
algum texto saiu da área do cartão?
alguma fonte ficou pequena demais?
o contraste está dentro do mínimo legível?
o email quebrou em um ponto correto?
frente e verso estão equilibrados?
o logo continua legível?
```

Se algum desses checks falha, a geração refaz ou cai em um layout seguro de fallback. Esse passo é o que evita entregar um cartão quebrado, e é exatamente o que uma IA solta não faz sozinha.

#### Por que isto importa para quem usa IA gratuita

O intuito do projeto é mostrar que dá para construir ferramentas sérias usando IA gratuita ou local, como a LLaMA ou outros modelos abertos mais simples rodando na sua própria máquina. A IA não precisa fazer tudo, e não precisa ser cara. Ela precisa ser bem guiada. Quanto mais fraco o modelo, mais a camada de regras e de validação precisa carregar o trabalho. Slots, componentes obrigatórios, limites de texto, camadas e fallback funcionam como skills que compensam as limitações do modelo.

A mesma lógica não serve só para cartões. Ela pode mover geradores de carrosséis, propostas, PDFs, criativos e documentos comerciais. O cartão de visita aqui é apenas o exemplo mais simples de demonstrar.

### O que a ferramenta faz

A ferramenta roda inteira no navegador. O usuário consegue:

- editar os dados do cartão em tempo real;
- alternar entre vários layouts;
- carregar um logo;
- carregar uma imagem de fundo;
- carregar uma imagem em uma faixa lateral de alguns layouts;
- mudar as cores da paleta;
- gerar variações de design localmente;
- virar frente e verso;
- exportar um PDF em alta resolução;
- manter os dados salvos no navegador com `localStorage`.

Tudo isso acontece sem banco de dados, sem login, sem servidor próprio e sem pagamento obrigatório.

### O que custa dinheiro e o que pode ser grátis

Pode ser grátis: código HTML, CSS e JavaScript; o GitHub como repositório; GitHub Pages ou Cloudflare Pages para hospedar; bibliotecas via CDN; armazenamento local com `localStorage`; uma IA gratuita para ajudar a planejar textos, layouts e estrutura.

Pode custar dinheiro: domínio próprio; email profissional; checkout e pagamentos; banco de dados; funções serverless em alto volume; APIs externas pagas; modelos de IA pagos; CDN ou hospedagem com tráfego muito alto.

Neste repositório, removemos checkout, Stripe, backend e funções privadas. A versão aqui é própria para estudo, GitHub Pages e adaptação.

### Arquitetura do projeto

Os arquivos principais são:

```text
index.html
app.css
app.js
README.md
```

O `index.html` contém a estrutura da página (barra superior, painel lateral de edição, botões de layout, área de prévia do cartão, modais auxiliares) e carrega Google Fonts, `html-to-image`, `jsPDF`, `app.css` e `app.js`.

O `app.css` contém o design: layout desktop, HUD lateral, o cartão na horizontal, os estilos dos templates, as cores via variáveis CSS, e os botões, sliders, inputs e swatches. Boa parte da mágica visual vem de variáveis como `--accent`, `--surface`, `--paper`, `--text-dark`, `--text-light`, `--chip` e `--panel`, então o JavaScript troca a paleta e o CSS redesenha o cartão.

O `app.js` contém a lógica: o estado inicial, a leitura dos campos, a renderização dos layouts, o upload de imagens, a troca de paleta, o motor de geração local, a exportação em PDF e o salvamento com `localStorage`.

### Como funciona por dentro

O fluxo principal é:

1. o usuário edita um campo no painel lateral;
2. o JavaScript atualiza o objeto `state`;
3. o estado é salvo no `localStorage`;
4. o `renderApp()` redesenha a prévia;
5. o layout ativo usa os dados atuais;
6. as cores viram variáveis CSS;
7. ao baixar, o `html-to-image` transforma o cartão em imagem;
8. o `jsPDF` coloca essa imagem em um PDF no tamanho correto.

Esse padrão serve para várias ferramentas, não só cartões de visita.

### Como construir uma ferramenta parecida do zero

1. **Escolha um problema pequeno.** Comece com uma ferramenta que gera algo visual ou útil (um cartão, uma proposta, um panfleto, um currículo, um card para redes, um cardápio, um orçamento). Prove que a ferramenta ajuda alguém antes de construir um sistema gigante.

2. **Defina os dados primeiro.** Antes do layout, liste os campos. Para um cartão, pode ser `businessName`, `personName`, `role`, `phone`, `email`, `website`, `location`. Para uma proposta, seria `clientName`, `projectName`, `objective`, `price`, `deadline`.

3. **Crie a interface em HTML** com campos simples, usando um atributo `data-field` para ligar cada input ao estado:

```html
<input data-field="businessName" />
<input data-field="email" />
```

4. **Ligue os campos ao estado:**

```js
document.querySelectorAll("[data-field]").forEach((input) => {
  input.addEventListener("input", () => {
    state[input.dataset.field] = input.value;
    saveState();
    renderApp();
  });
});
```

5. **Faça os layouts como funções**, de modo que cada layout seja uma função de render e você guarde todos em uma lista:

```js
const LAYOUTS = [
  { name: "Minimal", render: renderMinimalCard },
  { name: "Editorial", render: renderEditorialCard }
];
```

6. **Deixe o CSS fazer o trabalho pesado**, controlando o visual por variáveis que você muda pelo JavaScript:

```js
card.style.setProperty("--paper", state.paperColor);
card.style.setProperty("--surface", state.surfaceColor);
```

7. **Salve localmente** com `localStorage`, para que a primeira versão não precise de banco de dados.

8. **Exporte com bibliotecas gratuitas** (`html-to-image` para transformar HTML em imagem, `jsPDF` para gerar o PDF).

9. **Publique de graça** no GitHub Pages ou Cloudflare Pages, sem passo de build se for HTML puro.

### Exportar um PDF pronto para impressão sem ficheiro preto, vazio ou cortado

Este é o passo que mais quebra, e merece a sua própria seção. Transformar um elemento estilizado do DOM em imagem e depois em PDF parece simples, mas se você fizer de forma ingênua o ficheiro sai preto, transparente, vazio ou cortado. Nós enfrentamos todos esses casos no início. As correções foram rápidas depois que entendemos as causas, mas você precisa saber que elas existem.

O que de fato dá errado:

- **Renderizar cedo demais.** Se você rasteriza antes de as fontes web e a imagem do logo terminarem de carregar, o texto cai no fallback ou some e o logo fica de fora. Sempre espere o `document.fonts.ready` e o `onload` de cada imagem antes de capturar.
- **O cartão está virado com transform 3D.** O nosso cartão usa um flip em CSS para frente e verso. O rasterizador pode capturar o verso espelhado, em branco ou preto por causa do `transform: rotateY` e do `backface-visibility`. A solução é exportar a partir de um clone plano da face que você quer, com o transform removido, posicionado fora da tela, e não a partir do elemento virado ao vivo.
- **Imagens de outra origem contaminam o canvas.** Se o logo ou o fundo vem de outro domínio sem CORS, o navegador recusa ler o canvas e você recebe um resultado vazio ou preto. Use assets da mesma origem, ou data URLs, ou configure o `crossorigin` corretamente.
- **Baixa resolução para impressão.** Uma captura em 1x parece boa na tela e borrada no papel. Capture em uma escala alta (usamos uma escala de render entre 4 e 6) para que o cartão de 85 por 55 mm fique nítido na resolução de impressão.
- **Diferenças entre navegadores.** Chrome e Safari não se comportam igual. O Safari muitas vezes devolve uma imagem em branco ou parcial na primeira captura porque ainda não aqueceu o layout, então um pequeno atraso ou um primeiro render descartável antes do real resolve. O Chrome é mais tolerante, mas ainda precisa da promessa de fontes prontas. Teste a exportação nos dois, não só naquele em que você desenvolve.

Uma sequência de exportação segura fica assim:

```js
async function exportCard(faceElement) {
  await document.fonts.ready;            // fontes carregadas
  await waitForImages(faceElement);      // cada <img> carregou
  const flat = faceElement.cloneNode(true);
  flat.style.transform = "none";         // remove o flip
  flat.style.position = "fixed";
  flat.style.left = "-10000px";          // fora da tela, ainda com layout
  document.body.appendChild(flat);
  const dataUrl = await htmlToImage.toPng(flat, { pixelRatio: 6 });
  flat.remove();
  const pdf = new jspdf.jsPDF({ orientation: "landscape", unit: "mm", format: [85, 55] });
  pdf.addImage(dataUrl, "PNG", 0, 0, 85, 55);
  pdf.save("cartao.pdf");
}
```

A regra de ouro: nunca capture o elemento vivo, animado e virado, e nunca capture antes de as fontes e as imagens estarem prontas. Sempre confira o ficheiro exportado abrindo ele, não confie apenas em que a função rodou.

### Onde a IA entra sem virar custo obrigatório

Você pode usar uma IA gratuita para ajudar no planejamento: organizar os campos necessários, sugerir nomes de layouts, escrever textos iniciais, revisar o README, gerar ideias de templates e melhorar contraste e hierarquia. Mas a ferramenta não precisa chamar IA em produção.

Neste projeto, a geração de variações é local: ela usa regras em JavaScript para compor layouts novos respeitando o sistema descrito acima. Os botões "Gerar design" e "Refazer design" produzem, cada um, uma composição nova escolhendo esqueletos estruturais seguros para a frente e o verso, distribuindo todos os campos preenchidos entre eles e sorteando uma paleta coordenada, então cada clique é um layout realmente novo e nunca um quebrado. Os campos obrigatórios continuam obrigatórios, as zonas e camadas são respeitadas, e o resultado passa por validação. Isso evita custo por clique, evita depender de API paga e, principalmente, garante que o resultado não saia quebrado.

Quando a IA entra, ela não recebe um pedido vago. Ela recebe um contrato. Em vez de "monte um cartão bonito", o prompt diz quais componentes existem, quais são obrigatórios, em que lado cada bloco vive, quais temas são permitidos e o que ela não pode fazer. A IA escolhe uma direção criativa dentro desses limites, e o sistema valida o que voltou.

### Outras ferramentas que dá para construir com este método

- **Propostas comerciais**: campos de cliente, serviço, escopo, prazo e preço, exportando um PDF de proposta.
- **Cardápios de restaurante**: campos de categorias, pratos, preços e QR code, exportando um PDF de cardápio e uma imagem para WhatsApp.
- **Currículos**: campos de nome, cargo, experiência, formação e contatos, exportando um PDF de currículo.
- **Panfletos locais**: campos de título da campanha, oferta, telefone, imagem e validade, exportando um panfleto para imprimir.
- **Orçamentos**: campos de cliente, itens, quantidades e totais, exportando um PDF de orçamento.

### Como evoluir depois

A versão estática já basta para validar a ideia. Quando fizer sentido, você pode adicionar domínio próprio, formulário de contato, área de login, banco de dados, pagamentos, painel administrativo, integração com email, IA via API e histórico de projetos. Mas isso vem depois. Primeiro a ferramenta precisa provar o valor dela.

### Cuidados

- Não coloque chaves privadas no JavaScript.
- Não coloque segredos em um repositório público do GitHub.
- Se usar Stripe, use um backend ou uma função serverless.
- Se precisar guardar dados de usuários, use banco de dados e política de privacidade.
- Se for apenas prévia e exportação local, o `localStorage` pode bastar.

### Rodando localmente

Como é um projeto estático, você pode abrir o `index.html` direto no navegador. Se preferir um servidor local:

```bash
npx serve .
```

ou:

```bash
python -m http.server 8080
```

### Resumo

Esta ferramenta mostra que dá para construir algo útil com HTML, CSS, JavaScript, bibliotecas gratuitas via CDN, IA como apoio de planejamento, hospedagem gratuita, sem backend no início e sem custo por usuário no primeiro protótipo.

Mas o que faz a ferramenta parecer profissional não é a stack. É a camada de regras. Campos obrigatórios, zonas, camadas, contratos por layout e validação depois de gerar são o que transformam uma IA simples em um resultado consistente. A tecnologia pode ser gratuita e o modelo pode ser barato. A qualidade vem da arquitetura de constraints, não da sorte do modelo.
