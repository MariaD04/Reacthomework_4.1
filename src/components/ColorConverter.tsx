import React, { useState, useEffect } from 'react';

export const ColorConverter = () => {

    const [form, setForm] = useState({ hex: '', rgb: '' });
    
    const convertHexToRgb = (value: string) => {
        const hexDigits = Array.from(value.toLowerCase().slice(1, value.length)).map(element => {
            const number = parseInt(element, 16);
            return number;
        });

        const rgbDigits = hexDigits.reduce((arr: number[], element, index) => {
            if (index % 2 === 0) {
                arr.push(element * 16);
            } else {
                arr[arr.length - 1] += element;
            }
            return arr;
        }, []);

        const convertedColor = `rgb(${rgbDigits.join(', ')})`
        return convertedColor
    }

    useEffect(() => {
        if (form.rgb != 'Ошибка!') {
            document.body.style.backgroundColor = form.rgb;
        } else {
            form.rgb = 'rgba(197, 11, 11, 0.507)'
            document.body.style.backgroundColor = form.rgb;
        }
        
    }, [form.rgb])
    

    const handleColorChange = (event: React.FormEvent<HTMLFormElement>) => {
        const { value } = event.currentTarget.elements.namedItem('hex') as HTMLInputElement;
        setForm(prevForm => ({ ...prevForm, hex: value }));

        if (/^#[\dA-Fa-f]{6}$/.test(value)) {
            setForm(prevForm => ({ ...prevForm, rgb: convertHexToRgb(value)}));
        } else if (/^$/.test(value)) {
            setForm(prevForm => ({ ...prevForm, rgb: ''}));
        } else if (value.length >= 7) {
            setForm(prevForm => ({ ...prevForm, rgb: 'Ошибка!' }));
        }
    }

    return (
        <form className='converter-form' onChange={handleColorChange}>
            <input className='converter-input' type="text" name='hex' />
            <output className='converter-output' name='rgb' >{form.rgb}</output>
        </form>
    )
}
