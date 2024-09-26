const accounts = [
    { id: 1, owner: "Alice", balance: 500 },
    { id: 2, owner: "Bob", balance: 300 },
];

function getAccountById(id) {
    if (id < 0) {
        // write a way that the ID cannot be less than 0 and throws an error for that reason.
        throw new Error("The ID number must be greater than 0.");
    }
    for (const account of accounts) {
        if (account.id == id) {
            return account;
        }
    }
    //If all else fails, throw an error that this account your trying to access does not exist.
    throw new Error("Account does not exist.");
}

function createAccount(newAccountId, newAccountOwner) {
    /*Because we strictly want it to be a string and not an empty account owner then we must
	use typeof to ensure it is a string and not equate to an empty string and use trim to make sure both sides of 
	its name if any will be removed. This would help eliminate unneccesary spaces along with empty strings. 
	*/
    if (typeof newAccountOwner !== "string" || newAccountOwner.trim() == "") {
        throw new Error(
            "Account owner must not have any type of charcters in their name and have a complete name."
        );
    }
    /*This is a tricky one. You must look and follow where the computing is happening when taking in a variable inside 
	 of the function and where it is spitting out to. In this case, we know that we are taking the newAccountId that we are
	 are trying to create, insert it inside the function above getAccountbyId. Since we are trying to make a new account, 
	it will throw the error account does not exist. Because of that we must use the try and catch error method. For try 
	we make sure it throws the error that this account already exists but must create a new throw error that says to please
	create a new account ID so that the user knows it must be a unique ID number. 
	But if the account does not exist then it will throw the error that the "Account does not exist" from above so we must catch that
	 error and allow the creation of that account to be made. Also if the account is not working then 
	*/
    try {
        getAccountById(newAccountId);
        throw new Error(
            "This account already exists, please create a new account ID."
        );
    } catch (e) {
        if (e.message === "Account does not exist.") {
            const newAccount = {
                id: newAccountId,
                owner: newAccountOwner,
                balance: 0,
            };
            accounts.push(newAccount);
            return newAccount;
        } else {
            throw new Error(e.message);
        }
    }
}
//First right off the top this function isn't returning any values therefore I decided to do the account
//information vs the balance as it will let you know exactly what account, name, and its new balance presented.
function depositMoney(accountId, amount) {
    const account = getAccountById(accountId);
    // if (!account) {
    //     throw new Error("Account not found"); -- Will comment this out b/c the function getAccountById has the error message
    //in case the account ID is not found.
    //Make sure the amount is a number and it must be greater than zero when depositing. Will do 2 seperate errors so that customer
    //isn't confused.
    if (typeof amount !== "number" || amount === Infinity) {
        throw new Error("The deposit must be a number.");
    } else if (amount <= 0) {
        throw new Error("The deposit must be greater than zero.");
    }
    account.balance += amount;
    return account;
}

function withdrawMoney(accountId, amount) {
    const account = getAccountById(accountId);
    // if (!account) {
    //     throw new Error("Account not found."); -- Same thing as I wrote from above. Redundant.
    if (amount <= 0) {
        throw new Error(
            "Amount to withdraw must be a positive number and greater than 0."
        );
    } else if (!Number.isFinite(amount)) {
        throw new Error(
            "Invalid value for withdrawal amount: The amount must be a finite number."
        );
    } else if (amount > account.balance) {
        throw new Error(
            "Cannot withdraw more than what your total balance is."
        );
    }
    account.balance -= amount;
    return account;
}

function transferMoney(fromAccountId, toAccountId, amount) {
    const fromAccount = getAccountById(fromAccountId);
    const toAccount = getAccountById(toAccountId);
    //We must make sure the withdrawl is happening so we use the withdraw function from above
    // to the fromAccountId to ensure the transferprocess is happening correctly.

    if (fromAccount.balance < amount) {
        throw new Error(
            "Amount transfered cannot be greater than the balance you have."
        );
    }
    // if (!fromAccount) {
    //     throw new Error("Source account not found."); -- Redundant.
    if (!Number.isFinite(amount) || amount < 0) {
        throw new Error(
            "Invalid value for transfer amount: The amount must be a positive finite number."
        );
    }

    withdrawMoney(fromAccountId, amount);
    toAccount.balance += amount;
    //We must show both accounts to make sure the proccess is carried out correctly.
    return { From: fromAccount, To: toAccount };
}
/*
Hints:

getAccountById("1"); worked/fixed

createAccount(1, "Alice"); worked/fixed
createAccount("3", "Charlie"); worked!/fixed
createAccount(-3, "Charlie"); worked/fixed!
createAccount(3, ["Charlie"]); worked/fixed!
createAccount(3, ""); worked/fixed!
createAccount(3, "  "); worked/fixed!

depositMoney(1, "300") worked/fixed!
depositMoney(1, -300) worked/fixed!
depositMoney(1, 0) worked/fixed!
depositMoney(1, Infinity) worked/fixed!
depositMoney(4, 100) worked/fixed!

withdrawMoney(1, -100) worked/fixed!
withdrawMoney(1, 0) worked/fixed!
withdrawMoney(1, 501) worked/fixed!

transferMoney(1, 4, 100) worked/fixed!
transferMoney(1, 2, 501) worked/fixed!
transferMoney(1, 2, 100); worked/fixed!
*/
