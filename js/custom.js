(() => {
      const editWords = /edit|editar/i;

      function hideEditorButton(element) {
        if (!(element instanceof HTMLElement)) return;
        const hasEditorData =
          element.hasAttribute("data-framer-badge") ||
          element.hasAttribute("data-framer-editor") ||
          element.hasAttribute("data-framer-edit") ||
          element.id === "__framer-badge-container";

        const label = [
          element.getAttribute("aria-label"),
          element.getAttribute("title"),
          element.className,
          element.id,
        ].filter(Boolean).join(" ");

        const style = getComputedStyle(element);
        const rect = element.getBoundingClientRect();
        const isSmallFloating =
          style.position === "fixed" &&
          rect.width > 0 &&
          rect.height > 0 &&
          rect.width <= 96 &&
          rect.height <= 96 &&
          rect.left > window.innerWidth * 0.65 &&
          rect.top > 40 &&
          rect.bottom < window.innerHeight - 40;

        const looksLikeIconButton =
          element.matches("button, a, div") &&
          (element.querySelector("svg, path") || /border-radius:\s*(50%|999|100px)/i.test(element.getAttribute("style") || ""));

        if (hasEditorData || editWords.test(label) || (isSmallFloating && looksLikeIconButton)) {
          element.style.setProperty("display", "none", "important");
          element.style.setProperty("visibility", "hidden", "important");
          element.style.setProperty("pointer-events", "none", "important");
          element.setAttribute("aria-hidden", "true");
        }
      }

      function removeEditorButtons() {
        document.querySelectorAll("#__framer-badge-container, [data-framer-badge], [data-framer-editor], [data-framer-edit], button, a").forEach(hideEditorButton);
      }

      function fixPortugueseText() {
        const replacements = [
          [/\u00A9\s*2026\s+BARBEARA\s+FIO\s+HAIR\.?\s+todos\s+os\s+direitos\s+reservados\.?/gi, "\u00A9 2026 BARBEARIA FIO HAIR. Todos os direitos reservados."],
          [/\u00A9\s*2026\s+BARBEARIA\s+FIO\s+HAIR\.?\s+todos\s+os\s+direitos\s+reservados\.?/gi, "\u00A9 2026 BARBEARIA FIO HAIR. Todos os direitos reservados."],
          [/\u00C2\u00A9\s*2026\s+BARBEARA\s+FIO\s+HAIR\.?\s+todos\s+os\s+direitos\s+reservados\.?/gi, "\u00A9 2026 BARBEARIA FIO HAIR. Todos os direitos reservados."],
          [/\u00C3\u201A\u00C2\u00A9\s*2026\s+BARBEARA?IA?\s+FIO\s+HAIR\.?\s+Todos\s+os\s+direitos\s+reservados\.?/gi, "\u00A9 2026 BARBEARIA FIO HAIR. Todos os direitos reservados."],
          [/\bBARBEARA\b/g, "BARBEARIA"],
          [/\bInicio\b/g, "In\u00EDcio"],
          [/\bOque Temos\b/g, "O que temos"],
        ];

        if (!document.body) return;
        const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
        let node = walker.nextNode();
        while (node) {
          let text = node.nodeValue;
          for (const [pattern, replacement] of replacements) {
            text = text.replace(pattern, replacement);
          }
          if (text !== node.nodeValue) node.nodeValue = text;
          node = walker.nextNode();
        }
      }

      function fixFooterLayout() {
        if (!window.matchMedia("(max-width: 809.98px)").matches) return;

        document.querySelectorAll(".framer-gUdAG .framer-10cs52l, .framer-gUdAG .framer-tisv6g").forEach((element) => {
          element.style.setProperty("align-items", "center", "important");
          element.style.setProperty("justify-content", "center", "important");
          element.style.setProperty("text-align", "center", "important");
          element.style.setProperty("width", "100%", "important");
        });

        document.querySelectorAll(".framer-gUdAG .framer-10cs52l").forEach((element) => {
          element.style.setProperty("padding-left", "20px", "important");
          element.style.setProperty("padding-right", "20px", "important");
          element.style.setProperty("overflow", "visible", "important");
        });

        document.querySelectorAll(".framer-gUdAG .framer-1dzal7v").forEach((element) => {
          element.style.setProperty("max-width", "calc(100vw - 40px)", "important");
          element.style.setProperty("width", "100%", "important");
          element.style.setProperty("overflow", "visible", "important");
        });

        document.querySelectorAll(".framer-gUdAG .framer-1dzal7v .framer-text").forEach((element) => {
          element.style.setProperty("text-align", "center", "important");
          element.style.setProperty("white-space", "normal", "important");
          element.style.setProperty("overflow-wrap", "anywhere", "important");
          element.style.setProperty("line-height", "1.4em", "important");
        });
      }

      function fixHeroMobileText() {
        const viewportWidth = Math.min(
          window.innerWidth || Infinity,
          document.documentElement.clientWidth || Infinity
        );
        if (viewportWidth > 809) return;

        const content = document.querySelector(".framer-LNvIL .framer-1llxibs");
        const titleWrap = document.querySelector(".framer-LNvIL .framer-edygsd");
        const title = titleWrap?.querySelector(".framer-text");
        if (!content || !titleWrap || !title) return;

        content.style.setProperty("width", "calc(100vw - 40px)", "important");
        content.style.setProperty("max-width", "calc(100vw - 40px)", "important");
        content.style.setProperty("align-items", "center", "important");
        titleWrap.style.setProperty("width", "100%", "important");
        titleWrap.style.setProperty("max-width", "100%", "important");
        title.style.setProperty("--framer-font-size", "44px", "important");
        title.style.setProperty("--framer-letter-spacing", "0px", "important");
        title.style.setProperty("font-size", "44px", "important");
        title.style.setProperty("line-height", "1.08em", "important");
        title.style.setProperty("letter-spacing", "0px", "important");
        title.style.setProperty("width", "100%", "important");
        title.style.setProperty("max-width", "100%", "important");
        title.style.setProperty("text-align", "center", "important");
        title.style.setProperty("transform", "translateX(-40px)", "important");
        title.style.setProperty("white-space", "normal", "important");
        title.style.setProperty("overflow-wrap", "normal", "important");
      }

      function fixServiceCards() {
        const services = [
          ["Barba", "R$ 45,00"],
          ["Barba platinada", "R$ 100,00"],
          ["Corte + Hidratação", "R$ 75,00"],
          ["Corte degrade", "R$ 50,00"],
          ["Degrade + Barba", "R$ 85,00"],
          ["Degrade + Barba + Sobrancelha", "R$ 95,00"],
          ["Degrade com Penteado", "R$ 70,00"],
          ["Degrade com Penteado e Sobrancelha", "R$ 85,00"],
          ["Degrade e Sobrancelha", "R$ 65,00"],
          ["Hidratação", "R$ 40,00"],
          ["Luzes + Corte", "R$ 140,00"],
          ["Penteado", "R$ 30,00"],
          ["Platinado + Corte", "R$ 200,00"],
          ["Progressiva + Corte", "R$ 120,00"],
          ["Raspar", "R$ 35,00"],
          ["Sobrancelha", "R$ 19,90"],
          ["Social", "R$ 45,00"],
          ["Sou mensal - com barba", "R$ 170,00"],
          ["Sou mensal - corte degrade", "R$ 150,00"],
        ];

        const firstColumn = document.querySelector(".framer-2tkbi1");
        const secondColumn = document.querySelector(".framer-1mr8mwi");
        if (!firstColumn || !secondColumn) return;

        let customGrid = document.querySelector(".fio-hair-prices");
        if (!customGrid) {
          customGrid = document.createElement("div");
          customGrid.className = "fio-hair-prices";
          firstColumn.parentElement.insertBefore(customGrid, firstColumn);
        }

        const serviceCard = ([name, price]) => `
          <article class="fio-hair-price-card">
            <h5>${name}</h5>
            <p>${price}</p>
          </article>
        `;
        const regularServices = services.slice(0, 16).map(serviceCard).join("");
        const featuredServices = services.slice(16).map(serviceCard).join("");

        customGrid.innerHTML = `
          <div class="fio-hair-price-grid">${regularServices}</div>
          <div class="fio-hair-price-featured">${featuredServices}</div>
        `;

        firstColumn.style.setProperty("display", "none", "important");
        firstColumn.style.setProperty("height", "0", "important");
        firstColumn.style.setProperty("min-height", "0", "important");
        firstColumn.style.setProperty("margin", "0", "important");
        firstColumn.style.setProperty("padding", "0", "important");
        firstColumn.style.setProperty("overflow", "hidden", "important");
        secondColumn.style.setProperty("display", "none", "important");
        secondColumn.style.setProperty("height", "0", "important");
        secondColumn.style.setProperty("min-height", "0", "important");
        secondColumn.style.setProperty("margin", "0", "important");
        secondColumn.style.setProperty("padding", "0", "important");
        secondColumn.style.setProperty("overflow", "hidden", "important");

        const existingCards = Array.from(document.querySelectorAll(".framer-2tkbi1 .ssr-variant, .framer-1mr8mwi .ssr-variant"));
        const template = existingCards.find((card) => card.querySelector(".framer-gFxgY"));
        if (!template) return;

        while (existingCards.length < services.length) {
          const clone = template.cloneNode(true);
          clone.classList.remove("hidden-10vtqyz", "hidden-dddr2v", "hidden-72rtr7", "hidden-o6gk4u", "hidden-1g5b3dz");
          existingCards.push(clone);
        }

        existingCards.forEach((wrapper, index) => {
          const service = services[index];
          if (!service) return;

          wrapper.classList.remove("hidden-10vtqyz", "hidden-dddr2v", "hidden-72rtr7", "hidden-o6gk4u", "hidden-1g5b3dz");
          const title = wrapper.querySelector(".framer-w19iar .framer-text");
          const price = wrapper.querySelector(".framer-606c86 .framer-text");
          if (title) title.textContent = service[0];
          if (price) price.textContent = service[1];

          const targetColumn = index < 10 ? firstColumn : secondColumn;
          if (wrapper.parentElement !== targetColumn) targetColumn.appendChild(wrapper);
          wrapper.style.removeProperty("display");
        });

        existingCards.slice(services.length).forEach((wrapper) => {
          wrapper.style.setProperty("display", "none", "important");
        });
      }

      function applyPageFixes() {
        try { removeEditorButtons(); } catch (error) {}
        try { fixPortugueseText(); } catch (error) {}
        try { fixHeroMobileText(); } catch (error) {}
        try { fixFooterLayout(); } catch (error) {}
        try { fixServiceCards(); } catch (error) {}
      }

      const runFixes = () => {
        let runs = 0;
        applyPageFixes();
        const timer = setInterval(() => {
          applyPageFixes();
          runs += 1;
          if (runs >= 60) clearInterval(timer);
        }, 500);
      };
      document.addEventListener("DOMContentLoaded", runFixes);
      window.addEventListener("load", runFixes);
    })();

