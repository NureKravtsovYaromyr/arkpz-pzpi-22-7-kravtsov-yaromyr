
const readline = require('readline');
const axios = require('axios'); 
const SERVER_URL = 'http://localhost:5000'; 

let cards = [];

const fetchCards = async () => {
    try {
        console.log('🔄 Fetching available cards from the server...');
        const response = await axios.get(`${SERVER_URL}/user`);
        cards = response.data;
        console.log('✅ Cards loaded successfully!');
        console.table(cards);
    } catch (error) {
        console.error('❌ Error fetching cards:', error.message);
    }
}

let doors = [];

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function showLoading(message = 'Processing') {
    const loadingChars = ['|', '/', '-', '\\'];
    let i = 0;
    return setInterval(() => {
        process.stdout.write(`\r${message} ${loadingChars[i++ % loadingChars.length]}`);
    }, 300);
}

async function fetchDoors() {
    try {
        console.log('🔄 Fetching available doors from the server...');
        const response = await axios.get(`${SERVER_URL}/door`);
        doors = response.data;
        console.log('✅ Doors loaded successfully!');

        console.table(doors);
    } catch (error) {
        console.error('❌ Error fetching doors:', error.message);
    }
}

async function checkAccess(userId, doorId) {
    let loader = showLoading('🔄 Verifying access');
    try {
        console.log(userId, doorId)
        const response = await axios.post(`${SERVER_URL}/door/verify-user`, {
            userId, doorId
        });
        
        clearInterval(loader);
        console.log('\n✅ Access Granted!');
        console.log(`Card: ${cardId} → Door: ${doorId}`);
    } catch (error) {
        clearInterval(loader);
        if (error.response) {
            console.error('\n❌ Access Denied:', error.response.data.message);
        }
    }
}

async function main() {
    console.log('🚀 Welcome to the Access Control Simulator');
    console.log('--------------------------------------------');
    await fetchCards()
    await fetchDoors();
    
    function askForInput() {
        rl.question('\n🔑 Enter Card ID (or type "exit" to quit): ', (cardId) => {
            if (cardId.toLowerCase() === 'exit') {
                console.log('👋 Exiting...');
                rl.close();
                return;
            }

            const card = cards.find(c => c.id === Number(cardId));
            if (!card) {
                console.log('❌ Invalid Card ID. Please try again.');
                askForInput();
                return;
            }

            console.log(`🪪 Card selected: ${card.username} (${card.id})`);

            rl.question('🚪 Enter Door ID: ', async (doorId) => {
                const door = doors.find(d => d.id === Number(doorId));

                if (!door) {
                    console.log('❌ Invalid Door ID. Please try again.');
                    askForInput();
                    return;
                }

                console.log(`🚪 Door selected: ${door.buildingId} (${door.id})`);

                await checkAccess(card.id, doorId);
                askForInput();  
            });
        });
    }

    askForInput();
}

main();


/* 
00:00 - Вступ 
00:20 - Створення юзерів
02:23 - Створення будівлі та двері
03:10 - Надання доступу до користування 
03:35 - Демонастрація симуляції работи з IoT клієнтом.  

*/