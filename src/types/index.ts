export type DistributionType = 'Exponencial' | 'Poisson' | 'Normal' | 'Erlang' | 'Binomial';

export interface CalculatorProps {
  distribution: DistributionType;
}
