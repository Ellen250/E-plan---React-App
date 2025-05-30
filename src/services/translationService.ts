import  { Language } from '../types';

/**
 * Service for translating text to different languages
 * Uses a proxy to access translation API
 */

export async function translateText(text: string, targetLang: string) {
  try {
    const response = await fetch(`https://hooks.jdoodle.net/proxy?url=https://translation-api-example.com/translate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text,
        target: targetLang,
        source: 'auto'
      })
    });

    if (!response.ok) {
      throw new Error(`Translation failed with status: ${response.status}`);
    }

    const data = await response.json();
    return data.translatedText;
  } catch (error) {
    console.error('Translation error:', error);
    // Return original text if translation fails
    return text;
  }
}

/**
 * Detect the language of a text
 */
export async function detectLanguage(text: string): Promise<Language> {
  try {
    // This would call a language detection API in a real implementation
    const response = await fetch(`https://hooks.jdoodle.net/proxy?url=https://translation-api-example.com/detect`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text })
    });

    if (!response.ok) {
      throw new Error(`Language detection failed with status: ${response.status}`);
    }

    const data = await response.json();
    return data.language as Language;
  } catch (error) {
    console.error('Language detection error:', error);
    // Default to English if detection fails
    return 'en';
  }
}
 