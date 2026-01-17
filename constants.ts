import { BusLine } from './types';

export const BUS_LINES: BusLine[] = [
  {
    id: '1',
    lineNumber: '119P-10',
    destination: 'TERM. BANDEIRA',
    companyName: 'CMTC',
    companyLogoText: 'CMTC',
    color: '#D32F2F', // Classic Red
    year: '1988',
    plate: 'SP-1988',
    description: 'Operação Municipalizada',
    history: 'A linha 119P (Circular) era uma das mais tradicionais do centro, operada pela Companhia Municipal de Transportes Coletivos. Os monoblocos vermelhos dominavam a paisagem urbana na gestão de Jânio Quadros.',
  },
  {
    id: '2',
    lineNumber: '875A-10',
    destination: 'AEROPORTO',
    companyName: 'Viação Gato Preto',
    companyLogoText: 'GATO PRETO',
    color: '#2E7D32', // Dark Green
    year: '1992',
    plate: 'B04-123',
    description: 'Ligação Zona Oeste - Sul',
    history: 'Conhecida por seus veículos bem conservados, a Gato Preto operava esta linha vital ligando Perdizes e Sumaré ao Aeroporto de Congonhas. A pintura verde-folha era icônica nos anos 90.',
  },
  {
    id: '3',
    lineNumber: '6450-10',
    destination: 'TERM. CAPELINHA',
    companyName: 'Viação Campo Belo',
    companyLogoText: 'CAMPO BELO',
    color: '#7f1d1d', // Dark Maroon
    year: '1995',
    plate: 'KG-5432',
    description: 'Eixo Santo Amaro',
    history: 'Uma das linhas arteriais mais carregadas da cidade, conectando o extremo sul ao centro via Av. Santo Amaro. Os ônibus articulados "sanfonas" eram comuns nesta rota.',
  },
  {
    id: '4',
    lineNumber: '2290-10',
    destination: 'TERM. P. DOM PEDRO II',
    companyName: 'Cooperativa Leste',
    companyLogoText: 'COOPERLESTE',
    color: '#1565C0', // Blue
    year: '2001',
    plate: '3 4022',
    description: 'Transporte Alternativo',
    history: 'O início dos anos 2000 viu a ascensão das cooperativas de perueiros que se tornaram micro-ônibus. A cor azul representava a área 3 (Leste) no sistema Interligado.',
  }
];
