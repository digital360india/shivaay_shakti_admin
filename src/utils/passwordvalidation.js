export const isPassword=(password)=>{
    const check = /^.{6,}$/;
    return check.test(password);
}