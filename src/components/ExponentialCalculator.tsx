/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import styles from './Calculator.module.css';

interface ExponentialCalculatorProps {
    numbers: number[];
}

const ExponentialCalculator: React.FC<ExponentialCalculatorProps> = ({ numbers }) => {
    const [mean, setMean] = useState<number>(0);
    const [calcType, setCalcType] = useState<string>('above');
    const [value1, setValue1] = useState<number>(0);
    const [value2, setValue2] = useState<number>(0);
    const [results, setResults] = useState<number[]>([]);
    const [percentage, setPercentage] = useState<string>('');

    const handleCalculate = () => {
        const newResults = numbers.map(number => {
            if (number === 0) {
                return mean;
            }
            return -mean * Math.log(number);
        });
        setResults(newResults);
        calculatePercentage(newResults);
    };

    const calculatePercentage = (results: number[]) => {
        let count = 0;
        switch (calcType) {
            case 'above':
                count = results.filter(x => x > value1).length;
                break;
            case 'below':
                count = results.filter(x => x < value1).length;
                break;
            case 'between':
                count = results.filter(x => x > value1 && x < value2).length;
                break;
            case 'tails':
                count = results.filter(x => x > value1 || x < value2).length;
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
                <label>Media (1/λ): </label>
                <input
                    type="number"
                    value={mean}
                    onChange={e => setMean(Number(e.target.value))}
                />
            </div>
            <div>
                <label>Calcular probabilidad: </label>
                <select value={calcType} onChange={e => setCalcType(e.target.value)}>
                    <option value="above">x &gt; a</option>
                    <option value="below">x &lt; a</option>
                    <option value="between">a &lt; x &lt; b</option>
                    <option value="tails">x &gt; a O x &lt; b</option>
                </select>
            </div>
            <div>
                {calcType === 'above' && (
                    <div>
                        <label>x &gt; </label>
                        <input type="number" value={value1} onChange={e => setValue1(Number(e.target.value))} />
                    </div>
                )}
                {calcType === 'below' && (
                    <div>
                        <label>x &lt; </label>
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
                    <div key={index}>{result.toFixed(4)}</div>
                ))}
            </div>
        </div>
    );
};

export default ExponentialCalculator;
