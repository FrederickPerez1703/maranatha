export const validateEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
};

export const validateName = (name: string): boolean => {
  const onlyLetters = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/.test(name);
  const spaceCount = (name.match(/ /g) || []).length;
  return onlyLetters && spaceCount <= 2 && name.length > 1;
};

export const validatePhone = (phone: string): boolean => {
  return phone.replace(/\D/g, '').length >= 10;
};