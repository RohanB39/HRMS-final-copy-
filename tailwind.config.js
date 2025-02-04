/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Work: ['Work Sans'],
        Logo: ['LogoFont'],
        Title: ['TitleFont'],
        Montserrat: ['Montserrat']
      },
      colors: {
        darkmainBg: '#030A1C',
        darknavbarBg: '#051024',
        darksidebarBg: '#061831',
        darkinputBg: ' #061831',
        darkcardBg: '#051024',
        darkModalBg: '#0B1C3E',
        darkPrimaryBtn: '#330404',
        darkLinkBg: '#330404',
        darkPrimaryText: '#EAEAEA',
        darkSecondaryText: "#210E1C",
        darkfooterIcon: '#330404',
        darkAccent: '#FF69B4',
        darkAccent2: '#66CC00',
        darkAccent3: '#00FFFF',
        darkMuted: '#cccc',
        darkDevider: '#333',





        // light theme
        primaryText: '#33333',
        secondaryText: '#EBC6FF',
        mainBg: '#f4f4f4',
        cardBg: '#d50d45',
        navbarBg: '#111111',
        modalBg: '#fa780d',
        mainBtn: '#7E80FF',
        accent: '#7E80FF',



      },
      fontSize: {
        'xs': '12px',
        'sm': '14px',
        'base': '16px',
        'lg': '18px',
        'xl': '20px',
        '2xl': '24px',
        '3xl': '30px',
        '4xl': '36px',
        '5xl': '48px',
      },
      lineHeight: {
        'tight': '1.25',   // 20px
        'snug': '1.375',   // 22px
        'normal': '1.5',   // 24px
        'relaxed': '1.625', // 26px
        'loose': '2',      // 32px
      },
      letterSpacing: {
        'tight': '-0.015em',
        'normal': '0',
        'wide': '0.015em',
      },
      spacing: {
        '1': '4px',
        '2': '8px',
        '3': '12px',
        '4': '16px',
        '5': '20px',
        '6': '24px',
        '8': '32px',
        '10': '40px',
        '12': '48px',
        '16': '64px',
        '20': '80px',
        '24': '96px',
        '32': '128px',
      },
    },
  },
  plugins: [],
}