export const checkAllFormFieldsFilledIn =(formData)=>{
return Object.keys(formData).every(key=> formData[key].trim().length>0)
}

export const  phoneValidation = (phoneNumber)=> {
    // const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    // return phoneNumber.value.match(phoneRegex)? true : false
    //The above script matches:
// XXX-XXX-XXXX
// XXX.XXX.XXXX
// XXX XXX XXXX



    const phoneRegex=/^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/
    return phoneRegex.test(phoneNumber)
  }
//The above script matches:
// (123) 456-7890
// (123)456-7890
// 123-456-7890
// 1234567890