export const checkAllFormFieldsFilledIn =(formData)=>{
return Object.keys(formData).every(key=> formData[key].trim().length>0)
}

export const  phoneValidation = (phoneNumber)=> {

    const phoneRegex=/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/
    return phoneRegex.test(phoneNumber)
  }
//The above script matches:
// +919367788755
// 8989829304
// +16308520397
// 786-307-3615
// (509)-389-1748
// (509)389-1748
// 509.389.1748