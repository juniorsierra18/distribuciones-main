import React, { useState } from 'react';
import styles from './Calculator.module.css';

interface ErlangCalculatorProps {
    numbers: number[];
}

const ErlangCalculator: React.FC<ErlangCalculatorProps> = ({ numbers }) => {
    const [n, setN] = useState<number>(3); // Parámetro de forma de la distribución de Erlang
    const [lambda, setLambda] = useState<number>(2); // Escala de la distribución de Erlang
    const [calcType, setCalcType] = useState<string>('above');
    const [value1, setValue1] = useState<number>(0);
    const [value2, setValue2] = useState<number>(0);
    const [results, setResults] = useState<number[]>([]);
    const [percentage, setPercentage] = useState<string>('');

    const calculateErlang = (aleatorios: number[], n: number, lambda: number) => {
      const generatedNumbers: number[] = [];
      for (let i = 0; i < aleatorios.length - n + 1; i++) {
          let sum = 0;
          for (let j = 0; j < n; j++) {
              sum += -Math.log(1 - aleatorios[i + j]);
          }
          generatedNumbers.push(sum * lambda);
      }
      return generatedNumbers;
    };
  
    const handleCalculate = () => {
        const newResults = calculateErlang(numbers, n, lambda);
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
                <label>Parámetro de forma (n): </label>
                <input
                    type="number"
                    value={n}
                    onChange={e => setN(Number(e.target.value))}
                />
            </div>
            <div>
                <label>Proporción (lambda): </label>
                <input
                    type="number"
                    value={lambda}
                    onChange={e => setLambda(Number(e.target.value))}
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
              <div>
                <div className={styles.percentageContainer}>
                  <h3>Probabilidad: {percentage}</h3>
                </div>
                <h3>Valores de x:</h3>
                <div className={styles.resultsContainer}>
                    {results.map((result, index) => (
                        <div key={index}>{result}</div>
                    ))}
                </div>
              </div>
            )}
        </div>
    );
};

export default ErlangCalculator;
