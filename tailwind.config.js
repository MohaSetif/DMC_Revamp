import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';
import flattenColorPalette from "tailwindcss/lib/util/flattenColorPalette";

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.tsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
                'shubbak-light': ['Shubbak-Light', 'sans-serif'],
                'shubbak-bold': ['Shubbak-Bold', 'sans-serif'],
                'shubbak-semi-bold': ['Shubbak-SemiBold', 'sans-serif'],
            },
            colors: {
                'p': "rgba(var(--p))",
                'custom_button': "rgba(var(--custom_button))",
                'card_bg': "rgba(var(--card_background))",
                'card_title': "rgba(var(--card_title))",
                'card_text': "rgba(var(--card_text))",
                'card_border': "rgba(var(--card_border))",
                'card_nbr_box': "rgba(var(--card-nbr-box))",
                'span_slate': "rgba(var(--span_slate))",
                'phone_shadow': "rgba(var(--phone_shadow))",
                'phone_apps': "rgba(var(--phone_apps))",
                'from_grad': "rgba(var(--from_grad))",
                'to_grad': "rgba(var(--to_grad))",
                'page': "rgba(var(--background))",
            },
            backgroundImage: {
                'bg_circle': "var(--bg_circle)"
            }
        },
    },

    plugins: [
        forms,
        addVariablesForColors
    ],
    darkMode: "class",
};

function addVariablesForColors({ addBase, theme }) {
    let allColors = flattenColorPalette(theme("colors"));
    let newVars = Object.fromEntries(
      Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
    );
   
    addBase({
      ":root": newVars,
    });
  }
