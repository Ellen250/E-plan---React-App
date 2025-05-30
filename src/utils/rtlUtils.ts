export  function isRTLLanguage(language: string): boolean {
  const rtlLanguages = ['ar', 'he', 'fa', 'ur'];
  return rtlLanguages.includes(language);
}

export function applyRTLStyles(isRTL: boolean): Record<string, string> {
  if (!isRTL) return {};
  
  return {
    textAlign: 'right',
    direction: 'rtl'
  };
}
 