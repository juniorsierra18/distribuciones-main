import React, { useState } from 'react';
import styles from './Calculator.module.css';

interface BoxMullerCalculatorProps {
    numbers: number[];
}

const BoxMullerCalculator: React.FC<BoxMullerCalculatorProps> = ({ numbers }) => {
    const [mu, setMu] = useState<number>(0); // Media
    const [sigma, setSigma] = useState<number>(1); // Desviación estándar
    const [transformedNumbers, setTransformedNumbers] = useState<number[]>([]);
    const [calcType, setCalcType] = useState<string>('greater');
    const [value1, setValue1] = useState<number>(0);
    const [value2, setValue2] = useState<number>(0);
    const [percentage, setPercentage] = useState<string>('');

    const boxMullerTransform = (numbers: number[]): number[] => {
        const result: number[] = [];
        for (let i = 0; i < numbers.length; i += 2) {
            const u1 = numbers[i];
            const u2 = numbers[i + 1];
            const r = Math.sqrt(-2.0 * Math.log(u1));
            const theta = 2.0 * Math.PI * u2;
            result.push(r * Math.cos(theta), r * Math.sin(theta));
        }
        return result;
    };

    const reverseStandardization = (mu: number, sigma: number, numbers: number[]): number[] => {
        return numbers.map(z => z * sigma + mu);
    };

    const handleTransform = () => {
        if (numbers.length % 2 !== 0) {
            alert('Se necesita un número par de elementos para la transformación de Box-Muller.');
            return;
        }
        const normalDistributedNumbers = boxMullerTransform(numbers);
        const scaledNumbers = reverseStandardization(mu, sigma, normalDistributedNumbers);
        setTransformedNumbers(scaledNumbers);
        calculateProbability()
    };

    const calculateProbability = () => {

        let countSatisfying = 0;
        switch (calcType) {
            case 'greater':
                countSatisfying = transformedNumbers.filter(x => x > value1).length;
                break;
            case 'less':
                countSatisfying = transformedNumbers.filter(x => x < value1).length;
                break;
            case 'equal':
                countSatisfying = transformedNumbers.filter(x => x === value1).length;
                break;
            case 'between':
                countSatisfying = transformedNumbers.filter(x => x > value1 && x < value2).length;
                break;
        }

        setPercentage(((countSatisfying / transformedNumbers.length) * 100).toFixed(2) + '%');
    };

    return (
        <div>
            <div>
                <label>Media (μ): </label>
                <input
                    type="number"
                    value={mu}
                    onChange={e => setMu(Number(e.target.value))}
                />
            </div>
            <div>
                <label>Desviación estándar (σ): </label>
                <input
                    type="number"
                    value={sigma}
                    onChange={e => setSigma(Number(e.target.value))}
                />
            </div>
            <div>
                <label>Calcular probabilidad: </label>
                <select value={calcType} onChange={e => setCalcType(e.target.value)}>
                    <option value="greater">X &gt; a</option>
                    <option value="less">X &lt; a</option>
                    <option value="equal">X = a</option>
                    <option value="between">a &lt; X &lt; b</option>
                </select>
            </div>
            {calcType !== 'between' && (
                <div>
                    <label>
                        {calcType === 'greater' ? 'X > ' :
                            calcType === 'less' ? 'X < ' :
                                calcType === 'equal' ? 'X = ' : 'Valor 1: '}
                    </label>
                    <input type="number" value={value1} onChange={e => setValue1(Number(e.target.value))} />
                </div>
            )}
            {calcType === 'between' && (
                <>
                    <div>
                        <label>a: </label>
                        <input type="number" value={value1} onChange={e => setValue1(Number(e.target.value))} />
                    </div>
                    <div>
                        <label>b: </label>
                        <input type="number" value={value2} onChange={e => setValue2(Number(e.target.value))} />
                    </div>
                </>
            )}
            <button className={styles.calculateButton} onClick={handleTransform}>Calcular</button>
            <div className={styles.percentageContainer}>
                <h3>Probabilidad: {percentage}</h3>
            </div>
            <h3>Valores de X:</h3>
            <div className={styles.resultsContainer}>
                <p>{transformedNumbers.join(', ')}</p>
            </div>
        </div>
    );
};

export default BoxMullerCalculator;
