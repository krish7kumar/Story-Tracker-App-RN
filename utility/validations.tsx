export const isValidAlphanumeric = (text: string) => {
  const regExp = /^[a-zA-Z0-9]*$/g;
  return regExp.test(text);
};

export const isValidAlphanumericWithAllowedCharacter = (
  text: string,
  allowedCharacters: string
) => {
  const regex = "^[a-zA-Z0-9" + allowedCharacters + "]*$";
  const regExp = new RegExp(regex, "g");
  return regExp.test(text);
};

export function validateEmail(email: string) {
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailPattern.test(email);
}

export function validatePassword(password: string, passwordToMatch?: string) {
  console.log("match", typeof passwordToMatch);
  if (typeof passwordToMatch !== "undefined") {
    const passMatches =
      !!passwordToMatch && !!password && password === passwordToMatch;
    const rules = [
      {
        text: `Password matches`,
        isValid: passMatches,
      },
    ];
    return { rules, passMatches };
  } else {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/;
    const hasLowerCase = /[a-z]/;
    const hasNumbers = /[0-9]/;
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/; // Removed escaped backslash before pipe

    const isValidLength = password.length >= minLength;
    const containsUpperCase = hasUpperCase.test(password);
    const containsLowerCase = hasLowerCase.test(password);
    const containsNumbers = hasNumbers.test(password);
    const containsSpecialChar = hasSpecialChar.test(password);

    const isValidPassword =
      isValidLength &&
      containsLowerCase &&
      containsUpperCase &&
      containsNumbers &&
      containsSpecialChar;

    const rules = [
      { text: `At least ${minLength} characters long`, isValid: isValidLength },
      {
        text: "Contains at least one uppercase letter (A-Z)",
        isValid: containsUpperCase,
      },
      {
        text: "Contains at least one lowercase letter (a-z)",
        isValid: containsLowerCase,
      },
      { text: "Contains at least one number (0-9)", isValid: containsNumbers },
      {
        text: 'Contains at least one special character (!@#$%^&*(),.?":{}|<>)',
        isValid: containsSpecialChar,
      },
    ];
    console.log("isvalidpassword", isValidPassword);
    return { rules, isValidPassword };
  }
}
