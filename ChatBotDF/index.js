const express = require("express");
const app = express();
const dialogflowFulfillment = require("dialogflow-fulfillment");

var admin = require("firebase-admin");

var serviceAccount = require("./config/happyfarm02-vbwerr-firebase-adminsdk-17k5x-67124c9aaa.json");

try {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://happyfarm02-vbwerr.firebaseio.com",
  });
  console.log("Connected to Firestore DB");
} catch (err) {
  console.log("Error : " + err);
}

var db = admin.firestore();

app.get("/", (req, res) => {
  res.send("HappyFarm ChatBot is live");
});

app.post("/", express.json(), (req, res) => {
  const agent = new dialogflowFulfillment.WebhookClient({
    request: req,
    response: res,
  });

  function confirmUserRegister(agent) {
    var userName = agent.context.get("awaiting-name").parameters.username;
    var userPhoneno = agent.context.get("awaiting-phoneno").parameters.phoneno;
    var gender = agent.context.get("awaiting-name").parameters.gender;

    console.log(agent.context.get("awaiting-name"));
    // console.log(gender);
    // console.log(userPhoneno);
    if (gender.toLowerCase() == "male")
      agent.add(`Thank you Mr. ${userName} for registering with Happy Farm 👩‍🌾`);
    else if (gender.toLowerCase() == "female")
      agent.add(`Thank you Ms. ${userName} for registering with Happy Farm 👩‍🌾`);
    else
      agent.add(`Thank you Mx. ${userName} for registering with Happy Farm 👩‍🌾`);

    return db
      .collection("users")
      .add({
        username: userName,
        gender: gender,
        phoneno: userPhoneno,
        date: Date.now(),
      })
      .then((ref) => console.log("User details added to DB"));
  }

  function getUserList(agent) {
    const dialogflowAgentDoc = db.collection("users");
    return dialogflowAgentDoc
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          if (!doc.exists) {
            agent.add("No data found in the DB");
          } else {
            // var userData = {
            //   richContent: [
            //     [
            //       {
            //         type: "description",
            //         title: "User List",
            //         text: [`${doc.data().username + " " + doc.data().phoneno}`],
            //       },
            //     ],
            //   ],
            // };

            agent.add(
              doc.data().username +
                " | " +
                doc.data().gender +
                "  \n" +
                doc.data().phoneno
            );
            // agent.add(
            //   new dialogflowFulfillment.Payload(agent.UNSPECIFIED, userData, {
            //     sendAsMessage: true,
            //     rawPayload: true,
            //   })
            // );
            console.log(doc.data());
          }
          return Promise.resolve("Read complete");
        });
      })
      .catch((err) => {
        agent.add("Error reading from firestore DB");
        console.log(err);
      });
  }

  function confirmItemSell(agent) {
    var itemName = agent.context.get("awaiting-item-name").parameters.itemName;
    var itemQuantity = agent.context.get("awaiting-item-name").parameters
      .itemQuantity;
    var itemRate = agent.context.get("awaiting-item-name").parameters.itemRate
      .amount;
    console.log(agent.context.get("awaiting-item-name"));
    // console.log(itemName);

    agent.add(
      `${itemQuantity.amount} ${itemQuantity.unit} ${itemName} @ Rs.${itemRate}/kg added for selling.`
    );

    const itemStockRef = db.collection("stock").doc(itemName);

    //   // eg. 20kg * rs. 22/kg
    var crntItemCost = itemQuantity.amount * itemRate;

    // // reference
    // // https://stackoverflow.com/questions/54479892/difference-between-get-and-snapshot-in-cloud-firestore
    itemStockRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          console.log(doc.data());
          var stockItemCost = doc.data().stockItemCost;
          stockItemCost += crntItemCost;
          var stockItemQuantity = doc.data().stockItemQuantity;
          stockItemQuantity += itemQuantity.amount;
          var stockItemRate = stockItemCost / stockItemQuantity;
          //   console.log("stkCost : ", stockItemCost);
          //   console.log("stkQty : ", stockItemQuantity);
          //   console.log("stkRate : ", stockItemRate);
          itemStockRef
            .update({
              stockItemCost: stockItemCost,
              stockItemQuantity: stockItemQuantity,
              stockItemRate: stockItemRate,
            })
            .then((ref) => {
              console.log(
                "stkItemCost:" + stockItemCost,
                "stkItemQty:" + stockItemQuantity,
                "stkItmRate:" + stockItemRate
              );
            });
        } else {
          // if doc does not exist create it
          itemStockRef
            .set(
              {
                stockItemName: itemName,
                stockItemCost: crntItemCost,
                stockItemQuantity: itemQuantity.amount,
                stockItemRate: itemRate,
              },
              { merge: true }
            )
            .then((ref) => {
              console.log(itemName + " doc created");
            });
          //   console.log(itemName + " doc not found");
        }
      })
      .catch(function (error) {
        console.log("Error getting document : ", error);
      });

    // // *** THis Works Too***
    // var stockItemRate;
    // db.collection("stock")
    //   .doc(itemName)
    //   .onSnapshot((doc) => {
    //     console.log("doc data: ", doc.data());
    //     stockItemRate = doc.data().stockItemCost / doc.data().stockItemQuantity;
    //     console.log("stock item rate: ", stockItemRate);
    //   });

    // return
    db.collection("items")
      .add({
        itemName: itemName,
        itemQuantity: itemQuantity,
        itemRate: itemRate,
        date: Date.now(),
      })
      .then((ref) => console.log("itemSellDetails added to db"));

    // // another way to update the cost and quantity
    // // using increment function
    // itemStockRef
    //   .update({
    //     stockItemQuantity: admin.firestore.FieldValue.increment(
    //       itemQuantity.amount
    //     ),
    //   })
    //   .then((ref) => console.log("stkItmQty += " + itemQuantity.amount));
    // itemStockRef
    //   .update({
    //     stockItemCost: admin.firestore.FieldValue.increment(crntItemCost),
    //   })
    //   .then((ref) => console.log("stkItmCost += " + crntItemCost));
  }

  function buyItem(agent) {
    const dialogflowAgentDoc = db.collection("stock");
    agent.add(
      "Here is a list of Item available in Stock. Enter the name of the item you wish to buy :\n"
    );
    return dialogflowAgentDoc
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          if (!doc.exists) {
            agent.add("No Item Available in stock");
          } else {
            agent.add(
              doc.data().stockItemName +
                " @ Rs." +
                Math.ceil(doc.data().stockItemRate) +
                "/kg"
            );
            console.log(doc.data());
          }
          return Promise.resolve("stock Item Read Complete");
        });
      })
      .catch((err) => {
        agent.add("Sorry! some error occured, Please try again");
        console.log(err);
      });
  }

  function confirmItemBuy(agent) {
    var buyItemName = agent.context.get("awaiting-buy-item-name").parameters
      .buyItemName;
    var buyItemQuantity = agent.context.get("awaiting-buy-item-quantity")
      .parameters.buyItemQuantity;
    console.log(agent.context.get("awaiting-buy-item-name"));
    // console.log(buyItemName);

    const itemStockRef = db.collection("stock").doc(buyItemName);

    return itemStockRef
      .get()
      .then((doc) => {
        if (!doc.exists) {
          console.log(buyItemName + " doc not found");
        } else {
          console.log(doc.data());
          var stockItemCost = doc.data().stockItemCost;
          var stockItemQuantity = doc.data().stockItemQuantity;
          var stockItemRate = doc.data().stockItemRate;

          var orderTotal = buyItemQuantity.amount * Math.ceil(stockItemRate);
          //   console.log("order total:", orderTotal);
          agent.add(
            `Order for ${buyItemQuantity.amount} ${buyItemQuantity.unit} ${buyItemName} Placed.\nOrder Total: Rs. ${orderTotal} \nThanks for shopping with Happy Farm 👩‍🌾.`
          );

          stockItemQuantity -= buyItemQuantity.amount;
          stockItemCost -= buyItemQuantity.amount * stockItemRate;

          itemStockRef
            .update({
              stockItemCost: stockItemCost,
              stockItemQuantity: stockItemQuantity,
            })
            .then((ref) => {
              console.log(
                "stkItemCost:" + stockItemCost,
                "stkItemQty:" + stockItemQuantity,
                "stkItmRate:" + stockItemRate
              );
            });
        }
        return Promise.resolve("stock Item Read Complete");
      })
      .catch((err) => {
        console.log("error getting doc: ", err);
      });
  }

  var intentMap = new Map();
  intentMap.set("confirmUserRegister - yes", confirmUserRegister);
  intentMap.set("getUserList", getUserList);
  intentMap.set("confirmItemSell - yes", confirmItemSell);
  intentMap.set("BuyItem", buyItem);
  intentMap.set("confirmItemBuy - yes", confirmItemBuy);
  agent.handleRequest(intentMap);
});

app.listen(process.env.PORT || 3333, () =>
  console.log("Server is live at port 3333")
);

// Site is live on https://happyfarm02.herokuapp.com/
// https://cloud.google.com/dialogflow/docs/reference/system-entities
// https://cloud.google.com/dialogflow/docs/integrations/dialogflow-messenger
