/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import styles from './Calculator.module.css';
import ExponentialCalculator from './ExponentialCalculator';
import PoissonCalculator from './PoissonCalculator';
import NormalCalculator from './NormalCalculator';
import BinomialCalculator from './BinomialCalculator';
import ErlangCalculator from './ErlangCalculator';

interface CalculatorProps {
    distribution: string;
    numbers: number[];
}

const Calculator: React.FC<CalculatorProps> = ({ distribution, numbers }) => {

    const renderDistributionCalculator = () => {
        switch (distribution) {
            case 'Exponencial':
                return <ExponentialCalculator numbers={numbers}/>;
            case 'Poisson':
                return <PoissonCalculator numbers={numbers}/>;
            case 'Normal':
                return <NormalCalculator numbers={numbers}/>
            case 'Binomial':
                return <BinomialCalculator numbers={numbers}/>
            case 'Erlang':
                return <ErlangCalculator numbers={numbers}/>
            // Agregar casos para otras distribuciones
            default:
                return <div>Seleccione una distribución válida</div>;
        }
    };

    return (
        <div className={styles.calculatorContainer}>
            <h2 className={styles.heading}>Distribución {distribution}</h2>
            <h3>Números pseudoaleatorios</h3>
            <div className={styles.numbersContainer}>
                {numbers.map((number, index) => (
                    <div key={index}>{number}</div>
                ))}
            </div>
            {renderDistributionCalculator()}
        </div>
    );
};

export default Calculator;
