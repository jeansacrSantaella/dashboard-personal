export interface DocTopic {
  title: string;
  category:
    | "Seguridad"
    | "Arquitectura"
    | "QA & Pruebas"
    | "Estimación"
    | "DevSecOps";
  summary: string;
  implementedIn: string; // Ruta relativa dentro del dashboard
  keyConcepts: string[];
  externalUrl?: string;
}

export const ARCHITECTURE_DOCS: DocTopic[] = [
  // --- DEVSECOPS & CALIDAD (NUEVO) ---
  {
    title: "Métricas DORA & Rendimiento de Entrega",
    category: "DevSecOps",
    summary:
      "Evaluación cuantitativa de la madurez operativa y resiliencia del pipeline CI/CD mediante los 4 indicadores estándar: Deployment Frequency, Lead Time for Changes, Change Failure Rate y MTTR.",
    implementedIn: "/dashboard/security",
    keyConcepts: ["DORA Metrics", "Trunk-Based", "MTTR", "Change Failure Rate"],
    externalUrl: "https://cloud.google.com/devops/state-of-devops",
  },
  {
    title: "Matriz de Pruebas & Calidad ISTQB v4.0",
    category: "QA & Pruebas",
    summary:
      "Estrategia formal de verificación y validación: Técnicas de Caja Negra (Partición de Equivalencia y Análisis de Valores Límite) y Caja Blanca (Branch Coverage) sobre módulos criptográficos y sanitización.",
    implementedIn: "/dashboard/security",
    keyConcepts: [
      "ISTQB v4.0",
      "Valores Límite (BVA)",
      "Partición Equivalencia (EP)",
      "Branch Coverage",
    ],
    externalUrl:
      "https://www.istqb.org/certifications/certified-tester-foundation-level-ctfl-v4-0",
  },

  // --- CIBERSEGURIDAD ---
  {
    title: "Modelo k-Anonymity & Web Crypto API",
    category: "Seguridad",
    summary:
      "Técnica de privacidad diferencial aplicada al servicio Have I Been Pwned (HIBP). La contraseña se procesa con SHA-1 nativo y solo viajan por red los primeros 5 caracteres hexadecimales (20 bits), manteniendo el secreto completo en el cliente.",
    implementedIn: "/dashboard/security",
    keyConcepts: [
      "SHA-1 Nativo",
      "Zero-Knowledge",
      "HIBP Range API",
      "W3C Crypto",
    ],
    externalUrl: "https://haveibeenpwned.com/API/v3#PwnedPasswords",
  },
  {
    title: "Entropía de Shannon & NIST SP 800-63B",
    category: "Seguridad",
    summary:
      "Cálculo matemático del espacio de búsqueda H = L · log2(R) complementado con detección heurística de patrones espaciales (QWERTY), repeticiones, fechas y secuencias.",
    implementedIn: "/dashboard/security",
    keyConcepts: [
      "Shannon Entropy",
      "Heurística de Patrones",
      "Detección QWERTY",
      "NIST",
    ],
    externalUrl: "https://pages.nist.gov/800-63-3/sp800-63b.html",
  },
  {
    title: "Cifrado Autenticado AES-256-GCM & PBKDF2",
    category: "Seguridad",
    summary:
      "Cifrado simétrico autenticado que proporciona confidencialidad e integridad (tag MAC). La clave se deriva mediante PBKDF2 a 100,000 iteraciones con SHA-256 según NIST SP 800-132.",
    implementedIn: "/dashboard/security",
    keyConcepts: ["AES-GCM", "PBKDF2", "Integridad MAC", "Nonce / Salt"],
    externalUrl: "https://csrc.nist.gov/pubs/sp/800/132/final",
  },

  // --- ARQUITECTURA & SCAFFOLDING MULTIPLATAFORMA ---
  {
    title: "Webpack 5 Module Federation & Microfrontends",
    category: "Arquitectura",
    summary:
      "Arquitectura desacoplada en frontend con un Host Shell contenedor en React y remotos heterogéneos federados (React y Angular vía Custom Elements/@angular/elements), orquestados con React Flow.",
    implementedIn: "/dashboard/leadership",
    keyConcepts: [
      "Module Federation",
      "Angular Elements",
      "Host Shell",
      "React Flow Graph",
    ],
    externalUrl: "https://webpack.js.org/concepts/module-federation/",
  },
  {
    title: "Arquitecturas de Proyecto: Móvil, SPA & Feature-First",
    category: "Arquitectura",
    summary:
      "Estructuras de directorios escalables: Next.js (Feature-First), Angular (Standalones & Signals), React Native (Modular & Hardware Hooks) y React Puro (Atomic Design sobre Vite).",
    implementedIn: "/dashboard/leadership",
    keyConcepts: [
      "Feature-First",
      "Atomic Design",
      "Standalone Components",
      "Expo SecureStore",
    ],
    externalUrl:
      "https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html",
  },

  // --- ESTIMACIÓN & GOBERNANZA ---
  {
    title: "Medición Funcional COSMIC (ISO/IEC 19761)",
    category: "Estimación",
    summary:
      "Modelo determinista de medición de tamaño funcional de software mediante movimientos elementales de datos: Entradas (E), Salidas (X), Lecturas (R) y Escrituras (W).",
    implementedIn: "/dashboard/leadership",
    keyConcepts: [
      "ISO/IEC 19761",
      "CFP (COSMIC Function Points)",
      "Fronteras de Software",
    ],
    externalUrl: "https://cosmic-sizing.org/",
  },
  {
    title: "Estimación Ponderada PERT (Distribución Beta)",
    category: "Estimación",
    summary:
      "Inferencia probabilística para proyectos de ingeniería considerando tres escenarios: Optimista (O), Más Probable (M) y Pesimista (P), calculando tiempo esperado y desviación estándar de varianza.",
    implementedIn: "/dashboard/leadership",
    keyConcepts: [
      "Distribución Beta",
      "Desviación Estándar σ",
      "Varianza σ²",
      "Trunk-Based",
    ],
    externalUrl:
      "https://en.wikipedia.org/wiki/Program_evaluation_and_review_technique",
  },
];
