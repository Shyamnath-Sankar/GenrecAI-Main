/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
        "./**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            fontFamily: {
                mono: ['"Space Mono"', 'monospace'],
                glitch: ['"Rubik Glitch"', 'cursive'],
            },
            colors: {
                nothing: {
                    red: '#D71921',
                    dark: '#0a0a0a',
                    paper: '#f2f2f2',
                    glass: 'rgba(255, 255, 255, 0.05)',
                    border: 'rgba(255, 255, 255, 0.1)',
                }
            },
            animation: {
                'spin-slow': 'spin 12s linear infinite',
                'noise': 'noise 0.2s infinite',
            },
            keyframes: {
                noise: {
                    '0%': { transform: 'translate(0,0)' },
                    '10%': { transform: 'translate(-5%,-5%)' },
                    '20%': { transform: 'translate(-10%,5%)' },
                    '30%': { transform: 'translate(5%,-10%)' },
                    '40%': { transform: 'translate(-5%,15%)' },
                    '50%': { transform: 'translate(-10%,5%)' },
                    '60%': { transform: 'translate(15%,0)' },
                    '70%': { transform: 'translate(0,10%)' },
                    '80%': { transform: 'translate(-15%,0)' },
                    '90%': { transform: 'translate(10%,5%)' },
                    '100%': { transform: 'translate(5%,0)' }
                }
            }
        },
    },
    plugins: [
        require('@tailwindcss/typography'),
    ],
}
