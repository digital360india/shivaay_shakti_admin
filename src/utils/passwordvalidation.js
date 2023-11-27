export const isPassword=(password)=>{
    const check=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
    return check.test(password);
}