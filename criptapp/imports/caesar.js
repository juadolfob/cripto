const caesarShift = function (str, amount) {

    // Wrap the amount, upper, lower

    if (amount < 0) {
        return caesarShift(str, amount + 255);
    }
    if (amount > 255) {
        return caesarShift(str, amount - 255);
    }

    // Make an output variable
    let output = "";

    // Go through each character
    for (let i = 0; i < str.length; i++) {
        // Get the character we'll be appending
        output += String.fromCharCode((str.charCodeAt(i) + amount ) % 255);
        // Append
    }

    // All done!
    return output;
};

export default caesarShift;