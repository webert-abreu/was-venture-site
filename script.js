// script.js - WAS Select

document.addEventListener("DOMContentLoaded", () => {
  // =========================================
  // 1. LÓGICA DE COOKIES (LGPD)
  // =========================================
  const cookieBanner = document.getElementById("cookie-banner");
  const acceptBtn = document.getElementById("accept-cookies");

  if (!localStorage.getItem("cookiesAccepted")) {
    setTimeout(() => {
      if (cookieBanner) {
        cookieBanner.style.display = "block";
      }
    }, 2500);
  }

  if (acceptBtn) {
    acceptBtn.addEventListener("click", () => {
      localStorage.setItem("cookiesAccepted", "true");
      cookieBanner.style.display = "none";
    });
  }

  // =========================================
  // 2. POPUP DE SAÍDA (EXIT INTENT)
  // =========================================
  const exitPopup = document.getElementById("exit-popup");
  const closePopupBtn = document.querySelector(".close-popup");
  let popupShown = false;

  const showExitPopup = () => {
    if (!popupShown && !sessionStorage.getItem("popupClosed")) {
      if (exitPopup) {
        exitPopup.classList.add("visible");
        popupShown = true;
      }
    }
  };

  // Gatilho: Mouse saindo pelo topo (Desktop)
  document.addEventListener("mouseleave", (e) => {
    if (e.clientY < 0) {
      showExitPopup();
    }
  });

  // Fechar ao clicar no X
  if (closePopupBtn) {
    closePopupBtn.addEventListener("click", () => {
      exitPopup.classList.remove("visible");
      sessionStorage.setItem("popupClosed", "true");
    });
  }

  // Fechar ao clicar fora (Overlay)
  if (exitPopup) {
    exitPopup.addEventListener("click", (e) => {
      if (e.target === exitPopup) {
        exitPopup.classList.remove("visible");
        sessionStorage.setItem("popupClosed", "true");
      }
    });
  }

  // =========================================
  // 3. SCROLL SUAVE (LINKS INTERNOS)
  // =========================================
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 100,
          behavior: "smooth",
        });
      }
    });
  });

  // =========================================
  // 4. ANIMAÇÃO DE SCROLL (REVEAL)
  // =========================================
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Lista atualizada com TODAS as novas classes que criamos
  const elementsToAnimate = document.querySelectorAll(`
    .card, 
    .feature-row, 
    .price-card, 
    .step-card, 
    .chart-container,
    .criteria-card,   /* Novo: Card de critérios */
    .process-step,    /* Novo: Timeline */
    .flow-stage,      /* Novo: Pipeline horizontal */
    .edu-card         /* Novo: Cards da Educação */
  `);

  elementsToAnimate.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";
    observer.observe(el);
  });

  // =========================================
  // 5. WAS EDUCATION (ÁREA SECRETA)
  // =========================================
  const eduOverlay = document.getElementById("education-page");

  // Botão que abre (na seção pre-footer)
  // Estamos usando querySelector para pegar o botão pela classe,
  // caso o onclick do HTML falhe ou para ser mais robusto.
  const openEduBtn = document.querySelector(".education-trigger button");

  // Botão que fecha (dentro do overlay)
  const closeEduBtn = document.querySelector(".close-edu");

  // Funções de controle
  const openEducation = () => {
    if (eduOverlay) {
      eduOverlay.classList.add("active");
      document.body.style.overflow = "hidden"; // Trava o scroll do site
    }
  };

  const closeEducation = () => {
    if (eduOverlay) {
      eduOverlay.classList.remove("active");
      document.body.style.overflow = "auto"; // Libera o scroll
    }
  };

  // Event Listeners
  if (openEduBtn) {
    openEduBtn.addEventListener("click", (e) => {
      e.preventDefault(); // Evita comportamento padrão se for link
      openEducation();
    });
  }

  if (closeEduBtn) {
    closeEduBtn.addEventListener("click", closeEducation);
  }

  // Fechar com a tecla ESC (UX Bônus)
  document.addEventListener("keydown", (e) => {
    if (
      e.key === "Escape" &&
      eduOverlay &&
      eduOverlay.classList.contains("active")
    ) {
      closeEducation();
    }
  });

  // Expor funções para o HTML (Caso você mantenha o onclick no HTML)
  // Isso garante que onclick="openEducation()" funcione mesmo dentro do DOMContentLoaded
  window.openEducation = openEducation;
  window.closeEducation = closeEducation;
});
