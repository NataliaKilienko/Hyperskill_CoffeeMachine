const input = require('sync-input');

let state = {
    water: 400,
    milk: 540,
    beans: 120,
    cups: 9,
    money: 550,
    milkFlavor: "regular",
    cupSize: "medium"
};

function printState() {
    console.log(`The coffee machine has:`);
    console.log(`${state.water} ml of water`);
    console.log(`${state.milk} ml of milk`);
    console.log(`${state.beans} g of coffee beans`);
    console.log(`${state.cups} disposable cups`);
    console.log(`$${state.money} of money`);
    console.log(`Milk flavor: ${state.milkFlavor}`);
    console.log(`Cup size: ${state.cupSize}`);
}

function buyCoffee(choice) {
    const recipes = {
        1: { name: "espresso", water: 250, milk: 0, beans: 16, money: 4 },
        2: { name: "latte", water: 350, milk: 75, beans: 20, money: 7 },
        3: { name: "cappuccino", water: 200, milk: 100, beans: 12, money: 6 },
        4: { name: "mochaccino", water: 300, milk: 150, beans: 24, money: 8 } // Новий рецепт
    };

    const recipe = recipes[choice];

    if (!recipe) {
        return "Invalid choice!";
    }

    if (state.water < recipe.water) {
        return "Sorry, not enough water!";
    }
    if (state.milk < recipe.milk) {
        return "Sorry, not enough milk!";
    }
    if (state.beans < recipe.beans) {
        return "Sorry, not enough coffee beans!";
    }
    if (state.cups < 1) {
        return "Sorry, not enough disposable cups!";
    }

    state.water -= recipe.water;
    state.milk -= recipe.milk;
    state.beans -= recipe.beans;
    state.cups -= 1;
    state.money += recipe.money;

    return `I have enough resources, making you a ${recipe.name} with ${state.milkFlavor} milk in a ${state.cupSize} cup!`;
}

function fillSupplies() {
    state.water += Number(input("Write how many ml of water you want to add:\n"));
    state.milk += Number(input("Write how many ml of milk you want to add:\n"));
    state.beans += Number(input("Write how many grams of coffee beans you want to add:\n"));
    state.cups += Number(input("Write how many disposable cups you want to add:\n"));
}

function takeMoney() {
    console.log(`I gave you $${state.money}`);
    state.money = 0;
}

function chooseMilkFlavor() {
    const flavor = input("Choose milk flavor (regular, vanilla, chocolate):\n");
    const validFlavors = ["regular", "vanilla", "chocolate"];

    if (validFlavors.includes(flavor)) {
        state.milkFlavor = flavor;
        console.log(`Milk flavor set to ${flavor}`);
    } else {
        console.log("Invalid flavor choice. Please choose 'regular', 'vanilla', or 'chocolate'.");
    }
}

function chooseCupSize() {
    const size = input("Choose cup size (small, medium, large):\n");
    const validSizes = ["small", "medium", "large"];

    if (validSizes.includes(size)) {
        state.cupSize = size;
        console.log(`Cup size set to ${size}`);
    } else {
        console.log("Invalid size choice. Please choose 'small', 'medium', or 'large'.");
    }
}

let running = true;

while (running) {
    const action = input("Write action (buy, fill, take, remaining, milk flavor, cup size, exit):\n");

    switch (action) {
        case "buy":
            const choice = input("What do you want to buy? 1 - espresso, 2 - latte, 3 - cappuccino, 4 - mochaccino, back - to main menu:\n");
            if (choice !== "back") {
                console.log(buyCoffee(choice));
            }
            break;
        case "fill":
            fillSupplies();
            break;
        case "take":
            takeMoney();
            break;
        case "remaining":
            printState();
            break;
        case "milk flavor":
            chooseMilkFlavor();
            break;
        case "cup size":
            chooseCupSize();
            break;
        case "exit":
            running = false;
            break;
        default:
            console.log("Unknown action. Please choose 'buy', 'fill', 'take', 'remaining', 'milk flavor', 'cup size', or 'exit'.");
    }
}