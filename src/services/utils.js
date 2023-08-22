
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

export function deepCompare(obj1, obj2) {
  // Check if both objects are objects and not null
  if (typeof obj1 !== "object" || obj1 === null || typeof obj2 !== "object" || obj2 === null) {
    return false;
  }

  // Get the keys of both objects
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  // Check if both objects have the same number of keys
  if (keys1.length !== keys2.length) {
    return false;
  }

  // Check if each key in obj1 exists in obj2 and their corresponding values are deeply equal
  for (const key of keys1) {
    // Use Object.prototype.hasOwnProperty.call to safely check for property existence
    if (!Object.prototype.hasOwnProperty.call(obj2, key) || !deepCompare(obj1[key], obj2[key])) {
      return false;
    }
  }

  // If all checks passed, the objects have the same data
  return true;
}

export function parseUrlToParams(url) {
  const urlSearchParams = new URLSearchParams(url.split("?")[1]);
  const params = {
    brands: urlSearchParams.get("brands") ? urlSearchParams.get("brands").split(",") : [],
    category: urlSearchParams.get("category") ? urlSearchParams.get("category").split(",") : [],
    ordering: urlSearchParams.get("ordering") || "",
    gender: urlSearchParams.get("gender") || "",
    p: parseInt(urlSearchParams.get("p")) || 1,
  };
  return params;
}
