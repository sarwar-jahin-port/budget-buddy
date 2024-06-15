const express = require('express')
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express()
const port = 3000

app.use(cors());
app.use(express.json());


const uri = "mongodb+srv://sarwarjahin:2hOjTYpfIJSMFf0C@cluster0.d3cyl9k.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

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