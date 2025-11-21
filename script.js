// ===== PERFIL DINÁMICO (cargá tus datos) =====
const PROFILE = {
  degree: "Licenciado en Negocios Internacionales e Integración Económica",
  university: "Universidad Católica del Uruguay",
  graduationYear: "2023",
  otherStudies: [],
  certifications: []
};

// ===== Animación Reveal & Render dinámico =====
(function () {
  // Reveal con IntersectionObserver
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
    // fallback: si no hay IntersectionObserver, mostrar todo
    els.forEach((el) => el.classList.add("in"));
  }

  // Hero: título de formación (opcional)
  const heroDegree = document.getElementById("hero-degree");
  if (heroDegree && PROFILE.degree) {
    const uni = PROFILE.university ? ` — ${PROFILE.university}` : "";
    const year = PROFILE.graduationYear ? ` (${PROFILE.graduationYear})` : "";
    heroDegree.textContent = `${PROFILE.degree}${uni}${year}`;
    heroDegree.classList.remove("hidden");
  }

  // Formación dinámica
  const wrapper = document.getElementById("edu-wrapper");
  if (!wrapper) return;

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
    return;
  }

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
})();
