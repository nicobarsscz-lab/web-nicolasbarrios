// ===== PERFIL DINÁMICO (cargá tus datos) =====
const PROFILE = {
  degree: "Licenciado en Negocios Internacionales e Integración Económica",
  university: "Universidad Católica del Uruguay",
  graduationYear: "2023",
  otherStudies: [],
  certifications: []
};

// ===== Animación Reveal, formación dinámica, email ofuscado y formularios =====
(function () {
  // ------ Reveal con IntersectionObserver ------
  const els = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
  } else {
    // fallback: mostrar todo si no hay soporte
    els.forEach((el) => el.classList.add("in"));
  }

  // ------ Formación dinámica ------
  const wrapper = document.getElementById("edu-wrapper");
  if (wrapper) {
    const blocks = [];

    if (PROFILE.degree || PROFILE.university) {
      const year = PROFILE.graduationYear ? ` · ${PROFILE.graduationYear}` : "";
      blocks.push({
        title: "Título",
        body: [
          PROFILE.degree || "",
          PROFILE.university ? `${PROFILE.university}${year}` : ""
        ]
          .filter(Boolean)
          .join(" — ")
      });
    }
    if (PROFILE.otherStudies && PROFILE.otherStudies.length) {
      blocks.push({ title: "Estudios complementarios", list: PROFILE.otherStudies });
    }
    if (PROFILE.certifications && PROFILE.certifications.length) {
      blocks.push({ title: "Certificaciones", list: PROFILE.certifications });
    }

    if (blocks.length === 0) {
      const formacionSection = document.getElementById("formacion");
      if (formacionSection) formacionSection.style.display = "none";
    } else {
      blocks.forEach((b) => {
        const card = document.createElement("div");
        card.className = "card p-6 reveal in";
        const h3 = document.createElement("h3");
        h3.className = "font-semibold";
        h3.textContent = b.title;
        card.appendChild(h3);

        if (b.body) {
          const p = document.createElement("p");
          p.className = "text-sm text-zinc-600 mt-2";
          p.textContent = b.body;
          card.appendChild(p);
        }
        if (b.list) {
          const ul = document.createElement("ul");
          ul.className = "mt-2 space-y-1 text-sm text-zinc-600 list-disc pl-5";
          b.list.forEach((item) => {
            const li = document.createElement("li");
            li.textContent = item;
            ul.appendChild(li);
          });
          card.appendChild(ul);
        }
        wrapper.appendChild(card);
      });
    }
  }

  // ------ Ofuscación simple del email ------
  const user = "nicolasbarrioscriz";
  const domain = "gmail.com";
  const email = `${user}@${domain}`;

  const heroEmail = document.getElementById("hero-email");
  if (heroEmail) {
    heroEmail.textContent = email;
    heroEmail.href = `mailto:${email}`;
  }

  const cardEmail = document.getElementById("card-email");
  if (cardEmail) {
    cardEmail.textContent = `✉️ ${email}`;
    cardEmail.href = `mailto:${email}`;
  }

  // ------ Helpers para formularios (mailto por JS) ------
  function wireMailForm(form, subjectText) {
    if (!form) return;

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const data = new FormData(form);
      const lines = [];
      data.forEach((value, key) => {
        lines.push(`${key}: ${value}`);
      });

      const subject = encodeURIComponent(subjectText);
      const body = encodeURIComponent(lines.join("\n"));

      // dispara el cliente de correo
      window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
    });
  }

  const consultaForm = document.querySelector('form[data-type="consulta"]');
  wireMailForm(consultaForm, "Consulta desde la web");

  const proyectoForm = document.querySelector('form[data-type="proyecto"]');
  wireMailForm(proyectoForm, "Proyecto de comercio exterior");
})();
