export interface PortfolioStats {
  deliveredProjects: {
    count: number;
    label: string;
    description: string;
  };
  testCoverage: {
    percentage: number;
    label: string;
    frameworks: string;
  };
  systemReliability: {
    uptimePercentage: number;
    label: string;
    standard: string;
  };
  securityAudit: {
    criticalFindings: number;
    label: string;
    frameworks: string;
  };
}

export const LEADERSHIP_METRICS: PortfolioStats = {
  deliveredProjects: {
    count: 14,
    label: "Sistemas & Servicios Distribuidos",
    description: "Proyectos empresariales e internos consolidados",
  },
  testCoverage: {
    percentage: 92.4,
    label: "Cobertura de Pruebas",
    frameworks: "Pytest, JUnit 5 & Estándar ISTQB",
  },
  systemReliability: {
    uptimePercentage: 99.9,
    label: "Disponibilidad / SLA",
    standard: "Contratos de resiliencia y Docker",
  },
  securityAudit: {
    criticalFindings: 0,
    label: "Hallazgos Críticos",
    frameworks: "Modelado OWASP Top 10 & SAST",
  },
};
