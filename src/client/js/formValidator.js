function isValidUrl(string) {
    console.log("isValidUrl running...")
    try {
      new URL(string);
    } catch (_) {
      return false;  
    }
  
    return true;
  }