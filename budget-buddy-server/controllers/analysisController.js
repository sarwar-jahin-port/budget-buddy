const analysisIVE = require('../models/AnalysisModel');

// TODO : Integrate the mongoose schema into the API's (Analysis Schema)

const incomeVexpense = async (req, res) => {
    // Recieved JSON data of the user
    const { amount, date, category, email } = req.body;

    // Extracting month from the given date to the MM format
    const dateExtract = new Date(date);
    getmonth = `${(dateExtract.getMonth() + 1).toString().padStart(2, '0')}`; // eg: '02' if month is single digit
    
    // Main Post request including logic
    try{
      // Checks to see if an entry for this email has been made or not
      let user = await UserAnalysis.findOne({ email });

      if (!user) {
        user = new UserAnalysis({ email, transactions: [] }); // This creates a local instance of the schema for a user
      }

      // Looks throught the transactions of the current user and check if any entry is made for that month
      let monthData = user.transactions.find(trans => trans.month === getmonth); 

      // Creates a local entry for the user if it doesn't exist
      if (!monthData) {
        if (category === 'income'){ // for income
          monthData = {
            month: getmonth,
            income: amount,
            expense: 0
          };
          user.transactions.push(monthData);
        }
        else if (category === 'expense'){ // for expense
          monthData = {
            month: getmonth,
            income: 0,
            expense: amount
          };
          user.transactions.push(monthData);
        }
      };

      if (category === "income") {
        monthData.income += amount; // Adds the amount to the user instance for income category
      }
      else if (category === "expense") {
        monthData.expense += amount; // Adds the amount to the user instance for expense category
      }

      const result = await user.save(); // Saves the user to DB document
      res.status(200).json({ message: 'Transaction added successfully!', result});

    } catch (e) {
      console.error('Error adding transaction:', e);
      res.status(500).json({ ERR : `${e.message}` }); // Error Message
    }
}

module.exports = {
    incomeVexpense
}