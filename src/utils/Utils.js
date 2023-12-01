
export const changePhoneNumberFormat = phoneNumber => {
       // Remove any non-digit characters
       const cleanedNumber = String(phoneNumber).replace(/\D/g, '');

       // Apply the phone number format using regex
       const formattedNumber = cleanedNumber.replace(/(\d{3})(\d{3})(\d{4})/, '($1)-$2-$3');
   
       return formattedNumber; 
}

export const changeIncomeFormat = phoneNumber => {
    // Remove any non-digit characters
    const cleanedNumber = String(phoneNumber).replace(/\D/g, '');

    // Apply the phone number format using regex
    const formattedNumber = cleanedNumber.replace(/(\d{3})(\d{3})(\d{4})/, '($1)-$2-$3');

    return formattedNumber; 
}
