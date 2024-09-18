import React, { useState } from 'react';
import styles from './Calculator.module.css';

interface PoissonCalculatorProps {
    numbers: number[]; // Array of random numbers between 0 and 1
}

const PoissonCalculator: React.FC<PoissonCalculatorProps> = ({ numbers }) => {
    const [lambda, setLambda] = useState<number>(4); // Default lambda value set to 4
    const [results, setResults] = useState<number[]>([]);
    const [calcType, setCalcType] = useState<string>('greater');
    const [value1, setValue1] = useState<number>(0);
    const [value2, setValue2] = useState<number>(0);
    const [percentage, setPercentage] = useState<string>('');

    const factorial = (n: number): number => {
        let result = 1;
        for (let i = 2; i <= n; i++) {
            result *= i;
        }
        return result;
    };

    const poissonCDF = (media: number): number[] => {
        const limites = [0];
        for (let i = 0; i <= 12; i++) {
            limites.push(limites[i] + Math.exp(-media) * Math.pow(media, i) / factorial(i));
        }
        return limites;
    };

    const calculatePoisson = (aleatorios: number[], media: number): number[] => {
        const limites = poissonCDF(media);
        const vector = [];
        for (const num of aleatorios) {
            for (let i = 1; i < limites.length; i++) {
                if (num >= limites[i - 1] && num < limites[i]) {
                    vector.push(i - 1);
                    break;
                }
            }
        }
        return vector;
    };

    const handleCalculate = () => {
        const newResults = calculatePoisson(numbers, lambda);
        setResults(newResults);
        calculateProbability(newResults);
    };

    const calculateProbability = (results: number[]) => {
        let count = 0;

        switch(calcType) {
            case 'equal':
                count = results.filter(x => x === value1).length;
                break;
            case 'greater':
                count = results.filter(x => x > value1).length;
                break;
            case 'greater_equal':
                count = results.filter(x => x >= value1).length;
                break;
            case 'less':
                count = results.filter(x => x < value1).length;
                break;
            case 'less_equal':
                count = results.filter(x => x <= value1).length;
                break;
            case 'between':
                count = results.filter(x => x > value1 && x < value2).length;
                break;
            case 'tails':
                count = results.filter(x => x < value1 || x > value2).length;
                break;
        }
        setPercentage(((count / results.length) * 100).toFixed(2) + '%');
    }

    return (
        <div>
            <div>
                <label>λ (tasa media de ocurrencia): </label>
                <input type="number" value={lambda} onChange={e => setLambda(Number(e.target.value))} />
            </div>
            <div>
                <label>Calcular probabilidad: </label>
                <select value={calcType} onChange={e => setCalcType(e.target.value)}>
                    <option value="equal">x = a</option>
                    <option value="greater">x &gt; a</option>
                    <option value="greater_equal">x ≥ a</option>
                    <option value="less">x &lt; a</option>
                    <option value="less_equal">x ≤ a</option>
                    <option value="between">a &lt; x &lt; b</option>
                    <option value="tails">x &lt; a O x &gt; b</option>
                </select>
            </div>
            <div>
                {calcType === 'equal' && (
                    <div>
                        <label>x = </label>
                        <input type="number" value={value1} onChange={e => setValue1(Number(e.target.value))} />
                    </div>
                )}
                {calcType === 'greater' && (
                    <div>
                        <label>x &gt; </label>
                        <input type="number" value={value1} onChange={e => setValue1(Number(e.target.value))} />
                    </div>
                )}
                {calcType === 'greater_equal' && (
                    <div>
                        <label>x ≥ </label>
                        <input type="number" value={value1} onChange={e => setValue1(Number(e.target.value))} />
                    </div>
                )}
                {calcType === 'less' && (
                    <div>
                        <label>x &lt; </label>
                        <input type="number" value={value1} onChange={e => setValue1(Number(e.target.value))} />
                    </div>
                )}
                {calcType === 'less_equal' && (
                    <div>
                        <label>x ≤ </label>
                        <input type="number" value={value1} onChange={e => setValue1(Number(e.target.value))} />
                    </div>
                )}
                {calcType === 'between' && (
                    <div>
                        <input type="number" value={value1} onChange={e => setValue1(Number(e.target.value))} />
                        <label> &lt; x &lt; </label>
                        <input type="number" value={value2} onChange={e => setValue2(Number(e.target.value))} />
                    </div>
                )}
                {calcType === 'tails' && (
                    <div>
                        <label>x &lt; </label>
                        <input type="number" value={value1} onChange={e => setValue1(Number(e.target.value))} />
                        <label> O x &gt; </label>
                        <input type="number" value={value2} onChange={e => setValue2(Number(e.target.value))} />
                    </div>
                )}
            </div>
            <button className={styles.calculateButton} onClick={handleCalculate}>Calcular</button>
            <div className={styles.percentageContainer}>
                <h3>Probabilidad: {percentage}</h3>
            </div>
            <h3>Valores de x:</h3>
            <div className={styles.resultsContainer}>
                {results.map((result, index) => (
                    <div key={index}>{result.toFixed(4)}</div>
                ))}
            </div>
        </div>
    );
};

export default PoissonCalculator;
