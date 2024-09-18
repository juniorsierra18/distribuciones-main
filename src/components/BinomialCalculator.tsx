import React, { useState } from 'react';
import styles from './Calculator.module.css';

interface BinomialCalculatorProps {
    numbers: number[];
}

const BinomialCalculator: React.FC<BinomialCalculatorProps> = ({ numbers }) => {
    const [n, setN] = useState<number>(1); // Número total de ensayos
    const [p, setP] = useState<number>(0.5); // Probabilidad de éxito en cada ensayo
    const [calcType, setCalcType] = useState<string>('above');
    const [value1, setValue1] = useState<number>(0);
    const [value2, setValue2] = useState<number>(0);
    const [results, setResults] = useState<number[]>([]);
    const [percentage, setPercentage] = useState<string>('');

    const calculateBinomial = (k: number) => {
        // Función para calcular el coeficiente binomial (n choose k)
        const binomialCoefficient = (n: number, k: number) => {
            if (k === 0 || k === n) return 1;
            let result = 1;
            for (let i = 1; i <= k; i++) {
                result *= (n - i + 1) / i;
            }
            return result;
        };

        // Función para calcular la probabilidad de k éxitos en n ensayos con probabilidad p
        const probability = binomialCoefficient(n, k) * Math.pow(p, k) * Math.pow(1 - p, n - k);
        return probability;
    };

    const handleCalculate = () => {
        const newResults = numbers.map(number => {
            let result = 0;
            for (let k = 0; k <= n; k++) {
                // Calcular la probabilidad acumulada hasta k
                result += calculateBinomial(k);
                // Si la probabilidad acumulada supera el número generado aleatoriamente, devolver k
                if (result >= number) return k;
            }
            return n; // Si no se alcanza antes, devolver n
        });
        setResults(newResults);
        calculatePercentage(newResults);
    };

    const calculatePercentage = (results: number[]) => {
        let count = 0;
        switch (calcType) {
            case 'equal':
                count = results.filter(x => x === value1).length;
                break;
            case 'above':
                count = results.filter(x => x > value1).length;
                break;
            case 'above_equal':
                count = results.filter(x => x >= value1).length;
                break;
            case 'below':
                count = results.filter(x => x < value1).length;
                break;
            case 'below_equal':
                count = results.filter(x => x <= value1).length;
                break;
            case 'between':
                count = results.filter(x => x > value1 && x < value2).length;
                break;
            case 'tails':
                count = results.filter(x => x < value1 || x > value2).length;
                break;
            default:
                count = 0;
        }
        const calcPercentage = (count / results.length) * 100;
        setPercentage(calcPercentage.toFixed(2) + '%');
    };

    return (
        <div>
            <div>
                <label>Número total de ensayos (n): </label>
                <input
                    type="number"
                    value={n}
                    onChange={e => setN(Number(e.target.value))}
                />
            </div>
            <div>
                <label>Probabilidad de éxito en cada ensayo (p): </label>
                <input
                    type="number"
                    value={p}
                    onChange={e => setP(Number(e.target.value))}
                />
            </div>
            <div>
                <label>Calcular probabilidad: </label>
                <select value={calcType} onChange={e => setCalcType(e.target.value)}>
                    <option value="equal">x = a</option>
                    <option value="above">x &gt; a</option>
                    <option value="above_equal">x ≥ a</option>
                    <option value="below">x &lt; a</option>
                    <option value="below_equal">x ≤ a</option>
                    <option value="between">a &lt; x &lt; b</option>
                    <option value="tails">x &gt; a O x &lt; b</option>
                </select>
            </div>
            <div>
                {calcType === 'equal' && (
                    <div>
                        <label>x = </label>
                        <input type="number" value={value1} onChange={e => setValue1(Number(e.target.value))} />
                    </div>
                )}
                {calcType === 'above' && (
                    <div>
                        <label>x &gt; </label>
                        <input type="number" value={value1} onChange={e => setValue1(Number(e.target.value))} />
                    </div>
                )}
                {calcType === 'above_equal' && (
                    <div>
                        <label>x ≥ </label>
                        <input type="number" value={value1} onChange={e => setValue1(Number(e.target.value))} />
                    </div>
                )}
                {calcType === 'below' && (
                    <div>
                        <label>x &lt; </label>
                        <input type="number" value={value1} onChange={e => setValue1(Number(e.target.value))} />
                    </div>
                )}
                {calcType === 'below_equal' && (
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
                        <label>x &gt; </label>
                        <input type="number" value={value1} onChange={e => setValue1(Number(e.target.value))} />
                        <label> O x &lt; </label>
                        <input type="number" value={value2} onChange={e => setValue2(Number(e.target.value))} />
                    </div>
                )}
            </div>
            <button className={styles.calculateButton} onClick={handleCalculate}>Calcular</button>
            {results.length > 0 && (
                <div className={styles.percentageContainer}>
                    <h3>Probabilidad: {percentage}</h3>
                </div>
            )}
            <h3>Valores de x</h3>
            <div className={styles.resultsContainer}>
                {results.map((result, index) => (
                    <div key={index}>{result}</div>
                ))}
            </div>
        </div>
    );
};

export default BinomialCalculator;
