1. # Products

   -> Bulk
   ~ pid:
   ~ category: text
   ~ subCat: text
   ~ name: text
   ~ desc: text
   ~ isBulk: boolean
   ~ qty: double
   ~ qtyUnit: text
   ~ shelfLife: double
   ~ shelfLifeUnit: text
   ~ price: double
   ~ pricePerQty: int
   ~ priceQtyUnit: text
   ~ negotiable: boolean
   ~ images: [file_array]
   ~ thumbnail: [file]
   ~ sellerId: text

   -> Normal
   ~ pid
   ~ category
   ~ subCat
   ~ name
   ~ desc
   ~ isBulk: false
   ~ price
   ~ priceQty
   ~ priceQtyUnit
   ~ negotiable
   ~ images: []
   ~ thumbnail
   ~ sellerId

2. # Users

   ~ uid
   ~ plan: int
   ~ phone
   ~ email
   ~ name
   ~ password
   ~ savedAdd: []
   ~ docId
   ~ docName
   ~ docNo
   ~ docImage
   ~
   ~

3. # Orders

   => Sell
   -- Ongoing(active/onPause)
   ~ pid
   ~ time
   ~
   ~
   ~
   ~
   ~

   -- Past

=>Buy
-- Ongoing(cart)
~ pid
~ userId
~ pIDs: []
~
~
~
~
~

--Past

4. # Cart
   ~orderId

5) # Transaction

   ~

6) # Review

   ~

7) # Address
   ~

=> Trending List
=> Paid users

# Long term todos

1. Notifications
2. DM
