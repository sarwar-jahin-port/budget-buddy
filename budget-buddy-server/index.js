const express = require('express')
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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
      console.log(user);
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
    app.get("/ten-transactions", async(req, res) =>{
      const result = await transactionsCollection.find({}).toArray();
      res.send(result);
    })
    app.patch("/update-transaction/:id", async(req, res)=>{
      const {id} = req.params;
      const updatedTransaction = req.body;

      const result = await transactionsCollection.updateOne(
        {_id: new ObjectId(id)},
        {$set: updatedTransaction},
      )
      if(result?.modifiedCount>0) res.send("Updated");
      else res.send("Failed to update");
    })
    app.delete("/delete-transaction/:id", async(req, res)=>{
      const {id} = req.params;

      const result = await transactionsCollection.deleteOne({_id: new ObjectId(id)});
      if(result?.deletedCount==1) res.send("Deleted");
      else res.send("Failed to delete");
    })
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