var dog,sadDog,happyDog,database;
var foodS,foodStock;
var fedTime,lastFed,currentTime;
var feed,addFood;
var foodObj;
var gameState,readState;

function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
// milkImg=loadImage("Milk.png");


}

function setup() {
  database=firebase.database();
  createCanvas(400,500);
  
  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);

  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });

  //read game state from database
  readState=database.ref('gameState');
  readState.on("value",function(data){
    gameState=data.val();
  });
   
  dog=createSprite(200,400,150,150);
  dog.addImage(happyDog);
  dog.scale=0.15;
  
  feed=createButton("Feed the dog");
  feed.position(500,70);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(600,70);
  addFood.mousePressed(addFoods);
}

function draw() {
  drawSprites();
  background(46,139,87);
  foodObj.display();

if(lastFed>=12){
  text("Last Feed : 11 PM",30,30);
fill("white")
}
else if(lastFed==0){
  text ("Last Feed : 12 AM",30,30)
 fill("white")
  
}
else{
  text("Last Feed : 11 AM",30,30)
fill("white")
  
}


 
 drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


//function to update food stock and last fed time
function feedDog(){
  dog.addImage(sadDog);


  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour(),
    gameState:"Hungry"
  })
}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}

//update gameState
function update(state){
  database.ref('/').update({
    gameState:state
  })
}





