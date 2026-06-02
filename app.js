(function () {
  const APP_CONFIG = {
    storageKey: "studioelevatio-cartoes-visita-v1",
    export: {
      renderScale: 6,
      cardWidthMm: 85,
      cardHeightMm: 55
    }
  };

  const MASTER_PROMPT = [
    "Quero preencher automaticamente um gerador de cartoes de visita da Studio Elevatio.",
    "",
    "Atua como consultor e faz perguntas curtas, uma de cada vez, ate reunires tudo o que falta.",
    "Tens de recolher:",
    "- nome do negocio",
    "- nome da pessoa",
    "- cargo ou frase curta",
    "- slogan curto",
    "- descricao curta do negocio",
    "- servicos principais (ate 4)",
    "- telefone",
    "- email",
    "- website",
    "- morada (opcional)",
    "- cidade (opcional)",
    "- pais",
    "- instagram (opcional)",
    "- linkedin (opcional)",
    "- cor de destaque em hexadecimal",
    "- cor base em hexadecimal",
    "",
    "Quando terminares, devolve exatamente o bloco abaixo dentro de um bloco de codigo de texto simples (```text), sem texto antes nem depois:",
    "",
    "```text",
    "[CARD_PROFILE]",
    "business_name: ",
    "person_name: ",
    "role: ",
    "tagline: ",
    "description: ",
    "services:",
    "- ",
    "- ",
    "- ",
    "- ",
    "phone: ",
    "email: ",
    "website: ",
    "address: ",
    "city: ",
    "country: ",
    "instagram: ",
    "linkedin: ",
    "accent_color: #2962FF",
    "surface_color: #0F172A",
    "[/CARD_PROFILE]",
    "```",
    "",
    "Regras:",
    "- portugues europeu",
    "- slogan com impacto e no maximo 80 caracteres",
    "- descricao com no maximo 190 caracteres",
    "- servicos curtos e claros",
    "- se o cliente nao souber um campo, usa \"—\"",
    "- devolve valores simples, sem formatacao Markdown nos valores",
    "- emails, websites e URLs sem brackets nem parenteses"
  ].join("\n");

  const ACCENT_PRESETS = ["#2962FF", "#00A86B", "#FF6A3D", "#7C3AED", "#D946EF", "#0F9DCE", "#E11D48", "#F59E0B", "#14B8A6", "#64748B", "#8B5CF6", "#22C55E", "#06B6D4", "#EF4444", "#84CC16", "#F97316", "#DB2777", "#0891B2", "#A855F7", "#0EA5E9", "#10B981", "#B45309", "#BE123C", "#4F46E5"];
  const SURFACE_PRESETS = ["#0F172A", "#111827", "#1D3557", "#2A1E17", "#12343B", "#1A1423", "#0B1220", "#263238", "#2B2D42", "#14342B", "#3A243B", "#202124", "#081C24", "#1C1917", "#172554", "#0C4A6E", "#14532D", "#3F1D38", "#111111", "#273549", "#312E81", "#422006", "#164E63", "#2F1728"];
  const PAPER_PRESETS = ["#FFFFFF", "#F8FAFC", "#F3F7FF", "#F7F1EA", "#F1F7F4", "#F8F5FF", "#FFF7ED", "#ECFEFF", "#F0FDF4", "#FDF2F8", "#F5F5F4", "#EEF2FF"];
  const BRAND_FONTS = ["Manrope", "Space Grotesk", "Inter", "Montserrat", "Poppins", "Playfair Display", "Cormorant Garamond", "Bebas Neue", "Oswald", "Lora"];
  const DEFAULT_STUDIO_LOGO = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 72 72'%3E%3Cg fill='none' stroke='%23fff' stroke-width='8' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M12 54 36 30 60 54'/%3E%3Cpath d='M12 41 36 17 60 41' opacity='.58'/%3E%3C/g%3E%3C/svg%3E";
  const APP_I18N = {
    "pt-BR": {
      text: {
        "Cartões de visita prontos para impressão": "Cartões de visita prontos para impressão",
        "Como usar": "Como usar",
        "Gerar design": "Gerar design",
        "Cartão personalizado": "Cartão personalizado",
        "Variação local": "Variação local",
        "Usa o prompt para a IA escolher uma combinação de elementos dos templates atuais. O resultado fica só neste navegador, aparece nas bolinhas com destaque verde e pode ser removido.": "Use o prompt para a IA escolher uma combinação de elementos dos templates atuais. O resultado fica só neste navegador, aparece nos pontos com destaque verde e pode ser removido.",
        "Resposta da IA": "Resposta da IA",
        "Copiar prompt IA": "Copiar prompt IA",
        "Remover IA": "Remover IA",
        "Refazer design": "Refazer design",
        "Copiar prompt de dados": "Copiar prompt de dados",
        "Usar demo": "Usar demo",
        "Aplicar e continuar": "Aplicar e continuar",
        "Ir para o index principal": "Ir para o índice principal",
        "Nova aplicação Studio Elevatio": "Novo app Studio Elevatio",
        "Cria cartões de visita rápidos, bonitos e prontos para impressão.": "Crie cartões de visita rápidos, bonitos e prontos para impressão.",
        "Carrega o logo, edita os dados na barra lateral, gira o cartão ao clique e navega entre 23 layouts com um fluxo pensado para sair profissional, limpo e pronto a usar.": "Carregue o logo, edite os dados na barra lateral, vire o cartão ao clicar e navegue por 23 layouts com um fluxo pensado para sair profissional, limpo e pronto para usar.",
        "layouts com frente e verso": "layouts com frente e verso",
        "alta resolução para impressão": "alta resolução para impressão",
        "preenchimento guiado e rápido": "preenchimento guiado e rápido",
        "Identidade": "Identidade",
        "Logo e marca": "Logo e marca",
        "Carregar logo": "Carregar logo",
        "PNG, SVG ou JPG. Também podes arrastar para aqui.": "PNG, SVG ou JPG. Você também pode arrastar para aqui.",
        "Sem logo carregado": "Sem logo carregado",
        "Fundo do logo": "Fundo do logo",
        "Forma": "Forma",
        "Livre": "Livre",
        "Arredondada": "Arredondada",
        "Redonda": "Redonda",
        "Cor do fundo": "Cor do fundo",
        "Opacidade": "Opacidade",
        "Escala": "Escala",
        "Posição X": "Posição X",
        "Posição Y": "Posição Y",
        "Respiro": "Respiro",
        "Cantos": "Cantos",
        "Reset logo": "Resetar logo",
        "Remover logo": "Remover logo",
        "Personalização": "Personalização",
        "Imagem de fundo": "Imagem de fundo",
        "Carregar fundo": "Carregar fundo",
        "Imagem opcional para cartões personalizados.": "Imagem opcional para cartões personalizados.",
        "Sem fundo carregado": "Sem fundo carregado",
        "Desfoque": "Desfoque",
        "Escurecer": "Escurecer",
        "Granularidade": "Granularidade",
        "Saturação": "Saturação",
        "Contraste": "Contraste",
        "Cor sobreposta": "Cor sobreposta",
        "Opacidade da cor": "Opacidade da cor",
        "Melhorar definição": "Melhorar definição",
        "Reset e remover fundo": "Resetar e remover fundo",
        "Remover fundo": "Remover fundo",
        "Informação principal": "Informação principal",
        "Quem aparece no cartão": "Quem aparece no cartão",
        "Nome do negócio": "Nome do negócio",
        "Nome da pessoa": "Nome da pessoa",
        "Cargo": "Cargo",
        "Slogan / frase principal": "Slogan / frase principal",
        "Conteúdo": "Conteúdo",
        "Mensagem e serviços": "Mensagem e serviços",
        "Descrição curta": "Descrição curta",
        "Serviço 1": "Serviço 1",
        "Serviço 2": "Serviço 2",
        "Serviço 3": "Serviço 3",
        "Serviço 4": "Serviço 4",
        "Contactos": "Contatos",
        "Dados que vão aparecer": "Dados que vão aparecer",
        "Telefone": "Telefone",
        "Email": "Email",
        "Website": "Website",
        "Morada": "Endereço",
        "Cidade": "Cidade",
        "País": "País",
        "Paleta": "Paleta",
        "Cores do cartão": "Cores do cartão",
        "Cor de destaque": "Cor de destaque",
        "Cor base": "Cor base",
        "Atalhos de destaque": "Atalhos de destaque",
        "Bases sugeridas": "Bases sugeridas",
        "Preenchimento rápido": "Preenchimento rápido",
        "Prompt para preencher dados": "Prompt para preencher dados",
        "Copia o prompt para uma IA de texto ou usa como guia. O resultado volta em [CARD_PROFILE] para preencher estes campos.": "Copie este prompt para uma IA de texto ou use como guia. O resultado volta em [CARD_PROFILE].",
        "Prompt para copiar": "Prompt para copiar",
        "Copiar prompt": "Copiar prompt",
        "Usar exemplo demo": "Usar exemplo demo",
        "Bloco estruturado de dados": "Bloco estruturado de dados",
        "Aplicar ao cartão": "Aplicar ao cartão",
        "Repor dados": "Restaurar dados",
        "Layout selecionado": "Layout selecionado",
        "Virar cartão": "Virar cartão",
        "Misturar paleta": "Misturar paleta",
        "Frente": "Frente",
        "Verso": "Verso",
        "Clica no cartão para virar": "Clique no cartão para virar",
        "Download individual": "Download individual",
        "Entrega rápida e profissional": "Entrega rápida e profissional",
        "Ideal para sair desta página com um cartão pronto para reunião, networking, balcão ou apresentação comercial.": "Ideal para sair desta página com um cartão pronto para reunião, networking, balcão ou apresentação comercial.",
        "Coleção completa": "Coleção completa",
        "Mais opções para vender melhor": "Mais opções para vender melhor",
        "Perfeito para comparar estilos, testar abordagens visuais e mostrar alternativas mais valiosas ao cliente.": "Perfeito para comparar estilos, testar abordagens visuais e mostrar alternativas mais valiosas ao cliente.",
        "Pack completo": "Pacote completo",
        "Descarregar layout atual": "Baixar layout atual",
        "Descarregar ficheiros agora": "Baixar arquivos agora",
        "Descarregar pack completo": "Baixar pacote completo",
        "Selecionar": "Selecionar",
        "Logo carregado": "Logo carregado",
        "Imagem de fundo carregada": "Imagem de fundo carregada",
        "Edita os dados, compara os layouts e descarrega quando o cartão estiver perfeito.": "Edite os dados, compare os layouts e baixe quando o cartão estiver perfeito.",
        "Descarregar layout": "Baixar layout",
        "Pronto para desbloquear este cartão?": "Pronto para desbloquear este cartão?",
        "O download segue para uma etapa segura de desbloqueio. Se tiveres um código promocional, podes aplicá-lo agora.": "O download segue para uma etapa segura de desbloqueio. Se você tiver um código promocional, pode aplicá-lo agora.",
        "Tens código promocional?": "Tem código promocional?",
        "Escreve o código aqui": "Digite o código aqui",
        "O código promocional gratuito liberta apenas 1 layout por dispositivo.": "O código promocional gratuito libera apenas 1 layout por dispositivo.",
        "Aplicar código": "Aplicar código",
        "Continuar": "Continuar",
        "Tutorial rápido": "Tutorial rápido",
        "Como criar o cartão": "Como criar o cartão",
        "Segue estes passos para gerar um cartão profissional em poucos minutos.": "Siga estes passos para gerar um cartão profissional em poucos minutos.",
        "1 de 5": "1 de 5",
        "Preenche os dados": "Preencha os dados",
        "Começa pelo nome do negócio, pessoa, cargo, contactos e serviços. A prévia muda automaticamente.": "Comece pelo nome do negócio, pessoa, cargo, contatos e serviços. A prévia muda automaticamente.",
        "Anterior": "Anterior",
        "Próximo": "Próximo"
      },
      guide: [
        ["Preencha os dados", "Comece pelo nome do negócio, pessoa, cargo, contatos e serviços. A prévia muda automaticamente."],
        ["Carregue a marca", "Adicione o logo e, se quiser, uma imagem de fundo. Ajuste opacidade, desfoque, cor e posição."],
        ["Escolha o layout", "Use as setas ou os pontos para comparar os 23 layouts. Clique no cartão para ver o verso."],
        ["Use o prompt", "Copie o prompt para uma IA de texto ou use como guia. Cole aqui o bloco estruturado que voltar."],
        ["Baixe", "Quando o cartão estiver pronto, desbloqueie o layout atual ou o pacote completo e exporte os arquivos."]
      ]
    },
    en: {
      text: {
        "Cartões de visita prontos para impressão": "Print-ready business cards",
        "Como usar": "How to use",
        "Gerar design": "Generate design",
        "Cartão personalizado": "Custom card",
        "Variação local": "Local variation",
        "Usa o prompt para a IA escolher uma combinação de elementos dos templates atuais. O resultado fica só neste navegador, aparece nas bolinhas com destaque verde e pode ser removido.": "Use the prompt so AI can choose a mix of elements from the current templates. The result stays only in this browser, appears in the dots with a green glow and can be removed.",
        "Resposta da IA": "AI response",
        "Copiar prompt IA": "Copy AI prompt",
        "Remover IA": "Remove AI",
        "Refazer design": "Redo design",
        "Copiar prompt de dados": "Copy data prompt",
        "Usar demo": "Use demo",
        "Aplicar e continuar": "Apply and continue",
        "Ir para o index principal": "Go to main index",
        "Nova aplicação Studio Elevatio": "Studio Elevatio app",
        "Cria cartões de visita rápidos, bonitos e prontos para impressão.": "Create fast, beautiful and print-ready business cards.",
        "Carrega o logo, edita os dados na barra lateral, gira o cartão ao clique e navega entre 23 layouts com um fluxo pensado para sair profissional, limpo e pronto a usar.": "Upload a logo, edit the details in the sidebar, flip the card with a click and browse 23 layouts designed for a clean professional result.",
        "layouts com frente e verso": "front and back layouts",
        "alta resolução para impressão": "high resolution for print",
        "preenchimento guiado e rápido": "fast guided filling",
        "Identidade": "Identity",
        "Logo e marca": "Logo and brand",
        "Carregar logo": "Upload logo",
        "PNG, SVG ou JPG. Também podes arrastar para aqui.": "PNG, SVG or JPG. You can also drag it here.",
        "Sem logo carregado": "No logo uploaded",
        "Fundo do logo": "Logo background",
        "Forma": "Shape",
        "Livre": "Free",
        "Arredondada": "Rounded",
        "Redonda": "Round",
        "Cor do fundo": "Background color",
        "Opacidade": "Opacity",
        "Escala": "Scale",
        "Posição X": "Position X",
        "Posição Y": "Position Y",
        "Respiro": "Padding",
        "Cantos": "Corners",
        "Reset logo": "Reset logo",
        "Remover logo": "Remove logo",
        "Personalização": "Customization",
        "Imagem de fundo": "Background image",
        "Carregar fundo": "Upload background",
        "Imagem opcional para cartões personalizados.": "Optional image for custom cards.",
        "Sem fundo carregado": "No background uploaded",
        "Desfoque": "Blur",
        "Escurecer": "Darken",
        "Granularidade": "Grain",
        "Saturação": "Saturation",
        "Contraste": "Contrast",
        "Cor sobreposta": "Overlay color",
        "Opacidade da cor": "Overlay opacity",
        "Melhorar definição": "Enhance quality",
        "Reset e remover fundo": "Reset and remove background",
        "Remover fundo": "Remove background",
        "Informação principal": "Main information",
        "Quem aparece no cartão": "Who appears on the card",
        "Nome do negócio": "Business name",
        "Nome da pessoa": "Person name",
        "Cargo": "Role",
        "Slogan / frase principal": "Slogan / main phrase",
        "Conteúdo": "Content",
        "Mensagem e serviços": "Message and services",
        "Descrição curta": "Short description",
        "Serviço 1": "Service 1",
        "Serviço 2": "Service 2",
        "Serviço 3": "Service 3",
        "Serviço 4": "Service 4",
        "Contactos": "Contacts",
        "Dados que vão aparecer": "Details shown on the card",
        "Telefone": "Phone",
        "Email": "Email",
        "Website": "Website",
        "Morada": "Address",
        "Cidade": "City",
        "País": "Country",
        "Paleta": "Palette",
        "Cores do cartão": "Card colors",
        "Cor de destaque": "Accent color",
        "Cor base": "Base color",
        "Atalhos de destaque": "Accent shortcuts",
        "Bases sugeridas": "Suggested bases",
        "Preenchimento rápido": "Quick fill",
        "Prompt para preencher dados": "Data prompt",
        "Copia o prompt para uma IA de texto ou usa como guia. O resultado volta em [CARD_PROFILE] para preencher estes campos.": "Copy this prompt into a text AI or use it as a guide. The result comes back as [CARD_PROFILE].",
        "Prompt para copiar": "Prompt to copy",
        "Copiar prompt": "Copy prompt",
        "Usar exemplo demo": "Use demo example",
        "Bloco estruturado de dados": "Structured data block",
        "Aplicar ao cartão": "Apply to card",
        "Repor dados": "Reset data",
        "Layout selecionado": "Selected layout",
        "Virar cartão": "Flip card",
        "Misturar paleta": "Shuffle palette",
        "Frente": "Front",
        "Verso": "Back",
        "Clica no cartão para virar": "Click the card to flip",
        "Download individual": "Single download",
        "Entrega rápida e profissional": "Fast professional delivery",
        "Ideal para sair desta página com um cartão pronto para reunião, networking, balcão ou apresentação comercial.": "Ideal for leaving this page with a card ready for meetings, networking, front desk use or sales presentations.",
        "Coleção completa": "Full collection",
        "Mais opções para vender melhor": "More options to sell better",
        "Perfeito para comparar estilos, testar abordagens visuais e mostrar alternativas mais valiosas ao cliente.": "Perfect for comparing styles, testing visual directions and showing more valuable alternatives to a client.",
        "Pack completo": "Full pack",
        "Descarregar layout atual": "Download current layout",
        "Descarregar ficheiros agora": "Download files now",
        "Descarregar pack completo": "Download full pack",
        "Selecionar": "Select",
        "Logo carregado": "Uploaded logo",
        "Imagem de fundo carregada": "Uploaded background image",
        "Edita os dados, compara os layouts e descarrega quando o cartão estiver perfeito.": "Edit the details, compare layouts and download when the card is perfect.",
        "Descarregar layout": "Download layout",
        "Pronto para desbloquear este cartão?": "Ready to unlock this card?",
        "O download segue para uma etapa segura de desbloqueio. Se tiveres um código promocional, podes aplicá-lo agora.": "The download continues through a secure unlock step. If you have a promo code, apply it now.",
        "Tens código promocional?": "Have a promo code?",
        "Escreve o código aqui": "Enter the code here",
        "O código promocional gratuito liberta apenas 1 layout por dispositivo.": "The free promo code unlocks only 1 layout per device.",
        "Aplicar código": "Apply code",
        "Continuar": "Continue",
        "Tutorial rápido": "Quick tutorial",
        "Como criar o cartão": "How to create the card",
        "Segue estes passos para gerar um cartão profissional em poucos minutos.": "Follow these steps to create a professional card in a few minutes.",
        "1 de 5": "1 of 5",
        "Preenche os dados": "Fill in the details",
        "Começa pelo nome do negócio, pessoa, cargo, contactos e serviços. A prévia muda automaticamente.": "Start with the business name, person, role, contacts and services. The preview updates automatically.",
        "Anterior": "Back",
        "Próximo": "Next"
      },
      layouts: {
        aurora: ["Aurora Minimal", "Dark gradient with a premium front and clean service back."],
        obsidian: ["Premium Night", "Elegant high-contrast look with a luxury layout."],
        editorial: ["Editorial Light", "Strong typography on a light base, ideal for consulting and personal brands."],
        rail: ["Vertical Rail", "Bold side rail with a very organized reading flow."],
        mosaic: ["Neo Grid", "Block composition for presenting brand and services without noise."],
        banner: ["Highlight Bar", "Expressive horizontal strip with quick contact on the front."],
        atelier: ["Earth Atelier", "Boutique atmosphere with a warmer sophisticated tone."],
        pulse: ["Tech Pulse", "Tech look with micro-grid texture and controlled glow."],
        studio: ["Studio Quote", "Message-led version with strong emphasis on the slogan."],
        contrast: ["Duo Contrast", "Dark half, light half, with a strong flip between front and back."],
        prism: ["Vertical Ticket", "Premium pass-style format with side column, large brand and editorial reading."],
        gallery: ["Full Bleed Photo", "Full-frame photo composition with strong overlay and commercial signature."],
        signature: ["QR Contact Split", "Card with decorative QR block, contact column and practical back."],
        "ivory-rail": ["Ivory Rail", "White base with an accent rail, editorial signature and premium readability."],
        "meridian-tab": ["Meridian Tab", "Elegant side tab with calm hierarchy and separated contact details."],
        ledger: ["Frost Ledger", "Translucent panels in a clean grid for consulting and service brands."],
        "noir-label": ["Noir Label", "Dark label over a light composition, strong presence without excess."],
        "arc-seal": ["Arc Seal", "Circular seal and accent arc for a modern institutional feel."],
        horizon: ["Horizon Line", "Wide horizontal line, generous white space and a discreet signature."],
        capsule: ["Capsule Index", "Capsule system for services, contact details and the main callout."],
        folio: ["Folio Mark", "Card with large side mark, editorial block and commercial back."],
        "civic-grid": ["Civic Grid", "Elegant grid with contact cards and very organized reading."],
        "soft-frame": ["Soft Frame", "Soft inner frame, clean center and premium edge details."]
      },
      guide: [
        ["Fill in the details", "Start with the business name, person, role, contacts and services. The preview updates automatically."],
        ["Upload brand assets", "Add a logo and, if needed, a background image. Use opacity, blur, overlay and positioning controls to refine the result."],
        ["Choose a layout", "Use the arrows or dots to compare the 23 front and back layouts. Click the card to flip it."],
        ["Use the prompt", "Copy the prompt into any text AI or use it as a guide. Paste the structured block back into the tool."],
        ["Download", "When the card is ready, unlock the current layout or the full pack and export the print-ready files."]
      ]
    },
    es: {
      text: {
        "Cartões de visita prontos para impressão": "Tarjetas de visita listas para imprimir",
        "Como usar": "Cómo usar",
        "Gerar design": "Generar diseño",
        "Cartão personalizado": "Tarjeta personalizada",
        "Variação local": "Variación local",
        "Usa o prompt para a IA escolher uma combinação de elementos dos templates atuais. O resultado fica só neste navegador, aparece nas bolinhas com destaque verde e pode ser removido.": "Usa el prompt para que la IA elija una combinación de elementos de las plantillas actuales. El resultado queda solo en este navegador, aparece en los puntos con brillo verde y se puede quitar.",
        "Resposta da IA": "Respuesta de la IA",
        "Copiar prompt IA": "Copiar prompt IA",
        "Remover IA": "Quitar IA",
        "Refazer design": "Rehacer diseño",
        "Copiar prompt de dados": "Copiar prompt de datos",
        "Usar demo": "Usar demo",
        "Aplicar e continuar": "Aplicar y continuar",
        "Ir para o index principal": "Ir al índice principal",
        "Nova aplicação Studio Elevatio": "Aplicación Studio Elevatio",
        "Cria cartões de visita rápidos, bonitos e prontos para impressão.": "Crea tarjetas de visita rápidas, elegantes y listas para imprimir.",
        "Carrega o logo, edita os dados na barra lateral, gira o cartão ao clique e navega entre 23 layouts com um fluxo pensado para sair profissional, limpo e pronto a usar.": "Sube el logo, edita los datos en la barra lateral, gira la tarjeta con un clic y explora 23 diseños pensados para un resultado profesional.",
        "layouts com frente e verso": "diseños con frente y reverso",
        "alta resolução para impressão": "alta resolución para impresión",
        "preenchimento guiado e rápido": "relleno guiado y rápido",
        "Identidade": "Identidad",
        "Logo e marca": "Logo y marca",
        "Carregar logo": "Subir logo",
        "PNG, SVG ou JPG. Também podes arrastar para aqui.": "PNG, SVG o JPG. También puedes arrastrarlo aquí.",
        "Sem logo carregado": "Sin logo cargado",
        "Fundo do logo": "Fondo del logo",
        "Forma": "Forma",
        "Livre": "Libre",
        "Arredondada": "Redondeada",
        "Redonda": "Circular",
        "Cor do fundo": "Color de fondo",
        "Opacidade": "Opacidad",
        "Escala": "Escala",
        "Posição X": "Posición X",
        "Posição Y": "Posición Y",
        "Respiro": "Espaciado",
        "Cantos": "Esquinas",
        "Reset logo": "Restablecer logo",
        "Remover logo": "Quitar logo",
        "Personalização": "Personalización",
        "Imagem de fundo": "Imagen de fondo",
        "Carregar fundo": "Subir fondo",
        "Imagem opcional para cartões personalizados.": "Imagen opcional para tarjetas personalizadas.",
        "Sem fundo carregado": "Sin fondo cargado",
        "Desfoque": "Desenfoque",
        "Escurecer": "Oscurecer",
        "Granularidade": "Grano",
        "Saturação": "Saturación",
        "Contraste": "Contraste",
        "Cor sobreposta": "Color superpuesto",
        "Opacidade da cor": "Opacidad del color",
        "Melhorar definição": "Mejorar definición",
        "Reset e remover fundo": "Restablecer y quitar fondo",
        "Remover fundo": "Quitar fondo",
        "Informação principal": "Información principal",
        "Quem aparece no cartão": "Quién aparece en la tarjeta",
        "Nome do negócio": "Nombre del negocio",
        "Nome da pessoa": "Nombre de la persona",
        "Cargo": "Cargo",
        "Slogan / frase principal": "Slogan / frase principal",
        "Conteúdo": "Contenido",
        "Mensagem e serviços": "Mensaje y servicios",
        "Descrição curta": "Descripción corta",
        "Serviço 1": "Servicio 1",
        "Serviço 2": "Servicio 2",
        "Serviço 3": "Servicio 3",
        "Serviço 4": "Servicio 4",
        "Contactos": "Contactos",
        "Dados que vão aparecer": "Datos que aparecerán",
        "Telefone": "Teléfono",
        "Email": "Email",
        "Website": "Sitio web",
        "Morada": "Dirección",
        "Cidade": "Ciudad",
        "País": "País",
        "Paleta": "Paleta",
        "Cores do cartão": "Colores de la tarjeta",
        "Cor de destaque": "Color destacado",
        "Cor base": "Color base",
        "Atalhos de destaque": "Atajos de color",
        "Bases sugeridas": "Bases sugeridas",
        "Preenchimento rápido": "Relleno rápido",
        "Prompt para preencher dados": "Prompt para rellenar datos",
        "Copia o prompt para uma IA de texto ou usa como guia. O resultado volta em [CARD_PROFILE] para preencher estes campos.": "Copia este prompt en una IA de texto o úsalo como guía. El resultado vuelve como [CARD_PROFILE].",
        "Prompt para copiar": "Prompt para copiar",
        "Copiar prompt": "Copiar prompt",
        "Usar exemplo demo": "Usar ejemplo demo",
        "Bloco estruturado de dados": "Bloque estructurado de datos",
        "Aplicar ao cartão": "Aplicar a la tarjeta",
        "Repor dados": "Restablecer datos",
        "Layout selecionado": "Diseño seleccionado",
        "Virar cartão": "Girar tarjeta",
        "Misturar paleta": "Mezclar paleta",
        "Frente": "Frente",
        "Verso": "Reverso",
        "Clica no cartão para virar": "Haz clic en la tarjeta para girar",
        "Download individual": "Descarga individual",
        "Entrega rápida e profissional": "Entrega rápida y profesional",
        "Ideal para sair desta página com um cartão pronto para reunião, networking, balcão ou apresentação comercial.": "Ideal para salir de esta página con una tarjeta lista para reuniones, networking o ventas.",
        "Coleção completa": "Colección completa",
        "Mais opções para vender melhor": "Más opciones para vender mejor",
        "Perfeito para comparar estilos, testar abordagens visuais e mostrar alternativas mais valiosas ao cliente.": "Perfecto para comparar estilos, probar direcciones visuales y mostrar alternativas al cliente.",
        "Pack completo": "Pack completo",
        "Descarregar layout atual": "Descargar diseño actual",
        "Descarregar ficheiros agora": "Descargar archivos ahora",
        "Descarregar pack completo": "Descargar pack completo",
        "Selecionar": "Seleccionar",
        "Logo carregado": "Logo cargado",
        "Imagem de fundo carregada": "Imagen de fondo cargada",
        "Edita os dados, compara os layouts e descarrega quando o cartão estiver perfeito.": "Edita los datos, compara diseños y descarga cuando la tarjeta esté perfecta.",
        "Descarregar layout": "Descargar diseño",
        "Pronto para desbloquear este cartão?": "¿Listo para desbloquear esta tarjeta?",
        "O download segue para uma etapa segura de desbloqueio. Se tiveres um código promocional, podes aplicá-lo agora.": "La descarga continúa con un paso seguro de desbloqueo. Si tienes un código promocional, aplícalo ahora.",
        "Tens código promocional?": "¿Tienes código promocional?",
        "Escreve o código aqui": "Escribe el código aquí",
        "O código promocional gratuito liberta apenas 1 layout por dispositivo.": "El código promocional gratuito desbloquea solo 1 diseño por dispositivo.",
        "Aplicar código": "Aplicar código",
        "Continuar": "Continuar",
        "Tutorial rápido": "Tutorial rápido",
        "Como criar o cartão": "Cómo crear la tarjeta",
        "Segue estes passos para gerar um cartão profissional em poucos minutos.": "Sigue estos pasos para crear una tarjeta profesional en pocos minutos.",
        "1 de 5": "1 de 5",
        "Preenche os dados": "Rellena los datos",
        "Começa pelo nome do negócio, pessoa, cargo, contactos e serviços. A prévia muda automaticamente.": "Empieza por el negocio, persona, cargo, contactos y servicios. La vista previa cambia automáticamente.",
        "Anterior": "Anterior",
        "Próximo": "Siguiente"
      },
      guide: [
        ["Rellena los datos", "Empieza por el negocio, persona, cargo, contactos y servicios. La vista previa cambia automáticamente."],
        ["Sube la marca", "Añade logo y, si quieres, una imagen de fondo. Ajusta opacidad, desenfoque, color y posición."],
        ["Elige un diseño", "Usa flechas o puntos para comparar los 23 diseños. Haz clic en la tarjeta para girarla."],
        ["Usa el prompt", "Copia el prompt en una IA de texto o úsalo como guía. Pega aquí el bloque estructurado."]
        ["Descarga", "Cuando la tarjeta esté lista, desbloquea el diseño actual o el pack completo y exporta los archivos."]
      ]
    }
  };
  const activeLocale = getActiveLocale();

  const DEFAULT_STATE = {
    layoutIndex: 0,
    isFlipped: false,
    logoVisible: true,
    logoDataUrl: "",
    brandTextVisible: true,
    brandText: "Studio Elevatio",
    brandFont: "Manrope",
    brandTextScale: 100,
    logoInvert: false,
    logoFrameVisible: false,
    logoFrameShape: "none",
    logoBackgroundColor: "#FFFFFF",
    logoOpacity: 100,
    logoScale: 115,
    logoBadgeScale: 100,
    logoX: 0,
    logoY: 0,
    logoPadding: 0,
    logoRadius: 0,
    backgroundDataUrl: "",
    backgroundOpacity: 28,
    backgroundBlur: 0,
    backgroundDarken: 28,
    backgroundGrain: 0,
    backgroundSaturation: 92,
    backgroundContrast: 104,
    backgroundOverlayColor: "#ffffff",
    backgroundOverlayOpacity: 0,
    railImageDataUrl: "",
    railImageOpacity: 82,
    railImageDarken: 28,
    businessName: "Studio Elevatio",
    personName: "Ana Ribeiro",
    role: "Soluções Empresariais Completas",
    tagline: "Da necessidade à solução completa.",
    description: "Criamos soluções completas para empresas, unindo imagem, operação, atendimento, espaço físico e tecnologia até à entrega final.",
    services: [
      "Soluções empresariais",
      "Presença digital",
      "Comunicação visual",
      "Tecnologia à medida"
    ],
    phone: "+351 XXX XXX XXX",
    email: "contato@studioelevatio.com",
    website: "studioelevatio.com",
    address: "—",
    city: "—",
    country: "Portugal",
    instagram: "@studioelevatio",
    linkedin: "Studio Elevatio",
    accentColor: "#2962FF",
    surfaceColor: "#0F172A",
    paperColor: "#FFFFFF",
    paperAltColor: "#EDF3FF",
    textDarkColor: "#10131B",
    textLightColor: "#F7F9FF",
    chipColor: "#FFFFFF",
    panelColor: "#FFFFFF",
    unlock: {
      kind: null,
      layoutIndex: null,
      sessionId: null
    },
    customLayout: null
  };

  const FIELD_MAP = {
    business_name: "businessName",
    person_name: "personName",
    role: "role",
    tagline: "tagline",
    description: "description",
    phone: "phone",
    email: "email",
    website: "website",
    address: "address",
    city: "city",
    country: "country",
    instagram: "instagram",
    linkedin: "linkedin",
    accent_color: "accentColor",
    surface_color: "surfaceColor",
    paper_color: "paperColor",
    paper_alt_color: "paperAltColor",
    text_dark_color: "textDarkColor",
    text_light_color: "textLightColor",
    chip_color: "chipColor",
    panel_color: "panelColor"
  };
  const CUSTOM_LAYOUT_COMPONENTS = [
    "logo",
    "monogram",
    "businessName",
    "personName",
    "role",
    "tagline",
    "description",
    "services",
    "contactChips",
    "contactStack",
    "location",
    "social",
    "website",
    "qrBlock",
    "accentLine",
    "dividerLine",
    "badge",
    "ctaBar"
  ];

  const refs = {
    businessCard: document.getElementById("businessCard"),
    businessCardShell: document.getElementById("businessCardShell"),
    logoInput: document.getElementById("logoInput"),
    logoDropzone: document.getElementById("logoDropzone"),
    logoPreview: document.getElementById("logoPreview"),
    brandFontPreview: document.getElementById("brandFontPreview"),
    resetLogoBtn: document.getElementById("resetLogoBtn"),
    clearLogoBtn: document.getElementById("clearLogoBtn"),
    backgroundInput: document.getElementById("backgroundInput"),
    backgroundDropzone: document.getElementById("backgroundDropzone"),
    backgroundPreview: document.getElementById("backgroundPreview"),
    railImageInput: document.getElementById("railImageInput"),
    railImageDropzone: document.getElementById("railImageDropzone"),
    railImagePreview: document.getElementById("railImagePreview"),
    clearBackgroundBtn: document.getElementById("clearBackgroundBtn"),
    resetBackgroundBtn: document.getElementById("resetBackgroundBtn"),
    enhanceBackgroundBtn: document.getElementById("enhanceBackgroundBtn"),
    clearRailImageBtn: document.getElementById("clearRailImageBtn"),
    checkoutStatus: document.getElementById("checkoutStatus"),
    feedbackBar: document.getElementById("feedbackBar"),
    layoutTitle: document.getElementById("layoutTitle"),
    layoutSubtitle: document.getElementById("layoutSubtitle"),
    layoutDots: document.getElementById("layoutDots"),
    cardSideLabel: document.getElementById("cardSideLabel"),
    flipBtn: document.getElementById("flipBtn"),
    randomizeBtn: document.getElementById("randomizeBtn"),
    prevLayout: document.getElementById("prevLayout"),
    nextLayout: document.getElementById("nextLayout"),
    accentPresets: document.getElementById("accentPresets"),
    surfacePresets: document.getElementById("surfacePresets"),
    paletteRandomizeBtn: document.getElementById("paletteRandomizeBtn"),
    accentColorValue: document.getElementById("accentColorValue"),
    surfaceColorValue: document.getElementById("surfaceColorValue"),
    paperColorValue: document.getElementById("paperColorValue"),
    paperAltColorValue: document.getElementById("paperAltColorValue"),
    textDarkColorValue: document.getElementById("textDarkColorValue"),
    textLightColorValue: document.getElementById("textLightColorValue"),
    chipColorValue: document.getElementById("chipColorValue"),
    panelColorValue: document.getElementById("panelColorValue"),
    assistantPrompt: document.getElementById("assistantPrompt"),
    structuredInput: document.getElementById("structuredInput"),
    copyPromptBtn: document.getElementById("copyPromptBtn"),
    applyStructuredBtn: document.getElementById("applyStructuredBtn"),
    demoDataBtn: document.getElementById("demoDataBtn"),
    resetStateBtn: document.getElementById("resetStateBtn"),
    buyCurrentBtn: document.getElementById("buyCurrentBtn"),
    buyAllBtn: document.getElementById("buyAllBtn"),
    downloadTopBtn: document.getElementById("downloadTopBtn"),
    quickCustomBtn: document.getElementById("quickCustomBtn"),
    quickCustomModal: document.getElementById("quickCustomModal"),
    closeQuickCustomModal: document.getElementById("closeQuickCustomModal"),
    quickStructuredInput: document.getElementById("quickStructuredInput"),
    quickCopyPromptBtn: document.getElementById("quickCopyPromptBtn"),
    quickDemoBtn: document.getElementById("quickDemoBtn"),
    quickApplyBtn: document.getElementById("quickApplyBtn"),
    retryCustomLayoutBtn: document.getElementById("retryCustomLayoutBtn"),
    removeCustomLayoutBtn: document.getElementById("removeCustomLayoutBtn"),
    exportSandbox: document.getElementById("exportSandbox"),
    checkoutModal: document.getElementById("checkoutModal"),
    closeCheckoutModal: document.getElementById("closeCheckoutModal"),
    continueCheckoutBtn: document.getElementById("continueCheckoutBtn"),
    promoCodeInput: document.getElementById("promoCodeInput"),
    applyPromoBtn: document.getElementById("applyPromoBtn"),
    promoNote: document.getElementById("promoNote"),
    checkoutModalTitle: document.getElementById("checkoutModalTitle"),
    checkoutModalEyebrow: document.getElementById("checkoutModalEyebrow"),
    checkoutModalText: document.getElementById("checkoutModalText"),
    checkoutBenefits: document.getElementById("checkoutBenefits"),
    howToUseBtn: document.getElementById("howToUseBtn"),
    guideModal: document.getElementById("guideModal"),
    closeGuideModal: document.getElementById("closeGuideModal"),
    guideModalEyebrow: document.getElementById("guideModalEyebrow"),
    guideModalTitle: document.getElementById("guideModalTitle"),
    guideModalText: document.getElementById("guideModalText"),
    guideProgress: document.getElementById("guideProgress"),
    guideStepTitle: document.getElementById("guideStepTitle"),
    guideStepText: document.getElementById("guideStepText"),
    prevGuideStepBtn: document.getElementById("prevGuideStepBtn"),
    nextGuideStepBtn: document.getElementById("nextGuideStepBtn")
  };

  let pdfDependenciesPromise = null;
  let pendingPackageType = null;
  let guideStepIndex = 0;

  const LAYOUTS = [
    {
      slug: "aurora",
      name: "Aurora Minimal",
      blurb: "Gradiente escuro com frente premium e verso limpo para serviços.",
      frontTheme: "dark",
      backTheme: "paper",
      renderFront: renderAuroraFront,
      renderBack: renderAuroraBack
    },
    {
      slug: "obsidian",
      name: "Noite Premium",
      blurb: "Look elegante com contraste alto e distribuição luxuosa.",
      frontTheme: "dark",
      backTheme: "dark",
      renderFront: renderObsidianFront,
      renderBack: renderObsidianBack
    },
    {
      slug: "editorial",
      name: "Editorial Light",
      blurb: "Tipografia forte em base clara, ideal para consultoria e marca pessoal.",
      frontTheme: "paper",
      backTheme: "paper",
      renderFront: renderEditorialFront,
      renderBack: renderEditorialBack
    },
    {
      slug: "rail",
      name: "Linha Vertical",
      blurb: "Faixa lateral marcante e leitura muito organizada.",
      frontTheme: "paper",
      backTheme: "dark",
      renderFront: renderRailFront,
      renderBack: renderRailBack
    },
    {
      slug: "mosaic",
      name: "Grid Neo",
      blurb: "Composição em blocos para apresentar marca e serviços sem ruído.",
      frontTheme: "dark",
      backTheme: "paper",
      renderFront: renderMosaicFront,
      renderBack: renderMosaicBack
    },
    {
      slug: "banner",
      name: "Barra em Destaque",
      blurb: "Fita horizontal expressiva com contacto rápido na frente.",
      frontTheme: "dark",
      backTheme: "paper",
      renderFront: renderBannerFront,
      renderBack: renderBannerBack
    },
    {
      slug: "atelier",
      name: "Atelier Terra",
      blurb: "Atmosfera boutique com tom mais caloroso e sofisticado.",
      frontTheme: "dark",
      backTheme: "paper",
      renderFront: renderAtelierFront,
      renderBack: renderAtelierBack
    },
    {
      slug: "pulse",
      name: "Tech Pulse",
      blurb: "Visual tecnológico com micro-grid e brilho controlado.",
      frontTheme: "dark",
      backTheme: "dark",
      renderFront: renderPulseFront,
      renderBack: renderPulseBack
    },
    {
      slug: "studio",
      name: "Studio Quote",
      blurb: "Versão inspirada em mensagem forte com grande destaque ao slogan.",
      frontTheme: "paper",
      backTheme: "dark",
      renderFront: renderStudioFront,
      renderBack: renderStudioBack
    },
    {
      slug: "contrast",
      name: "Duo Contrast",
      blurb: "Metade escura, metade clara, com viragem forte entre frente e verso.",
      frontTheme: "paper",
      backTheme: "paper",
      renderFront: renderContrastFront,
      renderBack: renderContrastBack
    },
    {
      slug: "prism",
      name: "Ticket Vertical",
      blurb: "Formato tipo passe premium com coluna lateral, marca grande e leitura editorial.",
      frontTheme: "dark",
      backTheme: "paper",
      renderFront: renderPrismFront,
      renderBack: renderPrismBack
    },
    {
      slug: "gallery",
      name: "Foto Full Bleed",
      blurb: "Composição com foto em ecrã cheio, overlay forte e assinatura comercial.",
      frontTheme: "paper",
      backTheme: "dark",
      renderFront: renderGalleryFront,
      renderBack: renderGalleryBack
    },
    {
      slug: "signature",
      name: "QR Contact Split",
      blurb: "Cartão com bloco visual de QR decorativo, contactos em coluna e verso utilitário.",
      frontTheme: "paper",
      backTheme: "paper",
      renderFront: renderSignatureFront,
      renderBack: renderSignatureBack
    },
    {
      slug: "ivory-rail",
      name: "Ivory Rail",
      blurb: "Base branca com accent rail lateral, assinatura editorial e leitura premium.",
      frontTheme: "paper",
      backTheme: "paper",
      renderFront: renderIvoryRailFront,
      renderBack: renderIvoryRailBack
    },
    {
      slug: "meridian-tab",
      name: "Meridian Tab",
      blurb: "Aba lateral elegante com hierarquia calma e contactos bem separados.",
      frontTheme: "paper",
      backTheme: "dark",
      renderFront: renderMeridianTabFront,
      renderBack: renderMeridianTabBack
    },
    {
      slug: "ledger",
      name: "Frost Ledger",
      blurb: "Painéis translúcidos em grelha limpa para marcas de consultoria e serviços.",
      frontTheme: "paper",
      backTheme: "paper",
      renderFront: renderLedgerFront,
      renderBack: renderLedgerBack
    },
    {
      slug: "noir-label",
      name: "Noir Label",
      blurb: "Etiqueta escura sobre composição clara, com presença forte sem exagero.",
      frontTheme: "paper",
      backTheme: "dark",
      renderFront: renderNoirLabelFront,
      renderBack: renderNoirLabelBack
    },
    {
      slug: "arc-seal",
      name: "Arc Seal",
      blurb: "Selo circular e arco de destaque para uma sensação institucional moderna.",
      frontTheme: "dark",
      backTheme: "paper",
      renderFront: renderArcSealFront,
      renderBack: renderArcSealBack
    },
    {
      slug: "horizon",
      name: "Horizon Line",
      blurb: "Linha horizontal ampla, muito espaço em branco e assinatura discreta.",
      frontTheme: "paper",
      backTheme: "paper",
      renderFront: renderHorizonFront,
      renderBack: renderHorizonBack
    },
    {
      slug: "capsule",
      name: "Capsule Index",
      blurb: "Sistema de cápsulas para destacar serviços, contactos e chamada principal.",
      frontTheme: "dark",
      backTheme: "paper",
      renderFront: renderCapsuleFront,
      renderBack: renderCapsuleBack
    },
    {
      slug: "folio",
      name: "Folio Mark",
      blurb: "Cartão com marca lateral grande, bloco editorial e verso comercial.",
      frontTheme: "paper",
      backTheme: "dark",
      renderFront: renderFolioFront,
      renderBack: renderFolioBack
    },
    {
      slug: "civic-grid",
      name: "Civic Grid",
      blurb: "Grelha elegante com cartões de contacto e leitura muito organizada.",
      frontTheme: "paper",
      backTheme: "paper",
      renderFront: renderCivicGridFront,
      renderBack: renderCivicGridBack
    },
    {
      slug: "soft-frame",
      name: "Soft Frame",
      blurb: "Moldura interna suave, centro limpo e detalhes premium nas extremidades.",
      frontTheme: "dark",
      backTheme: "paper",
      renderFront: renderSoftFrameFront,
      renderBack: renderSoftFrameBack
    }
  ];

  // Esqueletos estruturais seguros. Não são os templates prontos: são "moldes"
  // de zonas (onde cada coisa pode ir) que a geração combina livremente. O CSS
  // de cada esqueleto garante que nada encavala, vaza ou fica cortado, e o
  // texto encolhe via data-fit. A variedade vem de frente × verso × tema × paleta.
  // Declarados aqui (antes do hydrateState) porque sanitizeCustomLayout os usa
  // já na inicialização, ao restaurar um customLayout salvo.
  const GEN_SKELETONS_FRONT = ["editorial", "rail", "sidebar", "banner", "seal"];
  const GEN_SKELETONS_BACK = ["editorial", "rail", "split"];
  const GEN_SKELETON_NAMES = {
    editorial: "Editorial autoral",
    rail: "Faixa lateral",
    sidebar: "Coluna marcante",
    banner: "Cabeçalho forte",
    seal: "Selo central"
  };

  // Durante o hydrateState (abaixo) o `state` ainda está na zona morta temporal,
  // por isso a sanitização de customLayout salvo não pode ler `state`. Esta flag
  // marca quando o estado já existe; antes disso, pulamos o gating dependente de
  // estado (que é refeito no render, quando o estado já está pronto).
  let appStateReady = false;
  const state = hydrateState(loadSavedState());
  appStateReady = true;

  init();

  function init() {
    document.documentElement.lang = activeLocale;
    refs.assistantPrompt.value = getMasterPrompt();
    bindInputs();
    setupCollapsiblePanels();
    buildPresetRows();
    buildLayoutDots();
    syncFormValues();
    renderApp();
    localizeStaticUI();
  }

  function bindInputs() {
    document.querySelectorAll("[data-field]").forEach((input) => {
      input.addEventListener("input", function () {
        const field = input.dataset.field;
        state[field] = normalizeFieldValue(field, input.type === "checkbox" ? input.checked : input.value);
        autoAdjustReadableColors(field);
        saveState();
        renderApp();
      });
      input.addEventListener("change", function () {
        const field = input.dataset.field;
        state[field] = normalizeFieldValue(field, input.type === "checkbox" ? input.checked : input.value);
        autoAdjustReadableColors(field);
        saveState();
        renderApp();
      });
    });

    document.querySelectorAll("[data-service-index]").forEach((input) => {
      input.addEventListener("input", function () {
        const index = Number(input.dataset.serviceIndex);
        state.services[index] = normalizeFieldValue("service", input.value);
        saveState();
        renderApp();
      });
    });

    refs.logoInput.addEventListener("change", handleLogoInputChange);
    refs.logoDropzone.addEventListener("click", function (event) {
      if (event.target !== refs.logoInput) {
        event.preventDefault();
        refs.logoInput.click();
      }
    });
    refs.logoDropzone.addEventListener("dragover", function (event) {
      event.preventDefault();
      refs.logoDropzone.classList.add("dragover");
    });
    refs.logoDropzone.addEventListener("dragleave", function () {
      refs.logoDropzone.classList.remove("dragover");
    });
    refs.logoDropzone.addEventListener("drop", function (event) {
      event.preventDefault();
      refs.logoDropzone.classList.remove("dragover");
      const file = event.dataTransfer && event.dataTransfer.files ? event.dataTransfer.files[0] : null;
      if (file) {
        readLogoFile(file);
      }
    });
    refs.backgroundInput.addEventListener("change", handleBackgroundInputChange);
    refs.railImageInput.addEventListener("change", handleRailImageInputChange);
    refs.backgroundDropzone.addEventListener("click", function (event) {
      if (event.target !== refs.backgroundInput) {
        event.preventDefault();
        refs.backgroundInput.click();
      }
    });
    refs.backgroundDropzone.addEventListener("dragover", function (event) {
      event.preventDefault();
      refs.backgroundDropzone.classList.add("dragover");
    });
    refs.backgroundDropzone.addEventListener("dragleave", function () {
      refs.backgroundDropzone.classList.remove("dragover");
    });
    refs.backgroundDropzone.addEventListener("drop", function (event) {
      event.preventDefault();
      refs.backgroundDropzone.classList.remove("dragover");
      const file = event.dataTransfer && event.dataTransfer.files ? event.dataTransfer.files[0] : null;
      if (file) {
        readBackgroundFile(file);
      }
    });
    refs.railImageDropzone.addEventListener("click", function (event) {
      if (event.target !== refs.railImageInput) {
        event.preventDefault();
        refs.railImageInput.click();
      }
    });
    refs.railImageDropzone.addEventListener("dragover", function (event) {
      event.preventDefault();
      refs.railImageDropzone.classList.add("dragover");
    });
    refs.railImageDropzone.addEventListener("dragleave", function () {
      refs.railImageDropzone.classList.remove("dragover");
    });
    refs.railImageDropzone.addEventListener("drop", function (event) {
      event.preventDefault();
      refs.railImageDropzone.classList.remove("dragover");
      const file = event.dataTransfer && event.dataTransfer.files ? event.dataTransfer.files[0] : null;
      if (file) {
        readRailImageFile(file);
      }
    });
    refs.clearBackgroundBtn.addEventListener("click", function () {
      state.backgroundDataUrl = "";
      refs.backgroundInput.value = "";
      saveState();
      renderApp();
      showFeedback("Imagem de fundo removida.", "success");
    });
    refs.resetLogoBtn.addEventListener("click", resetLogoMedia);
    refs.clearLogoBtn.addEventListener("click", clearLogoMedia);
    refs.resetBackgroundBtn.addEventListener("click", resetBackgroundMedia);
    refs.clearRailImageBtn.addEventListener("click", clearRailImage);
    refs.enhanceBackgroundBtn.addEventListener("click", enhanceBackgroundImage);
    refs.quickCustomBtn.addEventListener("click", generateLocalDesignVariation);
    refs.retryCustomLayoutBtn.addEventListener("click", generateLocalDesignVariation);
    refs.removeCustomLayoutBtn.addEventListener("click", removeCustomLayout);
    refs.closeQuickCustomModal.addEventListener("click", closeQuickCustomModal);
    refs.quickCustomModal.addEventListener("click", function (event) {
      if (event.target === refs.quickCustomModal) {
        closeQuickCustomModal();
      }
    });
    refs.quickCopyPromptBtn.addEventListener("click", async function () {
      try {
        await navigator.clipboard.writeText(getCustomLayoutPrompt());
        showFeedback("Prompt copiado. Cola numa IA de texto ou usa como guia e volta com o bloco de dados.", "success");
      } catch (_error) {
        showFeedback("Nao consegui copiar automaticamente. Podes copiar o texto manualmente.", "warn");
      }
    });
    refs.quickDemoBtn.addEventListener("click", function () {
      refs.quickStructuredInput.value = createQuickDemoBlock();
    });
    refs.quickApplyBtn.addEventListener("click", function () {
      const applied = applyQuickCustomResponse(refs.quickStructuredInput.value);
      if (!applied) {
        return;
      }
      closeQuickCustomModal();
    });
    refs.howToUseBtn.addEventListener("click", openGuideModal);
    refs.closeGuideModal.addEventListener("click", closeGuideModal);
    refs.prevGuideStepBtn.addEventListener("click", function () {
      guideStepIndex = Math.max(0, guideStepIndex - 1);
      renderGuideStep();
    });
    refs.nextGuideStepBtn.addEventListener("click", function () {
      const lastIndex = getGuideSteps().length - 1;
      if (guideStepIndex >= lastIndex) {
        closeGuideModal();
        return;
      }
      guideStepIndex += 1;
      renderGuideStep();
    });

    refs.flipBtn.addEventListener("click", toggleFlip);
    refs.businessCardShell.addEventListener("click", toggleFlip);
    refs.businessCardShell.addEventListener("keydown", function (event) {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        toggleFlip();
      }
    });

    refs.prevLayout.addEventListener("click", function () {
      const layouts = getLayouts();
      state.layoutIndex = (state.layoutIndex - 1 + layouts.length) % layouts.length;
      state.isFlipped = false;
      saveState();
      renderApp();
    });

    refs.nextLayout.addEventListener("click", function () {
      state.layoutIndex = (state.layoutIndex + 1) % getLayouts().length;
      state.isFlipped = false;
      saveState();
      renderApp();
    });

    refs.randomizeBtn.addEventListener("click", function () {
      randomizePalette();
    });
    if (refs.paletteRandomizeBtn) {
      refs.paletteRandomizeBtn.addEventListener("click", randomizePalette);
    }

    refs.copyPromptBtn.addEventListener("click", async function () {
      try {
        await navigator.clipboard.writeText(getMasterPrompt());
        showFeedback("Prompt copiado. Agora podes colar numa IA de texto ou usar como guia.", "success");
      } catch (_error) {
        showFeedback("Nao consegui copiar automaticamente. Podes copiar o texto manualmente.", "warn");
      }
    });

    refs.applyStructuredBtn.addEventListener("click", function () {
      applyStructuredData(refs.structuredInput.value);
    });

    refs.demoDataBtn.addEventListener("click", function () {
      const demoBlock = createDemoBlock();
      refs.structuredInput.value = demoBlock;
      applyStructuredData(demoBlock);
    });

    refs.resetStateBtn.addEventListener("click", function () {
      Object.assign(state, hydrateState(DEFAULT_STATE));
      refs.structuredInput.value = "";
      syncFormValues();
      saveState();
      renderApp();
      showFeedback("Dados repostos para o exemplo base.", "success");
    });

    refs.buyCurrentBtn.addEventListener("click", function () {
      exportPackage("single");
    });

    refs.downloadTopBtn.addEventListener("click", function () {
      exportPackage("single");
    });

    refs.buyAllBtn.addEventListener("click", function () {
      exportPackage("bundle");
    });
    refs.guideModal.addEventListener("click", function (event) {
      if (event.target === refs.guideModal) {
        closeGuideModal();
      }
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && isCheckoutModalOpen()) {
        closeCheckoutModal();
      } else if (event.key === "Escape" && isGuideModalOpen()) {
        closeGuideModal();
      } else if (event.key === "Escape" && isQuickCustomModalOpen()) {
        closeQuickCustomModal();
      }
    });

  }

  function setupCollapsiblePanels() {
    const stored = readJson("studioelevatio-card-panel-state", {});
    document.querySelectorAll(".editor-sidebar .panel").forEach(function (panel, index) {
      const head = panel.querySelector(".panel-head");
      if (!head || head.querySelector(".panel-toggle")) {
        return;
      }
      const key = "panel-" + index;
      const shouldCollapse = stored[key] !== undefined ? Boolean(stored[key]) : index > 2;
      const toggle = document.createElement("button");
      toggle.type = "button";
      toggle.className = "panel-toggle";
      toggle.setAttribute("aria-label", "Minimizar painel");
      toggle.innerHTML = '<span aria-hidden="true"></span>';
      head.appendChild(toggle);
      panel.classList.toggle("is-collapsed", shouldCollapse);
      toggle.setAttribute("aria-expanded", shouldCollapse ? "false" : "true");
      toggle.addEventListener("click", function () {
        const nextCollapsed = !panel.classList.contains("is-collapsed");
        panel.classList.toggle("is-collapsed", nextCollapsed);
        toggle.setAttribute("aria-expanded", nextCollapsed ? "false" : "true");
        stored[key] = nextCollapsed;
        writeJson("studioelevatio-card-panel-state", stored);
      });
    });
  }

  function readJson(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (_error) {
      return fallback;
    }
  }

  function writeJson(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (_error) {}
  }

  function getActiveLocale() {
    const params = new URLSearchParams(window.location.search);
    return normalizeLocale(params.get("lang") || localStorage.getItem("se_locale") || document.documentElement.lang || navigator.language || "pt-PT");
  }

  function normalizeLocale(raw) {
    const value = String(raw || "").toLowerCase();
    if (value === "pt-br") return "pt-BR";
    if (value === "pt-pt") return "pt-PT";
    if (value.indexOf("pt") === 0) return "pt-PT";
    if (value.indexOf("es") === 0) return "es";
    return "en";
  }

  function currentI18n() {
    return APP_I18N[activeLocale] || null;
  }

  function uiText(source) {
    const copy = currentI18n();
    return copy && copy.text && copy.text[source] ? copy.text[source] : source;
  }

  function getMasterPrompt() {
    const prompts = {
      "pt-BR": MASTER_PROMPT
        .replace("Atua como consultor", "Atue como consultor")
        .replace("ate reunires", "até reunir")
        .replace("Quando terminares", "Quando terminar")
        .replace("- portugues europeu", "- português brasileiro")
        .replace("- devolve o bloco pronto para colar no site", "- devolva o bloco pronto para colar no site"),
      en: [
        "I want to automatically fill a Studio Elevatio business card maker.",
        "",
        "Act as a consultant and ask short questions, one at a time, until you have everything needed.",
        "Collect: business name, person name, role, short slogan, short business description, 4 main services, phone, email, website, address, city, country, Instagram, LinkedIn, accent color and base color in hexadecimal.",
        "",
        "When finished, return exactly this block, with no text before or after:",
        "",
        "[CARD_PROFILE]",
        "business_name: ",
        "person_name: ",
        "role: ",
        "tagline: ",
        "description: ",
        "services:",
        "- ",
        "- ",
        "- ",
        "- ",
        "phone: ",
        "email: ",
        "website: ",
        "address: ",
        "city: ",
        "country: ",
        "instagram: ",
        "linkedin: ",
        "accent_color: #2962FF",
        "surface_color: #0F172A",
        "[/CARD_PROFILE]",
        "",
        "Rules: concise business English, slogan under 80 characters, description under 190 characters, clear short services, use \"-\" if the client does not know a field."
      ].join("\n"),
      es: [
        "Quiero rellenar automáticamente un creador de tarjetas de visita de Studio Elevatio.",
        "",
        "Actúa como consultor y haz preguntas cortas, una por una, hasta reunir todo lo necesario.",
        "Recoge: nombre del negocio, persona, cargo, slogan corto, descripción corta, 4 servicios principales, teléfono, email, sitio web, dirección, ciudad, país, Instagram, LinkedIn, color destacado y color base en hexadecimal.",
        "",
        "Cuando termines, devuelve exactamente este bloque, sin texto antes ni después:",
        "",
        "[CARD_PROFILE]",
        "business_name: ",
        "person_name: ",
        "role: ",
        "tagline: ",
        "description: ",
        "services:",
        "- ",
        "- ",
        "- ",
        "- ",
        "phone: ",
        "email: ",
        "website: ",
        "address: ",
        "city: ",
        "country: ",
        "instagram: ",
        "linkedin: ",
        "accent_color: #2962FF",
        "surface_color: #0F172A",
        "[/CARD_PROFILE]",
        "",
        "Reglas: español claro, slogan de máximo 80 caracteres, descripción de máximo 190 caracteres, servicios cortos, usa \"-\" si el cliente no sabe un campo."
      ].join("\n")
    };
    return prompts[activeLocale] || MASTER_PROMPT;
  }

  function getCustomLayoutPrompt() {
    const components = CUSTOM_LAYOUT_COMPONENTS.join(", ");
    const profileBlock = createDemoBlock();
    const basePrompt = [
      "Quero criar um cartao de visita personalizado dentro da ferramenta Studio Elevatio.",
      "",
      "Usa apenas os componentes permitidos abaixo. Nao inventes componentes novos e nao alteres a composicao visual por codigo.",
      `Componentes permitidos: ${components}.`,
      "",
      "Escolhe uma direcao criativa clara, nao apenas uma lista de campos. Alterna hierarquia, ritmo, frente e verso conforme a marca.",
      "Escolhe uma combinacao profissional para frente e verso, usando 5 a 8 componentes por lado.",
      "O resultado nao sera salvo no sistema: sera apenas um layout local do navegador para comparar com os templates existentes.",
      "",
      "Devolve exatamente dois blocos: [CARD_PROFILE] com os dados do cliente e [CUSTOM_CARD] com a composicao escolhida.",
      "",
      "Formato obrigatorio:",
      "",
      profileBlock,
      "",
      "[CUSTOM_CARD]",
      "name: Criado pela IA",
      "direction: editorial",
      "front_theme: dark",
      "back_theme: paper",
      "front: logo | businessName | personName | role | tagline | contactChips",
      "back: badge | description | services | contactStack | qrBlock",
      "[/CUSTOM_CARD]",
      "",
      "Regras:",
      "- Mantem os valores simples, sem Markdown nos campos.",
      "- Em direction, escolhe uma destas direcoes: editorial, seal, split, minimal, impact, social.",
      "- Em [CUSTOM_CARD], usa apenas dark ou paper nos temas.",
      "- Em front/back, separa os componentes com |.",
      "- Se nao tiveres logo, usa logo mesmo assim: a ferramenta mostra iniciais automaticamente."
    ].join("\n");

    if (activeLocale === "en") {
      return basePrompt
        .replace("Quero criar um cartao de visita personalizado dentro da ferramenta Studio Elevatio.", "I want to create a custom business card inside the Studio Elevatio tool.")
        .replace("Usa apenas os componentes permitidos abaixo. Nao inventes componentes novos e nao alteres a composicao visual por codigo.", "Use only the allowed components below. Do not invent new components and do not change the visual composition with code.")
        .replace("Componentes permitidos:", "Allowed components:")
        .replace("Escolhe uma direcao criativa clara, nao apenas uma lista de campos. Alterna hierarquia, ritmo, frente e verso conforme a marca.", "Choose a clear creative direction, not just a list of fields. Vary hierarchy, rhythm, front and back according to the brand.")
        .replace("Escolhe uma combinacao profissional para frente e verso, usando 5 a 8 componentes por lado.", "Choose a professional composition for front and back, using 5 to 8 components per side.")
        .replace("O resultado nao sera salvo no sistema: sera apenas um layout local do navegador para comparar com os templates existentes.", "The result will not be saved in the system: it will be only a local browser layout to compare with the existing templates.")
        .replace("Devolve exatamente dois blocos: [CARD_PROFILE] com os dados do cliente e [CUSTOM_CARD] com a composicao escolhida.", "Return exactly two blocks: [CARD_PROFILE] with the client details and [CUSTOM_CARD] with the chosen composition.")
        .replace("Formato obrigatorio:", "Required format:")
        .replace("Criado pela IA", "Created by AI")
        .replace("Regras:", "Rules:")
        .replace("- Mantem os valores simples, sem Markdown nos campos.", "- Keep values simple, with no Markdown in fields.")
        .replace("- Em direction, escolhe uma destas direcoes: editorial, seal, split, minimal, impact, social.", "- In direction, choose one of these directions: editorial, seal, split, minimal, impact, social.")
        .replace("- Em [CUSTOM_CARD], usa apenas dark ou paper nos temas.", "- In [CUSTOM_CARD], use only dark or paper as themes.")
        .replace("- Em front/back, separa os componentes com |.", "- In front/back, separate components with |.")
        .replace("- Se nao tiveres logo, usa logo mesmo assim: a ferramenta mostra iniciais automaticamente.", "- If there is no logo, still use logo: the tool shows initials automatically.");
    }

    if (activeLocale === "es") {
      return basePrompt
        .replace("Quero criar um cartao de visita personalizado dentro da ferramenta Studio Elevatio.", "Quiero crear una tarjeta de visita personalizada dentro de la herramienta Studio Elevatio.")
        .replace("Usa apenas os componentes permitidos abaixo. Nao inventes componentes novos e nao alteres a composicao visual por codigo.", "Usa solo los componentes permitidos abajo. No inventes componentes nuevos ni cambies la composicion visual con codigo.")
        .replace("Componentes permitidos:", "Componentes permitidos:")
        .replace("Escolhe uma direcao criativa clara, nao apenas uma lista de campos. Alterna hierarquia, ritmo, frente e verso conforme a marca.", "Elige una direccion creativa clara, no solo una lista de campos. Alterna jerarquia, ritmo, frente y reverso segun la marca.")
        .replace("Escolhe uma combinacao profissional para frente e verso, usando 5 a 8 componentes por lado.", "Elige una combinacion profesional para frente y reverso, usando 5 a 8 componentes por lado.")
        .replace("O resultado nao sera salvo no sistema: sera apenas um layout local do navegador para comparar com os templates existentes.", "El resultado no se guardara en el sistema: sera solo un layout local del navegador para comparar con las plantillas existentes.")
        .replace("Devolve exatamente dois blocos: [CARD_PROFILE] com os dados do cliente e [CUSTOM_CARD] com a composicao escolhida.", "Devuelve exactamente dos bloques: [CARD_PROFILE] con los datos del cliente y [CUSTOM_CARD] con la composicion elegida.")
        .replace("Formato obrigatorio:", "Formato obligatorio:")
        .replace("Criado pela IA", "Creado por IA")
        .replace("Regras:", "Reglas:")
        .replace("- Mantem os valores simples, sem Markdown nos campos.", "- Mantén valores simples, sin Markdown en los campos.")
        .replace("- Em direction, escolhe uma destas direcoes: editorial, seal, split, minimal, impact, social.", "- En direction, elige una de estas direcciones: editorial, seal, split, minimal, impact, social.")
        .replace("- Em [CUSTOM_CARD], usa apenas dark ou paper nos temas.", "- En [CUSTOM_CARD], usa solo dark o paper como temas.")
        .replace("- Em front/back, separa os componentes com |.", "- En front/back, separa componentes con |.")
        .replace("- Se nao tiveres logo, usa logo mesmo assim: a ferramenta mostra iniciais automaticamente.", "- Si no hay logo, usa logo igualmente: la herramienta muestra iniciales automaticamente.");
    }

    return basePrompt;
  }

  function localizeStaticUI() {
    const copy = currentI18n();
    if (!copy || !copy.text) {
      return;
    }
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode: function (node) {
        const parent = node.parentElement;
        if (!parent) return NodeFilter.FILTER_REJECT;
        if (parent.closest("#businessCard, script, style, svg, textarea, input, code")) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    const nodes = [];
    while (walker.nextNode()) {
      nodes.push(walker.currentNode);
    }
    nodes.forEach(function (node) {
      const raw = node.nodeValue || "";
      const trimmed = raw.trim();
      const normalized = trimmed.replace(/\s+/g, " ");
      if (!trimmed || (!copy.text[trimmed] && !copy.text[normalized])) {
        return;
      }
      node.nodeValue = raw.replace(trimmed, copy.text[trimmed] || copy.text[normalized]);
    });
    document.querySelectorAll("input[placeholder], textarea[placeholder]").forEach(function (el) {
      const translated = copy.text[el.getAttribute("placeholder") || ""];
      if (translated) el.setAttribute("placeholder", translated);
    });
    document.querySelectorAll("[aria-label]").forEach(function (el) {
      const translated = copy.text[el.getAttribute("aria-label") || ""];
      if (translated) el.setAttribute("aria-label", translated);
    });
  }

  function getLayoutCopy(layout) {
    if (layout && layout.isAiCustom) {
      const blurb = activeLocale === "en"
        ? "Local design variation generated from the current fields. It can be remade or removed."
        : activeLocale === "es"
          ? "Variacion local generada con los campos actuales. Se puede rehacer o quitar."
          : layout.blurb;
      return { name: layout.name, blurb: blurb };
    }
    const copy = currentI18n();
    const localized = copy && copy.layouts && copy.layouts[layout.slug];
    return {
      name: localized ? localized[0] : layout.name,
      blurb: localized ? localized[1] : layout.blurb
    };
  }

  function formatLayoutSubtitle(index, total, blurb) {
    if (activeLocale === "en") {
      return `${index} of ${total} layouts. ${blurb}`;
    }
    if (activeLocale === "es") {
      return `${index} de ${total} diseños. ${blurb}`;
    }
    return `${index} de ${total} layouts. ${blurb}`;
  }

  function getGuideSteps() {
    const copy = currentI18n();
    if (copy && copy.guide) {
      return copy.guide;
    }
    return [
      ["Preenche os dados", "Começa pelo nome do negócio, pessoa, cargo, contactos e serviços. A prévia muda automaticamente."],
      ["Carrega a marca", "Adiciona o logo e, se quiseres, uma imagem de fundo. Ajusta opacidade, desfoque, cor e posição."],
      ["Escolhe o layout", "Usa as setas ou os pontos para comparar os 23 layouts. Clica no cartão para ver o verso."],
      ["Usa o prompt", "Copia o prompt para uma IA de texto ou usa como guia. Depois cola aqui o bloco estruturado."],
      ["Descarrega", "Quando o cartão estiver pronto, desbloqueia o layout atual ou o pack completo e exporta os ficheiros."]
    ];
  }

  function openGuideModal() {
    guideStepIndex = 0;
    renderGuideStep();
    refs.guideModal.hidden = false;
    document.body.classList.add("modal-open");
    requestAnimationFrame(function () {
      refs.nextGuideStepBtn.focus();
    });
  }

  function closeGuideModal() {
    refs.guideModal.hidden = true;
    document.body.classList.remove("modal-open");
  }

  function isGuideModalOpen() {
    return !refs.guideModal.hidden;
  }

  function generateLocalDesignVariation() {
    const nextLayout = createLocalDesignLayout();
    state.customLayout = nextLayout;
    state.layoutIndex = LAYOUTS.length;
    state.isFlipped = false;
    applySmartPalette();
    syncFormValues();
    buildLayoutDots();
    saveState();
    renderApp();
    showFeedback(`Nova variação local: ${nextLayout.name}. Reaproveita um layout pronto com todos os campos e gera uma paleta nova.`, "success");
  }

  function createLocalDesignLayout() {
    const prev = state.customLayout || {};
    const frontSkeleton = pickAvoiding(GEN_SKELETONS_FRONT, prev.frontSkeleton);
    const backSkeleton = pickAvoiding(GEN_SKELETONS_BACK, prev.backSkeleton);
    const darkFront = Math.random() > 0.42;
    return sanitizeCustomLayout({
      name: GEN_SKELETON_NAMES[frontSkeleton] || "Variação local",
      direction: frontSkeleton,
      frontSkeleton: frontSkeleton,
      backSkeleton: backSkeleton,
      frontTheme: darkFront ? "dark" : "paper",
      backTheme: darkFront ? "paper" : "dark",
      front: composeGeneratedFace("front"),
      back: composeGeneratedFace("back")
    });
  }

  function pickAvoiding(list, avoid) {
    const pool = list.length > 1 ? list.filter(function (item) { return item !== avoid; }) : list;
    return pick(pool.length ? pool : list);
  }

  // Distribui TODOS os campos preenchidos entre frente e verso. A frente carrega
  // identidade (marca, pessoa, slogan + contacto primário). O verso carrega
  // profundidade (descrição, serviços, contactos completos, localização, redes).
  // Assim nenhum dado preenchido desaparece do cartão.
  function composeGeneratedFace(side) {
    if (side === "front") {
      const front = ["logo", "businessName"];
      if (hasPublicValue(state.personName)) front.push("personName");
      if (hasPublicValue(state.role)) front.push("role");
      if (hasPublicValue(state.tagline)) front.push("tagline");
      front.push("contactChips");
      return front;
    }
    const back = [];
    if (hasPublicValue(state.description)) back.push("description");
    if (state.services.filter(hasPublicValue).length) back.push("services");
    back.push("contactStack");
    if (hasPublicValue(state.address) || hasPublicValue(state.city) || hasPublicValue(state.country)) back.push("location");
    if (hasPublicValue(state.instagram) || hasPublicValue(state.linkedin)) back.push("social");
    return back;
  }

  function openQuickCustomModal() {
    refs.quickStructuredInput.value = refs.structuredInput.value.trim();
    refs.quickCustomModal.hidden = false;
    document.body.classList.add("modal-open");
    requestAnimationFrame(function () {
      refs.quickStructuredInput.focus();
    });
  }

  function closeQuickCustomModal() {
    refs.quickCustomModal.hidden = true;
    document.body.classList.remove("modal-open");
  }

  function isQuickCustomModalOpen() {
    return !refs.quickCustomModal.hidden;
  }

  function createDemoBlock() {
    return [
      "[CARD_PROFILE]",
      "business_name: OportuniPT",
      "person_name: Equipa Comercial",
      "role: Plataforma de serviços em Portugal",
      "tagline: Encontre o serviço certo sem perder tempo.",
      "description: Ligamos empresas e particulares a prestadores de servicos com perfis claros, contacto direto e mais velocidade na escolha.",
      "services:",
      "- Ligação entre clientes e prestadores",
      "- Perfis com contacto direto",
      "- Candidaturas e pedidos rapidos",
      "- Presenca digital organizada",
      "phone: +351 XXX XXX XXX",
      "email: contato@studioelevatio.com",
      "website: oportunipt.com",
      "address: Rua da Plataforma, 8",
      "city: Coimbra",
      "country: Portugal",
      "instagram: @oportunipt",
      "linkedin: OportuniPT",
      "accent_color: #00A86B",
      "surface_color: #0B1731",
      "[/CARD_PROFILE]"
    ].join("\n");
  }

  function createQuickDemoBlock() {
    return [
      createDemoBlock(),
      "",
      "[CUSTOM_CARD]",
      "name: Criado pela IA",
      "direction: split",
      "front_theme: dark",
      "back_theme: paper",
      "front: logo | badge | businessName | personName | role | accentLine | contactChips",
      "back: tagline | description | services | dividerLine | contactStack | qrBlock",
      "[/CUSTOM_CARD]"
    ].join("\n");
  }

  function renderGuideStep() {
    const steps = getGuideSteps();
    const step = steps[guideStepIndex] || steps[0];
    refs.guideModalEyebrow.textContent = uiText("Tutorial rápido");
    refs.guideModalTitle.textContent = uiText("Como criar o cartão");
    refs.guideModalText.textContent = uiText("Segue estes passos para gerar um cartão profissional em poucos minutos.");
    refs.guideProgress.textContent = activeLocale === "en"
      ? `${guideStepIndex + 1} of ${steps.length}`
      : `${guideStepIndex + 1} de ${steps.length}`;
    refs.guideStepTitle.textContent = step[0];
    refs.guideStepText.textContent = step[1];
    refs.prevGuideStepBtn.disabled = guideStepIndex === 0;
    refs.prevGuideStepBtn.textContent = uiText("Anterior");
    refs.nextGuideStepBtn.textContent = guideStepIndex >= steps.length - 1
      ? uiText("Continuar")
      : uiText("Próximo");
  }

  function renderApp() {
    syncColorLabels();
    renderModeMeta();
    renderLogoPreview();
    renderBrandFontPreview();
    renderBackgroundPreview();
    renderRailImagePreview();
    renderLayoutMeta();
    renderLayoutDotsState();
    renderPurchaseButtons();
    renderPreviewCard();
    localizeStaticUI();
  }

  function renderModeMeta() {
    if (state.unlock && state.unlock.kind === "bundle") {
      setCheckoutStatus("Pack completo desbloqueado neste dispositivo.");
    } else if (state.unlock && state.unlock.kind === "single") {
      setCheckoutStatus("Layout atual desbloqueado neste dispositivo.");
    }

    if (refs.feedbackBar && !refs.feedbackBar.dataset.userMessage) {
      if (state.unlock && state.unlock.kind === "bundle") {
        showFeedback("O pack completo já está desbloqueado. Podes descarregar qualquer variação quando quiseres.", "success", false);
        return;
      }

      if (state.unlock && state.unlock.kind === "single" && Number(state.unlock.layoutIndex) === state.layoutIndex) {
        showFeedback("Este layout já está desbloqueado. Quando quiseres, podes descarregar os ficheiros de impressão.", "success", false);
        return;
      }

      showFeedback("Edita os dados, compara os layouts e descarrega quando o cartão estiver perfeito.", "", false);
    }
  }

  function renderLayoutMeta() {
    const layout = currentLayout();
    const copy = getLayoutCopy(layout);
    const layouts = getLayouts();
    refs.layoutTitle.textContent = copy.name;
    refs.layoutSubtitle.textContent = formatLayoutSubtitle(state.layoutIndex + 1, layouts.length, copy.blurb);
    refs.cardSideLabel.textContent = state.isFlipped ? uiText("Verso") : uiText("Frente");
  }

  function renderPreviewCard() {
    const layout = currentLayout();
    const faceStyle = buildFaceStyleVars();
    const hasBg = Boolean(state.backgroundDataUrl);
    refs.businessCard.classList.toggle("is-flipped", state.isFlipped);
    refs.businessCard.innerHTML = [
      `<section class="card-face card-face--front theme-${layout.frontTheme} layout--${layout.slug} ${hasBg ? "has-custom-bg" : ""}" style="${faceStyle}">`,
      renderCardBackgroundLayer(),
      `<div class="card-face-inner">`,
      layout.renderFront(state),
      `</div>`,
      "</section>",
      `<section class="card-face card-face--back theme-${layout.backTheme} layout--${layout.slug}-back ${hasBg ? "has-custom-bg" : ""}" style="${faceStyle}">`,
      renderCardBackgroundLayer(),
      `<div class="card-face-inner">`,
      layout.renderBack(state),
      `</div>`,
      "</section>"
    ].join("");

    requestAnimationFrame(function () {
      fitTextBlocks(refs.businessCard);
    });
  }

  function renderLogoPreview() {
    if (!state.logoDataUrl) {
      refs.logoPreview.innerHTML = `<span>${escapeHtml(uiText("Sem logo carregado"))}</span>`;
      return;
    }
    refs.logoPreview.innerHTML = `<img src="${state.logoDataUrl}" alt="${escapeHtml(uiText("Logo carregado"))}" />`;
  }

  function renderBrandFontPreview() {
    if (!refs.brandFontPreview) {
      return;
    }
    refs.brandFontPreview.textContent = state.brandText || state.businessName || "Studio Elevatio";
    refs.brandFontPreview.style.fontFamily = `"${safeFontName(state.brandFont)}", "Manrope", sans-serif`;
  }

  function renderBackgroundPreview() {
    if (!state.backgroundDataUrl) {
      refs.backgroundPreview.innerHTML = `<span>${escapeHtml(uiText("Sem fundo carregado"))}</span>`;
      return;
    }
    refs.backgroundPreview.innerHTML = `<img src="${state.backgroundDataUrl}" alt="${escapeHtml(uiText("Imagem de fundo carregada"))}" />`;
  }

  function renderRailImagePreview() {
    if (!state.railImageDataUrl) {
      refs.railImagePreview.innerHTML = `<span>${escapeHtml(uiText("Sem imagem de faixa"))}</span>`;
      return;
    }
    refs.railImagePreview.innerHTML = `<img src="${state.railImageDataUrl}" alt="${escapeHtml(uiText("Imagem da faixa"))}" />`;
  }

  function renderCardBackgroundLayer() {
    if (!state.backgroundDataUrl) {
      return "";
    }
    const url = escapeHtml(state.backgroundDataUrl).replace(/"/g, "&quot;");
    const blur = clampNumber(state.backgroundBlur, 0, 18, DEFAULT_STATE.backgroundBlur);
    const overlay = rgbaFromHex(state.backgroundOverlayColor, clampNumber(state.backgroundOverlayOpacity, 0, 100, 0) / 100);
    const style = [
      `--bg-opacity:${clampNumber(state.backgroundOpacity, 0, 100, DEFAULT_STATE.backgroundOpacity) / 100}`,
      `--bg-blur:${blur}px`,
      `--bg-scale:${blur ? 1.04 : 1}`,
      `--bg-darken:${clampNumber(state.backgroundDarken, 0, 90, DEFAULT_STATE.backgroundDarken) / 100}`,
      `--bg-grain:${clampNumber(state.backgroundGrain, 0, 55, DEFAULT_STATE.backgroundGrain) / 100}`,
      `--bg-saturation:${clampNumber(state.backgroundSaturation, 40, 160, DEFAULT_STATE.backgroundSaturation) / 100}`,
      `--bg-contrast:${clampNumber(state.backgroundContrast, 60, 160, DEFAULT_STATE.backgroundContrast) / 100}`,
      `--bg-overlay:${overlay}`
    ].join(";");
    return `<div class="card-custom-bg" style="${style};background-image:url(&quot;${url}&quot;)"></div><div class="card-custom-bg-tint" style="${style}"></div><div class="card-custom-grain" style="${style}"></div>`;
  }

  function renderPurchaseButtons() {
    refs.quickCustomBtn.hidden = Boolean(state.customLayout);
    refs.retryCustomLayoutBtn.hidden = !state.customLayout;
    refs.removeCustomLayoutBtn.hidden = !state.customLayout;
    refs.quickCustomBtn.textContent = "Gerar design";
    refs.retryCustomLayoutBtn.textContent = "Refazer design";
    refs.removeCustomLayoutBtn.textContent = "Remover variação";
    refs.buyCurrentBtn.disabled = false;
    refs.buyAllBtn.disabled = false;
    refs.buyCurrentBtn.textContent = canExportPackage("single") ? uiText("Descarregar ficheiros agora") : uiText("Descarregar layout atual");
    refs.buyAllBtn.textContent = canExportPackage("bundle") ? uiText("Descarregar pack completo") : uiText("Pack completo");
  }

  function applySmartPalette() {
    const accent = pick(ACCENT_PRESETS);
    const surface = pick(SURFACE_PRESETS);
    const paper = pick(PAPER_PRESETS);
    const darkSurface = relativeLuminance(surface) < 0.42;
    const lightPaper = relativeLuminance(paper) > 0.56;

    state.accentColor = accent;
    state.surfaceColor = surface;
    state.paperColor = paper;
    state.paperAltColor = mixColors(paper, accent, lightPaper ? 0.10 : 0.18);
    state.panelColor = mixColors(paper, lightPaper ? surface : "#FFFFFF", lightPaper ? 0.05 : 0.12);
    state.chipColor = mixColors(lightPaper ? "#FFFFFF" : surface, accent, lightPaper ? 0.12 : 0.20);
    state.textDarkColor = lightPaper ? "#10131B" : bestTextColor(paper);
    state.textLightColor = darkSurface ? "#F7F9FF" : "#10131B";
  }

  function randomizePalette() {
    applySmartPalette();
    syncFormValues();
    saveState();
    renderApp();
    showFeedback("Paleta inteligente aplicada com contraste automático.", "success");
  }

  function pick(list) {
    return list[Math.floor(Math.random() * list.length)] || list[0];
  }

  function buildPresetRows() {
    refs.accentPresets.innerHTML = ACCENT_PRESETS.map(function (color) {
      return `<button type="button" class="swatch" data-swatch-type="accent" data-swatch-color="${color}" style="background:${color}" aria-label="Usar ${color}"></button>`;
    }).join("");

    refs.surfacePresets.innerHTML = SURFACE_PRESETS.map(function (color) {
      return `<button type="button" class="swatch" data-swatch-type="surface" data-swatch-color="${color}" style="background:${color}" aria-label="Usar ${color}"></button>`;
    }).join("");

    document.querySelectorAll("[data-swatch-type]").forEach(function (button) {
      button.addEventListener("click", function () {
        const target = button.dataset.swatchType === "accent" ? "accentColor" : "surfaceColor";
        state[target] = button.dataset.swatchColor;
        autoAdjustReadableColors(target);
        syncFormValues();
        saveState();
        renderApp();
      });
    });
  }

  function autoAdjustReadableColors(changedField) {
    if (changedField === "surfaceColor") {
      state.textLightColor = bestTextColor(state.surfaceColor);
      state.chipColor = mixColors(relativeLuminance(state.surfaceColor) > 0.5 ? "#FFFFFF" : state.surfaceColor, state.accentColor, 0.16);
    }
    if (changedField === "paperColor" || changedField === "paperAltColor") {
      state.textDarkColor = bestTextColor(state.paperColor);
      state.panelColor = mixColors(state.paperColor, state.accentColor, 0.06);
    }
    if (changedField === "accentColor") {
      state.paperAltColor = mixColors(state.paperColor, state.accentColor, 0.12);
      state.chipColor = mixColors(relativeLuminance(state.surfaceColor) > 0.5 ? "#FFFFFF" : state.surfaceColor, state.accentColor, 0.16);
    }
  }

  function buildLayoutDots() {
    const layouts = getLayouts();
    refs.layoutDots.innerHTML = layouts.map(function (layout, index) {
      const copy = getLayoutCopy(layout);
      const customClass = layout.isAiCustom ? " dot-btn--ai-custom" : "";
      return `<button type="button" class="dot-btn${customClass}" data-layout-index="${index}" aria-label="${escapeHtml(uiText("Selecionar"))} ${escapeHtml(copy.name)}" title="${escapeHtml(copy.name)}"></button>`;
    }).join("");

    refs.layoutDots.querySelectorAll("[data-layout-index]").forEach(function (button) {
      button.addEventListener("click", function () {
        state.layoutIndex = Number(button.dataset.layoutIndex);
        state.isFlipped = false;
        saveState();
        renderApp();
      });
    });
  }

  function renderLayoutDotsState() {
    refs.layoutDots.querySelectorAll("[data-layout-index]").forEach(function (button) {
      button.classList.toggle("active", Number(button.dataset.layoutIndex) === state.layoutIndex);
    });
  }

  function syncFormValues() {
    Object.keys(DEFAULT_STATE).forEach(function (key) {
      const input = document.querySelector(`[data-field="${key}"]`);
      if (!input) {
        return;
      }
      if (input.type === "checkbox") {
        input.checked = Boolean(state[key]);
      } else {
        input.value = state[key] != null ? state[key] : "";
      }
    });

    document.querySelectorAll("[data-service-index]").forEach(function (input) {
      const index = Number(input.dataset.serviceIndex);
      input.value = state.services[index] || "";
    });

    syncColorLabels();
  }

  function syncColorLabels() {
    refs.accentColorValue.textContent = state.accentColor;
    refs.surfaceColorValue.textContent = state.surfaceColor;
    if (refs.paperColorValue) refs.paperColorValue.textContent = state.paperColor;
    if (refs.paperAltColorValue) refs.paperAltColorValue.textContent = state.paperAltColor;
    if (refs.textDarkColorValue) refs.textDarkColorValue.textContent = state.textDarkColor;
    if (refs.textLightColorValue) refs.textLightColorValue.textContent = state.textLightColor;
    if (refs.chipColorValue) refs.chipColorValue.textContent = state.chipColor;
    if (refs.panelColorValue) refs.panelColorValue.textContent = state.panelColor;
  }

  function handleLogoInputChange(event) {
    const file = event.target.files && event.target.files[0] ? event.target.files[0] : null;
    if (file) {
      readLogoFile(file);
    }
  }

  function readLogoFile(file) {
    if (!/^image\//i.test(file.type || "")) {
      showFeedback("Escolhe uma imagem válida para o logo.", "warn");
      return;
    }
    const reader = new FileReader();
    reader.onload = function () {
      state.logoDataUrl = String(reader.result || "");
      state.logoVisible = true;
      refs.logoInput.value = "";
      saveState();
      renderApp();
      showFeedback("Logo carregado com sucesso.", "success");
    };
    reader.onerror = function () {
      showFeedback("Nao consegui ler o ficheiro do logo.", "error");
    };
    reader.readAsDataURL(file);
  }

  function handleBackgroundInputChange(event) {
    const file = event.target.files && event.target.files[0] ? event.target.files[0] : null;
    if (file) {
      readBackgroundFile(file);
    }
  }

  function handleRailImageInputChange(event) {
    const file = event.target.files && event.target.files[0] ? event.target.files[0] : null;
    if (file) {
      readRailImageFile(file);
    }
  }

  function readBackgroundFile(file) {
    if ((file.type || "") && !/^image\//i.test(file.type || "")) {
      showFeedback("Escolhe uma imagem válida para o fundo.", "warn");
      return;
    }
    const reader = new FileReader();
    reader.onload = function () {
      prepareBackgroundDataUrl(String(reader.result || ""), function (dataUrl) {
        state.backgroundDataUrl = dataUrl;
        refs.backgroundInput.value = "";
        syncFormValues();
        saveState();
        renderApp();
        showFeedback("Imagem de fundo aplicada ao cartão.", "success");
      });
    };
    reader.onerror = function () {
      showFeedback("Nao consegui ler a imagem de fundo.", "error");
    };
    reader.readAsDataURL(file);
  }

  function readRailImageFile(file) {
    if ((file.type || "") && !/^image\//i.test(file.type || "")) {
      showFeedback("Escolhe uma imagem válida para a faixa.", "warn");
      return;
    }
    const reader = new FileReader();
    reader.onload = function () {
      prepareBackgroundDataUrl(String(reader.result || ""), function (dataUrl) {
        state.railImageDataUrl = dataUrl;
        refs.railImageInput.value = "";
        syncFormValues();
        saveState();
        renderApp();
        showFeedback("Imagem aplicada ao bloco lateral.", "success");
      });
    };
    reader.onerror = function () {
      showFeedback("Nao consegui ler a imagem da faixa.", "error");
    };
    reader.readAsDataURL(file);
  }

  function prepareBackgroundDataUrl(src, done) {
    const img = new Image();
    img.onload = function () {
      const maxSide = 1800;
      const scale = Math.min(1, maxSide / Math.max(img.width, img.height));
      const width = Math.max(1, Math.round(img.width * scale));
      const height = Math.max(1, Math.round(img.height * scale));
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(img, 0, 0, width, height);
      done(canvas.toDataURL("image/jpeg", 0.9));
    };
    img.onerror = function () {
      done(src);
    };
    img.src = src;
  }

  function resetLogoMedia() {
    ["logoVisible", "brandTextVisible", "brandText", "brandFont", "brandTextScale", "logoInvert", "logoFrameVisible", "logoFrameShape", "logoBackgroundColor", "logoOpacity", "logoScale", "logoBadgeScale", "logoX", "logoY", "logoPadding", "logoRadius"].forEach(function (key) {
      state[key] = DEFAULT_STATE[key];
    });
    syncFormValues();
    saveState();
    renderApp();
    showFeedback("Logo voltou ao padrão.", "success");
  }

  function clearLogoMedia() {
    state.logoDataUrl = "";
    state.logoVisible = false;
    refs.logoInput.value = "";
    ["brandTextVisible", "brandText", "brandFont", "brandTextScale", "logoInvert", "logoFrameVisible", "logoFrameShape", "logoBackgroundColor", "logoOpacity", "logoScale", "logoBadgeScale", "logoX", "logoY", "logoPadding", "logoRadius"].forEach(function (key) {
      state[key] = DEFAULT_STATE[key];
    });
    syncFormValues();
    saveState();
    renderApp();
    showFeedback("Logo removido e controlos repostos.", "success");
  }

  function resetBackgroundMedia() {
    state.backgroundDataUrl = "";
    refs.backgroundInput.value = "";
    ["backgroundOpacity", "backgroundBlur", "backgroundDarken", "backgroundGrain", "backgroundSaturation", "backgroundContrast", "backgroundOverlayColor", "backgroundOverlayOpacity"].forEach(function (key) {
      state[key] = DEFAULT_STATE[key];
    });
    syncFormValues();
    saveState();
    renderApp();
    showFeedback("Fundo removido e controlos repostos.", "success");
  }

  function clearRailImage() {
    state.railImageDataUrl = "";
    refs.railImageInput.value = "";
    ["railImageOpacity", "railImageDarken"].forEach(function (key) {
      state[key] = DEFAULT_STATE[key];
    });
    syncFormValues();
    saveState();
    renderApp();
    showFeedback("Imagem da faixa removida.", "success");
  }

  function enhanceBackgroundImage() {
    if (!state.backgroundDataUrl) {
      showFeedback("Carrega uma imagem de fundo antes de melhorar a definição.", "warn");
      return;
    }
    const img = new Image();
    img.onload = function () {
      const maxSide = 1800;
      const scale = Math.min(1.8, Math.max(1, maxSide / Math.max(img.width, img.height)));
      const width = Math.round(img.width * scale);
      const height = Math.round(img.height * scale);
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.filter = "contrast(1.08) saturate(1.06)";
      ctx.drawImage(img, 0, 0, width, height);
      sharpenCanvas(ctx, width, height, 0.28);
      state.backgroundDataUrl = canvas.toDataURL("image/jpeg", 0.92);
      state.backgroundContrast = Math.max(Number(state.backgroundContrast) || 104, 108);
      state.backgroundSaturation = Math.max(Number(state.backgroundSaturation) || 92, 102);
      syncFormValues();
      saveState();
      renderApp();
      showFeedback("Imagem de fundo melhorada localmente.", "success");
    };
    img.onerror = function () {
      showFeedback("Nao consegui processar esta imagem.", "error");
    };
    img.src = state.backgroundDataUrl;
  }

  function sharpenCanvas(ctx, width, height, amount) {
    const source = ctx.getImageData(0, 0, width, height);
    const src = source.data;
    const output = ctx.createImageData(width, height);
    const dst = output.data;
    const center = 1 + 4 * amount;
    const side = -amount;
    for (let y = 0; y < height; y += 1) {
      for (let x = 0; x < width; x += 1) {
        const i = (y * width + x) * 4;
        for (let c = 0; c < 3; c += 1) {
          const left = x > 0 ? i - 4 + c : i + c;
          const right = x < width - 1 ? i + 4 + c : i + c;
          const up = y > 0 ? i - width * 4 + c : i + c;
          const down = y < height - 1 ? i + width * 4 + c : i + c;
          dst[i + c] = Math.max(0, Math.min(255, src[i + c] * center + (src[left] + src[right] + src[up] + src[down]) * side));
        }
        dst[i + 3] = src[i + 3];
      }
    }
    ctx.putImageData(output, 0, 0);
  }

  function toggleFlip() {
    state.isFlipped = !state.isFlipped;
    saveState();
    renderApp();
  }

  function normalizeFieldValue(field, value) {
    const trimmed = String(value || "").replace(/\s{2,}/g, " ").trim();
    if (/^(accent|surface|paper|paperAlt|textDark|textLight|chip|panel)Color$/.test(field)) {
      return normalizeHexColor(trimmed, DEFAULT_STATE[field]);
    }
    if (field === "logoVisible" || field === "logoFrameVisible" || field === "brandTextVisible" || field === "logoInvert") {
      return Boolean(value);
    }
    if (field === "brandFont") {
      return BRAND_FONTS.includes(trimmed) ? trimmed : DEFAULT_STATE.brandFont;
    }
    if (field === "brandText") {
      return trimmed.slice(0, 42);
    }
    if (field === "logoFrameShape") {
      return ["none", "rounded", "circle"].includes(trimmed) ? trimmed : DEFAULT_STATE.logoFrameShape;
    }
    if (field === "logoBackgroundColor") {
      return normalizeHexColor(trimmed, DEFAULT_STATE.logoBackgroundColor);
    }
    if (/^(logo|background|railImage)(Opacity|Scale|BadgeScale|X|Y|Padding|Radius|Blur|Darken|Grain|Saturation|Contrast)$/.test(field) || field === "brandTextScale") {
      const bounds = {
        logoOpacity: [20, 100],
        logoScale: [40, 320],
        logoBadgeScale: [55, 220],
        logoX: [-40, 40],
        logoY: [-40, 40],
        logoPadding: [0, 40],
        logoRadius: [0, 60],
        brandTextScale: [60, 170],
        backgroundOpacity: [0, 100],
        backgroundBlur: [0, 18],
        backgroundDarken: [0, 90],
        backgroundGrain: [0, 55],
        backgroundSaturation: [40, 160],
        backgroundContrast: [60, 160],
        railImageOpacity: [10, 100],
        railImageDarken: [0, 80]
      }[field] || [0, 100];
      return clampNumber(trimmed, bounds[0], bounds[1], DEFAULT_STATE[field]);
    }
    if (field === "backgroundOverlayColor") {
      return normalizeHexColor(trimmed, DEFAULT_STATE.backgroundOverlayColor);
    }
    return trimmed;
  }

  function currentLayout() {
    const layouts = getLayouts();
    if (!layouts[state.layoutIndex]) {
      state.layoutIndex = 0;
    }
    return layouts[state.layoutIndex] || LAYOUTS[0];
  }

  function getLayouts() {
    const custom = sanitizeCustomLayout(state.customLayout);
    return custom ? LAYOUTS.concat([createCustomLayoutDefinition(custom)]) : LAYOUTS;
  }

  function createCustomLayoutDefinition(custom) {
    return {
      slug: "ai-custom",
      name: custom.name || "Variação local",
      blurb: "Variação local criada a partir dos campos preenchidos. Pode ser refeita ou removida.",
      frontTheme: custom.frontTheme,
      backTheme: custom.backTheme,
      direction: custom.direction,
      isAiCustom: true,
      renderFront: renderAiCustomFront,
      renderBack: renderAiCustomBack
    };
  }

  function isCheckoutModalOpen() {
    return false;
  }

  function closeCheckoutModal() {
    document.body.classList.remove("modal-open");
  }

  function canExportPackage(packageType) {
    return true;
  }

  async function exportPackage(packageType) {
    const layouts = getLayouts();
    const layoutIndexes = packageType === "bundle"
      ? layouts.map(function (_layout, index) { return index; })
      : [state.layoutIndex];

    try {
      setCheckoutStatus("A gerar o PDF.");
      showFeedback("A gerar o PDF em alta resolucao. Aguarda um momento.", "warn");
      const deps = await loadPdfDependencies();
      const exportBase = packageType === "bundle"
        ? slugify(state.businessName) + "-pack-cartoes-visita"
        : createSingleBaseName(currentLayout());

      // 1 PDF: frente na pagina 1, verso na pagina 2 (por layout no caso do bundle)
      const pdf = new deps.jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: [APP_CONFIG.export.cardWidthMm, APP_CONFIG.export.cardHeightMm],
        compress: true
      });

      let firstPage = true;
      for (let i = 0; i < layoutIndexes.length; i += 1) {
        const layout = layouts[layoutIndexes[i]];
        const frontImage = await renderFaceToDataUrl(layout, "front");
        const backImage = await renderFaceToDataUrl(layout, "back");

        if (!firstPage) {
          pdf.addPage([APP_CONFIG.export.cardWidthMm, APP_CONFIG.export.cardHeightMm], "landscape");
        }
        firstPage = false;

        pdf.addImage(frontImage, "PNG", 0, 0, APP_CONFIG.export.cardWidthMm, APP_CONFIG.export.cardHeightMm, undefined, "NONE");
        pdf.addPage([APP_CONFIG.export.cardWidthMm, APP_CONFIG.export.cardHeightMm], "landscape");
        pdf.addImage(backImage, "PNG", 0, 0, APP_CONFIG.export.cardWidthMm, APP_CONFIG.export.cardHeightMm, undefined, "NONE");
      }

      pdf.save(exportBase + ".pdf");
      setCheckoutStatus("PDF gerado com sucesso.");
      showFeedback("O teu PDF esta pronto. Frente na pagina 1, verso na pagina 2.", "success");
    } catch (error) {
      setCheckoutStatus("Falha ao gerar PDF.");
      showFeedback(error.message || "Nao consegui gerar o PDF de impressao.", "error");
    }
  }

  async function loadPdfDependencies() {
    if (pdfDependenciesPromise) {
      return pdfDependenciesPromise;
    }

    pdfDependenciesPromise = Promise.all([
      // html-to-image: usa SVG foreignObject — o browser renderiza o CSS nativo
      // incluindo container-query units (cqi), gradientes, variaveis CSS, tudo.
      loadScript("https://cdnjs.cloudflare.com/ajax/libs/html-to-image/1.11.11/html-to-image.min.js"),
      loadScript("https://cdn.jsdelivr.net/npm/jspdf@2.5.1/dist/jspdf.umd.min.js")
    ]).then(function () {
      if (!window.htmlToImage || !window.jspdf || !window.jspdf.jsPDF) {
        throw new Error("As bibliotecas de exportacao nao ficaram disponiveis.");
      }
      return { jsPDF: window.jspdf.jsPDF };
    });

    return pdfDependenciesPromise;
  }

  function loadScript(src) {
    return new Promise(function (resolve, reject) {
      if (document.querySelector(`script[data-external="${src}"]`)) {
        resolve();
        return;
      }

      const script = document.createElement("script");
      script.src = src;
      script.async = true;
      script.dataset.external = src;
      script.onload = resolve;
      script.onerror = function () {
        reject(new Error(`Falha ao carregar ${src}`));
      };
      document.head.appendChild(script);
    });
  }

  async function renderFaceToDataUrl(layout, side) {
    const PX_PER_MM = 96 / 25.4;
    const cardWidthPx = Math.round(APP_CONFIG.export.cardWidthMm * PX_PER_MM);
    const cardHeightPx = Math.round(APP_CONFIG.export.cardHeightMm * PX_PER_MM);
    const isMobile = /Mobi|Android|iPhone|iPad|iPod/.test(navigator.userAgent) || (navigator.maxTouchPoints && navigator.maxTouchPoints > 0);
    const pixelRatio = APP_CONFIG.export.renderScale;

    const faceVars = buildFaceStyleVars();
    const theme = side === "front" ? layout.frontTheme : layout.backTheme;
    const slug = side === "front" ? layout.slug : (layout.slug + "-back");
    const content = side === "front" ? layout.renderFront(state) : layout.renderBack(state);

    // Elemento fora de ecra com dimensoes explicitas.
    // html-to-image usa SVG foreignObject: o browser renderiza o CSS nativamente,
    // incluindo container-query units (cqi), gradientes e variaveis CSS.
    // Com width explicito no elemento .card-face (que tem container-type:inline-size),
    // o browser resolve 1cqi = cardWidthPx/100 antes de html-to-image o capturar.
    const wrapper = document.createElement("div");
    wrapper.style.cssText = "position:fixed;left:-99999px;top:0;"
      + "width:" + cardWidthPx + "px;height:" + cardHeightPx + "px;"
      + "overflow:hidden;pointer-events:none;";

    const face = document.createElement("section");
    face.className = "card-face theme-" + theme + " layout--" + slug + (state.backgroundDataUrl ? " has-custom-bg" : "");
    // border-radius e box-shadow removidos para exportacao:
    // em PDF para grafica o cartao preenche a pagina borda a borda — o printer corta.
    // Cantos arredondados com fundo branco a aparecer seria erro de impressao.
    face.style.cssText = faceVars
      + ";width:" + cardWidthPx + "px"
      + ";height:" + cardHeightPx + "px"
      + ";position:absolute;inset:0"
      + ";transform:none"
      + ";backface-visibility:visible;-webkit-backface-visibility:visible"
      + ";opacity:1"
      + ";border-radius:0"
      + ";box-shadow:none"
      + ";border:none";
    face.innerHTML = renderCardBackgroundLayer() + "<div class=\"card-face-inner\" style=\"border-radius:0\">" + content + "</div>";

    wrapper.appendChild(face);
    document.body.appendChild(wrapper);

    // Ajustar tamanho do texto (nomes longos, etc.)
    fitTextBlocks(wrapper);

    // Aguardar layout e fontes
    try {
      if (document.fonts && document.fonts.ready) await document.fonts.ready;
    } catch (_e) {}
    await new Promise(function (r) { requestAnimationFrame(r); });
    await new Promise(function (r) { requestAnimationFrame(r); });

    try {
      const dataUrl = await window.htmlToImage.toPng(face, {
        pixelRatio: pixelRatio,
        width: cardWidthPx,
        height: cardHeightPx,
        skipAutoScale: true,
        cacheBust: true
      });
      wrapper.remove();
      return dataUrl;
    } catch (err) {
      wrapper.remove();
      throw new Error("Erro ao gerar imagem da face: " + (err.message || err));
    }
  }

  function createSingleBaseName(layout) {
    return `${slugify(state.businessName)}-${slugify(layout.name)}-cartao-visita`;
  }

  function createLayoutFolderName(layout) {
    return `${String(getLayouts().indexOf(layout) + 1).padStart(2, "0")}-${slugify(layout.name)}`;
  }

  function downloadBlob(blob, filename) {
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(function () {
      URL.revokeObjectURL(url);
    }, 1200);
  }

  function fitTextBlocks(root) {
    root.querySelectorAll("[data-fit]").forEach(function (element) {
      element.style.fontSize = "";
      element.style.lineHeight = "";
      let iterations = 0;
      let size = parseFloat(window.getComputedStyle(element).fontSize);
      const min = Number(element.dataset.min || 10);

      while ((element.scrollHeight > element.clientHeight + 1 || element.scrollWidth > element.clientWidth + 1) && size > min && iterations < 24) {
        size -= 0.6;
        element.style.fontSize = `${size}px`;
        element.style.lineHeight = `${Math.max(size * 1.12, min)}px`;
        iterations += 1;
      }
    });
  }

  function waitForImages(root) {
    const images = Array.from(root.querySelectorAll("img"));
    return Promise.all(images.map(function (img) {
      if (img.complete) {
        return Promise.resolve();
      }
      return new Promise(function (resolve) {
        img.onload = resolve;
        img.onerror = resolve;
      });
    }));
  }

  function nextFrame() {
    return new Promise(function (resolve) {
      requestAnimationFrame(function () {
        requestAnimationFrame(resolve);
      });
    });
  }

  function applyStructuredData(rawInput) {
    const parsed = parseStructuredData(rawInput);
    const parsedCustomLayout = parseCustomCard(rawInput);
    if (!parsed && !parsedCustomLayout) {
      showFeedback("Nao encontrei [CARD_PROFILE] nem [CUSTOM_CARD] validos para aplicar.", "error");
      return;
    }

    if (parsed) {
      applyParsedProfile(parsed);
    }
    if (parsedCustomLayout) {
      state.customLayout = parsedCustomLayout;
      state.layoutIndex = LAYOUTS.length;
      state.isFlipped = false;
      buildLayoutDots();
    }
    syncFormValues();
    saveState();
    renderApp();
    showFeedback(parsedCustomLayout
      ? "Dados e cartão personalizado aplicados. O ponto verde ficou pronto para comparar."
      : "Os campos foram preenchidos automaticamente a partir do bloco colado.",
      "success");
  }

  function applyParsedProfile(parsed) {
    Object.keys(parsed.fields).forEach(function (key) {
      state[key] = parsed.fields[key];
    });

    state.services = parsed.services.concat(new Array(4)).slice(0, 4).map(function (item, index) {
      return item || DEFAULT_STATE.services[index] || "";
    });
  }

  function applyQuickCustomResponse(rawInput) {
    const parsedProfile = parseStructuredData(rawInput);
    const parsedCustomLayout = parseCustomCard(rawInput);

    if (!parsedProfile && !parsedCustomLayout) {
      showFeedback("Nao encontrei [CARD_PROFILE] nem [CUSTOM_CARD] validos para aplicar.", "error");
      return false;
    }

    if (parsedProfile) {
      applyParsedProfile(parsedProfile);
    }

    if (parsedCustomLayout) {
      state.customLayout = parsedCustomLayout;
      state.layoutIndex = LAYOUTS.length;
      state.isFlipped = false;
      buildLayoutDots();
    }

    refs.structuredInput.value = rawInput.trim();
    syncFormValues();
    saveState();
    renderApp();
    showFeedback(parsedCustomLayout
      ? "Cartao personalizado criado neste navegador. O ponto verde pode ser removido quando quiseres."
      : "Dados aplicados ao cartao atual. Para criar o ponto verde, inclui tambem o bloco [CUSTOM_CARD].",
      "success");
    return true;
  }

  function removeCustomLayout() {
    state.customLayout = null;
    if (state.layoutIndex >= LAYOUTS.length) {
      state.layoutIndex = 0;
    }
    state.isFlipped = false;
    buildLayoutDots();
    saveState();
    renderApp();
    showFeedback("Layout criado pela IA removido deste navegador.", "success");
  }

  function parseStructuredData(rawInput) {
    if (!rawInput || !rawInput.trim()) {
      return null;
    }

    // Aceita bloco com ou sem triple backticks (```text ... ```)
    const stripped = stripCodeFences(rawInput);
    const blockMatch = stripped.match(/\[CARD_PROFILE\]([\s\S]*?)\[\/CARD_PROFILE\]/i);
    const source = blockMatch ? blockMatch[1] : stripped;
    const lines = source.split(/\r?\n/);
    const fields = {};
    const services = [];
    let currentKey = null;

    lines.forEach(function (line) {
      const trimmed = line.trim();
      if (!trimmed) {
        return;
      }

      if (/^- /.test(trimmed) && currentKey === "services") {
        services.push(trimmed.replace(/^- /, "").trim());
        return;
      }

      const keyMatch = trimmed.match(/^([a-z_]+)\s*:\s*(.*)$/i);
      if (keyMatch) {
        currentKey = keyMatch[1].toLowerCase();
        const value = keyMatch[2].trim();
        if (currentKey === "services") {
          if (value) {
            services.push(value);
          }
          return;
        }

        const mappedField = FIELD_MAP[currentKey];
        if (mappedField) {
          // Normaliza links Markdown e prefixos mailto:/tel: antes de processar
          const cleanValue = normalizeContactRaw(value || "");
          fields[mappedField] = normalizeFieldValue(mappedField, cleanValue || DEFAULT_STATE[mappedField] || "");
        }
        return;
      }

      if (currentKey && FIELD_MAP[currentKey]) {
        const mappedField = FIELD_MAP[currentKey];
        fields[mappedField] = `${fields[mappedField] || ""} ${normalizeContactRaw(trimmed)}`.trim();
      }
    });

    if (!Object.keys(fields).length && !services.length) {
      return null;
    }

    return { fields: fields, services: services.filter(Boolean) };
  }

  function parseCustomCard(rawInput) {
    if (!rawInput || !rawInput.trim()) {
      return null;
    }

    const stripped = stripCodeFences(rawInput);
    const blockMatch = stripped.match(/\[CUSTOM_CARD\]([\s\S]*?)\[\/CUSTOM_CARD\]/i);
    if (!blockMatch) {
      return null;
    }

    const draft = {
      name: "",
      direction: "",
      frontTheme: "dark",
      backTheme: "paper",
      front: [],
      back: []
    };
    let currentSide = null;

    blockMatch[1].split(/\r?\n/).forEach(function (line) {
      const trimmed = line.trim();
      if (!trimmed) {
        return;
      }

      const keyMatch = trimmed.match(/^([a-z_]+)\s*:\s*(.*)$/i);
      if (keyMatch) {
        const key = keyMatch[1].toLowerCase();
        const value = keyMatch[2].trim();
        currentSide = null;

        if (key === "name" || key === "title") {
          draft.name = sanitizeText(value, "Criado pela IA");
          return;
        }
        if (key === "direction" || key === "style" || key === "creative_direction") {
          draft.direction = normalizeCustomDirection(value);
          return;
        }
        if (key === "front_theme") {
          draft.frontTheme = normalizeCustomTheme(value, "dark");
          return;
        }
        if (key === "back_theme") {
          draft.backTheme = normalizeCustomTheme(value, "paper");
          return;
        }
        if (key === "front" || key === "front_components") {
          draft.front = parseCustomComponentList(value);
          currentSide = value ? null : "front";
          return;
        }
        if (key === "back" || key === "back_components") {
          draft.back = parseCustomComponentList(value);
          currentSide = value ? null : "back";
        }
        return;
      }

      const listMatch = trimmed.match(/^[-*]\s*(.+)$/);
      if (currentSide && listMatch) {
        draft[currentSide] = draft[currentSide].concat(parseCustomComponentList(listMatch[1]));
      }
    });

    return sanitizeCustomLayout(draft);
  }

  function stripCodeFences(value) {
    return String(value || "").replace(/```[a-z]*\n?/gi, "").replace(/```/g, "");
  }

  function parseCustomComponentList(value) {
    return String(value || "")
      .split(/[|,;]+/)
      .map(function (item) { return item.trim(); })
      .filter(Boolean);
  }

  function sanitizeCustomLayout(input) {
    if (!input || typeof input !== "object") {
      return null;
    }

    const fallbackFront = ["logo", "businessName", "personName", "role", "tagline", "contactChips"];
    const fallbackBack = ["description", "services", "contactStack", "location", "social"];
    const front = sanitizeCustomComponents(input.front, fallbackFront, "front");
    const back = sanitizeCustomComponents(input.back, fallbackBack, "back");

    if (!front.length && !back.length) {
      return null;
    }

    return {
      name: sanitizeText(input.name, "Variação local").slice(0, 42),
      direction: normalizeCustomDirection(input.direction || input.style || input.creative_direction || ""),
      frontSkeleton: normalizeSkeleton(input.frontSkeleton, GEN_SKELETONS_FRONT, "editorial"),
      backSkeleton: normalizeSkeleton(input.backSkeleton, GEN_SKELETONS_BACK, "editorial"),
      frontTheme: normalizeCustomTheme(input.frontTheme || input.front_theme, "dark"),
      backTheme: normalizeCustomTheme(input.backTheme || input.back_theme, "paper"),
      front: front.length ? front : fallbackFront,
      back: back.length ? back : fallbackBack
    };
  }

  function normalizeSkeleton(value, allowed, fallback) {
    const slug = String(value || "").trim().toLowerCase();
    return allowed.indexOf(slug) >= 0 ? slug : fallback;
  }

  function sanitizeCustomComponents(list, fallback, side) {
    const source = Array.isArray(list) ? list : [];
    const components = [];
    let hasBrandMark = false;
    const maxItems = side === "back" ? 7 : 6;
    source.forEach(function (item) {
      const key = normalizeCustomComponent(item);
      if (!key) {
        return;
      }
      if (key === "logo" || key === "monogram") {
        if (hasBrandMark) {
          return;
        }
        hasBrandMark = true;
      }
      if (appStateReady && (key === "website" || key === "qrBlock") && !websiteLabel()) {
        return;
      }
      if (appStateReady && key === "location" && !locationLabel()) {
        return;
      }
      if (appStateReady && key === "social" && !state.instagram && !state.linkedin) {
        return;
      }
      if (!components.includes(key)) {
        components.push(key);
      }
    });
    const safe = components.length ? components : fallback.slice();
    if (side === "front") {
      if (!safe.includes("logo") && !safe.includes("monogram")) {
        safe.unshift("logo");
      }
      if (!safe.includes("businessName")) {
        safe.splice(Math.min(1, safe.length), 0, "businessName");
      }
    }
    return safe.slice(0, maxItems);
  }

  function normalizeCustomComponent(value) {
    const compact = String(value || "").trim().replace(/[\s_-]+/g, "").toLowerCase();
    return CUSTOM_LAYOUT_COMPONENTS.find(function (component) {
      return component.toLowerCase() === compact;
    }) || "";
  }

  function normalizeCustomTheme(value, fallback) {
    const theme = String(value || "").trim().toLowerCase();
    return theme === "dark" || theme === "paper" ? theme : fallback;
  }

  function normalizeCustomDirection(value) {
    const direction = String(value || "").trim().toLowerCase().replace(/[\s_]+/g, "-");
    return ["editorial", "seal", "split", "minimal", "impact", "social"].includes(direction) ? direction : "editorial";
  }

  function buildFaceStyleVars() {
    const accent = normalizeHexColor(state.accentColor, DEFAULT_STATE.accentColor);
    const surface = normalizeHexColor(state.surfaceColor, DEFAULT_STATE.surfaceColor);
    const paper = normalizeHexColor(state.paperColor, mixColors("#ffffff", accent, 0.06));
    const paperAlt = normalizeHexColor(state.paperAltColor, mixColors("#ffffff", accent, 0.14));
    const surfaceDeep = mixColors(surface, "#000000", 0.22);
    const textDark = normalizeHexColor(state.textDarkColor, DEFAULT_STATE.textDarkColor);
    const textLight = normalizeHexColor(state.textLightColor, DEFAULT_STATE.textLightColor);
    const chip = normalizeHexColor(state.chipColor, DEFAULT_STATE.chipColor);
    const panel = normalizeHexColor(state.panelColor, DEFAULT_STATE.panelColor);

    return [
      `--accent:${accent}`,
      `--surface:${surface}`,
      `--surface-deep:${surfaceDeep}`,
      `--paper:${paper}`,
      `--paper-alt:${paperAlt}`,
      `--text-dark:${textDark}`,
      `--text-light:${textLight}`,
      `--chip:${chip}`,
      `--panel:${panel}`
    ].join(";");
  }

  function renderRailImageLayer() {
    if (!state.railImageDataUrl) {
      return "";
    }
    const url = escapeHtml(state.railImageDataUrl).replace(/"/g, "&quot;");
    const opacity = clampNumber(state.railImageOpacity, 10, 100, DEFAULT_STATE.railImageOpacity) / 100;
    const darken = clampNumber(state.railImageDarken, 0, 80, DEFAULT_STATE.railImageDarken) / 100;
    return `<span class="rail-media-layer" style="--rail-img-opacity:${opacity};--rail-img-darken:${darken};background-image:url(&quot;${url}&quot;)"></span>`;
  }

  function icon(name) {
    const icons = {
      phone: '<svg viewBox="0 0 24 24" fill="none"><path d="M7.8 4.5h2.5l1.2 3.8-1.7 1.7a15 15 0 0 0 4.2 4.2l1.7-1.7 3.8 1.2v2.5c0 .7-.5 1.2-1.2 1.3-.4 0-.9.1-1.3.1-6.4 0-11.6-5.2-11.6-11.6 0-.4 0-.9.1-1.3.1-.7.6-1.2 1.3-1.2Z" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"></path></svg>',
      mail: '<svg viewBox="0 0 24 24" fill="none"><path d="M4 7.5 12 13l8-5.5M5.5 18h13A1.5 1.5 0 0 0 20 16.5v-9A1.5 1.5 0 0 0 18.5 6h-13A1.5 1.5 0 0 0 4 7.5v9A1.5 1.5 0 0 0 5.5 18Z" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"></path></svg>',
      globe: '<svg viewBox="0 0 24 24" fill="none"><path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM4 12h16M12 4c2 2.2 3 5 3 8s-1 5.8-3 8c-2-2.2-3-5-3-8s1-5.8 3-8Z" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"></path></svg>',
      map: '<svg viewBox="0 0 24 24" fill="none"><path d="m4.5 6.5 5-2 5 2 5-2v13l-5 2-5-2-5 2v-13Z" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"></path><path d="M9.5 4.5v13M14.5 6.5v13" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"></path></svg>',
      instagram: '<svg viewBox="0 0 24 24" fill="none"><rect x="4.5" y="4.5" width="15" height="15" rx="4" stroke="currentColor" stroke-width="1.8"></rect><circle cx="12" cy="12" r="3.5" stroke="currentColor" stroke-width="1.8"></circle><circle cx="17.2" cy="6.8" r="1" fill="currentColor"></circle></svg>',
      linkedin: '<svg viewBox="0 0 24 24" fill="none"><path d="M8 10v8M8 6.5a1.3 1.3 0 1 1 0 2.6 1.3 1.3 0 0 1 0-2.6ZM12 18v-4.2c0-1.7 1-3 2.7-3s2.3 1.2 2.3 3V18M12 11h0" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"></path></svg>'
    };
    return icons[name] || "";
  }

  function effectiveLogoDataUrl() {
    if (state.logoDataUrl) {
      return state.logoDataUrl;
    }
    return String(state.businessName || "").trim().toLowerCase() === "studio elevatio" ? DEFAULT_STUDIO_LOGO : "";
  }

  function renderLogoBadge(size) {
    if (!state.logoVisible) {
      return "";
    }
    const sizeClass = size || "md";
    const logoSrc = effectiveLogoDataUrl();
    if (logoSrc) {
      const frameVisible = Boolean(state.logoFrameVisible);
      const frameShape = state.logoFrameShape || "none";
      const baseSize = { sm: 13, md: 17, lg: 22 }[sizeClass] || 17;
      const badgeScale = clampNumber(state.logoBadgeScale, 55, 220, DEFAULT_STATE.logoBadgeScale) / 100;
      const boxSize = Math.max(5, baseSize * badgeScale);
      const frameRadius = frameShape === "circle" ? "999px" : frameShape === "rounded" ? `${Math.max(0.8, clampNumber(state.logoRadius, 0, 60, DEFAULT_STATE.logoRadius) / 10)}cqi` : "0";
      const boxStyle = [
        `width:${boxSize}cqi`,
        `height:${boxSize}cqi`,
        `padding:${frameVisible ? clampNumber(state.logoPadding, 0, 40, DEFAULT_STATE.logoPadding) / 10 : 0}cqi`,
        `border-radius:${frameRadius}`,
        `background:${frameVisible ? state.logoBackgroundColor : "transparent"}`,
        `overflow:${frameVisible ? "hidden" : "visible"}`
      ].join(";");
      const imgStyle = [
        `opacity:${clampNumber(state.logoOpacity, 20, 100, DEFAULT_STATE.logoOpacity) / 100}`,
        `transform:translate(${clampNumber(state.logoX, -40, 40, DEFAULT_STATE.logoX)}%,${clampNumber(state.logoY, -40, 40, DEFAULT_STATE.logoY)}%) scale(${clampNumber(state.logoScale, 40, 320, DEFAULT_STATE.logoScale) / 100})`
      ].join(";");
      const sourceClass = state.logoDataUrl ? " logo-badge--uploaded" : " logo-badge--default";
      const invertClass = state.logoInvert ? " logo-badge--invert" : "";
      return `<span class="logo-badge logo-badge--${sizeClass} logo-badge--logo${sourceClass}${invertClass}" style="${boxStyle}"><img src="${logoSrc}" alt="${escapeHtml(state.businessName)}" style="${imgStyle}" /></span>`;
    }
    /* Sem logo: mostra iniciais do negocio em vez do favicon */
    const abbr = escapeHtml(initials(state.businessName) || "");
    if (!abbr) return "";
    return `<span class="logo-badge logo-badge--${sizeClass} logo-badge--fallback">${abbr}</span>`;
  }

  function renderBrandLockup(size, compact) {
    const mark = renderLogoBadge(size);
    const showText = !compact && state.brandTextVisible;
    if (!mark && !showText) {
      return "";
    }
    if (!showText) {
      return mark;
    }
    const text = escapeHtml(state.brandText || state.businessName || "Studio Elevatio");
    const font = safeFontName(state.brandFont);
    const scale = clampNumber(state.brandTextScale, 60, 170, DEFAULT_STATE.brandTextScale) / 100;
    return `<span class="brand-lockup" style="--brand-font:&quot;${escapeHtml(font)}&quot;;--brand-text-scale:${scale}">${mark}<span class="brand-lockup__text">${text}</span></span>`;
  }

  function renderMonoCircle() {
    if (!state.logoVisible) {
      return "";
    }
    if (effectiveLogoDataUrl()) {
      return renderLogoBadge("lg");
    }
    const abbr = initials(state.businessName);
    return abbr ? `<div class="mono-circle">${escapeHtml(abbr)}</div>` : "";
  }

  function renderCompactMark() {
    if (!state.logoVisible) {
      return "";
    }
    if (effectiveLogoDataUrl()) {
      return `<span class="compact-logo">${renderLogoBadge("sm")}</span>`;
    }
    return escapeHtml(initials(state.businessName));
  }

  function locationLabel() {
    return cleanLocationPart(state.city) || cleanLocationPart(state.country) || "";
  }

  function railSymbol() {
    const source = cleanLocationPart(state.country) || cleanLocationPart(state.city) || "ID";
    return source.slice(0, 2).toUpperCase();
  }

  function renderFloatingPill(label) {
    const value = String(label || "").trim();
    return value ? `<span class="floating-pill">${escapeHtml(value)}</span>` : "";
  }

  function renderCornerTag(label) {
    const value = String(label || "").trim();
    return value ? `<span class="corner-tag">${escapeHtml(value)}</span>` : "";
  }

  function renderFaceKicker(label) {
    const value = String(label || "").trim();
    return value ? `<span class="face-kicker">${escapeHtml(value)}</span>` : "";
  }

  function renderInlineChips(items) {
    const cleanItems = items.filter(function (item) { return item && hasPublicValue(item.label); });
    return cleanItems.length ? `<div class="inline-chip-row">${cleanItems.map(function (item) {
      return `<span class="inline-chip">${icon(item.icon)}<span>${escapeHtml(item.label)}</span></span>`;
    }).join("")}</div>` : "";
  }

  function renderContactStack(items, limit) {
    const max = Number.isFinite(limit) ? limit : items.length;
    const cleanItems = items.filter(function (item) { return item && hasPublicValue(item.label); }).slice(0, max);
    return cleanItems.length ? `<div class="contact-stack">${cleanItems.map(function (item) {
      return `<div class="contact-line">${icon(item.icon)}<span data-fit data-min="8">${formatContactLabel(item)}</span></div>`;
    }).join("")}</div>` : "";
  }

  function renderServices(variant, limit) {
    const max = Number.isFinite(limit) ? limit : state.services.length;
    const services = state.services.filter(Boolean).slice(0, max);
    if (variant === "cards") {
      return `<div class="service-list service-list--cards">${services.map(function (service) {
        return `<div class="service-card" data-fit data-min="9">${escapeHtml(service)}</div>`;
      }).join("")}</div>`;
    }
    const variantClass = variant === "bars" ? "service-list service-list--bars" : "service-list";
    return `<div class="${variantClass}">${services.map(function (service) {
      return `<div class="service-item" data-fit data-min="9">${escapeHtml(service)}</div>`;
    }).join("")}</div>`;
  }

  function renderAiCustomFront() {
    return renderAiCustomFace("front");
  }

  function renderAiCustomBack() {
    return renderAiCustomFace("back");
  }

  function renderAiCustomFace(side) {
    const custom = sanitizeCustomLayout(state.customLayout);
    const components = custom ? custom[side] : [];
    const skeleton = custom ? (side === "front" ? custom.frontSkeleton : custom.backSkeleton) : "editorial";
    return renderGenerativeFace(skeleton, components, side);
  }

  // Cada componente é categorizado por papel. As zonas de cada esqueleto só
  // recebem categorias compatíveis, e o CSS garante que cada zona se acomoda
  // sem encavalar nem cortar. Zonas vazias não são desenhadas.
  function genCategorize(components) {
    const roleMap = {
      logo: "mark", monogram: "mark", badge: "mark",
      businessName: "head",
      personName: "sub", role: "sub",
      tagline: "stmt",
      description: "narr",
      services: "offer",
      contactChips: "contact", contactStack: "contact",
      location: "meta", website: "meta", social: "meta", qrBlock: "meta",
      accentLine: "deco", dividerLine: "deco", ctaBar: "deco"
    };
    const cat = { mark: [], head: [], sub: [], stmt: [], narr: [], offer: [], contact: [], meta: [], deco: [] };
    components.forEach(function (component) {
      const role = roleMap[component];
      if (role) {
        cat[role].push(component);
      }
    });
    return cat;
  }

  function renderGenList(list) {
    return list.map(renderCustomLayoutComponent).join("");
  }

  function renderGenerativeFace(skeleton, components, side) {
    const c = genCategorize(components);
    const mark = renderGenList(c.mark);
    const headline = renderGenList(c.head);
    const sub = renderGenList(c.sub);
    const stmt = renderGenList(c.stmt);
    const narr = renderGenList(c.narr);
    const offer = renderGenList(c.offer);
    const contact = renderGenList(c.contact);
    const meta = renderGenList(c.meta);
    const deco = renderGenList(c.deco);
    const zone = function (cls, inner) {
      return inner && inner.trim() ? `<div class="${cls}">${inner}</div>` : "";
    };
    const wrap = function (inner) {
      return `<div class="gen gen--${skeleton} gen--${side}">${inner}</div>`;
    };

    switch (skeleton) {
      case "rail":
      case "editorial": {
        const rail = skeleton === "rail" ? `<span class="gen__rail" aria-hidden="true"></span>` : "";
        return wrap(
          rail +
          zone("gen__head", mark + meta) +
          zone("gen__body", headline + sub + stmt + narr + offer + deco) +
          zone("gen__foot", contact)
        );
      }
      case "sidebar":
        return wrap(
          zone("gen__aside", mark + headline + sub) +
          zone("gen__col", stmt + narr + offer + deco + zone("gen__foot", contact + meta))
        );
      case "banner":
        return wrap(
          zone("gen__band", mark + headline + sub) +
          `<div class="gen__grid">` +
            zone("gen__col", stmt + narr + offer + deco) +
            zone("gen__col gen__col--side", contact + meta) +
          `</div>`
        );
      case "split":
        return wrap(
          zone("gen__col", narr + offer + deco) +
          zone("gen__col gen__col--side", contact + meta)
        );
      case "seal":
        return wrap(
          `<span class="gen__ring" aria-hidden="true"></span>` +
          zone("gen__center", mark + headline + sub + stmt + contact + meta)
        );
      default:
        return wrap(zone("gen__body", mark + headline + sub + stmt + narr + offer + contact + meta + deco));
    }
  }

  function renderCustomLayoutComponent(component) {
    switch (component) {
      case "logo":
        return `<div class="ai-layout__mark">${renderBrandLockup("md")}</div>`;
      case "monogram":
        return `<div class="ai-layout__mark">${renderMonoCircle()}</div>`;
      case "businessName":
        return `<h3 class="face-title" data-fit data-min="18">${escapeHtml(state.businessName)}</h3>`;
      case "personName":
        return `<div class="face-subtitle" data-fit data-min="11">${escapeHtml(state.personName)}</div>`;
      case "role":
        return `<div class="face-subtitle" data-fit data-min="11">${escapeHtml(state.role)}</div>`;
      case "tagline":
        return `<div class="quote-large" data-fit data-min="15">${escapeHtml(state.tagline)}</div>`;
      case "description":
        return `<div class="face-body" data-fit data-min="10">${escapeHtml(state.description)}</div>`;
      case "services":
        return renderServices("bars", 4);
      case "contactChips":
        return renderInlineChips(primaryChipItems());
      case "contactStack":
        return renderContactStack(contactItems(), 4);
      case "location":
        return renderFloatingPill(locationLabel());
      case "social":
        return renderInlineChips([
          { icon: "instagram", label: state.instagram },
          { icon: "linkedin", label: state.linkedin }
        ]);
      case "website":
        return renderInlineChips([{ icon: "globe", label: websiteLabel() }]);
      case "qrBlock":
        return `<div class="ai-layout__qr">${renderQrPattern()}<span>${escapeHtml(websiteLabel())}</span></div>`;
      case "accentLine":
        return `<div class="accent-line"></div>`;
      case "dividerLine":
        return `<div class="divider-line"></div>`;
      case "badge":
        return renderCornerTag(locationLabel() || state.businessName);
      case "ctaBar":
        return `<div class="ai-layout__cta" data-fit data-min="10">${escapeHtml(state.tagline || state.businessName)}</div>`;
      default:
        return "";
    }
  }

  function renderAuroraFront() {
    return `
      <div class="layout-stack layout-stack--spread">
        <div class="logo-row">
          ${renderBrandLockup("lg")}
          ${renderFloatingPill(locationLabel())}
        </div>
        <div class="name-stack">
          <h3 class="face-title" data-fit data-min="18">${escapeHtml(state.businessName)}</h3>
          <div class="face-subtitle" data-fit data-min="11">${escapeHtml(state.personName)} · ${escapeHtml(state.role)}</div>
          <div class="face-body face-body--tight" data-fit data-min="11">${escapeHtml(state.tagline)}</div>
          ${renderInlineChips(primaryChipItems())}
        </div>
      </div>
    `;
  }

  function renderAuroraBack() {
    return `
      <div class="layout-stack layout-stack--spread">
        <div class="copy-stack">
          <span class="face-kicker">O que fazemos</span>
          <h3 class="face-title face-title--sm" data-fit data-min="16">${escapeHtml(state.tagline)}</h3>
          <div class="face-body" data-fit data-min="11">${escapeHtml(state.description)}</div>
        </div>
        <div class="layout-split">
          ${renderServices("bars")}
          <div class="feature-stack">
            <div class="accent-line"></div>
            ${renderContactStack(contactItems())}
          </div>
        </div>
      </div>
    `;
  }

  function renderObsidianFront() {
    return `
      <div class="layout-stack layout-stack--spread">
        <div class="meta-strip">
          <div class="brand-inline">
            ${renderBrandLockup("md")}
            <div class="feature-stack">
              <div class="face-subtitle">${escapeHtml(state.businessName)}</div>
            </div>
          </div>
          ${renderCornerTag(locationLabel())}
        </div>
        <div class="copy-stack">
          <h3 class="face-title" data-fit data-min="18">${escapeHtml(state.personName)}</h3>
          <div class="face-subtitle" data-fit data-min="11">${escapeHtml(state.role)}</div>
          <div class="face-body" data-fit data-min="11">${escapeHtml(state.tagline)}</div>
          ${renderInlineChips([
            { icon: "globe", label: websiteLabel() },
            { icon: "mail", label: state.email }
          ])}
        </div>
      </div>
    `;
  }

  function renderObsidianBack() {
    return `
      <div class="layout-shell">
        <div class="layout-split">
          <div class="quote-panel">
            <span class="face-kicker">O que fazemos</span>
            <div class="quote-large" data-fit data-min="16">${escapeHtml(state.description)}</div>
            <div class="quote-small">${escapeHtml(fullLocation() || cleanLocationPart(state.country) || "")}</div>
          </div>
          <div class="feature-stack">
            ${renderServices("cards")}
            <div class="divider-line"></div>
            ${renderContactStack(contactItems())}
          </div>
        </div>
      </div>
    `;
  }

  function renderEditorialFront() {
    return `
      <div class="layout-stack layout-stack--spread">
        <div class="logo-row">
          <div class="brand-inline">
            ${renderBrandLockup("sm")}
          </div>
          ${renderFloatingPill(locationLabel())}
        </div>
        <div class="copy-stack">
          <h3 class="face-title" data-fit data-min="18">${escapeHtml(state.businessName)}</h3>
          <div class="accent-line"></div>
          <div class="face-subtitle" data-fit data-min="11">${escapeHtml(state.personName)} · ${escapeHtml(state.role)}</div>
          <div class="face-body" data-fit data-min="11">${escapeHtml(state.tagline)}</div>
        </div>
      </div>
    `;
  }

  function renderEditorialBack() {
    return `
      <div class="layout-stack layout-stack--spread">
        <div class="quote-panel">
          <span class="face-kicker">Mensagem principal</span>
          <div class="quote-large" data-fit data-min="16">${escapeHtml(state.tagline)}</div>
          <div class="quote-small">${escapeHtml(state.description)}</div>
        </div>
        <div class="dual-columns">
          ${renderServices("bars")}
          ${renderContactStack(contactItems())}
        </div>
      </div>
    `;
  }

  function renderRailFront() {
    return `
      <div class="rail-content">
        <div class="rail-label">${renderRailImageLayer()}<span>${escapeHtml(cleanLocationPart(state.country) || cleanLocationPart(state.city) || "")}</span></div>
        <div class="layout-stack layout-stack--spread">
          <div class="brand-inline">
            ${renderBrandLockup("md")}
          </div>
          <div class="copy-stack">
            <h3 class="face-title" data-fit data-min="18">${escapeHtml(state.businessName)}</h3>
            <div class="face-subtitle" data-fit data-min="11">${escapeHtml(state.personName)}</div>
            <div class="face-body" data-fit data-min="11">${escapeHtml(state.role)}</div>
            ${renderInlineChips(primaryChipItems())}
          </div>
        </div>
      </div>
    `;
  }

  function renderRailBack() {
    return `
      <div class="layout-stack layout-stack--spread">
        <div class="copy-stack">
          <span class="face-kicker">Mensagem</span>
          <h3 class="face-title face-title--sm" data-fit data-min="16">${escapeHtml(state.tagline)}</h3>
          <div class="face-body" data-fit data-min="11">${escapeHtml(state.description)}</div>
        </div>
        <div class="layout-split">
          ${renderServices("cards")}
          ${renderContactStack(contactItems())}
        </div>
      </div>
    `;
  }

  function renderMosaicFront() {
    return `
      <div class="mosaic-grid">
        <div class="grid-box">
          ${renderBrandLockup("lg")}
        </div>
        <div class="grid-box">
          ${renderFaceKicker(state.personName)}
          <h3 class="face-title face-title--sm" data-fit data-min="16">${escapeHtml(state.businessName)}</h3>
        </div>
        <div class="grid-box">
          <div class="face-body" data-fit data-min="11">${escapeHtml(state.tagline)}</div>
        </div>
        <div class="grid-box">
          ${renderInlineChips([
            { icon: "phone", label: state.phone },
            { icon: "globe", label: websiteLabel() }
          ])}
        </div>
      </div>
    `;
  }

  function renderMosaicBack() {
    return `
      <div class="layout-stack layout-stack--spread">
        <div class="brand-inline">
          ${renderBrandLockup("sm")}
          <div class="feature-stack">
            <span class="face-kicker">Perfil</span>
            <div class="face-subtitle">${escapeHtml(state.personName)} · ${escapeHtml(state.role)}</div>
          </div>
        </div>
        <div class="layout-split">
          ${renderServices("cards")}
          <div class="feature-stack">
            <div class="quote-panel">
              <div class="quote-small">${escapeHtml(state.description)}</div>
            </div>
            ${renderContactStack(contactItems())}
          </div>
        </div>
      </div>
    `;
  }

  function renderBannerFront() {
    return `
      <div class="layout-stack layout-stack--spread">
        <div class="banner-strip">
          <span class="banner-strip__label">${escapeHtml(cleanLocationPart(state.country) || cleanLocationPart(state.city) || "Marca")}</span>
          <span class="banner-strip__text" data-fit data-min="12">${escapeHtml(bannerHeadline())}</span>
        </div>
        <div class="copy-stack">
          <div class="brand-inline">
            ${renderBrandLockup("sm")}
            <span class="floating-pill">${escapeHtml(locationLabel() || "")}</span>
          </div>
          <h3 class="face-title" data-fit data-min="18">${escapeHtml(state.businessName)}</h3>
          <div class="face-subtitle" data-fit data-min="11">${escapeHtml(state.personName)} · ${escapeHtml(state.role)}</div>
          ${renderInlineChips([
            { icon: "phone", label: state.phone },
            { icon: "mail", label: state.email }
          ])}
        </div>
      </div>
    `;
  }

  function renderBannerBack() {
    return `
      <div class="layout-stack layout-stack--spread">
        <div class="quote-panel">
          <span class="face-kicker">Porque escolher</span>
          <div class="quote-large" data-fit data-min="16">${escapeHtml(state.tagline)}</div>
          <div class="quote-small">${escapeHtml(state.description)}</div>
        </div>
        <div class="dual-columns">
          ${renderServices("bars")}
          ${renderContactStack(contactItems())}
        </div>
      </div>
    `;
  }

  function renderAtelierFront() {
    return `
      <div class="layout-stack layout-stack--spread">
        <div class="meta-strip">
          ${renderMonoCircle()}
          ${renderCornerTag(websiteLabel())}
        </div>
        <div class="copy-stack">
          ${renderFaceKicker(locationLabel())}
          <h3 class="face-title" data-fit data-min="18">${escapeHtml(state.businessName)}</h3>
          <div class="face-subtitle" data-fit data-min="11">${escapeHtml(state.personName)}</div>
          <div class="face-body" data-fit data-min="11">${escapeHtml(state.tagline)}</div>
        </div>
      </div>
    `;
  }

  function renderAtelierBack() {
    return `
      <div class="layout-stack layout-stack--spread">
        <div class="quote-panel">
          <span class="face-kicker">Assinatura</span>
          <div class="quote-large" data-fit data-min="16">${escapeHtml(state.description)}</div>
        </div>
        <div class="layout-split">
          ${renderServices("cards")}
          ${renderContactStack(contactItems())}
        </div>
      </div>
    `;
  }

  function renderPulseFront() {
    return `
      <div class="layout-stack layout-stack--spread">
        <div class="logo-row">
          ${renderBrandLockup("md")}
          ${renderCornerTag(locationLabel())}
        </div>
        <div class="copy-stack">
          ${renderFaceKicker(state.personName)}
          <h3 class="face-title" data-fit data-min="18">${escapeHtml(state.businessName)}</h3>
          <div class="face-subtitle" data-fit data-min="11">${escapeHtml(state.tagline)}</div>
          ${renderInlineChips(primaryChipItems())}
        </div>
      </div>
    `;
  }

  function renderPulseBack() {
    return `
      <div class="layout-stack layout-stack--spread">
        <div class="layout-split">
          <div class="feature-stack">
            <span class="face-kicker">Servicos</span>
            ${renderServices("cards")}
          </div>
          <div class="feature-stack">
            <span class="face-kicker">Contacto direto</span>
            ${renderContactStack(contactItems())}
          </div>
        </div>
        <div class="quote-small">${escapeHtml(state.description)}</div>
      </div>
    `;
  }

  function renderStudioFront() {
    const sideLabel = locationLabel() || websiteLabel() || "Internacional";
    return `
      <div class="layout-stack layout-stack--spread">
        <div class="brand-inline">
          ${renderBrandLockup("sm")}
          <span class="floating-pill">${escapeHtml(sideLabel)}</span>
        </div>
        <div class="quote-stack">
          <div class="quote-large" data-fit data-min="16">${escapeHtml(state.tagline)}</div>
          ${renderServices("bars")}
        </div>
      </div>
    `;
  }

  function renderStudioBack() {
    return `
      <div class="layout-stack layout-stack--spread">
        <div class="copy-stack">
          <span class="face-kicker">Por tras da marca</span>
          <h3 class="face-title face-title--sm" data-fit data-min="16">${escapeHtml(state.personName)}</h3>
          <div class="face-subtitle" data-fit data-min="11">${escapeHtml(state.role)}</div>
          <div class="face-body" data-fit data-min="11">${escapeHtml(state.description)}</div>
        </div>
        <div class="layout-split">
          ${renderContactStack(contactItems())}
          ${renderInlineChips([
            { icon: "instagram", label: state.instagram },
            { icon: "linkedin", label: state.linkedin }
          ])}
        </div>
      </div>
    `;
  }

  function renderContrastFront() {
    return `
      <div class="contrast-grid contrast-grid--front">
        <div class="contrast-side contrast-side--dark">
          <div class="contrast-stack">
            <div class="brand-inline">
              ${renderBrandLockup("sm")}
              ${renderFaceKicker(state.personName)}
            </div>
            <div class="copy-stack">
              <h3 class="face-title" data-fit data-min="16">${escapeHtml(state.businessName)}</h3>
              <div class="face-body" data-fit data-min="11">${escapeHtml(state.tagline)}</div>
            </div>
          </div>
        </div>
        <div class="contrast-side contrast-side--light">
          <div class="contrast-stack">
            ${renderFloatingPill(locationLabel())}
            <div class="copy-stack">
              <div class="face-subtitle" data-fit data-min="11">${escapeHtml(state.personName)}</div>
              <div class="face-body" data-fit data-min="11">${escapeHtml(state.role)}</div>
              ${renderInlineChips([
                { icon: "globe", label: websiteLabel() },
                { icon: "phone", label: state.phone }
              ])}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  function renderContrastBack() {
    return `
      <div class="contrast-grid contrast-grid--back">
        <div class="contrast-side contrast-side--light">
          <div class="contrast-stack">
            <div class="quote-panel">
              <span class="face-kicker">Descricao</span>
              <div class="quote-small">${escapeHtml(state.description)}</div>
            </div>
            ${renderServices("bars")}
          </div>
        </div>
        <div class="contrast-side contrast-side--dark">
          <div class="contrast-stack">
            <div class="copy-stack">
              <span class="face-kicker">Contacto</span>
              ${renderContactStack(contactItems())}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  function renderPrismFront() {
    return `
      <div class="ticket-layout">
        <div class="ticket-rail">
          <span>${escapeHtml(cleanLocationPart(state.country) || cleanLocationPart(state.city) || "GLOBAL")}</span>
          <strong>${escapeHtml(railSymbol())}</strong>
        </div>
        <div class="ticket-main">
          <div class="meta-strip">
            ${renderFloatingPill(locationLabel())}
            ${renderCornerTag(websiteLabel())}
          </div>
          <div class="ticket-copy">
            <span class="face-kicker">Cartao profissional</span>
            <h3 class="face-title" data-fit data-min="18">${escapeHtml(state.businessName)}</h3>
            <div class="face-subtitle" data-fit data-min="11">${escapeHtml(state.personName)} · ${escapeHtml(state.role)}</div>
            <div class="face-body" data-fit data-min="11">${escapeHtml(state.tagline)}</div>
          </div>
        </div>
      </div>
    `;
  }

  function renderPrismBack() {
    return `
      <div class="ticket-layout ticket-layout--back">
        <div class="ticket-rail">
          <span>CONTACTO</span>
          <strong>${escapeHtml(initials(state.personName || state.businessName))}</strong>
        </div>
        <div class="ticket-main">
          <div class="quote-panel">
            <span class="face-kicker">O que fazemos</span>
            <div class="quote-small">${escapeHtml(state.description)}</div>
          </div>
          <div class="layout-split">
            ${renderServices("bars")}
            ${renderContactStack(contactItems())}
          </div>
        </div>
      </div>
    `;
  }

  function renderGalleryFront() {
    return `
      <div class="photo-layout">
        <div class="photo-panel">
          ${renderBrandLockup("lg")}
          <span class="face-kicker">${escapeHtml(locationLabel())}</span>
        </div>
        <div class="photo-caption">
          <h3 class="face-title" data-fit data-min="18">${escapeHtml(state.businessName)}</h3>
          <div class="face-subtitle" data-fit data-min="11">${escapeHtml(state.personName)} · ${escapeHtml(state.role)}</div>
          <div class="accent-line"></div>
        </div>
      </div>
    `;
  }

  function renderGalleryBack() {
    return `
      <div class="photo-layout photo-layout--back">
        <div class="photo-caption photo-caption--wide">
          <span class="face-kicker">Mensagem</span>
          <div class="quote-large" data-fit data-min="16">${escapeHtml(state.tagline)}</div>
          <div class="quote-small">${escapeHtml(state.description)}</div>
        </div>
        <div class="photo-contact-strip">
          ${renderInlineChips([
            { icon: "phone", label: state.phone },
            { icon: "mail", label: state.email },
            { icon: "globe", label: websiteLabel() }
          ])}
        </div>
      </div>
    `;
  }

  function renderSignatureFront() {
    return `
      <div class="qr-layout">
        <div class="qr-copy">
          ${renderBrandLockup("sm")}
          <span class="face-kicker">Contacto rapido</span>
          <h3 class="face-title" data-fit data-min="18">${escapeHtml(state.businessName)}</h3>
          <div class="face-subtitle" data-fit data-min="11">${escapeHtml(state.personName)} · ${escapeHtml(state.role)}</div>
        </div>
        <div class="qr-card">
          ${renderQrPattern()}
          <span>${escapeHtml(websiteLabel())}</span>
        </div>
      </div>
    `;
  }

  function renderSignatureBack() {
    return `
      <div class="qr-layout qr-layout--back">
        <div class="qr-card qr-card--small">
          ${renderQrPattern()}
        </div>
        <div class="qr-copy">
          <span class="face-kicker">Detalhes</span>
          <div class="quote-small">${escapeHtml(state.description)}</div>
          ${renderContactStack(contactItems())}
        </div>
      </div>
    `;
  }

  function renderIvoryRailFront() {
    return `
      <div class="fine-rail-card">
        <div class="fine-rail"></div>
        <div class="fine-rail-card__top">
          ${renderBrandLockup("md")}
          ${renderCornerTag(locationLabel())}
        </div>
        <div class="fine-rail-card__main">
          <span class="face-kicker">Assinatura comercial</span>
          <h3 class="face-title" data-fit data-min="18">${escapeHtml(state.businessName)}</h3>
          <div class="face-subtitle" data-fit data-min="11">${escapeHtml(state.personName)} · ${escapeHtml(state.role)}</div>
        </div>
        <div class="fine-rail-card__foot">
          <div class="accent-line"></div>
          ${renderInlineChips(primaryChipItems())}
        </div>
      </div>
    `;
  }

  function renderIvoryRailBack() {
    return `
      <div class="fine-rail-card fine-rail-card--back">
        <div class="fine-rail"></div>
        <div class="fine-rail-card__main">
          <span class="face-kicker">Mensagem</span>
          <div class="quote-large" data-fit data-min="16">${escapeHtml(state.tagline)}</div>
          <div class="face-body" data-fit data-min="10">${escapeHtml(state.description)}</div>
        </div>
        <div class="fine-rail-card__split">
          ${renderServices("bars")}
          ${renderContactStack(contactItems())}
        </div>
      </div>
    `;
  }

  function renderMeridianTabFront() {
    return `
      <div class="tab-card">
        <aside class="tab-card__tab">
          ${renderRailImageLayer()}
          ${renderBrandLockup("sm")}
          <span>${escapeHtml(cleanLocationPart(state.country) || "GLOBAL")}</span>
        </aside>
        <section class="tab-card__content">
          <div class="meta-strip">
            ${renderCornerTag(websiteLabel())}
            ${renderFloatingPill(locationLabel())}
          </div>
          <div class="copy-stack">
            <h3 class="face-title" data-fit data-min="18">${escapeHtml(state.businessName)}</h3>
            <div class="face-subtitle" data-fit data-min="11">${escapeHtml(state.personName)} · ${escapeHtml(state.role)}</div>
            <div class="face-body" data-fit data-min="11">${escapeHtml(state.tagline)}</div>
          </div>
        </section>
      </div>
    `;
  }

  function renderMeridianTabBack() {
    return `
      <div class="tab-card tab-card--dark">
        <aside class="tab-card__tab">
          ${renderRailImageLayer()}
          <span>CONTACTO</span>
          <strong>${escapeHtml(railSymbol())}</strong>
        </aside>
        <section class="tab-card__content tab-card__content--split">
          <div class="quote-panel">
            <span class="face-kicker">Como ajudamos</span>
            <div class="quote-small">${escapeHtml(state.description)}</div>
          </div>
          <div class="feature-stack">
            ${renderServices("cards")}
            ${renderContactStack(contactItems())}
          </div>
        </section>
      </div>
    `;
  }

  function renderLedgerFront() {
    return `
      <div class="ledger-card">
        <div class="ledger-card__hero">
          ${renderBrandLockup("md")}
          <div>
            <span class="face-kicker">Perfil profissional</span>
            <h3 class="face-title face-title--sm" data-fit data-min="16">${escapeHtml(state.businessName)}</h3>
          </div>
        </div>
        <div class="ledger-card__tiles">
          <div class="ledger-tile ledger-tile--wide">${escapeHtml(state.personName)}</div>
          <div class="ledger-tile">${escapeHtml(state.role)}</div>
          <div class="ledger-tile">${escapeHtml(locationLabel())}</div>
        </div>
        ${renderInlineChips(primaryChipItems())}
      </div>
    `;
  }

  function renderLedgerBack() {
    return `
      <div class="ledger-card ledger-card--back">
        <div class="ledger-card__tiles ledger-card__tiles--back">
          <div class="ledger-tile ledger-tile--wide">
            <span class="face-kicker">Descricao</span>
            <p>${escapeHtml(state.description)}</p>
          </div>
          ${state.services.filter(Boolean).map(function (service) {
            return `<div class="ledger-tile">${escapeHtml(service)}</div>`;
          }).join("")}
        </div>
        ${renderContactStack(contactItems())}
      </div>
    `;
  }

  function renderNoirLabelFront() {
    return `
      <div class="label-card">
        <div class="label-card__plate">
          ${renderBrandLockup("sm")}
          <span>${escapeHtml(locationLabel())}</span>
        </div>
        <div class="label-card__copy">
          <h3 class="face-title" data-fit data-min="18">${escapeHtml(state.businessName)}</h3>
          <div class="face-subtitle" data-fit data-min="11">${escapeHtml(state.personName)} · ${escapeHtml(state.role)}</div>
          <div class="accent-line"></div>
        </div>
      </div>
    `;
  }

  function renderNoirLabelBack() {
    return `
      <div class="label-card label-card--back">
        <div class="label-card__copy">
          <span class="face-kicker">Oferta</span>
          <div class="quote-large" data-fit data-min="16">${escapeHtml(state.tagline)}</div>
          <div class="quote-small">${escapeHtml(state.description)}</div>
        </div>
        <div class="label-card__panel">
          ${renderServices("bars")}
          ${renderContactStack(contactItems())}
        </div>
      </div>
    `;
  }

  function renderArcSealFront() {
    return `
      <div class="arc-card">
        <div class="arc-card__seal">${renderMonoCircle()}</div>
        <div class="arc-card__copy">
          <span class="face-kicker">${escapeHtml(locationLabel())}</span>
          <h3 class="face-title" data-fit data-min="18">${escapeHtml(state.businessName)}</h3>
          <div class="face-subtitle" data-fit data-min="11">${escapeHtml(state.personName)} · ${escapeHtml(state.role)}</div>
        </div>
      </div>
    `;
  }

  function renderArcSealBack() {
    return `
      <div class="arc-card arc-card--back">
        <div class="arc-card__copy">
          <span class="face-kicker">Resumo</span>
          <div class="quote-large" data-fit data-min="16">${escapeHtml(state.tagline)}</div>
          <div class="face-body">${escapeHtml(state.description)}</div>
        </div>
        <div class="arc-card__list">
          ${renderServices("cards")}
          ${renderInlineChips(primaryChipItems())}
        </div>
      </div>
    `;
  }

  function renderHorizonFront() {
    return `
      <div class="horizon-card">
        <div class="horizon-card__top">
          ${renderBrandLockup("md")}
          ${renderCornerTag(cleanLocationPart(state.country) || locationLabel())}
        </div>
        <div class="horizon-card__line"></div>
        <div class="horizon-card__copy">
          <h3 class="face-title" data-fit data-min="18">${escapeHtml(state.businessName)}</h3>
          <div class="face-subtitle" data-fit data-min="11">${escapeHtml(state.personName)} · ${escapeHtml(state.role)}</div>
        </div>
      </div>
    `;
  }

  function renderHorizonBack() {
    return `
      <div class="horizon-card horizon-card--back">
        <div class="horizon-card__copy">
          <span class="face-kicker">Mensagem principal</span>
          <div class="quote-large" data-fit data-min="16">${escapeHtml(state.tagline)}</div>
        </div>
        <div class="horizon-card__line"></div>
        <div class="dual-columns">
          ${renderServices("bars")}
          ${renderContactStack(contactItems())}
        </div>
      </div>
    `;
  }

  function renderCapsuleFront() {
    return `
      <div class="capsule-card">
        <div class="capsule-card__top">
          ${renderBrandLockup("sm")}
          ${renderInlineChips([{ icon: "globe", label: websiteLabel() }])}
        </div>
        <div class="capsule-card__hero">
          <span class="face-kicker">${escapeHtml(cleanLocationPart(state.country) || "Contacto direto")}</span>
          <h3 class="face-title" data-fit data-min="18">${escapeHtml(state.businessName)}</h3>
          <div class="face-subtitle">${escapeHtml(state.personName)} · ${escapeHtml(state.role)}</div>
        </div>
        <div class="capsule-card__row">
          ${state.services.filter(Boolean).slice(0, 3).map(function (service) {
            return `<span>${escapeHtml(service)}</span>`;
          }).join("")}
        </div>
      </div>
    `;
  }

  function renderCapsuleBack() {
    return `
      <div class="capsule-card capsule-card--back">
        <div class="quote-panel">
          <span class="face-kicker">Porque escolher</span>
          <div class="quote-small">${escapeHtml(state.description)}</div>
        </div>
        <div class="capsule-card__row capsule-card__row--wrap">
          ${state.services.filter(Boolean).map(function (service) {
            return `<span>${escapeHtml(service)}</span>`;
          }).join("")}
        </div>
        ${renderContactStack(contactItems())}
      </div>
    `;
  }

  function renderFolioFront() {
    return `
      <div class="folio-card">
        <div class="folio-card__mark">${renderCompactMark()}</div>
        <div class="folio-card__content">
          <span class="face-kicker">Folio comercial</span>
          <h3 class="face-title" data-fit data-min="18">${escapeHtml(state.businessName)}</h3>
          <div class="face-subtitle">${escapeHtml(state.personName)} · ${escapeHtml(state.role)}</div>
        </div>
      </div>
    `;
  }

  function renderFolioBack() {
    return `
      <div class="folio-card folio-card--back">
        <div class="folio-card__content">
          <div class="quote-large" data-fit data-min="16">${escapeHtml(state.tagline)}</div>
          <div class="face-body">${escapeHtml(state.description)}</div>
          ${renderInlineChips(primaryChipItems())}
        </div>
        <div class="folio-card__panel">
          ${renderServices("bars")}
        </div>
      </div>
    `;
  }

  function renderCivicGridFront() {
    return `
      <div class="civic-card">
        <div class="civic-card__brand">
          ${renderBrandLockup("md")}
          <div>
            <h3 class="face-title face-title--sm" data-fit data-min="16">${escapeHtml(state.businessName)}</h3>
            <div class="face-subtitle">${escapeHtml(state.personName)}</div>
          </div>
        </div>
        <div class="civic-card__grid">
          <div>${escapeHtml(state.role)}</div>
          <div>${escapeHtml(state.tagline)}</div>
          <div>${escapeHtml(websiteLabel())}</div>
          <div>${escapeHtml(locationLabel())}</div>
        </div>
      </div>
    `;
  }

  function renderCivicGridBack() {
    return `
      <div class="civic-card civic-card--back">
        <div class="quote-panel">
          <span class="face-kicker">Descricao</span>
          <div class="quote-small">${escapeHtml(state.description)}</div>
        </div>
        <div class="civic-card__grid civic-card__grid--compact">
          ${contactItems().filter(function (item) { return item && hasPublicValue(item.label); }).map(function (item) {
            return `<div>${icon(item.icon)}<span>${formatContactLabel(item)}</span></div>`;
          }).join("")}
        </div>
      </div>
    `;
  }

  function renderSoftFrameFront() {
    return `
      <div class="frame-card">
        <div class="frame-card__inner">
          <div class="meta-strip">
            ${renderBrandLockup("sm")}
            ${renderCornerTag(locationLabel())}
          </div>
          <div class="frame-card__center">
            <h3 class="face-title" data-fit data-min="18">${escapeHtml(state.businessName)}</h3>
            <div class="face-subtitle">${escapeHtml(state.personName)} · ${escapeHtml(state.role)}</div>
            <div class="face-body">${escapeHtml(state.tagline)}</div>
          </div>
          ${renderInlineChips(primaryChipItems())}
        </div>
      </div>
    `;
  }

  function renderSoftFrameBack() {
    return `
      <div class="frame-card frame-card--back">
        <div class="frame-card__inner">
          <div class="quote-panel">
            <span class="face-kicker">Servicos</span>
            <div class="quote-small">${escapeHtml(state.description)}</div>
          </div>
          <div class="dual-columns">
            ${renderServices("cards")}
            ${renderContactStack(contactItems())}
          </div>
        </div>
      </div>
    `;
  }

  function renderQrPattern() {
    const seed = slugify(state.businessName + state.website + state.phone);
    return `<div class="qr-pattern" aria-hidden="true">${Array.from({ length: 49 }, function (_, index) {
      const on = (seed.charCodeAt(index % seed.length) + index * 7) % 5 < 2 || index < 7 || index % 7 === 0;
      return `<i class="${on ? "on" : ""}"></i>`;
    }).join("")}</div>`;
  }

  function primaryChipItems() {
    return [
      { icon: "globe", label: websiteLabel() },
      { icon: "phone", label: state.phone }
    ];
  }

  function contactItems() {
    return [
      { icon: "phone", label: state.phone },
      { icon: "mail", label: state.email },
      { icon: "globe", label: websiteLabel() },
      { icon: "instagram", label: state.instagram },
      { icon: "linkedin", label: state.linkedin },
      { icon: "map", label: fullLocation() }
    ];
  }

  function formatContactLabel(item) {
    const label = String(item && item.label || "");
    if (item && item.icon === "mail") {
      return escapeHtml(label).replace(/@/g, "<wbr>@");
    }
    return escapeHtml(label);
  }

  function hasPublicValue(value) {
    const cleaned = String(value || "").trim();
    return Boolean(cleaned && cleaned !== "—" && cleaned !== "-");
  }

  function websiteLabel() {
    return String(state.website || "").replace(/^https?:\/\//i, "").replace(/\/+$/, "") || "—";
  }

  function bannerHeadline() {
    return state.services[0] || state.tagline || "Cartão pronto para imprimir";
  }

  function fullLocation() {
    return [state.address, state.city, state.country]
      .map(cleanLocationPart)
      .filter(Boolean)
      .join(", ");
  }

  function initials(value) {
    const parts = String(value || "").trim().split(/\s+/).filter(Boolean);
    if (!parts.length) {
      return "SE";
    }
    return parts.slice(0, 2).map(function (part) {
      return part.charAt(0).toUpperCase();
    }).join("");
  }

  function escapeHtml(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function safeFontName(value) {
    const font = String(value || "").trim();
    return BRAND_FONTS.includes(font) ? font : DEFAULT_STATE.brandFont;
  }

  /* Remove Markdown link syntax e prefixos mailto:/tel: de valores vindos do parser.
     [text](url) → usa text se parece valor real (email, URL com ponto), senão usa url limpa.
     [LinkedIn](https://pt.linkedin.com/in/x) → pt.linkedin.com/in/x
     [email@domain.com](mailto:email@domain.com) → email@domain.com */
  function normalizeMarkdownLink(raw) {
    return String(raw || "").replace(/\[([^\]]*)\]\(([^)]*)\)/g, function (_, text, url) {
      var cleanText = text.trim();
      var cleanUrl = url.replace(/^mailto:/i, "").replace(/^tel:/i, "").replace(/^https?:\/\//i, "").replace(/\/$/, "").trim();
      // Se o texto parece um valor real (email ou URL com ponto), usa o texto
      if (cleanText.indexOf("@") !== -1 || /\.[a-z]{2,}/i.test(cleanText)) {
        return cleanText;
      }
      // Caso contrário (texto genérico como "LinkedIn", "Website"), usa a URL limpa
      return cleanUrl;
    });
  }

  /* Normaliza valor de contacto: strip markdown, mailto:, tel: */
  function normalizeContactRaw(raw) {
    var v = normalizeMarkdownLink(String(raw || ""));
    v = v.replace(/^mailto:/i, "").replace(/^tel:/i, "").trim();
    return v;
  }

  /* Verifica se uma parte de localização é vazia/placeholder */
  function isEmptyLocationPart(v) {
    var s = String(v || "").trim();
    return !s || s === "—" || s === "–" || s === "-" || s.toLowerCase() === "null" || s.toLowerCase() === "undefined";
  }

  /* Retorna valor de localização limpo ou string vazia */
  function cleanLocationPart(v) {
    return isEmptyLocationPart(v) ? "" : String(v || "").trim();
  }

  function setCheckoutStatus(message) {
    if (refs.checkoutStatus) {
      refs.checkoutStatus.textContent = uiText(message);
    }
  }

  function showFeedback(message, tone, remember) {
    if (!refs.feedbackBar) {
      return;
    }
    refs.feedbackBar.textContent = uiText(message);
    refs.feedbackBar.className = "feedback-bar";
    if (tone) {
      refs.feedbackBar.classList.add(tone);
    }
    if (remember !== false) {
      refs.feedbackBar.dataset.userMessage = "true";
    }
  }

  function loadSavedState() {
    try {
      const raw = localStorage.getItem(APP_CONFIG.storageKey);
      return raw ? JSON.parse(raw) : null;
    } catch (_error) {
      return null;
    }
  }

  function saveState() {
    try {
      localStorage.setItem(APP_CONFIG.storageKey, JSON.stringify(state));
    } catch (_error) {
      // noop
    }
  }

  function hydrateState(input) {
    const safeInput = input && typeof input === "object" ? input : {};
    const customLayout = sanitizeCustomLayout(safeInput.customLayout);
    const maxLayoutIndex = customLayout ? LAYOUTS.length : LAYOUTS.length - 1;
    const legacyContactPattern = new RegExp("contato@" + "studioelevatio", "i");
    const legacyStudio = String(safeInput.businessName || "").trim().toLowerCase() === "studio elevatio"
      && (/websites|seo|presen.c?a digital/i.test(String(safeInput.role || "")) || legacyContactPattern.test(String(safeInput.email || "")) || /^\+351 X/i.test(String(safeInput.phone || "")));
    const services = legacyStudio
      ? DEFAULT_STATE.services.slice()
      : Array.isArray(safeInput.services) ? safeInput.services.slice(0, 4) : DEFAULT_STATE.services.slice();
    while (services.length < 4) {
      services.push(DEFAULT_STATE.services[services.length] || "");
    }

    return {
      layoutIndex: clampNumber(safeInput.layoutIndex, 0, maxLayoutIndex, DEFAULT_STATE.layoutIndex),
      isFlipped: Boolean(safeInput.isFlipped),
      logoVisible: safeInput.logoVisible === undefined ? DEFAULT_STATE.logoVisible : Boolean(safeInput.logoVisible),
      logoDataUrl: typeof safeInput.logoDataUrl === "string" ? safeInput.logoDataUrl : DEFAULT_STATE.logoDataUrl,
      brandTextVisible: safeInput.brandTextVisible === undefined ? DEFAULT_STATE.brandTextVisible : Boolean(safeInput.brandTextVisible),
      brandText: sanitizeText(safeInput.brandText, DEFAULT_STATE.brandText).slice(0, 42),
      brandFont: BRAND_FONTS.includes(safeInput.brandFont) ? safeInput.brandFont : DEFAULT_STATE.brandFont,
      brandTextScale: clampNumber(safeInput.brandTextScale, 60, 170, DEFAULT_STATE.brandTextScale),
      logoInvert: Boolean(safeInput.logoInvert),
      logoFrameVisible: Boolean(safeInput.logoFrameVisible),
      logoFrameShape: ["none", "rounded", "circle"].includes(safeInput.logoFrameShape) ? safeInput.logoFrameShape : DEFAULT_STATE.logoFrameShape,
      logoBackgroundColor: normalizeHexColor(safeInput.logoBackgroundColor, DEFAULT_STATE.logoBackgroundColor),
      logoOpacity: clampNumber(safeInput.logoOpacity, 20, 100, DEFAULT_STATE.logoOpacity),
      logoScale: clampNumber(safeInput.logoScale, 40, 320, DEFAULT_STATE.logoScale),
      logoBadgeScale: clampNumber(safeInput.logoBadgeScale, 55, 220, DEFAULT_STATE.logoBadgeScale),
      logoX: clampNumber(safeInput.logoX, -40, 40, DEFAULT_STATE.logoX),
      logoY: clampNumber(safeInput.logoY, -40, 40, DEFAULT_STATE.logoY),
      logoPadding: clampNumber(safeInput.logoPadding, 0, 40, DEFAULT_STATE.logoPadding),
      logoRadius: clampNumber(safeInput.logoRadius, 0, 60, DEFAULT_STATE.logoRadius),
      backgroundDataUrl: typeof safeInput.backgroundDataUrl === "string" ? safeInput.backgroundDataUrl : DEFAULT_STATE.backgroundDataUrl,
      backgroundOpacity: clampNumber(safeInput.backgroundOpacity, 0, 100, DEFAULT_STATE.backgroundOpacity),
      backgroundBlur: clampNumber(safeInput.backgroundBlur, 0, 18, DEFAULT_STATE.backgroundBlur),
      backgroundDarken: clampNumber(safeInput.backgroundDarken, 0, 90, DEFAULT_STATE.backgroundDarken),
      backgroundGrain: clampNumber(safeInput.backgroundGrain, 0, 55, DEFAULT_STATE.backgroundGrain),
      backgroundSaturation: clampNumber(safeInput.backgroundSaturation, 40, 160, DEFAULT_STATE.backgroundSaturation),
      backgroundContrast: clampNumber(safeInput.backgroundContrast, 60, 160, DEFAULT_STATE.backgroundContrast),
      backgroundOverlayColor: normalizeHexColor(safeInput.backgroundOverlayColor, DEFAULT_STATE.backgroundOverlayColor),
      backgroundOverlayOpacity: clampNumber(safeInput.backgroundOverlayOpacity, 0, 100, DEFAULT_STATE.backgroundOverlayOpacity),
      railImageDataUrl: typeof safeInput.railImageDataUrl === "string" ? safeInput.railImageDataUrl : DEFAULT_STATE.railImageDataUrl,
      railImageOpacity: clampNumber(safeInput.railImageOpacity, 10, 100, DEFAULT_STATE.railImageOpacity),
      railImageDarken: clampNumber(safeInput.railImageDarken, 0, 80, DEFAULT_STATE.railImageDarken),
      businessName: legacyStudio ? DEFAULT_STATE.businessName : sanitizeText(safeInput.businessName, DEFAULT_STATE.businessName),
      personName: legacyStudio ? DEFAULT_STATE.personName : sanitizeText(safeInput.personName, DEFAULT_STATE.personName),
      role: legacyStudio ? DEFAULT_STATE.role : sanitizeText(safeInput.role, DEFAULT_STATE.role),
      tagline: legacyStudio ? DEFAULT_STATE.tagline : sanitizeText(safeInput.tagline, DEFAULT_STATE.tagline),
      description: legacyStudio ? DEFAULT_STATE.description : sanitizeText(safeInput.description, DEFAULT_STATE.description),
      services: services.map(function (item, index) {
        return sanitizeText(item, DEFAULT_STATE.services[index]);
      }),
      phone: legacyStudio ? DEFAULT_STATE.phone : sanitizePhone(safeInput.phone, DEFAULT_STATE.phone),
      email: legacyStudio ? DEFAULT_STATE.email : sanitizeText(safeInput.email, DEFAULT_STATE.email),
      website: legacyStudio ? DEFAULT_STATE.website : sanitizeText(safeInput.website, DEFAULT_STATE.website),
      address: legacyStudio ? DEFAULT_STATE.address : sanitizeText(safeInput.address, DEFAULT_STATE.address),
      city: legacyStudio ? DEFAULT_STATE.city : sanitizeText(safeInput.city, DEFAULT_STATE.city),
      country: legacyStudio ? DEFAULT_STATE.country : sanitizeText(safeInput.country, DEFAULT_STATE.country),
      instagram: legacyStudio ? DEFAULT_STATE.instagram : sanitizeText(safeInput.instagram, DEFAULT_STATE.instagram),
      linkedin: legacyStudio ? DEFAULT_STATE.linkedin : sanitizeText(safeInput.linkedin, DEFAULT_STATE.linkedin),
      accentColor: normalizeHexColor(safeInput.accentColor, DEFAULT_STATE.accentColor),
      surfaceColor: normalizeHexColor(safeInput.surfaceColor, DEFAULT_STATE.surfaceColor),
      paperColor: normalizeHexColor(safeInput.paperColor, DEFAULT_STATE.paperColor),
      paperAltColor: normalizeHexColor(safeInput.paperAltColor, DEFAULT_STATE.paperAltColor),
      textDarkColor: normalizeHexColor(safeInput.textDarkColor, DEFAULT_STATE.textDarkColor),
      textLightColor: normalizeHexColor(safeInput.textLightColor, DEFAULT_STATE.textLightColor),
      chipColor: normalizeHexColor(safeInput.chipColor, DEFAULT_STATE.chipColor),
      panelColor: normalizeHexColor(safeInput.panelColor, DEFAULT_STATE.panelColor),
      unlock: {
        kind: safeInput.unlock && (safeInput.unlock.kind === "single" || safeInput.unlock.kind === "bundle") ? safeInput.unlock.kind : null,
        layoutIndex: safeInput.unlock && Number.isFinite(Number(safeInput.unlock.layoutIndex)) ? Number(safeInput.unlock.layoutIndex) : null,
        sessionId: safeInput.unlock && typeof safeInput.unlock.sessionId === "string" ? safeInput.unlock.sessionId : null
      },
      customLayout: customLayout
    };
  }

  function sanitizeText(value, fallback) {
    const cleaned = String(value || "").trim();
    return cleaned || fallback;
  }

  function sanitizePhone(value, fallback) {
    const cleaned = String(value || "").trim();
    if (!cleaned) {
      return fallback;
    }

    if (cleaned === "+351 309 006" || cleaned === "+351309 006") {
      return fallback;
    }

    return cleaned;
  }

  function clampNumber(value, min, max, fallback) {
    const number = Number(value);
    if (!Number.isFinite(number)) {
      return fallback;
    }
    return Math.min(max, Math.max(min, number));
  }

  function normalizeHexColor(value, fallback) {
    const candidate = String(value || "").trim();
    if (/^#[0-9a-fA-F]{6}$/.test(candidate)) {
      return candidate.toUpperCase();
    }
    return fallback;
  }

  function hexToRgb(hex) {
    const value = normalizeHexColor(hex, "#000000").replace("#", "");
    return {
      r: parseInt(value.slice(0, 2), 16),
      g: parseInt(value.slice(2, 4), 16),
      b: parseInt(value.slice(4, 6), 16)
    };
  }

  function rgbaFromHex(hex, alpha) {
    const rgb = hexToRgb(hex);
    const a = Math.min(1, Math.max(0, Number(alpha) || 0));
    return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${a.toFixed(3)})`;
  }

  function relativeLuminance(hex) {
    const rgb = hexToRgb(hex);
    const channels = [rgb.r, rgb.g, rgb.b].map(function (channel) {
      const value = channel / 255;
      return value <= 0.03928 ? value / 12.92 : Math.pow((value + 0.055) / 1.055, 2.4);
    });
    return (0.2126 * channels[0]) + (0.7152 * channels[1]) + (0.0722 * channels[2]);
  }

  function bestTextColor(background) {
    return relativeLuminance(background) > 0.52 ? "#10131B" : "#F7F9FF";
  }

  function mixColors(hexA, hexB, ratio) {
    const a = hexToRgb(hexA);
    const b = hexToRgb(hexB);
    const weight = Math.min(1, Math.max(0, Number(ratio) || 0));
    const mix = {
      r: Math.round(a.r + (b.r - a.r) * weight),
      g: Math.round(a.g + (b.g - a.g) * weight),
      b: Math.round(a.b + (b.b - a.b) * weight)
    };
    return '#' + [mix.r, mix.g, mix.b].map(function(channel) {
      return channel.toString(16).padStart(2, '0');
    }).join('').toUpperCase();
  }

  function slugify(value) {
    return String(value || '')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '') || 'cartao-visita';
  }
})();

