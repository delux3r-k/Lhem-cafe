@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    scroll-behavior: smooth;
  }

  body {
    @apply font-body text-espresso-800;
    /* Premium warm cream-to-white gradient background */
    background: linear-gradient(180deg, #FDFBF7 0%, #F8F4ED 25%, #F5EFE6 50%, #FDFBF7 100%);
    background-attachment: fixed;
    min-height: 100vh;
  }

  h1, h2, h3, h4, h5, h6 {
    @apply font-display;
  }

  /* Amharic text styling */
  .amharic,
  [lang="am"],
  [lang="amh"] {
    font-family: 'Noto Sans Ethiopic', sans-serif;
  }
}

/* Apply Amharic font to any text containing Ge'ez script characters */
@layer utilities {
  .font-amharic {
    font-family: 'Noto Sans Ethiopic', sans-serif;
  }
}

@layer components {
  .btn-primary {
    @apply inline-flex items-center justify-center gap-2 px-6 py-3 bg-espresso-700 text-cream-50 font-semibold rounded-full transition-all duration-300 hover:bg-espresso-800 hover:scale-105 hover:shadow-lg active:scale-95;
  }

  .btn-secondary {
    @apply inline-flex items-center justify-center gap-2 px-6 py-3 bg-transparent border-2 border-espresso-700 text-espresso-700 font-semibold rounded-full transition-all duration-300 hover:bg-espresso-700 hover:text-cream-50 hover:scale-105 active:scale-95;
  }

  .btn-accent {
    @apply inline-flex items-center justify-center gap-2 px-6 py-3 bg-gold-500 text-espresso-900 font-semibold rounded-full transition-all duration-300 hover:bg-gold-600 hover:scale-105 hover:shadow-lg active:scale-95;
  }

  .section-container {
    @apply max-w-7xl mx-auto px-4 sm:px-6 lg:px-8;
  }

  .section-padding {
    @apply py-16 sm:py-20 lg:py-24;
  }

  .card {
    @apply rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1;
    /* Glassmorphism effect */
    background: rgba(255, 255, 255, 0.85);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.5);
  }

  .card-elevated {
    @apply rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300;
    /* Glassmorphism effect */
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 1px solid rgba(255, 255, 255, 0.6);
    box-shadow: 0 8px 32px rgba(92, 61, 30, 0.08);
  }

  .card-glass {
    @apply rounded-3xl transition-all duration-300;
    background: rgba(255, 255, 255, 0.75);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.4);
    box-shadow: 0 4px 24px rgba(92, 61, 30, 0.06);
  }

  .star-rating {
    @apply flex items-center gap-1;
  }

  .star {
    @apply w-5 h-5 text-gold-500;
  }

  /* Form input styling */
  .form-input {
    @apply w-full px-4 py-3 rounded-xl border-2 border-cream-300 bg-white/80 text-espresso-800 placeholder-espresso-400 transition-all duration-300;
    font-family: 'Inter', sans-serif;
  }

  .form-input:focus {
    @apply outline-none border-espresso-600 bg-white;
    box-shadow: 0 0 0 4px rgba(92, 61, 30, 0.1);
  }

  .form-input::placeholder {
    @apply text-espresso-400;
  }

  .form-label {
    @apply block font-semibold text-espresso-700 mb-2;
  }

  .form-textarea {
    @apply form-input resize-none min-h-[120px];
  }
}

@layer utilities {
  .text-gradient {
    @apply bg-clip-text text-transparent bg-gradient-to-r from-espresso-700 via-cafe-600 to-gold-600;
  }

  .bg-gradient-warm {
    background: linear-gradient(135deg, rgba(232, 165, 75, 0.15) 0%, rgba(196, 135, 58, 0.08) 100%);
  }

  .bg-gradient-premium {
    background: linear-gradient(180deg, rgba(253, 251, 247, 0.9) 0%, rgba(248, 244, 237, 0.95) 100%);
  }

  .bg-hero-overlay {
    background: linear-gradient(
      180deg,
      rgba(26, 15, 8, 0.7) 0%,
      rgba(44, 30, 15, 0.8) 50%,
      rgba(92, 61, 30, 0.75) 100%
    );
  }

  .animate-delay-100 { animation-delay: 100ms; }
  .animate-delay-200 { animation-delay: 200ms; }
  .animate-delay-300 { animation-delay: 300ms; }
  .animate-delay-400 { animation-delay: 400ms; }
  .animate-delay-500 { animation-delay: 500ms; }
  .animate-delay-600 { animation-delay: 600ms; }

  .reveal {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.8s ease-out, transform 0.8s ease-out;
  }

  .reveal.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .menu-item {
    @apply flex justify-between items-start gap-4 py-4 border-b border-espresso-600 last:border-0;
  }

  .menu-item-name {
    @apply font-display text-lg text-cream-100 font-medium;
  }

  .menu-item-desc {
    @apply text-sm text-cream-400 mt-1 max-w-md;
  }

  .menu-item-price {
    @apply font-semibold text-gold-400 whitespace-nowrap;
  }

  /* Glassmorphism container */
  .glass-container {
    background: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 1px solid rgba(255, 255, 255, 0.3);
  }
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  @apply bg-cream-200;
}

::-webkit-scrollbar-thumb {
  @apply bg-cafe-400 rounded-full;
}

::-webkit-scrollbar-thumb:hover {
  @apply bg-cafe-500;
}

/* Smooth transitions for navigation */
.nav-link {
  @apply relative text-espresso-700 hover:text-espresso-900 transition-colors duration-200;
}

.nav-link::after {
  content: '';
  @apply absolute bottom-0 left-0 w-0 h-0.5 bg-gold-500 transition-all duration-300;
}

.nav-link:hover::after {
  @apply w-full;
}

/* Decorative coffee beans pattern */
.pattern-bg {
  background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4c4b0' fill-opacity='0.08'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
}
