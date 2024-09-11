const express = require('express')
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const UserAnalysis = require('./models/AnalysisModel');

const app = express()
const port = 3000

app.use(cors());
app.use(express.json());

const uri = "mongodb+srv://shahriarrijon:3dQjzPvas7BcynB6@cluster0.d3cyl9k.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// Connecting using mongoose to utilize models and schemas
mongoose.connect(uri)
.then(() => console.log('MongoDB connected successfully(mongoose)'))
.catch(err => console.error('MongoDB connection error(mongoose:', err));

async function run() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

    // user database and collections creation
    const budgetBuddyDB = client.db("budgetBuddyDB");
    const usersCollection = budgetBuddyDB.collection("usersCollection");
    const categoriesCollection = budgetBuddyDB.collection("categoriesCollection");
    const transactionsCollection  = budgetBuddyDB.collection("transactionsCollection");
    const analysisCollection = budgetBuddyDB.collection("analysisCollection"); // ** REDUNDENT/CAN BE REMOVED **

    // add user to db
    app.post("/add-user", async(req, res) =>{
        const email = req.body;
        // console.log(email);
        const user = {...email, "dataStatus": false, "incomeCategories": [], "expenseCategories": [], "budgetCategories": []}

        const isExist = await usersCollection.findOne(email);
        if(isExist){
            res.send({"message": "User already exists"});
        }else{
            const result = await usersCollection.insertOne(user);
            res.send(result);
        }

    })
    // update budget data
    app.patch("/user-budget-data", async(req, res)=>{
        const {data:budgetData, user} = req.body;
        console.log(req.body);
        const {incomeCategories, expenseCategories, budgets} = budgetData;

        // update data collection status on userDB
        const result = await usersCollection.updateOne(
            {email: user.email},
            {$set: {
                "dataStatus": true,
                "incomeCategories": Object.keys(incomeCategories).filter(category => incomeCategories[category]),
                "expenseCategories": Object.keys(expenseCategories).filter(category => expenseCategories[category]),
                "budgetCategories": budgets,
                },
            }
        )
        res.send(result);
        // 
    })
    // get user data status
    app.get("/data-status/:email", async(req, res) =>{
      const email = req.params.email;

      const user = await usersCollection.findOne({"email": email});
      // console.log(user);
      if(user?.dataStatus){
        res.send({"dataStatus": true})
      }else res.send({"dataStatus": false})
    })
    // get user data
    app.get("/user/:email", async (req, res) => {
      const email = req.params.email;
      const user = await usersCollection.findOne({ email });
      res.send(user);
    });
    // update user data along with budget data
    app.patch("/user/:email", async (req, res) => {
      const email = req.params.email;
      const updates = req.body;
      delete updates._id;
      const result = await usersCollection.updateOne(
        { email },
        { $set: updates }
      );
      if (result.modifiedCount > 0) {
        res.json({ message: 'User updated successfully' });
      } else {
        res.status(404).send('User not found or no changes made');
      }
    });

    // Transactions API
    app.post("/add-transaction", async(req, res) =>{
      const transaction = req.body;
      console.log(transaction);
      const result = await transactionsCollection.insertOne(transaction);
      console.log(result);
      res.send(result);
    })
    app.get("/ten-transactions/:email", async(req, res) =>{
      const {email} = req.params;
      console.log(email);
      const result = await transactionsCollection.find({"user-email": email}).toArray();
      console.log(result);
      res.send(result);
    })
    app.patch("/update-transaction/:id", async(req, res)=>{
      const {id} = req.params;
      const updatedTransaction = req.body;
      // console.log(updatedTransaction);

      const result = await transactionsCollection.updateOne(
        {_id: new ObjectId(id)},
        {$set: updatedTransaction},
      )
      if(result?.modifiedCount>0) res.send({updated: true});
      else res.send({update: false});
    })
    app.delete("/delete-transaction/:id", async(req, res)=>{
      const {id} = req.params;

      const result = await transactionsCollection.deleteOne({_id: new ObjectId(id)});
      if(result?.deletedCount==1) res.send({deleted: true});
      else res.send({deleted: false});
    })

    // Analysis API
    app.post('/Transaction-Analysis', async (req, res) => {
      
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

        // Ensure that transactions is always an array 
        if (!Array.isArray(user.transactions)) { // *** POSSIBLY REDUNDENT/CAN BE REMOVED ***
          user.transactions = [];
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
    });
    

  } finally {
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

// sarwarjahin
// 2hOjTYpfIJSMFf0C

// 