interface Question {
  question: string;
  options: string[];
}

export const questions: Question[] = [
  { question: "ERES HOMBRE O MUJER DE NACIMIENTO?", options: ["HOMBRE", "MUJER"] },
  { question: "CUÁL ES TU EDAD ACTUAL?", options: ["18-45", "46-64", "65+"] },
  { question: "CONSIDERAS TENER CONDICIÓN FÍSICA?", options: ["SI TIENE", "NO TIENE"] },
  { question: "EN QUÉ REGIÓN VIVES?", options: ["NORTE(NOROESTE,NOROESTE)", "CENTRO(CENTRO,OCCIDENTE)", "SUR(SUR,SURESTE)"] },
  { question: "CUÁL ES TU ÚLTIMO NIVEL DE ESTUDIOS?", options: ["SIN ESCOLARIDAD", "PREESCOLAR", "PRIMARIA", "SECUNDARIA", "PREPARATORIA", "UNIVERSIDAD", "POSGRADO"] },
  { question: "CUÁL ES TU OCUPACIÓN?", options: ["AGRICOLA/PESQUERO/FORESTAL", "APOYO GENERAL Y OFICIOS BASICOS", "COMERCIO/VENTAS", "CONSTRUCCIÓN/INDUSTRIAL/MANUAL", "DESEMPLEADO/NO TRABAJA/OTROS", "OFICINA/EDUCACION/ADMINISTRACION", "SERVICIOS PERSONALES Y SEGURIDAD"] },
  { question: "CUÁL ES TU ESTADO CIVIL?", options: ["SOLTERO(A)", "CASADO(A)", "DIVORCIADO(A)", "SEPARADO(A)", "VIUDO(A)", "UNION LIBRE"] },
  { question: "SUFRES DE VIOLENCIA FAMILIAR?", options: ["SI", "NO"] },
  { question: "TIENES ACCESO REGULAR A SERVICIOS DE SALUD?", options: ["CON SEGURO SOCIAL", "SIN SEGURO SOCIAL"] },
  { question: "TE HAS SOMETIDO A ALGUNA CIRUGÍA?", options: ["SI", "NO"] },
];