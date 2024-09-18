/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ChangeEvent, useState } from 'react';
import Papa from 'papaparse';
import * as XLSX from 'xlsx';
import styles from './FileUploader.module.css';

interface FileUploaderProps {
    onNumbersLoaded: (numbers: number[]) => void; // Callback to pass numbers up
}

const FileUploader: React.FC<FileUploaderProps> = ({ onNumbersLoaded }) => {
    const [fileName, setFileName] = useState<string>('No file selected');

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : null;
        if (file) {
            setFileName(file.name);
            readDataFromFile(file);
        }
    };

    const readDataFromFile = (file: File) => {
        const fileExtension = file.name.split('.').pop();
        if (fileExtension === 'csv') {
            readCSV(file);
        } else if (fileExtension === 'xlsx') {
            readXLSX(file);
        } else {
            console.error('Unsupported file type');
        }
    };

    const readCSV = (file: File) => {
        Papa.parse(file, {
            complete: (results) => {
                const numbers = (results.data as any[]).map((row: any) => parseFloat(row[0].toString())).filter((num: number) => !isNaN(num));
                onNumbersLoaded(numbers);
            },
            header: false
        });
    };

    const readXLSX = (file: File) => {
        const reader = new FileReader();
        reader.onload = (e: ProgressEvent<FileReader>) => {
            const data = e.target!.result;
            const workbook = XLSX.read(data, { type: 'binary' });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const json = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
            const numbers = (json as any[]).map((row: any) => parseFloat(row[0].toString())).filter((num: number) => !isNaN(num));
            onNumbersLoaded(numbers);
        };
        reader.readAsBinaryString(file);
    };

    return (
        <div className={styles.uploaderContainer}>
            <input
                type="file"
                onChange={handleFileChange}
                className={styles.fileInput}
                id="fileInput"
                accept=".csv, .xlsx"
            />
            <label htmlFor="fileInput" className={styles.fileLabel}>
                Subir archivo
            </label>
            <span className={styles.fileName}>{fileName}</span>
        </div>
    );
};

export default FileUploader;
