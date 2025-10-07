function removeSpaces( str = '' ){
    return (str.replace(/  +/g, ' ')).trim();
}


// C = (P + K) % 26 
function encodeLetter(letter, offsetLetter){
    const p = Math.abs(65 - offsetLetter.charCodeAt(0));
    const k = Math.abs(65 - letter.charCodeAt(0));
    const offset = (p + k) % 26; 
    return String.fromCharCode(65 + offset);
}


function encode( input, key ){
    let str = '';

    Array.from(input).forEach((letter, letterIndex) => {
        const letterCode = letter.charCodeAt(0);

        if ( letterCode >= 65 && letterCode <= 90 ){
            str = str.concat( encodeLetter(letter, key[letterIndex % key.length]) );
            selectGrid(letter, key[letterIndex % key.length]);
        }else{
            str = str.concat(letter);
        }

    });
    
    return str;
}




// P = (C - K + 26) % 26
function decodeLetter(letter, offsetLetter){
    const c = Math.abs(65 - letter.charCodeAt(0));
    const k = Math.abs(65 - offsetLetter.charCodeAt(0));
    const offset = (c - k + 26) % 26;
    return String.fromCharCode(65 + offset);

}


function decode( input, key ){
    let str = '';

    Array.from(input).forEach((letter, letterIndex) => {
        const letterCode = letter.charCodeAt(0);

        if ( letterCode >= 65 && letterCode <= 90 ){
            str = str.concat( decodeLetter(letter, key[letterIndex % key.length]) );
            selectGrid(letter, key[letterIndex % key.length]);
        }else{
            str = str.concat(letter);
        }

    });
    
    return str;

}





function generateGrid(){

    grid.innerHTML = '';

    for (let row = 0; row < 27; row++){

        const gridRow = document.createElement('div');
        gridRow.classList.add('gridRow');

        for (let col = 0; col < 27; col++){
            const slot = document.createElement('div');
            slot.classList.add('slot');
            
            if ( row != 0 || col != 0 ){
                if ( col == 0 && row > 0){
                    slot.innerHTML = String.fromCharCode(row - 1 + 65);
                }else if ( row == 0 ){
                    slot.innerHTML = String.fromCharCode(col - 1 + 65);
                }else{
                    slot.innerHTML = String.fromCharCode((col + row - 2) % 26 + 65);
                    slot.classList.add('slotContent');
                }
            }

            gridRow.appendChild(slot);
        }

        grid.appendChild(gridRow);
        
    }

}


function selectGrid(letterInput = 'A', letterKey = 'A'){
    const posX = letterKey.charCodeAt(0) - 65;
    const posY = letterInput.charCodeAt(0) - 65;
    const rowElementList = document.querySelectorAll('.gridRow')[posY+1].querySelectorAll('.slotContent');

    for (let x = 0; x <= posX; x++){
        if ( x == posX ){
            rowElementList[x].classList.add('slotSelected');
            continue;
        }
        rowElementList[x].classList.add('slotLineSelector');
    }

    for (let y = 1; y <= posY; y++){
        document.querySelectorAll('.gridRow')[y].querySelectorAll('.slotContent')[posX].classList.add('slotLineSelector');
    }
    
}


function unselectAll(){
    document.querySelectorAll('.slotLineSelector').forEach(e => e.classList.remove('slotLineSelector'));
    document.querySelectorAll('.slotSelected').forEach(e => e.classList.remove('slotSelected'));
}


function canExecute(){
    return textInput.value.length > 0 && keyInput.value.length > 0;
}


function formartter(){
    textInput.value = removeSpaces(textInput.value).toUpperCase();
    textOutput.value = '';
    keyInput.value = keyInput.value.replaceAll(' ', '').toUpperCase();
}


function onClickEncode(){
    formartter();
    if ( !canExecute() ) return;
    unselectAll();
    const result = encode(textInput.value, keyInput.value);
    textOutput.value = result;
}


function onClickDecode(){
    formartter();
    if ( !canExecute() ) return;
    unselectAll();
    const result = decode(textInput.value, keyInput.value);
    textOutput.value = result;
}


function onClickClear(){
    textInput.value = '';
    textOutput.value = '';
    keyInput.value = '';
    unselectAll();
}


generateGrid();