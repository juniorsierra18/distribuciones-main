import React, { useState } from 'react';
import CalculatorSelect from './components/CalculatorSelect';
import Calculator from './components/Calculator';
import FileUploader from './components/FileUploader';
import { DistributionType } from './types';

const App: React.FC = () => {
    const [distribution, setDistribution] = useState<DistributionType>('Exponencial');
    const [numbers, setNumbers] = useState<number[]>([]);

    const handleNumbersLoaded = (loadedNumbers: number[]) => {
        setNumbers(loadedNumbers);
    };

    return (
        <div className="App">
            <h1 className="text-3xl mt-5 ml-5">Calculadora de distribuciones</h1>
            <div className="mt-5 ml-5">
            </div>
            <CalculatorSelect onSelect={setDistribution} />
            <FileUploader onNumbersLoaded={handleNumbersLoaded} />
            <Calculator distribution={distribution} numbers={numbers} />
        </div>
    );
}

export default App;
