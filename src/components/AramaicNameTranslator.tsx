"use client";

import { useState } from 'react';
import { translateAramaicName } from '@/app/actions/aramaic';

export default function AramaicNameTranslator() {
  const [name, setName] = useState('');
  const [translation, setTranslation] = useState<{ grafia_aramea?: string; significado_raiz?: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleTranslate = async () => {
    if (!name.trim()) return;
    setIsLoading(true);
    setHasSearched(true);
    try {
      const result = await translateAramaicName(name);
      setTranslation(result);
    } catch (error) {
      console.error(error);
      setTranslation(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <h2 style={{ fontSize: '48px', fontWeight: 'bold', color: '#111', marginBottom: '0' }}>
        Descubre tu nombre en<br />
        <span style={{ fontSize: '64px', color: '#6A4F35', display: 'block', marginTop: '10px' }}>Arameo</span>
      </h2>
      
      <p style={{ fontSize: '20px', color: '#444', maxWidth: '900px', margin: '30px auto', lineHeight: '1.6' }}>
        Conéctate con las raíces históricas a través del idioma antiguo. Ingresa tu nombre para revelar su traducción y significado en caligrafía aramea.
      </p>

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '40px', maxWidth: '700px', margin: '40px auto 20px' }}>
        <input
          type="text"
          value={name}
          onChange={(e) => {
             setName(e.target.value);
             setHasSearched(false);
          }}
          onKeyDown={(e) => {
             if (e.key === 'Enter') handleTranslate();
          }}
          placeholder="Escribe tu nombre"
          style={{ 
            flex: 1, 
            padding: '16px 20px', 
            fontSize: '18px', 
            color: '#333', 
            backgroundColor: 'transparent', 
            border: '2px solid #C4B5A5',
            borderRight: 'none', 
            outline: 'none',
            fontFamily: 'inherit'
          }}
        />
        <button 
          onClick={handleTranslate}
          disabled={isLoading || !name.trim()}
          style={{ 
            padding: '18px 40px', 
            fontSize: '16px', 
            fontWeight: 'bold',
            letterSpacing: '1px',
            cursor: isLoading || !name.trim() ? 'not-allowed' : 'pointer', 
            backgroundColor: '#6A4F35', 
            color: 'white', 
            border: '2px solid #6A4F35', 
            opacity: (isLoading || !name.trim()) ? 0.8 : 1,
            transition: 'background-color 0.3s'
          }}
        >
          {isLoading ? 'TRADUCIENDO...' : 'TRADUCIR'}
        </button>
      </div>

      {hasSearched && !isLoading && translation && (
        <div style={{ marginTop: '40px', padding: '30px', borderTop: '1px solid #E0D5C1' }}>
          <p style={{ fontSize: '18px', color: '#555', textTransform: 'uppercase', letterSpacing: '2px' }}>Tu nombre en Arameo es:</p>
          <p style={{ fontSize: '64px', color: '#333', direction: 'rtl', marginTop: '20px', fontFamily: 'serif' }}>
            {translation.grafia_aramea}
          </p>
          {translation.significado_raiz && (
            <p style={{ marginTop: '20px', fontStyle: 'italic', color: '#666', fontSize: '20px' }}>
              "{translation.significado_raiz}"
            </p>
          )}
        </div>
      )}
      
      {hasSearched && !isLoading && !translation && (
         <p style={{ marginTop: '20px', color: '#A03A3A', fontSize: '18px' }}>No se encontró traducción para este nombre en la base de datos.</p>
      )}
    </div>
  );
}
