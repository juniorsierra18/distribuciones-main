import React from 'react';
import { DistributionType } from '../types';
import styles from './CalculatorSelect.module.css';

interface Props {
  onSelect: (distribution: DistributionType) => void;
}

const CalculatorSelect: React.FC<Props> = ({ onSelect }) => {
  return (
    <div className={styles.selectContainer}>
      <h2 className="my-2 font-semibold">Seleccionar distribución</h2>
      <select className={styles.select} onChange={(e) => onSelect(e.target.value as DistributionType)}>
        <option value="Exponencial">Exponencial</option>
        <option value="Poisson">Poisson</option>
      </select>
    </div>
  );
};

export default CalculatorSelect;
