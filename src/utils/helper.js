export const getIntials=(name)=>{
    
    if(!name) return '';

    const word = name.split(' ');
    
    let initail =''
    for (let i=0 ;i< Math.min(word.length ,2) ; i++){
        initail +=word[i][0];
    }
    return initail.toUpperCase();
};