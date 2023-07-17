export function convertToCamelCase(input) {
    const words = input.split('-');
    const camelCaseWords = words.map((word, index) => {
      if (index === 0) {
        // Capitalize the first word
        return word.charAt(0).toUpperCase() + word.slice(1);
      } else {
        // Capitalize subsequent words
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      }
    });
  
    return camelCaseWords.join(' ');
  }
  
export function serializedParams(params){ 
    return Object.entries(params)
  .filter(([, value]) => {
    // Exclude empty or blank values
    return Array.isArray(value) ? value.length > 0 : value !== "";
  })
  .map(([key, value]) => {
    if (Array.isArray(value)) {
      // Serialize arrays with comma-separated values
      return `${key}=${value.join(",")}`;
    }
    return `${key}=${value}`;
  })
  .join("&");
  }