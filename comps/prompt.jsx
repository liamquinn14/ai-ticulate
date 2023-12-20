import React, { useEffect, useState, useRef } from 'react';

const prompts = [ "Shark", "Dolphin", "Octopus", "Whale", "Jellyfish", "Seahorse", "Starfish", "Squid", "Turtle", "Lobster", "Crab", "Walrus", "Seal", "Otter", "Penguin", "Clam", "Oyster", "Coral", "Anemone", "Kraken", "Pufferfish", "Stingray", "Mackerel", "Salmon", "Tuna", "Sardine", "Swordfish", "Shrimp", "Catfish", "Monkfish", "Piranha", "Lion", "Tiger", "Elephant", "Leopard", "Cheetah", "Giraffe", "Hippo", "Rhino", "Zebra", "Kangaroo", "Panda", "Koala", "Sloth", "Chimpanzee", "Gorilla", "Orangutan", "Wolf", "Fox", "Bear", "Raccoon", "Otter", "Deer", "Buffalo", "Camel", "Llama", "Horse", "Donkey", "Mule", "Pig", "Sheep", "Goat", "Cow", "Dog", "Cat", "Rat", "Mouse", "Squirrel", "Hedgehog", "Porcupine", "Bat", "Dolphin", "Whale", "Seal", "Walrus",  "Alligator", "Crocodile", "Lizard", "Gecko", "Chameleon", "Snake", "Python", "Turtle", "Tortoise", "Dragon", "Badger", "Meerkat", "Eagle", "Parrot", "Owl", "Flamingo", "Magpie", "Woodpecker", "Milk", "Egg", "Butter", "Cheese", "Yogurt", "Juice", "Water", "Jam", "Ketchup", "Mustard", "Mayonnaise", "Olive", "Lettuce", "Tomato", "Cucumber", "Carrot", "Apple", "Orange", "Grape", "Melon", "Beef", "Pork", "Fish", "Tofu", "Hummus", "Salsa", "Chocolate", "Cake", "Pie", "Bread", "Bagel", "Spinach", "Mushroom", "Pepper", "Garlic", "Ginger", "Plate", "Bowl", "Cup", "Glass", "Mug", "Spoon", "Fork", "Knife", "Spatula", "Whisk", "Pot", "Pan", "Peeler", "Grater", "Colander", "Tea", "Coffee", "Sugar", "Salt", "Pepper", "Spice", "Flour", "Rice", "Pasta", "Cereal","Oat", "Vinegar", "Oil", "Seatbelt", "Mirror", "Key", "Indicator", "Wiper", "Airbag", "Pedal", "Brake", "Clutch", "Handbrake", "Horn", "Speaker", "Radio", "Beer", "Wine", "Champagne", "Whiskey", "Vodka", "Rum", "Tequila", "Brandy", "Cider", "Liqueur", "Espresso", "Latte", "Cappuccino", "Mocha", "Americano", "Smoothie", "Cordial", "Eggnog", "Gin", "Bourbon", "Scotch", "Port", "Sake", "Tonic", "Wood", "Metal", "Plastic", "Glass", "Cotton", "Silk", "Wool", "Leather", "Rubber", "Paper", "Ceramic", "Stone", "Marble", "Granite", "Brick", "Concrete", "Steel", "Iron", "Gold", "Silver", "Copper", "Bronze", "Brass", "Aluminum", "Titanium", "Carbon", "Velvet", "Denim", "Lace", "Latex", "Foam", "Bamboo", "Hemp", "Clay", "Plaster", "Acrylic", "Cheddar", "Gouda", "Brie", "Camembert", "Mozzarella", "Parmesan", "Roquefort", "Feta", "Ricotta", "Afghanistan", "Brazil", "China", "Denmark", "Egypt", "France", "Greece", "Hungary", "India", "Japan", "Kenya", "Mexico", "Qatar", "Russia", "Spain", "Turkey", "Argentina", "Belgium", "Germany", "Haiti", "Iceland", "Jamaica", "Poland", "Romania", "Sweden", "Wales", "Italy", "Monaco", "Spain", "Switzerland", "Canada", "England", "Russia", "Ghana", "Bangladesh", "Morocco", "Australia", "Cuba", "Austria", "Thailand", "Iraq", "Colombia","Ireland", "Scotland", "Ukraine", "Nigeria", "Israel", "Finland", "Portugal", "Netherlands", "Berlin", "Amsterdam", "Prague", "Wellington", "Budapest", "Warsaw", "Manila", "Seoul", "Bangkok", "London", "Tokyo", "Paris", "Ottawa", "Beijing", "Moscow", "Madrid", "Rome", "Cairo", "Lisbon", "Oslo", "Canberra", "Brasilia", "Vienna", "Stockholm", "Athens", "Nairobi", "Dublin", "Kiev", "Brussels", "Copenhagen", "Rose", "Daisy", "Red", "Blue", "Green", "Yellow", "Purple", "Pink", "Brown", "Black", "White", "Gray", "Maroon", "Navy", "Accountant", "Architect", "Baker", "Carpenter", "Dentist", "Electrician", "Farmer", "Geologist", "Historian", "Journalist", "Lawyer", "Mechanic", "Nurse", "Optician", "Painter", "Physician", "Quarterback", "Tailor", "Umpire", "Veterinarian", "Waiter",  "Chef", "Librarian", "Pilot", "Singer", "Muffin", "Croissant", "Scone", "Table", "Chair", "Barista", "Menu", "Mug", "Cup", "Saucer", "Sugar", "Napkin", "Straw",  "Grinder", "Caramel", "Syrup", "Brownie", "Kettle", "Stocking", "Santa", "Snowflake", "Reindeer", "Sleigh", "Elf", "Candle", "Wreath", "Mistletoe", "Star", "Angel", "Gift", "Bell", "Gingerbread", "Tinsel", "Sweater", "Trousers", "Tie", "Belt", "Eggnog", "Nativity", "Chess", "Draughts", "Monopoly", "Cluedo", "Scrabble", "Shirt", "Dress", "Skirt", "Jacket", "Coat", "Scarf", "Sock", "Hat", "Glove", "Watch", "Necklace", "Bracelet", "Ring", "Suit", "Vest", "Bed", "Pillow", "Blanket", "Duvet", "Mattress", "Lamp", "Clock", "Carpet", "Desk", "Alarm", "Vase", "Diary", "Fan", "Window", "Poster", "Basket",  "Pizza", "Burger", "Steak", "Salad", "Sandwich", "Pasta", "Sushi", "Curry", "Soup", "Risotto", "Paella", "Kebab", "Falafel", "Ramen", "Tagine", "Quiche", "Pancake", "Waffle",  "Hyena", "Kiwi", "Radish", "Broccoli", "Asparagus", "Quinoa", "Lentil", "Avocado", "Blender", "Toaster", "Microwave", "Forklift", "Helicopter", "Skateboard", "Scooter", "Violin", "Child", "Baby", "Toddler", "Adult", ""
];

function shuffleArray(array) {
  return [...array].sort(() => 0.5 - Math.random());
}

export default function Prompt({ timeLeft, setTimeLeft, gameState, setGameState, description, setDescription, currentCharacters, setCurrentCharacters, charactersLeft, newPrompt, setNewPrompt, setCharactersLeft, endRoundChars, setEndRoundChars, score}) {
    
    const [shuffledPrompts, setShuffledPrompts] = useState([]);
    const [promptIndex, setPromptIndex] = useState(0);
    const inputRef = useRef(null);

    useEffect(() => {
        if (timeLeft > 0) {
            const interval = setInterval(() => {
                setTimeLeft(timeLeft - 1);
            }, 1000);
            return () => clearInterval(interval);
        } else {
            setGameState('final');
        }
    }, [timeLeft]);

    useEffect(() => {
        inputRef.current.focus();
        setDescription("")
    }, []);
    

    useEffect(() => {
        setShuffledPrompts(shuffleArray(prompts));
    }, []);

    useEffect(() => {
        if (shuffledPrompts.length > 0 && promptIndex < shuffledPrompts.length) {
            setNewPrompt(shuffledPrompts[promptIndex].toUpperCase());
        }
    }, [promptIndex, shuffledPrompts]);

    function handleChange(event) {
        setDescription(event.target.value);
        setCurrentCharacters(event.target.value.split(" ").join("").split("").length);
        setCharactersLeft(endRoundChars - event.target.value.split(" ").join("").split("").length);
    }

    function handleKeyPress(event) {
        if (event.key === 'Enter' && charactersLeft >= 0) {
            submit();
        }
    }

    function submit() {
        setGameState('answer');
        setEndRoundChars(prevEndRoundChars => prevEndRoundChars - currentCharacters);
        setCurrentCharacters(0);
    }

    function forfeit() {
        setGameState('final');
    }

    
    
    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <h4 className="p-2 m-1 text-xl font-bold text-purple-100"> Your prompt is... </h4>
            <h5 className="p-2 m-1 text-xl font-bold text-purple-900 bg-purple-200">{newPrompt} </h5>
            <h4 className="p-2 m-1 text-xl font-bold text-purple-100"> Describe the prompt word with as few characters as possible. </h4>
            <input onChange={handleChange} onKeyPress={handleKeyPress} ref={inputRef}placeholder="Write your description here..." className="p-3 pl-4 m-1 w-3/5" />
            <div className="m-1 flex flex-row w-1/2 justify-between items-center" id="under-input">
                <p className="text-sm text-purple-100 font-semibold">{currentCharacters} characters long</p>
                <p className="text-sm text-purple-100 font-semibold" style={charactersLeft < 0 ? { color: '#dc2626' } : {}}>{charactersLeft} characters remaining</p>
            </div>
            {charactersLeft >= 0 && <button onClick={submit} className="px-4 py-2 m-4 text-purple-900 bg-purple-200 shadow-md rounded hover:bg-purple-300 font-black"> SUBMIT </button> }
            <button onClick={forfeit} className="px-4 py-2 m-4 text-red-100 bg-red-600 hover:bg-red-700 font-black shadow-md rounded"> {charactersLeft >= 0 ? "FORFEIT" : "FINISH GAME"} </button>
        </div>
    )
}